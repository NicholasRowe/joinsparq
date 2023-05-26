import { clamp } from '@styles/utils/conversion.style'
import { mq } from '@styles/vars/media-queries.style'
import { Heading4, TextBodySmall } from '@styles/vars/textStyles.style'
import styled from 'styled-components'

export const CardMain = styled.div`
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  ${clamp('border-radius', 15, 20)};
  margin: 0 auto;
  ${clamp('max-width', 330, 388)};
  overflow: hidden;
  ${clamp('padding-bottom', 26, 31)};
  ${clamp('padding-left', 18, 23)};
  ${clamp('padding-right', 18, 23)};
  ${clamp('padding-top', 18, 23)};
  position: relative;

  ${Heading4} {
    padding-right: 30%;
    overflow-wrap: normal;

    ${mq.tiny} {
      ${clamp('padding-right', 200, 220)};
    }
  }

  ${TextBodySmall} {
    padding-right: 4rem;
  }
`

export const CardImageWrap = styled.div`
  ${clamp('height', 128, 158)};
  margin-left: auto;
  margin-right: 0;
  ${clamp('width', 156, 193)};
`

export const CardImage = styled.div`
  border-radius: 1.6rem;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
`
