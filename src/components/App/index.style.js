import styled, { css, keyframes } from 'styled-components'
import { colors } from '@styles/vars/colors.style'
import { clamp } from '@styles/utils/conversion.style'
import { easings } from '@styles/vars/easings.style'
import { mq } from '@styles/vars/media-queries.style'
import { breakpoints } from '@styles/vars/breakpoints.style'
import { TextBody } from '@styles/vars/textStyles.style'

export const AppMain = styled.div`
  background-color: ${colors.grey};
`

const AppImages = css`
  img {
    ${clamp('border-radius', 5, 10)};
  }
`
const AppInners = css`
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  ${clamp('border-radius', 5, 10)};
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`

export const AppScene = styled.div`
  ${AppImages};
  display: none;
  ${clamp('padding-right', 6, 25)}

  ${mq.tabletL} {
    display: block;
  }
`

export const AppSceneInner = styled.div`
  ${AppInners};
`

export const AppText = styled.div`
  text-align: center;

  ${mq.desk} {
    ${clamp('padding-top', 80, 100, breakpoints.desk, breakpoints.deskL)};
  }

  ${TextBody} {
    left: 50%;
    ${clamp('max-width', 400, 550, breakpoints.tabletP, breakpoints.contained)};
    position: relative;
    transform: translateX(-50%);
    width: 100%;
  }
`

export const AppPhone = styled.div`
  margin: 0 auto;
  max-width: 100%;
  ${clamp('width', 275, 403)};
  padding-bottom: 3rem;
  position: relative;

  ${mq.deskL} {
    padding-top: 3rem;
  }
`

export const AppPhoneTop = styled.div`
  overflow: hidden;
  position: relative;
  z-index: 1;
`

export const AppPhoneBottom = styled.div`
  position: relative;
  z-index: 4;
`

export const AppPhoneCar = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  transform: translateY(${props => (props.show ? 0 : 100)}%);
  transition: transform 1.6s ${easings.out.default};
  transition-delay: ${props => props.delay}s;
  z-index: 3;
`

const spin = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
`

export const AppPhoneRing = styled.div`
  animation: ${spin} 30s linear infinite forwards;
  bottom: 26.5%;
  ${clamp('height', 192, 282)};
  left: 50%;
  ${clamp('margin-left', -96, -141)};
  ${clamp('margin-bottom', -96, -141)};
  position: absolute;
  ${clamp('width', 192, 282)};
  z-index: 2;
`

export const AppScore = styled.div`
  ${mq.tiny} {
    ${clamp('padding-right', 6, 25)};
  }

  ${mq.desk} {
    display: block;
  }
`

export const AppScoreInner = styled.div`
  ${AppInners};
`

export const AppMap = styled.div`
  display: none;
  ${clamp('padding-left', 6, 25)}

  ${mq.desk} {
    display: block;
  }
`

export const AppMapInner = styled.div`
  ${AppInners};
`

export const AppWatch = styled.div`
  ${mq.tiny} {
    ${clamp('padding-left', 6, 25)}
  }

  ${mq.tabletL} {
    display: none;
  }

  ${mq.desk} {
    display: block;
  }
`

export const AppWatchInner = styled.div`
  ${AppInners};
`
