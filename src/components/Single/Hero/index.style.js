import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { clamp } from '@styles/utils/conversion.style'
import { breakpoints } from '@styles/vars/breakpoints.style'
import { GridMain } from '@components/Grid/index.style'
import { ButtonMain } from '@components/Button/index.style'
import { colors } from '@styles/vars/colors.style'
import { Heading2, TextBodyLarge } from '@styles/vars/textStyles.style'
import { AnimateSlideInWrap } from '@components/animation/AnimateSlideIn/index.style'

export const HeroMain = styled.div``

export const HeroInner = styled.div`
  ${GridMain} {
    align-items: center;
    min-height: calc(100vh - 18.2rem);

    ${mq.tabletL} {
      min-height: 100vh;
    }
  }
`

export const HeroText = styled.div`
  ${clamp('padding-top', 80, 118, breakpoints.tiny, breakpoints.tabletL)};
  text-align: center;

  ${mq.tabletL} {
    padding-top: 0;
  }

  ${Heading2},
  ${TextBodyLarge} {
    margin: 0 auto;
  }

  ${TextBodyLarge} {
    color: ${colors.darkgrey};
  }
`

export const HeroButton = styled.div`
  padding-bottom: 6.9rem;
  text-align: center;

  ${mq.tabletL} {
    padding-bottom: 0;
  }

  ${AnimateSlideInWrap},
  ${ButtonMain} {
    width: 100%;

    ${mq.tabletP} {
      width: auto;
    }
  }
`
