import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { useStore } from '@Store/'
import { FadeInWrapper } from './index.style'

const AnimateFadeIn = ({
  delay = 0,
  triggerOnce = true,
  animate = true,
  children,
}) => {
  const [ref, inView] = useInView({ triggerOnce })
  const [store] = useStore()
  const { showPageMask } = store

  return (
    <FadeInWrapper
      ref={ref}
      inView={inView && animate && !showPageMask}
      delay={delay}
    >
      {children}
    </FadeInWrapper>
  )
}

AnimateFadeIn.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  triggerOnce: PropTypes.bool,
  animate: PropTypes.bool,
}

export default AnimateFadeIn
