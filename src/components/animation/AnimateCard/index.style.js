import styled, { keyframes, css } from 'styled-components'
import { colors } from '@styles/vars/colors.style'
import { clamp } from '@styles/utils/conversion.style'
import { easings } from '@styles/vars/easings.style'

const blinkIn = keyframes`
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const blinking = css`
  animation: ${blinkIn} 0.8s ${easings.inOut.default} 3 alternate;
`

export const AnimateCardMain = styled.div`
  height: 100%;
  width: 100%;

  &:before {
    content: '';
    background-color: ${colors.light};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: scaleY(${props => (props.inView ? 1 : 0)});
    transform-origin: 50% 100%;
    transition: transform 1s ${easings.inOut.default};
    transition-delay: ${props => props.delay}s;
    z-index: -1;
  }

  &:after {
    ${props => props.inView && blinking};
    content: '';
    background-color: ${colors.orange};
    border-radius: 50%;
    ${clamp('height', 9, 12)};
    ${clamp('left', 18, 23)};
    position: absolute;
    ${clamp('top', 18, 23)};
    animation-delay: ${props => props.delay + 1}s;
    visibility: ${props => (props.inView ? `visible` : `hidden`)};
    transition: visibility 0s ${props => props.delay + 1}s;
    ${clamp('width', 9, 12)};
  }
`
