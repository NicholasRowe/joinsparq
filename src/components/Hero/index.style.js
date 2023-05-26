import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { clamp } from '../../styles/utils/conversion.style'
import { breakpoints } from '../../styles/vars/breakpoints.style'
import { GridMain } from '@components/Grid/index.style'
import { ButtonMain } from '@components/Button/index.style'
import { colors } from '@styles/vars/colors.style'
import { Heading2, TextBody } from '@styles/vars/textStyles.style'
import { ContainerMain } from '@components/Container/index.style'
import { AnimateSlideInWrap } from '@components/animation/AnimateSlideIn/index.style'
import { paddingMin, paddingMax } from '@components/Container/index.style'

export const HeroMain = styled.div`
  ${ContainerMain} {
    ${mq.desk} {
      margin-bottom: 20vh;
    }
  }
`

export const HeroInner = styled.div`
  ${GridMain} {
    ${mq.tabletL} {
      height: 100vh;
    }
  }
`

export const HeroText = styled.div`
  ${clamp('padding-top', 80, 118, breakpoints.tiny, breakpoints.tabletL)};
  text-align: center;

  ${mq.tabletL} {
    padding-top: 0;
    text-align: left;
  }

  ${Heading2},
  ${TextBody} {
    margin: 0 auto;

    ${mq.tabletL} {
      margin-left: 0;
    }
  }

  ${TextBody} {
    color: ${colors.darkgrey};
  }

  ${mq.tabletL} {
    ${clamp('padding-bottom', 30, 48, breakpoints.desk)}
  }
`

export const HeroMobileCar = styled.div`
  ${clamp(
    'margin-right',
    -paddingMin,
    -paddingMax,
    breakpoints.mobile,
    breakpoints.tabletL
  )}
  ${clamp('margin-left', 0, 0, breakpoints.mobile, breakpoints.tabletL)}
  margin-bottom: 2rem;
  margin-top: 2rem;
  pointer-events: none;
  position: relative;
  z-index: -1;

  ${mq.tabletP} {
    padding-left: 6rem;
  }

  ${mq.tabletL} {
    bottom: 10%;
    height: auto;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-left: 0;
    position: absolute;
    right: 0;
    width: 70%;
    z-index: -1;
  }

  ${mq.desk} {
    display: none;
  }
`

export const HeroButton = styled.div`
  padding-bottom: 6.9rem;

  ${mq.desk} {
    ${clamp('padding-bottom', 40, 90, breakpoints.desk)}
  }

  ${AnimateSlideInWrap},
  ${ButtonMain} {
    width: 100%;

    ${mq.tabletL} {
      width: auto;
    }
  }
`
