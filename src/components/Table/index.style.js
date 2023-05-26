import styled, { keyframes, css } from 'styled-components'
import { colors } from '@styles/vars/colors.style'
import { clamp } from '@styles/utils/conversion.style'
import { easings } from '@styles/vars/easings.style'

export const TableMain = styled.ul`
  color: ${colors.darkgrey};
  list-style-type: none;
  position: relative;

  &:before {
    background-color: ${colors.midgrey};
    content: '';
    height: 0.1rem;
    left: 0;
    opacity: ${props => (props.show ? 1 : 0)};
    position: absolute;
    right: 0;
    top: 0;
    transform: scaleX(${props => (props.show ? 1 : 0.6)});
    transform-origin: 0% 0%;
    transition: opacity 1s ${easings.inOut.default},
      transform 1s ${easings.inOut.default};
    transition-delay: ${props => props.delay}s;
  }
`

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

export const TableRow = styled.li`
  display: flex;
  justify-content: space-between;
  ${clamp('padding-bottom', 15, 20)};
  ${clamp('padding-left', 20, 30)};
  ${clamp('padding-top', 15, 20)};
  position: relative;

  &:before {
    ${props => props.show && blinking};
    content: '';
    background-color: ${colors.orange};
    border-radius: 50%;
    height: 0.6rem;
    ${clamp('left', 0, 4)};
    margin-top: -0.3rem;
    position: absolute;
    top: 50%;
    animation-delay: ${props => props.delay}s;
    visibility: ${props => (props.show ? `visible` : `hidden`)};
    transition: visibility 0s ${props => props.delay}s;
    width: 0.6rem;
  }

  &:after {
    background-color: ${colors.midgrey};
    bottom: 0;
    content: '';
    height: 0.1rem;
    left: 0;
    opacity: ${props => (props.show ? 1 : 0)};
    position: absolute;
    right: 0;
    transform: scaleX(${props => (props.show ? 1 : 0.6)});
    transform-origin: 0% 0%;
    transition: opacity 1s ${easings.inOut.default},
      transform 1s ${easings.inOut.default};
    transition-delay: ${props => props.delay}s;
    will-change: transform;
  }
`

export const TableCell = styled.span`
  display: inline-block;
  position: relative;
`
