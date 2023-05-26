import { colors } from '@styles/vars/colors.style'
import { easings } from '@styles/vars/easings.style'
import styled from 'styled-components'
import { clamp } from '@styles/utils/conversion.style'
import { paddingMin, paddingMax } from '@components/Container/index.style'
import { breakpoints } from '@styles/vars/breakpoints.style'

export const LabCarouselMain = styled.div`
  background-color: ${colors.dark};
  cursor: pointer;
  display: block;
  overflow: hidden;
  position: relative;
`

export const LabCarouselImage = styled.div`
  height: 100%;
  pointer-events: none;
  opacity: ${props => (props.show ? 1 : 0)};
  transform: scale(${props => (props.show ? 1.01 : 1.2)});
  position: relative;
  transition: ${props =>
    props.show
      ? `opacity 2s ${easings.out.default} .4s, transform 3s ${easings.out.default} .2s`
      : `opacity .3s ${easings.in.default}, transform 0s .5s`};
  width: 100%;

  &:nth-child(1n + 2) {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`

export const LabCarouselKeyboardButtons = styled.div`
  bottom: 4rem;
  position: absolute;
  ${clamp(
    'right',
    paddingMin,
    paddingMax,
    breakpoints.mobile,
    breakpoints.tabletL
  )}
`
