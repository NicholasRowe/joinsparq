import React from 'react'
import PropTypes from 'prop-types'
import { useStore } from '@Store/'
import { useInView } from 'react-intersection-observer'
import { AnimateSlideInWrap, AnimateSlideInContent } from './index.style'

const AnimateSlideIn = ({
  direction = 'bottom',
  duration = 1,
  delay = 0,
  triggerOnce = true,
  animate = true,
  animateOut = false,
  block = false,
  children,
}) => {
  const [ref, inView] = useInView({ triggerOnce })
  const [store] = useStore()
  const { showPageMask } = store

  return (
    <AnimateSlideInWrap ref={ref} block={block}>
      <AnimateSlideInContent
        inView={inView && animate && !showPageMask}
        animateOut={animateOut}
        direction={direction}
        duration={duration}
        delay={delay}
      >
        {children}
      </AnimateSlideInContent>
    </AnimateSlideInWrap>
  )
}

AnimateSlideIn.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  triggerOnce: PropTypes.bool,
  animate: PropTypes.bool,
  block: PropTypes.bool,
  direction: PropTypes.oneOf(['top', 'right', 'left', 'bottom']),
}

export default AnimateSlideIn
