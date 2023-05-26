import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { CardMain } from '@components/Card/index.style'
import { clamp } from '@styles/utils/conversion.style'
import { ContainerMain } from '@components/Container/index.style'

export const HowMain = styled.div`
  ${clamp('padding-bottom', 60, 178)};
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
      height: 200vh;
      margin-bottom: 50vh;
    }
  }
`

export const HowMobileCar = styled.div`
  ${mq.desk} {
    display: none;
  }
`

export const HowCard = styled.div`
  ${CardMain} {
    ${mq.tabletP} {
      margin-left: ${props => (props.side === 'left' ? 0 : 'auto')};
      margin-right: ${props => (props.side === 'right' ? 0 : 'auto')};
    }
    ${mq.desk} {
      margin-bottom: 5rem;
      margin-top: 5rem;
    }
  }
`
