import { colors } from '@styles/vars/colors.style'
import { easings } from '@styles/vars/easings.style'
import { mq } from '@styles/vars/media-queries.style'
import { zIndex } from '@styles/vars/zIndex.style'
import styled from 'styled-components'

export const CursorMain = styled.div.attrs(props => ({
  style: {
    transform: `translateX(${props.x}px) translateY(${props.y}px)`,
  },
}))`
  display: none;
  height: 15.6rem;
  margin-left: -7.8rem;
  margin-top: -7.8rem;
  perspective: 1000px;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 15.6rem;
  will-change: transform;
  visibility: hidden;
  z-index: ${zIndex.cursor};

  ${mq.desk} {
    display: block;
    visibility: ${props => (props.visible ? `visible` : `hidden`)};
  }

  svg {
    transform: scale(${props => (props.large ? 1 : props.hide ? 0 : 0.1)});
    transition: transform ${props => (props.hide ? 0.3 : 1)}s
      ${easings.inOut.default};
  }

  circle {
    fill: ${props =>
      props.bg ? (props.dark ? colors.dark : colors.orange) : `transparent`};
    transition: fill ${props => (props.bg ? 0.5 : 0.1)}s;
    transition-delay: ${props => (props.bg && !props.dark ? 0.5 : 0)}s;
  }
`

export const CursorTextWrap = styled.span`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const CursorText = styled.span`
  left: 0;
  opacity: ${props => (props.show ? 1 : 0)};
  position: absolute;
  right: 0;
  text-align: center;
  text-transform: uppercase;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.1s;
`

export const CursorCounterNumber = styled.span`
  position: relative;
`

export const CursorCounterCurrent = styled.span`
  display: inline-block;
  opacity: ${props => (props.show ? 1 : 0)};
  text-align: right;
  transform: ${props =>
    props.show ? `none` : `rotateX(-95deg) translateY(100%)`};
  transition: ${props =>
    props.show
      ? `opacity 1s ${easings.inOut.default} .1s, transform 1s ${easings.inOut.default} .1s`
      : `opacity .2s ${easings.inOut.default}, transform 0s .2s`};

  &:nth-child(1n + 2) {
    position: absolute;
    right: 0;
    top: 50%;
    transform: ${props =>
      props.show ? `translateY(-54%)` : `rotateX(-95deg) translateY(46%)`};
  }
`
