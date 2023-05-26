import { clamp } from '@styles/utils/conversion.style'
import { breakpoints } from '@styles/vars/breakpoints.style'
import { mq } from '@styles/vars/media-queries.style'
import styled from 'styled-components'

export const CardWrapper = styled.div`
  padding-bottom: 100px;
  ${mq.desk} {
    ${clamp('padding-top', 20, 30, breakpoints.desk, breakpoints.deskL)};
  }
`
export const CardMain = styled.div`
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  margin: 0 auto 0 auto;
  overflow: hidden;
  position: relative;
`

export const CardImageWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
`

export const CardImage = styled.div`
  border-radius: 1.6rem;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  img{
    height:320px;
  }
`
export const CardMeta = styled.div`
  font-size: 16px;
  line-height: 19.22px;
  font-family: Plain;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`
export const CardAuthor = styled.p`
  font-weight: 400;
  line-height: 19.22px;
  font-family: Plain;
`
export const CardDate = styled.p`
  font-weight: 300;
  line-height: 19.22px;
  font-family: Plain;
`
export const Readmore = styled.div`
  font-size: 16px;
  line-height: 19.22px;
  font-family: Plain;
  font-weight: 300;
  margin-top: 30px;
  margin-bottom: 40px;
  a,
  svg {
    display: inline-flex;
    align-items: center;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  a:hover {
    color: #fe522e;
  }
  svg {
    margin-left: 30px;
  }
`
export const CardHeading = styled.h3`
  font-weight: 400;
  font-size: 3rem;
  line-height: 36.03px;
  font-family: Plain;
`

// Feature Card style here

export const FeaturedCard = styled.div`
  ${clamp('padding-top', 80, 100, breakpoints.desk, breakpoints.deskL)};
  ${mq.tabletP} {
    padding-bottom: 70px;
  }
  ${mq.desk} {
    padding-bottom: 40px;
  }
`
export const FeaturedImage = styled.div`
  display: none;
  justify-content: flex-end;
  ${mq.tabletL} {
    display: flex;
  }
`
export const FeaturedImageMobile = styled.div`
  display: flex;
  justify-content: flex-end;
  ${mq.tabletL} {
    display: none;
  }
`
export const PageHeading = styled.h1`
  font-size: 3rem;
  margin-bottom: 60px;
`
