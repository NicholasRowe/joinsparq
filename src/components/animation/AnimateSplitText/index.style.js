import styled from 'styled-components'
import { easings } from '../../../styles/vars/easings.style'
import { animation } from '../../../styles/vars/animation.style'

export const SplitTextWrapper = styled.span`
  display: block;

  .split__mask {
    display: inline-block;
    perspective: 1000px;
    position: relative;
    white-space: nowrap;
  }

  .split__text {
    display: inline-block;
    will-change: transform;
    opacity: ${props => (props.show ? 1 : 0)};
    transform: ${props =>
      props.show
        ? 'rotateX(0deg) translateY(0)'
        : 'rotateX(-95deg) translateY(100%)'};
    transition: opacity 1s ${easings.inOut.default},
      transform 1s ${easings.inOut.default};
    transition-delay: ${props => {
      if (props.show) {
        const animationDelay =
          props.type.indexOf('chars') > -1
            ? animation.charDuration
            : props.type.indexOf('words') > -1
            ? animation.wordDuration
            : animation.lineDuration
        return `calc(${props.delay}s + ${animationDelay} * var(--splitTextDelay))`
      } else {
        return `${animation.maskShowDuration}s`
      }
    }};
  }
`
