import React, { useRef, useEffect, useContext, useCallback } from 'react'
import { GlDomDispatch } from '../../Store/glDom'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import * as THREE from 'three'
import { isMobile } from 'react-device-detect'
import Stats from 'three/examples/jsm/libs/stats.module'
import { colors } from '../../styles/vars/colors.style'
import { SceneDebug, SceneCanvas } from './index.style'

const dat = typeof window !== 'undefined' ? require('dat.gui') : null

const postProcessingMaterial = ({ pageTexture }) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      pageTexture: { type: 't', value: pageTexture },
    },

    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,

    fragmentShader: `
      uniform sampler2D pageTexture;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        vec4 scene = texture(pageTexture, uv);
        gl_FragColor = vec4(scene.r, scene.g, scene.b, scene.a);
      }
    `,
  })
}

const imageMaterial = ({
  imageTexture,
  imageScale,
  imageMinScale,
  imageYOffset,
  clippingPlanes,
  imageAspectRatio,
}) => {
  return new THREE.ShaderMaterial({
    clipping: true,
    clippingPlanes: clippingPlanes ? clippingPlanes : null,
    uniforms: {
      imageTexture: { type: 't', value: imageTexture },
      imageScale: { value: imageScale },
      imageMinScale: { value: imageMinScale },
      imageYOffset: { value: imageYOffset },
      imageAspectRatio: { value: imageAspectRatio },
    },

    vertexShader: `
      varying vec2 vUv;

      #include <clipping_planes_pars_vertex>

      void main() {
        #include <begin_vertex>

        vUv = uv;
        vec4 base = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = base;

        #include <project_vertex>
        #include <clipping_planes_vertex>
      }
    `,

    fragmentShader: `
      #define PI 3.14159265359

      uniform sampler2D imageTexture;
      uniform float imageScale;
      uniform float imageMinScale;
      uniform float imageYOffset;
      uniform float imageAspectRatio;
      uniform float planeAspectRatio;
      varying vec2 vUv;

      #include <clipping_planes_pars_fragment>

      // https://www.wolframalpha.com/input/?i=plot+%28cos%28pi*x%29+%2B+1%29+%2F+2+for+x+in+%280%2C1%29
      float easeInOut(float _x){
        return (cos(PI * _x) + 1.0) / 2.0;
      }

      vec2 scale(vec2 _p, float _s){
        _s = 1.0 - easeInOut(_s - 1.0) + 1.0;
        _p -= vec2(0.5);
        _p = _p / _s;
        _p += vec2(0.5);
        return vec2(_p.x,_p.y);
      }

      void main() {
        #include <clipping_planes_fragment>

        float imagePlaneRatio = imageAspectRatio / planeAspectRatio;

        vec2 uv = vUv;
        vec2 textureScale;

        if (imagePlaneRatio > 1.0) { // Portrait
          // textureScale = vec2(1.0, planeAspectRatio);
          textureScale = vec2(1.0, 0.5);
        } else { // Landscape
          textureScale = vec2(1.0 / planeAspectRatio, 1.0);
        }
        
        uv = textureScale * (uv - 0.5) + 0.5;
        
        uv = clamp(uv, 0., 1.);
        uv = vec2(uv[0], uv[1] - imageYOffset);
        uv = scale(uv, min(max(imageScale, imageMinScale), 2.0));

        vec4 img = texture(imageTexture, vec2(uv[0], uv[1]));
        gl_FragColor = vec4(img.r, img.g, img.b, img.a);
      }
    `,
  })
}

const blockColorMaterial = ({ blockColorColor }) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      blockColorColor: { value: blockColorColor },
    },

    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec4 base = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position = base;
      }
    `,

    fragmentShader: `
      uniform vec3 blockColorColor;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;

        uv = clamp(uv, 0., 1.);
        // uv = vec2(uv[0], uv[1] - imageYOffset);

        vec4 color = vec4(blockColorColor.rgb, 1.0);
        gl_FragColor = vec4(color.r, color.g, color.b, color.a);
      }
    `,
  })
}

const WebGLDom = ({ debug }) => {
  // Scroll options
  const scrollEffects = useRef({
    buildOnPos: 0.1, // The distance from the bottom that build ons should trigger (0 = bottom, 1 = top)
    cardParallax: 0, // The amount the images will move vertically
    imageParallax: 0.2, // The amount the image will vertically mask in shader units (1.0 = full height of image)
    scale: true, // Scale images as they enter?
  })

  // Context
  const dispatch = useContext(GlDomDispatch)

  // DOM refs
  const debugging = useRef(),
    canvas = useRef()

  // WebGL refs
  const renderer = useRef(),
    scene = useRef(),
    bufferScene = useRef(),
    camera = useRef(),
    stats = useRef()

  // WebGL buffer
  const bufferTexture = useRef(),
    bufferMaterial = useRef(),
    bufferPlane = useRef()

  // Objects
  const elements = useRef([])

  // Animation refs
  const raf = useRef(),
    startTime = useRef(),
    runTime = useRef()

  // Window refs
  const pixelRatioMatch = useRef()

  // Sizing refs
  const sizes = useRef(),
    viewSize = useRef()

  // Memory tracking
  const resources = useRef([]),
    timeouts = useRef([])

  // Interaction tracking
  const mouse = useRef({
    x: 0,
    y: 0,
    scale: 0.3,
    speed: 0.1,
  })

  // Conversion functions
  const convertSizeToShaderUnits = el => {
    return {
      width: (el.offsetWidth / window.innerWidth) * viewSize.current.width,
      height: (el.offsetHeight / window.innerHeight) * viewSize.current.height,
    }
  }

  const convertPositionToShaderUnits = (el, geoSize, borderRadius) => {
    const box = el.getBoundingClientRect()

    return {
      x:
        (box.left / window.innerWidth) * viewSize.current.width -
        viewSize.current.width / 2 +
        (borderRadius ? 0 : geoSize.width / 2),
      y:
        viewSize.current.height -
        ((box.top + window.scroll.scroll.instance.scroll.y) /
          window.innerHeight) *
          viewSize.current.height -
        viewSize.current.height / 2 -
        (borderRadius ? geoSize.height : geoSize.height / 2),
    }
  }

  const convertScrollToShaderUnits = useCallback(scroll => {
    return (scroll / window.innerHeight) * viewSize.current.height
  }, [])

  // Utils
  // Find the device pixel ratio
  const getPixelRatio = () => {
    return Math.min(window.devicePixelRatio, 1.5)
  }

  // Hash function to ensure Three.js groups are unique
  const hashCode = s => {
    let h = 0,
      l = s.length,
      i = 0

    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0
    return Math.abs(h)
  }

  // Resize
  const resizeElement = useCallback(element => {
    element.geoSize = convertSizeToShaderUnits(element.el)
    element.position = convertPositionToShaderUnits(
      element.el,
      element.geoSize,
      element.borderRadius
    )

    if (element.animateIn && !element.animating) {
      element.clipPosition = {
        start: element.borderRadius ? 0 : element.geoSize.height / 2,
        current: element.borderRadius ? 0 : element.geoSize.height / 2,
        // Add 0.005 extra to the end pos to avoid any clipping if the mask is removed while scrolling
        end: element.geoSize.height / (element.borderRadius ? -1 : -2) - 0.005,
        triggerOffset: element.borderRadius
          ? 0.5 + element.geoSize.height - scrollEffects.current.buildOnPos
          : 0.5 + element.geoSize.height / 2 - scrollEffects.current.buildOnPos,
      }
    }

    if (
      element.plane.material.uniforms &&
      element.plane.material.uniforms.aspectRatio
    ) {
      element.plane.material.uniforms.aspectRatio.value =
        element.el.offsetWidth / element.el.offsetHeight
    }

    element.plane.scale.set(
      element.geoSize.width || 0.00001,
      element.geoSize.height || 0.00001,
      1
    )
  }, [])

  const resizeElements = useCallback(() => {
    elements.current.forEach(element => resizeElement(element))
  }, [resizeElement])

  // Handle Imagery
  const createInWebGL = useCallback((el, scene) => {
    el.plane.name = el.id
    const group = new THREE.Object3D()
    group.name = el.id
    el.group = group
    group.add(el.plane)
    scene.add(group)

    return el
  }, [])

  const createRoundedPlane = ({ radius }) => {
    const shape = new THREE.Shape()
    shape.moveTo(0, radius.bottom ? radius.y : 0)
    shape.lineTo(0, 1 - (radius.top ? radius.y : 0))
    shape.quadraticCurveTo(0, 1, radius.top ? radius.x : 0, 1)
    shape.lineTo(1 - (radius.top ? radius.x : 0), 1)
    shape.quadraticCurveTo(1, 1, 1, 1 - (radius.top ? radius.y : 0))
    shape.lineTo(1, radius.bottom ? radius.y : 0)
    shape.quadraticCurveTo(1, 0, 1 - (radius.bottom ? radius.x : 0), 0)
    shape.lineTo(radius.bottom ? radius.x : 0, 0)
    shape.quadraticCurveTo(0, 0, 0, radius.bottom ? radius.y : 0)
    return new THREE.ShapeGeometry(shape)
  }

  const handleImage = useCallback(
    ({
      image,
      animateIn,
      borderRadius,
      borderRadiusTop,
      borderRadiusBottom,
    }) => {
      let _image = {
        el: image,
        temptitle: image.alt,
        id: hashCode(`${image.src}_${Math.random()}`),
        animateIn: animateIn,
        animating: false,
        borderRadius: borderRadius,
        visible: !animateIn,
      }

      // Load the texture
      let loader = new THREE.TextureLoader()

      loader.crossOrigin = '*'

      loader.load(_image.el.src, imageBitmap => {
        let texture = imageBitmap
        texture.minFilter = THREE.LinearFilter

        // Create geometry
        let geometry

        if (borderRadius) {
          // If this image needs a border radius use a custom shape geometry
          geometry = createRoundedPlane({
            radius: {
              bottom: borderRadiusBottom,
              top: borderRadiusTop,
              x: borderRadius / _image.el.offsetWidth,
              y: borderRadius / _image.el.offsetHeight,
            },
          })
        } else {
          // If not, use a plane
          geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
        }

        // Create material
        let material = imageMaterial({
          imageTexture: texture,
          imageScale: 0,
          imageMinScale: 1 + scrollEffects.current.imageParallax,
          imageYOffset: 0,
          planeAspectRatio: 1,
          imageAspectRatio: texture.image.height / texture.image.width,
        })

        resources.current = [...resources.current, geometry, material]

        let clipPlane, clipPlaneGeometry, clipPlaneMesh

        // If this image needs to animate in add clipping
        if (animateIn) {
          // Create a mesh which our clipping mask will sync positions with
          clipPlaneGeometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
          clipPlaneMesh = new THREE.Mesh(clipPlaneGeometry)
          // Rotate the mesh to be on the X axis so that it clips on the Y axis
          const quaternion = new THREE.Quaternion()
          quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI)
          clipPlaneMesh.applyQuaternion(quaternion)
          // Create a plane
          clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0.1)
          // Set the plane as the clipping plane
          material.clippingPlanes = [clipPlane]
          // Set the mesh as the clipping mesh
          material.clippingPlaneMesh = clipPlaneMesh

          resources.current = [...resources.current, clipPlaneGeometry]
        }

        // Create Mesh
        const plane = new THREE.Mesh(geometry, material)

        // Performance hack
        // For one frame we need to render the mesh then cull it.
        // This means the mesh is not rendered until it is visible
        // This helps with perf, but requires at least one frame.
        plane.frustumCulled = false
        requestAnimationFrame(() => {
          plane.frustumCulled = true
        })

        // Update the _image object
        _image.texture = texture
        _image.material = material
        _image.plane = plane
        // Add to the scene
        _image = createInWebGL(_image, bufferScene.current)

        // Store elements
        elements.current = [...elements.current, _image]

        // Trigger resize as page positions may have changed as image loads
        resizeElements()
      })
    },
    [createInWebGL, resizeElements]
  )

  const handleBlockColor = useCallback(
    (block, color) => {
      let _block = {
        el: block,
        id: hashCode(`blockColor_${Math.random()}`),
      }

      // Create geometry
      let geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)

      // Create material
      let material = blockColorMaterial({
        blockColorColor: new THREE.Color(color),
      })

      resources.current = [...resources.current, geometry, material]

      // Create Mesh
      const plane = new THREE.Mesh(geometry, material)

      // This is a hack for performance.
      // For one frame we need to render the mesh then cull it.
      // This means the mesh is not rendered until it is visible
      // This helps with perf, but requires at least one frame.
      plane.frustumCulled = false
      requestAnimationFrame(() => {
        plane.frustumCulled = true
      })

      // Update the _block object
      _block.material = material
      _block.plane = plane

      // Add to the scene
      _block = createInWebGL(_block, bufferScene.current)

      // Store elements
      elements.current = [...elements.current, _block]

      // Trigger resize to get positions
      resizeElement(_block)
    },
    [createInWebGL, resizeElement]
  )

  // Events
  const onPointerMove = event => {
    if (event.isPrimary === false) return

    const xMin = 0,
      xMax = window.innerWidth,
      yMin = 0,
      yMax = window.innerHeight

    mouse.current.x = gsap.utils.normalize(xMin, xMax, event.clientX) * 2 - 1
    mouse.current.y = gsap.utils.normalize(yMin, yMax, event.clientY) * 2 - 1
  }

  // Animation loop
  const maskIn = useCallback(element => {
    gsap.to(element.clipPosition, {
      current: element.clipPosition.end,
      duration: 2,
      ease: 'power1.out',
      onStart: () => (element.animating = true),
      onComplete: () => {
        // Needs extra delay to account for effects like parallax catching up
        const wait = setTimeout(() => {
          if (element) element.visible = true
          if (element?.material) element.material.clippingPlanes = null
        }, 2000)
        timeouts.current = [...timeouts.current, wait]
      },
    })
  }, [])

  const updateElements = useCallback(
    scroll => {
      const currentScroll = convertScrollToShaderUnits(
        scroll ? scroll : window.scroll.scroll.instance.scroll.y
      )

      elements.current.forEach((element, index) => {
        // Update plane position
        element.plane.position.x = element.position.x
        element.plane.position.y =
          (element.position.y + currentScroll) *
          (1 + scrollEffects.current.cardParallax)

        // Only update the clipping plane if it exists
        // and if the element hasn't already finished building on
        if (element.material.clippingPlanes && !element.visible) {
          // Update the mesh that the clipping plane follows
          element.material.clippingPlaneMesh.position.y =
            element.plane.position.y - element.clipPosition.current

          // Build on if the position plus the trigger offset is more than 0 and the animation loop is older than 500ms
          if (
            element.plane.position.y + element.clipPosition.triggerOffset > 0 &&
            runTime.current > 500
          )
            maskIn(element)

          const normal = new THREE.Vector3(),
            point = new THREE.Vector3()

          // Update the new normal and point vectors so that they match the
          // quaternion of the mesh that the clipping mask follows
          normal
            .set(0, 1, 0)
            .applyQuaternion(element.material.clippingPlaneMesh.quaternion)
          point.copy(element.material.clippingPlaneMesh.position)

          // Apply the vectors so that the clipping mask position updates
          element.material.clippingPlanes[0].setFromNormalAndCoplanarPoint(
            normal,
            point
          )
        }

        // Update parallax if this is an image
        if (element.material.uniforms.imageYOffset) {
          element.material.uniforms.imageYOffset.value =
            element.plane.position.y *
            (scrollEffects.current.imageParallax * -1)
        }

        element.material.uniforms.planeAspectRatio =
          element.geoSize.height / element.geoSize.width

        // Update scale if set and if this is an image
        if (
          scrollEffects.current.scale &&
          element.material.uniforms.imageScale
        ) {
          element.material.uniforms.imageScale.value =
            (element.plane.position.y - 1.0) * -1.0
        }

        // if (index === 0) console.log(element.material.uniforms.planeAspectRatio)
      })
    },
    [convertScrollToShaderUnits, maskIn]
  )

  const updateScene = useCallback(() => {
    renderer.current.setRenderTarget(bufferTexture.current)
    renderer.current.render(bufferScene.current, camera.current)
    bufferMaterial.current.uniforms.pageTexture.value =
      bufferTexture.current.texture
    renderer.current.setRenderTarget(null)

    // render final scene
    renderer.current.render(scene.current, camera.current)
  }, [])

  const renderLoop = useCallback(
    timestamp => {
      if (!startTime.current) {
        startTime.current = timestamp
      }
      runTime.current = timestamp - startTime.current
      if (stats.current) stats.current.update()
      updateElements()
      updateScene()
      raf.current = window.requestAnimationFrame(renderLoop)
    },
    [startTime, runTime, updateElements, updateScene]
  )

  // Begin
  useEffect(() => {
    pixelRatioMatch.current =
      typeof window !== `undefined`
        ? window.matchMedia('screen and (min-resolution: 2dppx)')
        : null

    // Setup functions
    const setScenes = () => {
      scene.current = new THREE.Scene()
      scene.current.background = new THREE.Color(colors.grey)

      if (debug) {
        scene.current.add(new THREE.AxesHelper())
      }

      bufferScene.current = new THREE.Scene()
      bufferScene.current.background = new THREE.Color(colors.grey)
    }

    const setSizes = () => {
      sizes.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      viewSize.current = {
        height: 1,
        width: 1,
      }
    }

    const setBuffer = () => {
      bufferTexture.current = new THREE.WebGLRenderTarget(
        sizes.current.width,
        sizes.current.height,
        { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter }
      )

      let bufferGeometry = new THREE.PlaneBufferGeometry(1, 1)
      bufferMaterial.current = postProcessingMaterial({
        pageTexture: bufferTexture.current,
      })

      resources.current = [
        ...resources.current,
        bufferGeometry,
        bufferMaterial.current,
      ]

      bufferPlane.current = new THREE.Mesh(
        bufferGeometry,
        bufferMaterial.current
      )
      bufferPlane.current.scale.set(1, 1, 1)
      bufferPlane.current.material.needsUpdate = true

      scene.current.add(bufferPlane.current)
    }

    const setCamera = () => {
      camera.current = new THREE.OrthographicCamera(
        -viewSize.current.width / 2,
        viewSize.current.width / 2,
        viewSize.current.height / 2,
        -viewSize.current.height / 2,
        -100,
        100
      )
      scene.current.add(camera.current)
    }

    setScenes()
    setSizes()
    setBuffer()
    setCamera()

    if (!isMobile) window.addEventListener('pointermove', onPointerMove)

    const setDebug = () => {
      if (typeof document !== 'undefined') {
        stats.current = new Stats()
        debugging.current.appendChild(stats.current.dom)
      }
    }

    const setGUI = () => {
      const gui = new dat.GUI({ autoPlace: false, width: 360, zIndex: 1000 })
      const scrollGUI = gui.addFolder('Scroll Effects')
      scrollGUI
        .add(scrollEffects.current, 'cardParallax')
        .min(0)
        .max(0.5)
        .step(0.05)
      scrollGUI
        .add(scrollEffects.current, 'imageParallax')
        .min(0)
        .max(0.5)
        .step(0.05)
        .onChange(value => {
          const minScale = 1 + value
          elements.current.forEach((element, index) => {
            // Update minimum scale of images to allow for parallax
            if (element.material.uniforms.imageMinScale) {
              element.material.uniforms.imageMinScale.value = minScale
            }
          })
        })
      scrollGUI.add(scrollEffects.current, 'scale')
      debugging.current.appendChild(gui.domElement)
    }

    if (debug) {
      setDebug()
      if (dat) setGUI()
    }

    const resizeHandler = () => {
      // Update sizes
      sizes.current.width = window.innerWidth
      sizes.current.height = window.innerHeight

      // Update camera
      camera.current.left = -viewSize.current.width / 2
      camera.current.right = viewSize.current.width / 2
      camera.current.top = viewSize.current.height / 2
      camera.current.bottom = -viewSize.current.height / 2
      camera.current.updateProjectionMatrix()

      // Update Elements
      resizeElements()

      // Buffer texture
      bufferTexture.current.setSize(sizes.current.width, sizes.current.height)

      // Buffer Plane
      bufferPlane.current.scale.set(
        viewSize.current.width,
        viewSize.current.height,
        1
      )

      // Update renderer
      renderer.current.setSize(sizes.current.width, sizes.current.height)
      renderer.current.setPixelRatio(getPixelRatio())
    }

    const setResize = () => {
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
    }

    setResize()

    const setRenderer = () => {
      renderer.current = new THREE.WebGLRenderer({
        canvas: canvas.current,
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        precision: 'highp',
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: true,
      })
      renderer.current.autoClear = true
      renderer.current.localClippingEnabled = true
      renderer.current.setSize(sizes.current.width, sizes.current.height)
      renderer.current.setPixelRatio(getPixelRatio())
    }

    setRenderer()

    raf.current = window.requestAnimationFrame(renderLoop)

    return () => {
      // Dispose of any timeouts
      timeouts.current.forEach(timeout => {
        clearTimeout(timeout)
      })
      // Dispose of resources
      resources.current.forEach(resource => {
        resource.dispose()
      })
      renderer.current && renderer.current.dispose()
      window && window.removeEventListener('pointermove', onPointerMove)

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
  }, [debug, renderLoop, resizeElements])

  useEffect(() => {
    handleImage &&
      dispatch({ type: 'UPDATE_HANDLE_IMAGE', payload: handleImage })
  }, [dispatch, handleImage])

  useEffect(() => {
    handleBlockColor &&
      dispatch({ type: 'UPDATE_HANDLE_BLOCK_COLOR', payload: handleBlockColor })
  }, [dispatch, handleBlockColor])

  return (
    <>
      <SceneDebug ref={debugging} />
      <SceneCanvas ref={canvas} />
    </>
  )
}

WebGLDom.propTypes = {
  debug: PropTypes.bool,
}

WebGLDom.defaultProps = {
  debug: true,
}

export default WebGLDom
