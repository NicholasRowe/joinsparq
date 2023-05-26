import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { clamp } from '@styles/utils/conversion.style'
import { breakpoints } from '@styles/vars/breakpoints.style'
import { easings } from '@styles/vars/easings.style'
import { ButtonMain } from '@components/Button/index.style'
import { Heading2, TextBody } from '@styles/vars/textStyles.style'
import { ContainerMain } from '@components/Container/index.style'
import { paddingMin, paddingMax } from '@components/Container/index.style'
import { colors } from '@styles/vars/colors.style'
import { AnimateSlideInWrap } from '@components/animation/AnimateSlideIn/index.style'
import { ModelsMainSpacer } from '@components/CarouselModels/index.style'
import { GridItemMain } from '@components/GridItem/index.style'
import {
  AnimateImageMain,
  AnimateImagePosition,
} from '@components/animation/AnimateImage/index.style'

export const CarouselMain = styled.div`
  background-color: ${colors.light};
  overflow: hidden;

  ${mq.deskMax} {
    > ${ContainerMain} {
      padding-left: 0;
      padding-right: 0;
    }
  }
`

export const CarouselInner = styled.div`
  position: relative;
`

export const CarouselPhone = styled.div`
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: transform 0.6s ${easings.out.default};
  transform: translateX(${props => (props.$offset ? 100 : 0)}%);
  z-index: 1;

  ${mq.desk} {
    pointer-events: none;
    z-index: 3;
  }
`

export const CarouselWrap = styled.div`
  position: relative;
  z-index: 2;

  ${GridItemMain} {
    position: relative;
  }
`

export const CarouselTrack = styled.div`
  display: flex;
  position: relative;
  width: ${props => props.count * 100}%;
`

export const CarouselItem = styled.div.attrs(props => ({
  style: {
    opacity: props.active ? 1 : 0,
    transition: props.active
      ? `opacity 1s ${easings.inOut.default}`
      : `opacity .6s ${easings.inOut.default}`,
  },
}))`
  height: 100%;
  width: 25%;

  ${mq.deskMax} {
    text-align: center;

    ${clamp(
      'padding-left',
      paddingMin,
      paddingMax,
      breakpoints.mobile,
      breakpoints.tabletL
    )}
    ${clamp(
      'padding-right',
      paddingMin,
      paddingMax,
      breakpoints.mobile,
      breakpoints.tabletL
    )}
  }

  ${Heading2},
  ${TextBody} {
    margin: 0 auto;

    ${mq.desk} {
      margin-left: 0;
    }
  }
`

export const CarouselModelSpacer = styled.div`
  ${ModelsMainSpacer};
  position: relative;

  ${AnimateImageMain}, ${AnimateImagePosition} {
    height: 100%;
    width: 100%;
  }

  video {
    background-color: ${colors.dark};
    ${clamp('border-radius', 5, 10)};
    overflow: hidden;
    overflow: hidden;
    height: auto;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;

    ${mq.tabletP} {
      height: 100%;
      width: auto;
    }
  }
`

export const CarouselText = styled.div`
  ${clamp('padding-bottom', 50, 90)};
  ${clamp('padding-top', 10, 60)};
`

export const CarouselDots = styled.ul`
  display: flex;
  justify-content: center;
  perspective: 1000px;
  position: relative;

  ${mq.desk} {
    display: none;
  }
`

export const CarouselDot = styled.li`
  display: block;
  height: 0.6rem;
  margin: 0 0.6rem;
  position: relative;
  width: 0.6rem;

  &:before,
  &:after {
    border: solid 0.1rem ${colors.orange};
    border-radius: 50%;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.6s ${easings.inOut.default},
      transform 0.6s ${easings.inOut.default};
  }

  &:before {
    background-color: transparent;
    opacity: ${props => (props.active ? 0 : 1)};
    transform: ${props =>
      props.active
        ? 'rotateX(95deg) translateY(-200%)'
        : 'rotateX(0deg) translateY(0)'};
  }

  &:after {
    background-color: ${colors.orange};
    opacity: ${props => (props.active ? 1 : 0)};
    transform: ${props =>
      props.active
        ? 'rotateX(0deg) translateY(0)'
        : 'rotateX(-95deg) translateY(200%)'};
  }
`

export const CarouselNav = styled.div`
  bottom: -0.2rem;
  ${props =>
    props.right
      ? `
    ${clamp(
      'right',
      paddingMin,
      paddingMax,
      breakpoints.mobile,
      breakpoints.tabletL
    )}
  `
      : `
    ${clamp(
      'left',
      paddingMin,
      paddingMax,
      breakpoints.mobile,
      breakpoints.tabletL
    )}
  `}
  position: absolute;
  transform: translateY(50%);
  z-index: 9999; // Set high to be above GSAP draggable

  ${mq.desk} {
    bottom: auto;
    ${props =>
      props.right
        ? `
      ${clamp('right', -96, -154, breakpoints.desk, breakpoints.contained)};
    `
        : `
      ${clamp('left', -96, -154, breakpoints.desk, breakpoints.contained)};
    `}
    top: 50%;
    transform: translateY(-50%);
  }

  ${ButtonMain} {
    height: 6.4rem;
    padding: 0;
    width: 6.4rem;

    svg {
      height: 2rem;
      transform: rotateZ(${props => (props.right ? -90 : 90)}deg);
      width: 1rem;
    }
  }
`

export const CarouselButton = styled.div`
  ${AnimateSlideInWrap},
  ${ButtonMain} {
    width: 100%;
  }
`
