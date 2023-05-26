import React, { useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useStore, updateModelLoaded } from '@Store/'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import * as THREE from 'three'
import { isMobile } from 'react-device-detect'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'
import { colors } from '../../../styles/vars/colors.style'
import { SceneCanvas, SceneWrapper } from '../index.style'

// const dat = typeof window !== 'undefined' ? require('dat.gui') : null

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase)
}

const vec3RotateAroundY = `
vec3 rotateAroundY(vec3 p, float angle) {
  // Rotate around Y axis
  vec3 axis = vec3(0,1.0,0);
  return mix(dot(axis, p)*axis, p, cos(angle)) + cross(axis,p)*sin(angle);
}`

const vec3RotateX = `
vec3 rotateX(vec3 v, float angle) {
  return rotation3dX(angle) * v;
}`

const vec3RotateY = `
vec3 rotateY(vec3 v, float angle) {
  return rotation3dY(angle) * v;
}`

const vec3RotateZ = `
vec3 rotateZ(vec3 v, float angle) {
  return rotation3dZ(angle) * v;
}`

const mat3Rotation3dx = `
mat3 rotation3dX(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, s,
    0.0, -s, c
  );
}`

const mat3Rotation3dy = `
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}`

const mat3Rotation3dz = `
mat3 rotation3dZ(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, s, 0.0,
    -s, c, 0.0,
    0.0, 0.0, 1.0
  );
}`

const carMaterialShader = ({
  time,
  visible,
  visibilityOverride,
  lightBias,
  baseModelColor,
  lightPos,
  lightAngle,
  lightIntensity,
}) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: time },
      tilt: { value: 0 },
      speed: { value: 1 },
      visible: { value: visible },
      visibilityOverride: { value: visibilityOverride },
      lightBias: { value: lightBias },
      baseModelColor: { value: baseModelColor },
      lightPos: { value: lightPos },
      lightAngle: { value: lightAngle },
      lightPosOffset: { value: new THREE.Vector3(0) },
      lightIntensity: { value: lightIntensity },
    },

    vertexShader: `
      varying vec3 vNormal;
      uniform float time;
      uniform float tilt;
      uniform float speed;

      ${mat3Rotation3dx}
      ${vec3RotateX}
      ${mat3Rotation3dz}
      ${vec3RotateZ}

      void main() {
        vNormal = normal;
        float speedTime = time / 666.0;
        float speedYOffset = speed - 1.0;
        float speedXRotation = -0.01 * (speed - 1.0);
        vec3 offsetPosition = vec3(position.x, position.y + (sin(speedTime) * -1.0) - speedYOffset, position.z);
        offsetPosition = rotateX(offsetPosition, sin(speedTime) * -0.003);
        offsetPosition = rotateX(offsetPosition, speedXRotation);
        offsetPosition = rotateX(offsetPosition, abs(tilt * -0.01));
        offsetPosition = rotateZ(offsetPosition, tilt * -0.05);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(offsetPosition, 1.0);
      }
    `,

    fragmentShader: `
      varying vec3 vNormal;
      uniform float visible;
      uniform float visibilityOverride;
      uniform float lightBias;
      uniform vec3 baseModelColor;
      uniform vec3 lightPos;
      uniform float lightAngle;
      uniform vec3 lightPosOffset;
      uniform float lightIntensity;

      ${vec3RotateAroundY}

      void main() {
        vec3 light = rotateAroundY(lightPos, lightAngle) + lightPosOffset;

        // normalize color
        vec3 normalizedBaseColor = vec3(baseModelColor[0] / 255.0, baseModelColor[1] / 255.0, baseModelColor[2] / 255.0);

        // ensure it's normalized
        light = normalize(light);

        // calculate the dot product of the light to the vertex normal
        float dProd = max(1.0 - lightBias, lightIntensity * dot(vNormal, light));

        vec3 mixedColors = mix(normalizedBaseColor, vec3(dProd), 0.5);

        gl_FragColor = vec4(mixedColors, min((visible * max(visibilityOverride * vNormal.y, 0.0)) + (visibilityOverride * visible), 1.0));
      }
    `,
  })
}
const wheelMaterialShader = ({
  time,
  rotated,
  visible,
  visibilityOverride,
  lightBias,
  baseModelColor,
  lightPos,
  lightAngle,
  lightIntensity,
}) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: time },
      tilt: { value: 0 },
      speed: { value: 1 },
      vertRotate: { value: rotated ? 1 : 0 },
      fragRotate: { value: rotated ? -1 : 1 },
      visible: { value: visible },
      visibilityOverride: { value: visibilityOverride },
      lightBias: { value: lightBias },
      baseModelColor: { value: baseModelColor },
      lightPos: { value: lightPos },
      lightAngle: { value: lightAngle },
      lightPosOffset: { value: new THREE.Vector3(0) },
      lightIntensity: { value: lightIntensity },
    },
    transparent: true,

    vertexShader: `
      varying vec3 vNormal;
      uniform float time;
      uniform float tilt;
      uniform float vertRotate;

      float PI = 3.14159265359;

      ${mat3Rotation3dx}
      ${vec3RotateX}
      ${mat3Rotation3dy}
      ${vec3RotateY}

      void main() {
        vNormal = normal;
        vec3 offsetPosition = rotateX(rotateY(position, vertRotate * PI), time / 40.0);
        offsetPosition = rotateY(offsetPosition, tilt * -0.2);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(offsetPosition, 1.0);
      }
    `,

    fragmentShader: `
      varying vec3 vNormal;
      uniform float time;
      uniform float fragRotate;
      uniform float visible;
      uniform float visibilityOverride;
      uniform float lightBias;
      uniform vec3 baseModelColor;
      uniform vec3 lightPos;
      uniform float lightAngle;
      uniform vec3 lightPosOffset;
      uniform float lightIntensity;

      ${vec3RotateAroundY}
      ${mat3Rotation3dx}
      ${vec3RotateX}

      void main() {
        vec3 light = rotateAroundY(lightPos, lightAngle);
        light = vec3(light.x * fragRotate, light.y, light.z * fragRotate);
        light = rotateX(light, time / ((fragRotate * -1.0) * 40.0));

        // normalize color
        vec3 normalizedBaseColor = vec3(baseModelColor[0] / 255.0, baseModelColor[1] / 255.0, baseModelColor[2] / 255.0);

        // ensure it's normalized
        light = normalize(light);

        // calculate the dot product of the light to the vertex normal
        float dProd = max(1.0 - lightBias, lightIntensity * dot(vNormal, light));

        vec3 mixedColors = mix(normalizedBaseColor, vec3(dProd), 0.5);

        gl_FragColor = vec4(mixedColors, min((visible * max(visibilityOverride * vNormal.y, 0.0)) + (visibilityOverride * visible), 1.0));
      }
    `,
  })
}

const carShadowShader = ({
  time,
  visible,
  visibilityOverride,
  lightPos,
  lightAngle,
  softColor,
  hardColor,
}) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: time },
      visible: { value: visible },
      visibilityOverride: { value: visibilityOverride },
      lightPos: { value: lightPos },
      lightAngle: { value: lightAngle },
      lightPosOffset: { value: new THREE.Vector3(0) },
      softColor: { value: softColor },
      hardColor: { value: hardColor },
    },

    vertexShader: `
      varying vec2 vUv;
      uniform float time;

      void main() {
        vUv = uv;
        vec3 offsetPosition = vec3(position.x + (sin(time / 30.0) * 0.001) - 0.0005, position.y, position.z);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(offsetPosition, 1.0);
      }
    `,

    fragmentShader: `
      varying vec2 vUv;
      uniform float visible;
      uniform float visibilityOverride;
      uniform vec3 lightPos;
      uniform float lightAngle;
      uniform vec3 lightPosOffset;
      uniform vec3 softColor;
      uniform vec3 hardColor;

      float roundedRectangle(vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(vUv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
      }

      ${vec3RotateAroundY}

      void main() {
        vec2 uv = vUv;
        vec3 light = rotateAroundY(lightPos, lightAngle) + lightPosOffset;
        vec2 lightingOffset = vec2(light.y, light.z);
        vec2 softPos = vec2(0.45, 0.49) + lightingOffset * 0.005;
        vec2 hardPos = vec2(0.49, 0.49) + lightingOffset * 0.002;
        vec2 size = vec2(0.14, 0.26);
        float softShadow = roundedRectangle(softPos, size, 0.1, 0.5);
        float hardShadow = 0.8 * roundedRectangle(hardPos, size * 0.85, 0.1, 0.5);
        vec3 normalizedSoftColor = vec3(softColor[0] / 255.0, softColor[1] / 255.0, softColor[2] / 255.0);
        vec3 normalizedHardColor = vec3(hardColor[0] / 255.0, hardColor[1] / 255.0, hardColor[2] / 255.0);
        vec3 mixedColors = mix(normalizedSoftColor, normalizedHardColor, hardShadow);
        gl_FragColor = vec4(mixedColors, visibilityOverride * (visible * (softShadow + hardShadow)));
      }
    `,
  })
}

const particleShader = ({ time, visible, visibilityOverride }) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: time },
      speed: { value: 1 },
      visible: { value: visible },
      visibilityOverride: { value: visibilityOverride },
    },
    transparent: true,

    vertexShader: `
      uniform float time;
      attribute float progress;
      attribute float opacity;
      attribute vec3 offset;
      varying float vProgress;
      varying float vOpacity;
      varying vec2 vUv;

      void main() {
        vProgress = progress;
        vOpacity = opacity;
        float zOffset = mod((time / 500.0) + progress, 1.0) * 5.0 - 2.5;
        vec3 offsetPos = position + offset;
        offsetPos = vec3(offsetPos.x, offsetPos.y, offsetPos.z - zOffset);
				vec4 mvPosition = modelViewMatrix * vec4(offsetPos, 1.0);

				gl_Position = projectionMatrix * mvPosition;
      }
    `,

    fragmentShader: `
      uniform float time;
      uniform float visible;
      uniform float visibilityOverride;
      varying vec2 vUv;
      varying float vProgress;
      varying float vOpacity;

      void main() {
        vec2 uv = vUv;
        float t = 1.0 - (abs(mod((time / 500.0) + vProgress, 1.0) - 0.5) * 2.0);
        gl_FragColor = vec4(vec3(0.3), vOpacity * visibilityOverride * visible * 0.3 * t);
      }
    `,
  })
}

const Car = ({ useWindow, zIndex }) => {
  const [store, dispatch] = useStore()
  const { fast, showPageMask } = store

  // Effects
  const shaderVars = useRef({
    visibilityOverride: 1.0, // Overrides the set car visibility
    lightBias: 1.25,
    carTilt: 0,
    baseModelColor: [219, 219, 219],
    softColor: [220, 220, 220],
    hardColor: [74, 74, 74],
    speed: {
      current: 1,
      target: 1,
    },
    rotateSpeed: 0.005,
    lightPos: {
      x: 8,
      y: 8,
      z: 3.5,
    },
    lightAngle: 0,
    lightPosOffset: {
      x: 0,
      y: 0,
      z: 0,
    },
    lightIntensity: 1.3,
  })

  // DOM refs
  // const debugging = useRef()
  const wrapper = useRef(),
    canvas = useRef()

  // WebGL refs
  const renderer = useRef(),
    scene = useRef()
  // const composer = useRef()

  // Camera
  const cameraVars = useRef({
    x: {
      target: -2,
      intro: 0,
    },
  })
  const camera = useRef(),
    introCamera = useRef(),
    panCamera = useRef(),
    stats = useRef()

  // Timeline trigger points
  const scrollTopHeight = useRef(),
    scrollBottomHeight = useRef()

  // Objects
  const car = useRef(),
    wheel = useRef(),
    carWrap = useRef(),
    introTimeline = useRef(),
    carTimeline = useRef(),
    carTimeline2 = useRef(),
    floor = useRef(),
    particles = useRef()

  // Materials
  const carMaterial = useRef(),
    wheelMaterials = useRef(),
    floorMaterial = useRef(),
    particleMaterial = useRef()

  // Animation refs
  const raf = useRef()

  // Window refs
  const pixelRatioMatch = useRef()

  // Sizing refs
  const sizes = useRef()

  // Mouse refs
  const mouse = useRef({
    x: 0,
    y: 0,
    scale: 0.3,
    speed: 0.03,
  })

  // Color refs
  const threeColors = useRef({
    grey: new THREE.Color(colors.grey),
    dark: new THREE.Color(colors.dark),
  })

  let lightScene = useRef(true)

  const setScene = useCallback(() => {
    scene.current = new THREE.Scene()
    scene.current.background = threeColors.current.grey
  }, [])

  const onPointerMove = useCallback(
    event => {
      if (event.isPrimary === false) return

      const xMin = useWindow ? 0 : wrapper.current.getBoundingClientRect().left
      const xMax = useWindow
        ? window.innerWidth
        : xMin + wrapper.current.offsetWidth
      const yMin = useWindow ? 0 : wrapper.current.getBoundingClientRect().top
      const yMax = useWindow
        ? window.innerHeight
        : yMin + wrapper.current.offsetHeight

      mouse.current.x = gsap.utils.normalize(xMin, xMax, event.clientX) * 2 - 1
      mouse.current.y = gsap.utils.normalize(yMin, yMax, event.clientY) * 2 - 1
    },
    [useWindow]
  )

  const handleUserEvents = useCallback(() => {
    wrapper.current.addEventListener('pointermove', onPointerMove)
  }, [onPointerMove])

  const resizeHandler = useCallback(() => {
    // Update sizes
    sizes.current.width = window.innerWidth
    sizes.current.height = window.innerHeight

    // Update camera
    camera.current.aspect = sizes.current.width / sizes.current.height
    camera.current.updateProjectionMatrix()

    // Update renderer
    renderer.current.setSize(sizes.current.width, sizes.current.height)
    renderer.current.setPixelRatio(getPixelRatio())

    // Update trigger points
    scrollTopHeight.current = window.scroll.scroll.windowHeight * 5
    scrollBottomHeight.current =
      window.scroll.scroll.windowHeight * (isMobile ? 2 : 1.25) + 100
  }, [])

  const setSizes = useCallback(() => {
    sizes.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    scrollTopHeight.current = window.scroll.scroll.windowHeight * 5
    scrollBottomHeight.current =
      window.scroll.scroll.windowHeight * (isMobile ? 2 : 1.25) + 100

    window.addEventListener('resize', resizeHandler)

    try {
      pixelRatioMatch.current.addEventListener('change', resizeHandler)
    } catch (error) {
      try {
        pixelRatioMatch.current.addListener(resizeHandler)
      } catch (error2) {
        console.error(error2)
      }
    }
  }, [resizeHandler])

  const setCamera = useCallback(() => {
    camera.current = new THREE.PerspectiveCamera(
      25,
      sizes.current.width / sizes.current.height,
      0.1,
      500
    )
    camera.current.position.x = 3
    camera.current.position.y = 1
    camera.current.position.z = 5
    camera.current.target = new THREE.Vector3(0, -0.3, 0)
    camera.current.lookAt(camera.current.target)
    introCamera.current = new THREE.Group()
    introCamera.current.add(camera.current)
    introCamera.current.position.x = -1 // Starting x pos
    introCamera.current.position.z = 3 // Starting z pos
    panCamera.current = new THREE.Group()
    panCamera.current.add(introCamera.current)
    scene.current.add(panCamera.current)
  }, [])

  const carIntroAnimation = useCallback(() => {
    introTimeline.current = gsap.timeline({
      paused: true,
      repeat: 0,
    })

    introTimeline.current.to(
      introCamera.current.position,
      {
        x: 0,
        z: 0,
        duration: 2,
        ease: 'power2.out',
      },
      1
    )
  }, [])

  useEffect(() => {
    if (!showPageMask && introTimeline.current) introTimeline.current.play()
  }, [showPageMask])

  const createCarAnimation = useCallback(() => {
    carTimeline.current = gsap.timeline({
      repeat: 0,
      paused: true,
      defaults: {
        duration: 3,
        ease: 'power1.inOut',
      },
    })

    carTimeline.current.addLabel('scene1')

    carTimeline.current.fromTo(
      cameraVars.current.x,
      {
        target: -0.6,
      },
      {
        target: -0.3,
      },
      'scene1'
    )

    carTimeline.current.to(
      camera.current.position,
      { y: 10, duration: 4.5 },
      'scene1'
    )

    carTimeline.current.to(camera.current.position, { z: -3 }, 'scene1')

    carTimeline.current.to(
      camera.current.position,
      { x: 7, duration: 1.5 },
      'scene1'
    )

    carTimeline.current.to(
      camera.current.position,
      {
        x: 1.25,
      },
      'scene1+=1.5'
    )

    carTimeline.current.to(
      cameraVars.current.x,
      {
        target: 0.3,
      },
      'scene1+=1.5'
    )

    carTimeline.current.addLabel('scene2', '+=1')

    carTimeline.current.to(
      cameraVars.current.x,
      {
        target: 0,
        duration: 5,
      },
      'scene2'
    )

    carTimeline.current.to(
      camera.current.position,
      { y: 1, duration: 5 },
      'scene2'
    )

    carTimeline.current.to(
      camera.current.position,
      { z: -7, duration: 2 },
      'scene2'
    )

    carTimeline.current.to(
      camera.current.position,
      {
        x: 8,
      },
      'scene2'
    )

    carTimeline.current.to(
      camera.current.position,
      { z: 7, duration: 4 },
      'scene2+=2'
    )

    carTimeline.current.to(
      camera.current.position,
      {
        x: 2,
        duration: 5,
      },
      'scene2+=3'
    )

    carTimeline.current.addLabel('scene3', '+=1')

    carTimeline.current.to(
      camera.current.position,
      {
        x: 14,
        duration: 10,
      },
      'scene3'
    )

    carTimeline.current.to(
      camera.current.position,
      { y: 5, duration: 10 },
      'scene3'
    )

    carTimeline.current.to(
      camera.current.position,
      {
        z: -1,
        duration: 10,
      },
      'scene3'
    )
  }, [])

  const createCarAnimation2 = useCallback(() => {
    carTimeline2.current = gsap.timeline({
      repeat: 0,
      paused: true,
      defaults: {
        duration: 3,
        ease: 'power1.inOut',
      },
    })

    carTimeline2.current.addLabel('scene1')

    carTimeline2.current.to(
      camera.current.position,
      { y: 0.5, x: 3.5, z: 5, duration: 1 },
      'scene1'
    )

    carTimeline2.current.to(
      cameraVars.current.x,
      {
        target: 0,
        duration: 1,
      },
      'scene1'
    )

    carTimeline2.current.to(
      camera.current.position,
      {
        z: 7,
        duration: 4,
      },
      'scene1+=4'
    )
  }, [])

  const createCarFloor = useCallback(size => {
    const geometry = new THREE.PlaneGeometry(size.x * 1.6, size.z * 1.3)
    floorMaterial.current = carShadowShader({
      time: 0,
      visible: 1,
      visibilityOverride: shaderVars.current.visibilityOverride,
      lightPos: shaderVars.current.lightPos,
      lightAngle: shaderVars.current.lightAngle,
      softColor: new THREE.Vector3(...shaderVars.current.softColor),
      hardColor: new THREE.Vector3(...shaderVars.current.hardColor),
    })
    floorMaterial.current.transparent = true
    floor.current = new THREE.Mesh(geometry, floorMaterial.current)
    floor.current.receiveShadow = true
    floor.current.position.z = 0
    floor.current.position.y = size.y / -2
    floor.current.rotation.x = Math.PI * -0.5
    scene.current.add(floor.current)
  }, [])

  const setObjects = useCallback(() => {
    const loaded = models => {
      updateModelLoaded(dispatch, 1)

      const carGLTF = models[0],
        wheelGLTF = models[1]

      // Scale everything down
      models.forEach(model => {
        model.scene.scale.set(0.006, 0.006, 0.006)
      })

      // Assign scene variables
      car.current = carGLTF.scene
      wheel.current = {}
      wheel.current.model = wheelGLTF.scene

      // If a car wrap exists remove it from the scene
      if (carWrap.current) scene.current.remove(carWrap.current)

      // Create a group for everything
      carWrap.current = new THREE.Group()

      // Configure car model
      car.current.traverse(node => {
        if (node.isMesh) {
          node.material = carMaterial.current
        }
      })

      // Set up car
      car.current.position.x = 0
      car.current.position.y = -0.005

      // Add car to group
      carWrap.current.add(car.current)

      // Measure models
      car.current.measurements = {}
      wheel.current.measurements = {}

      const carBox = new THREE.Box3().setFromObject(car.current)
      car.current.measurements.size = carBox.getSize(new THREE.Vector3())
      car.current.measurements.center = carBox.getCenter(new THREE.Vector3())

      const wheelBox = new THREE.Box3().setFromObject(wheel.current.model)
      wheel.current.measurements.size = wheelBox.getSize(new THREE.Vector3())
      wheel.current.measurements.center = wheelBox.getCenter(
        new THREE.Vector3()
      )

      // Set up wheels
      wheel.current.instances = []

      const wheelPositions = [
        {
          x: carBox.max.x - wheel.current.measurements.size.x - 0.01,
          y: wheel.current.measurements.size.y / 2,
          z: 0.92,
        },
        {
          x: carBox.max.x - wheel.current.measurements.size.x - 0.01,
          y: wheel.current.measurements.size.y / 2,
          z: -0.82,
        },
      ]

      let counter = 0

      for (let x = 0; x < wheelPositions.length; x++) {
        const wheelInstance = wheelPositions[x]

        for (let y = 0; y < 2; y++) {
          const rotated = y > 0
          const singleWheel = SkeletonUtils.clone(wheel.current.model)

          // Configure wheel model
          singleWheel.traverse(node => {
            if (node.isMesh) {
              node.material = wheelMaterials.current[counter]
            }
          })

          singleWheel.position.x = rotated ? -wheelInstance.x : wheelInstance.x
          singleWheel.position.y = wheelInstance.y
          singleWheel.position.z = wheelInstance.z

          // Add wheel to group
          carWrap.current.add(singleWheel)
          wheel.current.instances.push(singleWheel)

          counter++
        }
      }

      // Add to scene
      scene.current.add(carWrap.current)
      scene.current.updateWorldMatrix(true)

      // Position the group
      carWrap.current.position.x = 0
      carWrap.current.position.y = -car.current.measurements.size.y / 2
      carWrap.current.position.z = 0

      // Add the shadow
      createCarFloor(car.current.measurements.size)

      // Create the timelines to scrub
      createCarAnimation()
      createCarAnimation2()

      // Play intro
      carIntroAnimation()
    }

    // Create the materials
    carMaterial.current = carMaterialShader({
      time: 0,
      visible: 1,
      visibilityOverride: shaderVars.current.visibilityOverride,
      lightBias: shaderVars.current.lightBias,
      baseModelColor: new THREE.Vector3(...shaderVars.current.baseModelColor),
      lightPos: shaderVars.current.lightPos,
      lightAngle: shaderVars.current.lightAngle,
      lightIntensity: shaderVars.current.lightIntensity,
    })

    wheelMaterials.current = []

    for (let x = 0; x < 4; x++) {
      wheelMaterials.current.push(
        wheelMaterialShader({
          time: 0,
          rotated: x % 2 !== 0,
          visible: 1,
          visibilityOverride: shaderVars.current.visibilityOverride,
          lightBias: shaderVars.current.lightBias,
          baseModelColor: new THREE.Vector3(
            ...shaderVars.current.baseModelColor
          ),
          lightPos: shaderVars.current.lightPos,
          lightAngle: shaderVars.current.lightAngle,
          lightIntensity: shaderVars.current.lightIntensity,
        })
      )
    }

    carMaterial.current.transparent = true

    const loader = new GLTFLoader()

    const updateLoader = xhr => {
      const loadedDecimal = Math.floor((xhr.loaded / 3024000) * 100) / 100
      updateModelLoaded(dispatch, loadedDecimal)
    }

    Promise.all([
      loader.loadAsync('/car/new-car.gltf', updateLoader),
      loader.loadAsync('/car/new-wheel.gltf'),
    ])
      .then(models => loaded(models))
      .catch(err => {
        console.log(err)
      })
  }, [
    dispatch,
    createCarAnimation,
    createCarAnimation2,
    createCarFloor,
    carIntroAnimation,
  ])

  const setParticles = useCallback(() => {
    const count = 300,
      offsets = new Float32Array(count * 3),
      progresses = new Float32Array(count),
      opacities = new Float32Array(count),
      vertex = new THREE.Vector3()

    const instancedGeom = new THREE.InstancedBufferGeometry()

    instancedGeom.instanceCount = count

    // Set base shape
    const ribbonWidth = 0.004,
      ribbonLength = 0.5

    const positions = []

    positions.push(ribbonWidth / -2, 0, 0)
    positions.push(ribbonWidth / 2, 0, 0)
    positions.push(ribbonWidth / 2, 0, ribbonLength / -2)
    positions.push(ribbonWidth / 2, 0, ribbonLength / -2)
    positions.push(ribbonWidth / -2, 0, ribbonLength / -2)
    positions.push(ribbonWidth / -2, 0, 0)

    // Build attributes for each particle
    for (let i = 0; i < count; i++) {
      // Random x, set y and z
      vertex.x = Math.random() * 2 - 1
      vertex.y = -0.391
      vertex.z = 0
      vertex.toArray(offsets, i * 3)
      // Random progress along z axis
      progresses[i] = Math.random()
      // Random max opacity
      opacities[i] = Math.random()
    }

    // Set all attributes
    instancedGeom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )

    instancedGeom.setAttribute(
      'offset',
      new THREE.InstancedBufferAttribute(offsets, 3)
    )
    instancedGeom.setAttribute(
      'progress',
      new THREE.InstancedBufferAttribute(progresses, 1)
    )
    instancedGeom.setAttribute(
      'opacity',
      new THREE.InstancedBufferAttribute(opacities, 1)
    )

    // Create shader material
    particleMaterial.current = particleShader({
      time: 0,
      visible: 1,
      visibilityOverride: shaderVars.current.visibilityOverride,
    })

    // Create mesh
    particles.current = new THREE.Mesh(instancedGeom, particleMaterial.current)
    scene.current.add(particles.current)
  }, [])

  const setRenderer = useCallback(() => {
    renderer.current = new THREE.WebGLRenderer({
      alpha: true,
      canvas: canvas.current,
      antialias: window.devicePixelRatio > 1 ? false : true,
    })
    renderer.current.autoClear = false
    renderer.current.shadowMap.enabled = false
    renderer.current.outputEncoding = THREE.sRGBEncoding
    renderer.current.setSize(sizes.current.width, sizes.current.height)
    renderer.current.setPixelRatio(getPixelRatio())
  }, [])

  // const setPostProcess = useCallback(() => {
  //   composer.current = new THREE.EffectComposer(renderer)
  //   const renderPass = new THREE.RenderPass(scene.current, camera.current)
  //   composer.addPass(renderPass)
  // }, [])

  const setLightScene = useCallback(() => {
    scene.current.background = threeColors.current.grey
    shaderVars.current.baseModelColor = [219, 219, 219]
    shaderVars.current.softColor = [220, 220, 220]
    shaderVars.current.hardColor = [74, 74, 74]
    camera.current.position.x = 4
    camera.current.position.y = 4
    camera.current.position.z = -7
    cameraVars.current.x.target = 0

    shaderVars.current.lightBias = 1.25
    shaderVars.current.lightPos.x = 8
    shaderVars.current.lightPos.y = 8
    shaderVars.current.lightPos.z = 3.5
    shaderVars.current.lightPosOffset.x = 0
    shaderVars.current.lightIntensity = 1.3

    particleMaterial.current.uniforms.visibilityOverride.value = 1
    updateSceneSwap()
  }, [])

  const setDarkScene = useCallback(() => {
    scene.current.background = threeColors.current.dark
    shaderVars.current.baseModelColor = [0, 0, 0]
    shaderVars.current.softColor = [0, 0, 0]
    shaderVars.current.hardColor = [0, 0, 0]
    camera.current.position.x = -1.5
    camera.current.position.y = 0.5
    cameraVars.current.x.target = -1
    shaderVars.current.carTilt = 0

    shaderVars.current.lightBias = 1.4
    shaderVars.current.lightPos.x = 1
    shaderVars.current.lightPos.y = 8
    shaderVars.current.lightPos.z = -1.8
    shaderVars.current.lightPosOffset.y = 6
    shaderVars.current.lightIntensity = 0.4

    particleMaterial.current.uniforms.visibilityOverride.value = 0
    updateSceneSwap()
  }, [])

  const updateSceneSwap = () => {
    carMaterial.current.uniforms.baseModelColor.value =
      shaderVars.current.baseModelColor
    carMaterial.current.uniforms.lightBias.value = shaderVars.current.lightBias
    carMaterial.current.uniforms.lightPos.value = shaderVars.current.lightPos
    carMaterial.current.uniforms.lightIntensity.value =
      shaderVars.current.lightIntensity

    wheelMaterials.current.forEach(material => {
      material.uniforms.baseModelColor.value = new THREE.Vector3(
        ...shaderVars.current.baseModelColor
      )
      material.uniforms.lightBias.value = shaderVars.current.lightBias
      material.uniforms.lightPos.value = shaderVars.current.lightPos
      material.uniforms.lightIntensity.value = shaderVars.current.lightIntensity
    })

    floorMaterial.current.uniforms.lightPos.value = shaderVars.current.lightPos
    floorMaterial.current.uniforms.softColor.value =
      shaderVars.current.softColor
    floorMaterial.current.uniforms.hardColor.value =
      shaderVars.current.hardColor
  }

  const renderLoop = useCallback(
    time => {
      if (stats.current) stats.current.update()

      const updateScene = time => {
        if (!car.current || !carTimeline.current || !carTimeline2.current)
          return

        // Handle timeline
        if (window.scroll.scroll.instance.scroll.y <= scrollTopHeight.current) {
          // Scrub timeline 1
          carTimeline.current.progress(
            window.scroll.scroll.instance.scroll.y / scrollTopHeight.current,
            true
          )

          // Update materials
          carMaterial.current.uniforms.time.value = time
          floorMaterial.current.uniforms.time.value = time
          particleMaterial.current.uniforms.time.value = time
          wheelMaterials.current.forEach(material => {
            material.uniforms.time.value = time
          })

          // Update mouse offsets
          // Car range: -0.3 / 0.3
          panCamera.current.position.x +=
            (mouse.current.x * 0.5 - panCamera.current.position.x) *
            mouse.current.speed

          // Car tilt range: -1 / 1
          shaderVars.current.carTilt +=
            (mouse.current.x - shaderVars.current.carTilt) * mouse.current.speed

          // Light Y range: -3 / 3
          shaderVars.current.lightPosOffset.y +=
            (mouse.current.y * 3 - shaderVars.current.lightPosOffset.y) *
            mouse.current.speed

          // Light Z range: -4 / 4
          shaderVars.current.lightPosOffset.z +=
            (mouse.current.x * 4 - shaderVars.current.lightPosOffset.z) *
            mouse.current.speed

          // Clear any showroom rotation
          carWrap.current.rotation.y = 0
          floor.current.rotation.z = 0
          particles.current.rotation.y = 0
          shaderVars.current.lightAngle = 0
        } else if (
          window.scroll.scroll.instance.scroll.y >=
          window.scroll.scroll.instance.limit.y - scrollBottomHeight.current
        ) {
          // Scrub timeline 2
          carTimeline2.current.progress(
            1 -
              (window.scroll.scroll.instance.limit.y -
                window.scroll.scroll.instance.scroll.y) /
                scrollBottomHeight.current,
            true
          )

          // Light X range: 2 / -2
          shaderVars.current.lightPosOffset.x +=
            (mouse.current.x * -2 - shaderVars.current.lightPosOffset.x) *
            mouse.current.speed

          // Light Z range: 4 / -4
          shaderVars.current.lightPosOffset.z +=
            (mouse.current.x * -4 - shaderVars.current.lightPosOffset.z) *
            mouse.current.speed

          // Showroom rotation
          carWrap.current.rotation.y =
            carWrap.current.rotation.y - shaderVars.current.rotateSpeed
          floor.current.rotation.z =
            floor.current.rotation.z - shaderVars.current.rotateSpeed
          particles.current.rotation.y =
            particles.current.rotation.y - shaderVars.current.rotateSpeed
          shaderVars.current.lightAngle =
            shaderVars.current.lightAngle +
            THREE.Math.degToRad(56.25 * shaderVars.current.rotateSpeed)
        } else {
          return
        }

        // Scene swap
        if (
          window.scroll.scroll.instance.scroll.y > scrollTopHeight.current &&
          lightScene.current
        ) {
          lightScene.current = false
          setDarkScene()
        } else if (
          window.scroll.scroll.instance.scroll.y <= scrollTopHeight.current &&
          !lightScene.current
        ) {
          lightScene.current = true
          setLightScene()
        }

        // Update material speed
        // carMaterial.current.uniforms.speed.value =
        //   shaderVars.current.speed.current
        // particleMaterial.current.uniforms.speed.value =
        //   shaderVars.current.speed.current

        // Offset lighting
        carMaterial.current.uniforms.lightPosOffset.value =
          shaderVars.current.lightPosOffset
        carMaterial.current.uniforms.lightAngle.value =
          shaderVars.current.lightAngle
        floorMaterial.current.uniforms.lightPosOffset.value =
          shaderVars.current.lightPosOffset
        floorMaterial.current.uniforms.lightAngle.value =
          shaderVars.current.lightAngle

        // Update all wheel uniforms
        wheelMaterials.current.forEach(material => {
          material.uniforms.lightPosOffset.value =
            shaderVars.current.lightPosOffset
          material.uniforms.lightAngle.value = shaderVars.current.lightAngle
          material.uniforms.speed.value = shaderVars.current.speed.current
        })

        // Tilt car
        carMaterial.current.uniforms.tilt.value = shaderVars.current.carTilt
        // FL
        wheelMaterials.current[0].uniforms.tilt.value =
          shaderVars.current.carTilt
        // FR
        wheelMaterials.current[1].uniforms.tilt.value =
          shaderVars.current.carTilt

        // Camera
        camera.current.target.x =
          cameraVars.current.x.target + cameraVars.current.x.intro

        // Speed
        shaderVars.current.speed.current +=
          (shaderVars.current.speed.target - shaderVars.current.speed.current) *
          0.01
      }

      updateScene(time)
      camera.current && camera.current.lookAt(camera.current.target)
      renderer.current.render(scene.current, camera.current)
      raf.current = window.requestAnimationFrame(renderLoop.bind(this))
    },
    [setLightScene, setDarkScene]
  )

  const getPixelRatio = () => {
    return Math.min(window.devicePixelRatio, 2)
  }

  useEffect(() => {
    wrapper.current = window
    pixelRatioMatch.current =
      typeof window !== `undefined`
        ? window.matchMedia('screen and (min-resolution: 2dppx)')
        : null

    setScene()
    setSizes()
    setCamera()
    setObjects()
    setParticles()

    if (!isMobile) handleUserEvents()

    // const setDebug = () => {
    //   if (typeof document !== 'undefined') {
    //     stats.current = new Stats()
    //     debugging.current.appendChild(stats.current.dom)
    //   }
    // }

    // const setGUI = () => {
    //   const gui = new dat.GUI({ autoPlace: false, width: 360, zIndex: 1000 })
    //   const scrollGUI = gui.addFolder('Car')

    //   const updateValues = () => {
    //     // Update car material
    //     carMaterial.current.uniforms.visibilityOverride.value =
    //       shaderVars.current.visibilityOverride
    //     carMaterial.current.uniforms.baseModelColor.value = new THREE.Vector3(
    //       ...shaderVars.current.baseModelColor
    //     )
    //     carMaterial.current.uniforms.lightBias.value =
    //       shaderVars.current.lightBias
    //     carMaterial.current.uniforms.lightPos.value =
    //       shaderVars.current.lightPos
    //     carMaterial.current.uniforms.lightIntensity.value =
    //       shaderVars.current.lightIntensity

    //     // Update wheel materials
    //     wheelMaterials.current.forEach(material => {
    //       material.uniforms.visibilityOverride.value =
    //         shaderVars.current.visibilityOverride
    //       material.uniforms.baseModelColor.value = new THREE.Vector3(
    //         ...shaderVars.current.baseModelColor
    //       )
    //       material.uniforms.lightBias.value = shaderVars.current.lightBias
    //       material.uniforms.lightPos.value = shaderVars.current.lightPos
    //       material.uniforms.lightIntensity.value =
    //         shaderVars.current.lightIntensity
    //     })

    //     // Update floor material
    //     floorMaterial.current.uniforms.visibilityOverride.value =
    //       shaderVars.current.visibilityOverride
    //     floorMaterial.current.uniforms.lightPos.value =
    //       shaderVars.current.lightPos
    //     floorMaterial.current.uniforms.softColor.value =
    //       shaderVars.current.softColor
    //     floorMaterial.current.uniforms.hardColor.value =
    //       shaderVars.current.hardColor

    //     // Update particle material
    //     particleMaterial.current.uniforms.visibilityOverride.value =
    //       shaderVars.current.visibilityOverride
    //   }

    //   scrollGUI
    //     .add(shaderVars.current, 'visibilityOverride')
    //     .min(0)
    //     .max(1.0)
    //     .step(0.01)
    //     .onChange(updateValues)
    //   scrollGUI
    //     .add(shaderVars.current, 'lightBias')
    //     .min(0.4)
    //     .max(1.4)
    //     .step(0.01)
    //     .onChange(updateValues)
    //   scrollGUI
    //     .add(shaderVars.current, 'lightIntensity')
    //     .min(0)
    //     .max(2.0)
    //     .step(0.01)
    //     .onChange(updateValues)
    //   scrollGUI
    //     .add(shaderVars.current.lightPos, 'x')
    //     .min(-8.0)
    //     .max(8.0)
    //     .step(0.1)
    //     .onChange(updateValues)
    //   scrollGUI
    //     .add(shaderVars.current.lightPos, 'y')
    //     .min(-8.0)
    //     .max(8.0)
    //     .step(0.1)
    //     .onChange(updateValues)
    //   scrollGUI
    //     .add(shaderVars.current.lightPos, 'z')
    //     .min(-8.0)
    //     .max(8.0)
    //     .step(0.1)
    //     .onChange(updateValues)
    //   scrollGUI
    //     .addColor(shaderVars.current, 'baseModelColor')
    //     .onChange(updateValues)
    //   scrollGUI.addColor(shaderVars.current, 'softColor').onChange(updateValues)
    //   scrollGUI.addColor(shaderVars.current, 'hardColor').onChange(updateValues)
    //   debugging.current.appendChild(gui.domElement)
    // }

    // setDebug()
    // setGUI()

    setRenderer()
    // setPostProcess()
    raf.current = window.requestAnimationFrame(renderLoop.bind(this))

    return () => {
      // Disposal
      // Car
      car.current &&
        car.current.traverse(node => {
          if (node.isMesh) {
            node.geometry.dispose()
            node.material.dispose()
          }
        })
      // Wheels
      if (wheel.current && wheel.current.model) {
        wheel.current.model.traverse(node => {
          if (node.isMesh) {
            node.geometry.dispose()
            node.material.dispose()
          }
        })
        wheel.current.model.instances &&
          wheel.current.model.instances.forEach(instance => {
            instance.traverse(node => {
              if (node.isMesh) {
                node.geometry.dispose()
                node.material.dispose()
              }
            })
          })
      }
      // Floor
      floor.current && floor.current.geometry.dispose()
      floor.current && floor.current.material.dispose()
      renderer.current && renderer.current.dispose()
      wrapper.current &&
        wrapper.current.removeEventListener('pointermove', onPointerMove)
      // Particles
      particles.current && particles.current.geometry.dispose()
      particles.current && particles.current.material.dispose()

      // Animation frames and events
      raf.current && window.cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resizeHandler)

      try {
        pixelRatioMatch.current.removeEventListener('change', resizeHandler)
      } catch (error) {
        try {
          pixelRatioMatch.current.removeListener(resizeHandler)
        } catch (secondaryError) {
          console.error(secondaryError)
        }
      }
    }
  }, [
    handleUserEvents,
    onPointerMove,
    renderLoop,
    resizeHandler,
    setObjects,
    setParticles,
    setRenderer,
    // setPostProcess,
    setScene,
    setSizes,
    setCamera,
  ])

  useEffect(() => {
    if (shaderVars.current) shaderVars.current.speed.target = fast ? 2 : 1
  }, [fast])

  return (
    <>
      {/* <SceneDebug ref={debugging} /> */}
      <SceneWrapper ref={wrapper} zIndex={zIndex} mobile={isMobile}>
        <SceneCanvas ref={canvas} />
      </SceneWrapper>
    </>
  )
}

Car.propTypes = {
  useWindow: PropTypes.bool,
  zIndex: PropTypes.number,
}

Car.defaultProps = {
  useWindow: true,
  zIndex: 1,
}

export default Car
