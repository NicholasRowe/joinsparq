import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { colors } from '@styles/vars/colors.style'
import { CardMain } from '@components/Card/index.style'
import { clamp } from '@styles/utils/conversion.style'
import { breakpoints } from '@styles/vars/breakpoints.style'
import { TextBody } from '@styles/vars/textStyles.style'
import { ContainerMain } from '@components/Container/index.style'
import { SeperatorMain } from '@components/Seperator/index.style'

export const ExploreMain = styled.div`
  ${clamp('padding-bottom', 70, 178)};
  ${clamp('padding-top', 0, 226)};

  ${mq.desk} {
    padding-bottom: 0;
    padding-top: 0;
  }

  > ${ContainerMain} {
    ${mq.desk} {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100vh;
      margin-bottom: 20vh;
      padding-top: 10vh;

      @media (max-height: 1000px) {
        height: 110vh;
      }
    }
  }

  ${SeperatorMain} {
    ${mq.desk} {
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`

export const ExploreText = styled.div`
  ${TextBody} {
    color: ${colors.darkgrey};
  }

  ${mq.tabletP} {
    padding-bottom: 4rem;
  }

  ${mq.desk} {
    ${clamp('padding-top', 120, 180, breakpoints.desk, breakpoints.contained)};
  }
`

export const ExploreMobileCar = styled.div`
  ${mq.desk} {
    display: none;
  }
`

export const ExploreCard = styled.div`
  ${CardMain} {
    ${mq.tabletP} {
      margin-right: 0;
    }
  }
`
