import { easings } from '@styles/vars/easings.style'
import { font } from '@styles/vars/font.style'
import { mq } from '@styles/vars/media-queries.style'
import styled, { css } from 'styled-components'
import { clamp } from '../../styles/utils/conversion.style'
import { colors } from '../../styles/vars/colors.style'
import { zIndex } from '../../styles/vars/zIndex.style'
import { Heading1 } from '@styles/vars/textStyles.style'

export const TransitionMaskWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: auto;
  z-index: ${zIndex.pageTransitionMask};
`

export const TransitionMaskBlock = styled.div`
  background-color: ${props => props.$color};
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: ${props => props.position};
`

export const TransitionMaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${clamp('height', 50, 100)};
  left: 0;
  margin-left: -1rem;
  margin-right: -1rem;
  ${clamp('padding-top', 15, 50)};
  position: absolute;
  right: 0;
  top: 0;
  z-index: 4;

  ${mq.tabletL} {
    margin-left: 0;
    margin-right: 0;
  }
`

export const TransitionMaskHeaderLogo = styled.div`
  ${clamp('height', 20, 41)}
  position: relative;
  ${clamp('width', 88, 181)}
  z-index: ${zIndex.mobileNavButtons};

  a {
    height: 100%;
    width: 100%;
  }
`

export const TransitionMaskHeaderLogoText = styled.div`
  height: 100%;
  ${clamp('left', 23, 52)};
  position: relative;
  width: 100%;

  path {
    fill: ${colors.light};
    transform: translateY(${props => (props.show ? 0 : 100)}%);
    transition: opacity 1s ${easings.inOut.default},
      transform 1s ${easings.inOut.default};

    &:nth-of-type(1) {
      transition-delay: 0s;
    }
    &:nth-of-type(2) {
      transition-delay: 0.05s;
    }
    &:nth-of-type(3) {
      transition-delay: 0.1s;
    }
    &:nth-of-type(4) {
      transition-delay: 0.15s;
    }
    &:nth-of-type(5) {
      transition-delay: 0.2s;
    }
  }
`

const LogoShapes = css`
  font-size: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotateZ(-45deg);

  svg {
    ${clamp('height', 8, 17)}
    transform: translateX(${props => (props.show ? 0 : 105)}%);
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ${easings.inOut.default};
    ${clamp('width', 13, 27)}

    &:nth-child(2) {
      ${clamp('margin-top', 1, 1)};
      transform: rotateZ(180deg) translateX(${props => (props.show ? 0 : 105)}%);
    }
  }

  path {
    fill: ${colors.light};
  }
`

export const TransitionMaskHeaderLogoShapes = styled.div`
  ${LogoShapes};
`

export const TransitionMaskLogoShapes = styled.div`
  ${LogoShapes};
  left: 50%;
  transform: translateX(-50%) translateY(-50%) rotateZ(-45deg);
  z-index: 4;

  svg {
    height: 3.4rem;
    transition-duration: 0.5s;
    transition-timing-function: ${easings.in.default};
    width: 5.4rem;
  }

  path {
    fill: #121212;
  }
`

export const TransitionMaskVideo = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: none;
    max-width: none;
    transform: translate(-50%, -50%);
    width: max(100%, calc(${props => props.aspectRatio} * 100vh));
    height: max(100%, calc(100vw * ${props => 1 / props.aspectRatio}));
  }
`

export const TransitionMaskText = styled.div`
  color: ${colors.light};
  left: 0;
  padding: 0 5rem;
  position: absolute;
  right: 0;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;

  ${Heading1} {
    ${clamp('font-size', 45, 151)};
    letter-spacing: -0.06em;

    sub {
      display: inline-block;
      ${clamp('font-size', 10, 20)};
      ${clamp('margin-left', 3, 5)};
      vertical-align: baseline;
    }
  }
`

export const TransitionMaskTextSpan = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
`

export const TransitionMaskBar = styled.div`
  bottom: 0;
  height: 10rem;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 4;

  ${mq.tabletP} {
    height: 20rem;
  }

  ${mq.desk} {
    height: 30%;
  }
`

export const TransitionMaskBarProgress = styled.div`
  background-color: ${colors.orange};
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(-80%);
  z-index: 1;
`

export const TransitionMaskBarCount = styled.span`
  ${clamp('font-size', 30, 215)};
  font-weight: ${font.primary.weight.light};
  letter-spacing: -0.01em;
  line-height: 1.05;
  position: absolute;
  ${clamp('right', 20, 60)};
  text-align: right;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
`
