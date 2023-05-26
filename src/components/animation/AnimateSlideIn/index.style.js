import styled from 'styled-components'
import { easings } from '@styles/vars/easings.style'
import { animation } from '@styles/vars/animation.style'

export const AnimateSlideInWrap = styled.div`
  display: ${props => (props.block ? `block` : `inline-block`)};
  line-height: ${props => (props.block ? `0` : `initial`)};
  perspective: 1000px;
  position: relative;
`

const BaseAnimateSlideInContent = styled.span`
  display: inline-block;
  transition-property: opacity, transform;
  transition-timing-function: ${easings.inOut.default};
  width: 100%;
`

export const AnimateSlideInContent = styled(BaseAnimateSlideInContent).attrs(
  props => {
    return {
      style: {
        transitionDuration: `${props.duration}s`,
        transitionDelay: `${
          props.inView
            ? props.delay
            : props.animateOut
            ? 0
            : animation.maskShowDuration
        }s`,
      },
    }
  }
)`
  opacity: ${props => (props.inView ? 1 : 0)};
  transform: ${({ direction, inView }) => {
    let offset

    switch (direction) {
      case 'top':
        offset = 'rotateX(95deg) translateY(-100%)'
        break

      case 'right':
        offset = 'rotateY(-95deg) translateY(100%)'
        break

      case 'bottom':
        offset = 'rotateX(-95deg) translateY(100%)'
        break

      case 'left':
        offset = '-rotateY(95deg) translateY(-100%)'
        break

      default:
        break
    }

    return inView ? 'none' : offset
  }};
`
