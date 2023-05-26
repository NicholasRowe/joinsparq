import { useState, useEffect, useCallback } from 'react'
import { isMobile } from 'react-device-detect'

const useMousePosition = (decimal = false) => {
  const [position, setPosition] = useState({
    x: decimal ? 0.5 : 0,
    y: decimal ? 0.5 : 0,
  })
  const [wSize, setWSize] = useState({ w: 0, h: 0 })

  const setViewportHeight = useCallback(() => {
    setWSize({ w: window.innerWidth, h: window.innerHeight })
  }, [setWSize])

  useEffect(() => {
    if (isMobile) return

    const updatePosition = e => {
      setPosition(
        decimal
          ? { x: e.clientX / wSize.w, y: e.clientY / wSize.h }
          : { x: e.clientX, y: e.clientY }
      )
    }

    window.addEventListener('mousemove', updatePosition)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
    }
  }, [decimal, wSize])

  useEffect(() => {
    if (isMobile) return

    setViewportHeight()

    window.addEventListener('resize', setViewportHeight)

    return () => {
      window.removeEventListener('resize', setViewportHeight)
    }
  }, [setViewportHeight])

  return position
}

export default useMousePosition
