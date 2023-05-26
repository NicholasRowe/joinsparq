import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { colors } from '@styles/vars/colors.style'
import { clamp } from '@styles/utils/conversion.style'
import { ButtonMain } from '@components/Button/index.style'
import { easings } from '@styles/vars/easings.style'
import { GridItemMain } from '@components/GridItem/index.style'
import { AnimateSlideInWrap } from '@components/animation/AnimateSlideIn/index.style'
import { Heading3 } from '@styles/vars/textStyles.style'
import { breakpoints } from '@styles/vars/breakpoints.style'

export const BarMain = styled.div`
  background-color: ${colors.grey};
  position: relative;
`

export const BarInner = styled.div`
  color: ${colors.light};
  ${clamp('padding-bottom', 60, 46)};
  ${clamp('padding-top', 24, 44)};
  position: relative;

  &:before {
    background-color: ${colors.orange};
    border-radius: 1rem;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: scaleY(${props => (props.show ? 1 : 0)});
    transform-origin: 50% 100%;
    transition: transform 1s ${easings.inOut.default};
    transition-delay: ${props => props.delay}s;
    z-index: 1;
  }

  ${mq.deskL} {
    padding-left: 3rem;
    padding-right: 8rem;
  }

  ${GridItemMain} {
    align-self: center;
  }
`

export const BarItems = styled.div`
  position: relative;
  z-index: 2;

  ${GridItemMain} {
    height: 100%;
  }
`

export const BarText = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  ${clamp('padding-left', 30, 50)};
  ${clamp('padding-right', 30, 50)};
  padding-bottom: 3.6rem;
  padding-top: 3.6rem;
  position: relative;

  ${mq.tabletP} {
    text-align: center;
  }

  ${mq.desk} {
    ${Heading3} {
      ${clamp('max-width', 220, 250, breakpoints.desk, breakpoints.contained)};
    }
  }

  ${mq.tabletL} {
    padding-bottom: 0.8rem;
    padding-top: 0.8rem;
    text-align: left;
  }

  &:after {
    background-color: ${colors.grey};
    ${clamp('bottom', -6, -12)};
    content: '';
    height: 0.1rem;
    ${clamp('left', 30, 50)};
    opacity: 0.5;
    position: absolute;
    ${clamp('right', 30, 50)};

    ${mq.tabletL} {
      bottom: 0;
      height: auto;
      left: auto;
      ${clamp('right', -6, -12)};
      top: 0;
      width: 0.1rem;
    }

    ${BarItems} ${GridItemMain}:last-child & {
      display: none;
    }
  }
`

export const BarButton = styled.div`
  ${clamp('padding-left', 30, 50)};
  ${clamp('padding-right', 30, 50)};
  position: relative;
  z-index: 2;

  ${mq.tabletL} {
    padding-top: 2rem;
  }

  ${mq.deskL} {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }

  ${AnimateSlideInWrap},
  ${ButtonMain} {
    width: 100%;
  }
`
