import styled from 'styled-components'
import { clamp } from '../../styles/utils/conversion.style'

function getMinHeight({ axis, size }) {
  if (axis === 'horizontal') {
    return 'min-height: 0.1rem;'
  } else {
    if (typeof size === 'number') {
      return `min-height: ${size / 10}rem;`
    } else {
      return clamp('min-height', size[0], size[1])
    }
  }
}

function getMinWidth({ axis, size }) {
  if (axis === 'vertical') {
    return 'min-width: 0.1rem;'
  } else {
    if (typeof size === 'number') {
      return `min-width: ${size / 10}rem;`
    } else {
      return clamp('min-width', size[0], size[1])
    }
  }
}

export const SpacerMain = styled.span`
  display: block;
  ${getMinWidth}
  ${getMinHeight}
`
