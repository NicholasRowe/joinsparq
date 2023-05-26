import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { clamp } from '@styles/utils/conversion.style'
import { easings } from '@styles/vars/easings.style'
import { colors } from '@styles/vars/colors.style'
import { ButtonMain } from '@components/Button/index.style'
import { AnimateSlideInWrap } from '@components/animation/AnimateSlideIn/index.style'

export const CheckoutFormMain = styled.div`
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  border-radius: 1rem;
  ${clamp('max-width', 500, 900)};
  overflow: hidden;
  position: relative;
  width: calc(100% - 6rem);

  &:before {
    background-color: ${colors.light};
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
    z-index: -1;

    ${mq.tabletL} {
      left: 5%;
    }
  }
`

export const CheckoutFormImageMask = styled.div`
  display: none;
  height: 100%;
  overflow: hidden;
  position: relative;
  transform: translateY(${props => (props.show ? 0 : 100)}%);
  transition: transform 1s ${easings.inOut.default};
  transition-delay: ${props => props.delay}s;
  width: 100%;

  ${mq.tabletP} {
    display: block;
  }
`

export const CheckoutFormImage = styled.div`
  transform: translateY(${props => (props.show ? 0 : -100)}%)
    scale(${props => (props.show ? 1.01 : 1.2)});
  transition: inherit;
  transition-delay: inherit;

  ${mq.tabletP} {
    height: 50vw;
    width: 100%;
  }

  ${mq.tabletL} {
    height: 100%;
  }

  > div {
    height: 100%;
    width: 100%;
  }

  img {
    object-fit: cover;
  }
`

export const CheckoutFormText = styled.div`
  ${clamp('padding-bottom', 40, 105)};
  ${clamp('padding-left', 30, 55)};
  ${clamp('padding-right', 30, 55)};
  ${clamp('padding-top', 25, 55)};

  ${ButtonMain} {
    width: 100%;
  }
`

export const CheckoutFormClose = styled.div`
  cursor: pointer;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 1s ${easings.inOut.default};
  transition-delay: ${props => props.delay}s;
  position: absolute;
  height: 1.9rem;
  ${clamp('right', 30, 55)};
  ${clamp('top', 25, 55)};
  width: 1.9rem;
  z-index: 3;

  path {
    transition: fill 0.4s ${easings.inOut.default};
  }

  &:hover {
    path {
      fill: ${colors.orange};
    }
  }
`

export const CheckoutFormButton = styled.div`
  ${AnimateSlideInWrap} {
    width: 100%;
  }
`
