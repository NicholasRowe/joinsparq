import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { AccordionContent, AccordionMain } from './index.style'

/**
 * @param {func} callback must be a memoized function using useCallback
 */

const Accordion = ({ open, callback, children }) => {
  const $wrapper = useRef()
  const $content = useRef()
  const tl = useRef()

  useEffect(() => {
    const updateWrapperHeight = debounce(() => {
      const wrapperHeight = parseInt($wrapper.current.style.height, 10)

      if (wrapperHeight > 0) {
        gsap.set($wrapper.current, { height: $content.current.scrollHeight })
      }
    }, 200)

    tl.current = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.3,
        ease: 'power2.inOut',
      },
      onComplete: () => {
        window.scroll?.update()

        if (callback) {
          callback()
        }
      },
    })

    window.addEventListener('resize', updateWrapperHeight)

    return () => {
      tl.current.kill()
      window.removeEventListener('resize', updateWrapperHeight)
    }
  }, [callback])

  useEffect(() => {
    tl.current
      .to($wrapper.current, {
        height: open ? $content.current.scrollHeight : 0,
      })
      .to(
        $content.current,
        {
          opacity: open ? 1 : 0,
        },
        open ? '<0.2' : '<'
      )
    tl.current.play()
  }, [open])

  return (
    <AccordionMain ref={$wrapper}>
      <AccordionContent ref={$content} aria-hidden={!open}>
        {children}
      </AccordionContent>
    </AccordionMain>
  )
}

Accordion.propTypes = {
  open: PropTypes.bool,
  callback: PropTypes.func,
  children: PropTypes.node,
}

export default Accordion
