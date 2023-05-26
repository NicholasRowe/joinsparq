import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { useStore } from '@Store/'
import { AnimateImageMain, AnimateImagePosition } from './index.style'

const AnimateImage = ({
  children,
  delay = 0,
  offset = 0,
  size = 'small',
  scaleIn = true,
  triggerOnce = true,
  animate = true,
}) => {
  const [ref, inView] = useInView({
    rootMargin: `0px 0px -${offset}% 0px`,
    triggerOnce: triggerOnce,
  })
  const [store] = useStore()
  const { showPageMask } = store

  return (
    <AnimateImageMain ref={ref}>
      <AnimateImagePosition
        show={inView && animate && !showPageMask}
        delay={delay}
        size={size}
        scaleIn={scaleIn}
      >
        {children}
      </AnimateImagePosition>
    </AnimateImageMain>
  )
}

AnimateImage.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  offset: PropTypes.number,
  triggerOnce: PropTypes.bool,
  animate: PropTypes.bool,
  scaleIn: PropTypes.bool,
}

export default AnimateImage
