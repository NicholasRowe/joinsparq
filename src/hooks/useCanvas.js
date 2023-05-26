import { useRef, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

const useCanvas = () => {
  const canvas = useRef(null)
  const ctx = useRef(null)
  const [canvasDimensions, setCanvasDimensions] = useState(null)

  useEffect(() => {
    ctx.current = canvas.current.getContext('2d')

    const setSizes = debounce(() => {
      const { width, height } = canvas.current.getBoundingClientRect()

      if (canvas.current.width !== width || canvas.current.height !== height) {
        const { devicePixelRatio = 1 } = window

        canvas.current.width = width * devicePixelRatio
        canvas.current.height = height * devicePixelRatio
        ctx.current.scale(devicePixelRatio, devicePixelRatio)

        setCanvasDimensions([width, height])
      }
    }, 300)

    setSizes()

    window.addEventListener('resize', setSizes)

    return () => {
      window.removeEventListener('resize', setSizes)
    }
  }, [])

  return {
    $canvas: canvas,
    ctx: ctx.current,
    canvasDimensions,
  }
}

export default useCanvas
