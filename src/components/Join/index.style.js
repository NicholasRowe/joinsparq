import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { colors } from '@styles/vars/colors.style'
import { clamp } from '@styles/utils/conversion.style'
import { easings } from '@styles/vars/easings.style'
import { TextBody } from '@styles/vars/textStyles.style'
import { ButtonMain } from '@components/Button/index.style'
import { GridMain } from '@components/Grid/index.style'
import { SeperatorMain } from '@components/Seperator/index.style'
import { breakpoints } from '@styles/vars/breakpoints.style'

export const JoinMain = styled.div`
  background-color: ${colors.dark};
  color: ${colors.light};
  cursor: pointer;
  ${clamp('padding-top', 70, 140)};
  position: relative;

  &:before {
    background-color: ${colors.darkgrey};
    bottom: 0;
    content: '';
    left: 0;
    height: 0.1rem;
    opacity: ${props => (props.show ? 0.2 : 0)};
    position: absolute;
    right: 0;
    transform: scaleX(${props => (props.show ? 1 : 0.6)});
    transform-origin: 0% 0%;
    transition: opacity 1s ${easings.inOut.default} 1s,
      transform 1s ${easings.inOut.default} 1s;
    z-index: 2;
  }

  ${mq.desk} {
    background-color: transparent;
    padding-top: 0;
  }

  ${SeperatorMain} {
    ${mq.desk} {
      left: 0;
      padding-bottom: 0;
      position: absolute;
      right: 0;
      top: 11rem;
    }
  }
`

export const JoinInner = styled.div`
  padding-bottom: 7rem;

  ${mq.desk} {
    padding-bottom: 0;
    padding-top: 0;

    ${GridMain} {
      height: 100vh;
    }
  }
`

export const JoinText = styled.div`
  ${TextBody} {
    color: ${colors.grey};
  }
`

export const JoinMobileCar = styled.div`
  ${clamp('padding-bottom', 40, 100, breakpoints.mobile, breakpoints.tabletL)};
  ${clamp('padding-top', 40, 60, breakpoints.mobile, breakpoints.tabletL)};

  ${mq.tabletP} {
    margin: 0 auto;
    width: 50%;
  }

  ${mq.desk} {
    display: none;
  }
`

export const JoinButton = styled.div`
  ${ButtonMain} {
    width: 100%;
  }
  ${mq.desk} {
    display: none;
  }
`
