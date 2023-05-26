import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { useStore } from '@Store/'
import { AnimateCardMain } from './index.style'

const AnimateCard = ({
  children,
  delay = 0,
  triggerOnce = true,
  animate = true,
}) => {
  const [ref, inView] = useInView({ triggerOnce })
  const [store] = useStore()
  const { showPageMask } = store

  return (
    <AnimateCardMain
      ref={ref}
      inView={inView && animate && !showPageMask}
      delay={delay}
    >
      {children}
    </AnimateCardMain>
  )
}

AnimateCard.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  triggerOnce: PropTypes.bool,
  animate: PropTypes.bool,
}

export default AnimateCard
