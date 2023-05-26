import { useEffect } from 'react'
import { updateScroll, useStore } from '../../Store'
// We are excluding this from loading at build time in gatsby-node.js
import LocomotiveScroll from 'locomotive-scroll'
import { animation } from '../../styles/vars/animation.style'

const SmoothScroll = ({ callbacks, desktop }) => {
  const [, dispatch] = useStore()

  useEffect(() => {
    window.scroll = new LocomotiveScroll({
      el: document.getElementById('scroll-container'),
      smooth: true,
      smartphone: {
        smooth: false,
      },
      direction: 'vertical',
      getDirection: true,
      touchMultiplier: 2.5,
      firefoxMultiplier: 70,
      lerp: 0.1,
      repeat: false,
      class: 'is-inview',
      reloadOnContextChange: true,
    })

    updateScroll(dispatch, window.scroll)

    const timeout = setTimeout(() => {
      window.scroll.update()
    }, animation.maskHideDuration * 1000)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }

      if (window.scroll) {
        window.scroll.destroy()
        updateScroll(dispatch, null)
      }
    }
  }, [callbacks.pathname, dispatch, desktop])

  return null
}

export default SmoothScroll
