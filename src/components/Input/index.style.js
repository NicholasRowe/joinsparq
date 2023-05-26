import styled from 'styled-components'
import { font } from '@styles/vars/font.style'
import { clamp, getClampValue } from '@styles/utils/conversion.style'
import { colors } from '@styles/vars/colors.style'
import { easings } from '../../styles/vars/easings.style'

export const InputMain = styled.div`
  ${clamp('margin-top', 20, 30)};
  position: relative;
`

export const InputField = styled.input`
  background-color: transparent;
  border: 0.1rem solid #c4c4c4;
  ${clamp('border-radius', 50, 70)};
  ${clamp('font-size', 14, 16)};
  font-weight: ${font.primary.weight.light};
  ${clamp('padding-bottom', 12, 19)};
  ${clamp('padding-left', 20, 20)};
  ${clamp('padding-right', 20, 20)};
  ${clamp('padding-top', 12, 19)};
  width: 100%;
`

export const InputLabel = styled.label`
  color: ${colors.midgrey};
  left: 2rem;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: ${props =>
    props.show
      ? `translateY(-50%)`
      : `translateY(-50%) translateX(-2rem)
    translateY(${getClampValue(-40, -50)}) scale(0.9)`};
  transform-origin: 0% 100%;
  transition: transform 0.4s ${easings.inOut.default};

  ${InputField}:focus + & {
    transform: translateY(-50%) translateX(-2rem)
      translateY(${getClampValue(-40, -50)}) scale(0.9);
  }
`
