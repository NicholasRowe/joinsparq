import styled, { css } from 'styled-components'
import { clamp } from '@styles/utils/conversion.style'
import { easings } from '@styles/vars/easings.style'

export const ModelsMainSpacer = css`
  ${clamp('height', 400, 534)};
`

export const ModelsMain = styled.div`
  ${ModelsMainSpacer};
  margin: 0 auto;
  perspective: 1000px;
  position: relative;
  ${clamp('width', 244, 466)};
`

const Model = css`
  position: absolute;
`

export const ModelsFront = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 3;
`

export const ModelsFrontOuter = styled.div`
  ${clamp('height', 410, 511)};
  padding-top: 1rem;
  perspective: 1000px;
  position: relative;
  width: 100%;
`

export const ModelsFrontInner = styled.div`
  ${Model};
  bottom: 0;
  left: 50%;
  ${clamp('margin-left', -96, -120)};
  top: 1rem;
  transform-origin: 50% 100%;
  ${clamp('width', 192, 241)};
`

export const ModelCarousel = styled.div`
  ${clamp('border-radius', 24, 25)};
  ${clamp('height', 362, 452)};
  ${clamp('left', 12, 14)};
  overflow: hidden;
  position: absolute;
  ${clamp('right', 12, 14)};
  ${clamp('top', 2, 2)};
  z-index: -1;
`

export const ModalCarouselItem = styled.div.attrs(props => ({
  style: {
    transform: `translateX(${props.x * 100}%)`,
  },
}))`
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: transform 0.6s ${easings.inOut.default};
  z-index: 1;

  &:first-child {
    z-index: 2;
  }
`

export const ModalCarouselImagery = styled.div`
  background-image: url('${props => props.image}');
  background-size: cover;
  background-position: 50% 0%;
  background-repeat: no-repeat;
  height: 100%;
  padding-left: 5%;
  padding-right: 5%;
  width: 100%;
`

export const ModalCarouselImageryBottom = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
`

export const ModelsShimmer = styled.div`
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0) 50%
  );
  ${clamp('height', 51, 240)};
  ${clamp('left', -10, -40)};
  position: absolute;
  ${clamp('top', -10, -50)};
  ${clamp('width', 51, 140)};
  z-index: 4;
`

export const ModelsBack = styled.div`
  ${Model}
  ${clamp('bottom', 101, 270)};
  ${clamp('height', 111, 200)};
  ${clamp('left', 200, 320)};
  ${clamp('width', 80, 143)};
  z-index: 2;

  img {
    transform: rotateZ(-12deg);
    transform-origin: 0% 100%;
  }
`

export const ModelsShadow = styled.div`
  ${Model}
  bottom: 0;
  ${clamp('height', 51, 91)};
  left: 50%;
  ${clamp('margin-left', -111, -214)};
  ${clamp('width', 222, 428)};
  z-index: 1;
`
