import { easings } from '@styles/vars/easings.style'
import styled from 'styled-components'

export const AnimateImageMain = styled.div`
  perspective: 1000px;
  position: relative;
`

export const AnimateImagePosition = styled.div.attrs(props => ({
  style: {
    transitionDelay: `${props.delay}s`,
  },
}))`
  opacity: ${props => (props.show ? 1 : 0)};
  overflow: hidden;
  transform-origin: 50% 0%;
  transform: ${props =>
    props.show
      ? `rotateX(0deg) translateY(0%)`
      : `rotateX(-${props.size === 'small' ? 45 : 20}deg) translateY(${
          props.size === 'small' ? 100 : 20
        }%)`};
  transition: opacity 1s ${easings.inOut.default},
    transform 1s ${easings.inOut.default};
  will-change: transform;

  ${props =>
    props.scaleIn &&
    `
    [data-gatsby-image-wrapper] {
      transform: ${props.show ? 'scale(1)' : 'scale(1.3)'};
      transition: transform 1.2s ${easings.inOut.default};
      transition-delay: ${props.delay}s;
    }
  `}
`
