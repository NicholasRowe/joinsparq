import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import * as THREE from 'three'
import { isMobile } from 'react-device-detect'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ResourceTracker from './ResourceTracker'
import { SceneCanvas, SceneWrapper } from './index.style'

const dat = typeof window !== 'undefined' ? require('dat.gui') : null

const WebGL = ({ debug, useWindow, zIndex }) => {
  // DOM refs
  const wrapper = useRef(),
    canvas = useRef()

  // WebGL refs
  const renderer = useRef(),
    scene = useRef(),
    controls = useRef(),
    camera = useRef(),
    stats = useRef()

  // Lighting
  const ambientLight = useRef(),
    directionalLight = useRef()

  // Objects
  const cube = useRef()

  // Animation refs
  const raf = useRef()

  // Window refs
  const pixelRatioMatch = useRef()

  // Sizing refs
  const sizes = useRef()

  // Memory Tracking
  const resTracker = useMemo(() => new ResourceTracker(), []),
    resTrack = resTracker.track.bind(resTracker)

  const mouse = useRef({
    x: 0,
    y: 0,
    scale: 0.3,
    speed: 0.1,
  })

  const setScene = useCallback(() => {
    scene.current = new THREE.Scene()

    if (debug) {
      scene.current.add(new THREE.AxesHelper())
    }
  }, [debug])

  const updateScene = time => {
    cube.current.rotation.x = time * 0.001
    cube.current.rotation.y = time * 0.001

    cube.current.position.x +=
      (-mouse.current.x * mouse.current.scale - cube.current.position.x) *
      mouse.current.speed

    cube.current.position.y +=
      (mouse.current.y * mouse.current.scale - cube.current.position.y) *
      mouse.current.speed
  }

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
  }, [])

  const setSizes = useCallback(() => {
    sizes.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

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

  const setCamera = () => {
    camera.current = new THREE.PerspectiveCamera(
      75,
      sizes.current.width / sizes.current.height,
      0.1,
      30
    )
    camera.current.position.x = 0
    camera.current.position.y = 0
    camera.current.position.z = 4
    scene.current.add(camera.current)
  }

  const setControls = () => {
    controls.current = new OrbitControls(camera.current, canvas.current)
    controls.current.enableDamping = true
    controls.current.dampingFactor = 0.05
  }

  const setLights = () => {
    ambientLight.current = new THREE.AmbientLight()
    ambientLight.current.color = new THREE.Color(0xffffff)
    ambientLight.current.intensity = 1
    scene.current.add(ambientLight.current)

    directionalLight.current = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.current.position.set(0, 3, 3)
    scene.current.add(directionalLight.current)
  }

  const setObjects = () => {
    const geometry = resTrack(new THREE.BoxBufferGeometry(1, 1, 1))
    const material = resTrack(new THREE.MeshPhongMaterial({ color: 0x44aa88 }))
    cube.current = resTrack(new THREE.Mesh(geometry, material))
    scene.current.add(cube.current)
  }

  const setStats = () => {
    if (typeof document !== 'undefined') {
      stats.current = new Stats()
      document.body.appendChild(stats.current.dom)
    }
  }

  const setRenderer = useCallback(() => {
    renderer.current = new THREE.WebGLRenderer({
      alpha: true,
      canvas: canvas.current,
      antialias: window.devicePixelRatio > 1 ? false : true,
    })
    renderer.current.autoClear = false
    renderer.current.setSize(sizes.current.width, sizes.current.height)
    renderer.current.setPixelRatio(getPixelRatio())
  }, [])

  const renderLoop = useCallback(time => {
    if (stats.current) stats.current.update()

    updateScene(time)
    controls.current.update()
    renderer.current.render(scene.current, camera.current)
    raf.current = window.requestAnimationFrame(renderLoop.bind(this))
  }, [])

  const getPixelRatio = () => {
    return Math.min(window.devicePixelRatio, 2)
  }

  const setGUI = () => {
    const gui = new dat.GUI({ width: 360, zIndex: 1000 })
    const mouseGUI = gui.addFolder('Mouse movement')

    mouseGUI.add(mouse.current, 'scale').min(0.005).max(0.5).step(0.001)
    mouseGUI.add(mouse.current, 'speed').min(0.005).max(0.5).step(0.001)
    mouseGUI.open()
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
    setControls()
    setLights()
    setObjects()

    if (!isMobile) handleUserEvents()

    if (debug) {
      setStats()
      if (dat) setGUI()
    }

    setRenderer()
    raf.current = window.requestAnimationFrame(renderLoop.bind(this))

    return () => {
      resTracker.dispose()
      renderer.current && renderer.current.dispose()
      controls.current && controls.current.dispose()
      wrapper.current &&
        wrapper.current.removeEventListener('pointermove', onPointerMove)

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
    debug,
    handleUserEvents,
    onPointerMove,
    renderLoop,
    resTracker,
    resizeHandler,
    setObjects,
    setRenderer,
    setScene,
    setSizes,
  ])

  return (
    <SceneWrapper ref={wrapper} zIndex={zIndex}>
      <SceneCanvas ref={canvas} />
    </SceneWrapper>
  )
}

WebGL.propTypes = {
  useWindow: PropTypes.bool,
  debug: PropTypes.bool,
  zIndex: PropTypes.number,
}

WebGL.defaultProps = {
  useWindow: true,
  debug: false,
  zIndex: 1,
}

export default WebGL
