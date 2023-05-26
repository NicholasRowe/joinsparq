import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { colors } from '@styles/vars/colors.style'
import { TextBody } from '@styles/vars/textStyles.style'
import { breakpoints } from '@styles/vars/breakpoints.style'
import { clamp } from '@styles/utils/conversion.style'

export const LabsMain = styled.div`
  background-color: ${colors.light};
  position: relative;
`

export const LabsInner = styled.div`
  position: relative;

  ${mq.desk} {
    color: ${colors.light};
  }
`

export const LabsBg = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`

export const LabsTextWrap = styled.div`
  pointer-events: none;

  ${mq.desk} {
    left: 0;
    position: absolute;
    right: 0;
    ${clamp('top', 70, 102, breakpoints.desk, breakpoints.deskL)};
    z-index: 2;
  }
`

export const LabsText = styled.div`
  pointer-events: all;

  ${TextBody} {
    ${mq.tabletP} {
      max-width: 60%;
    }

    ${mq.desk} {
      max-width: 95%;
    }

    ${mq.deskL} {
      max-width: none;
    }
  }
`
