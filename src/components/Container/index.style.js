import styled from 'styled-components'
import { clamp } from '../../styles/utils/conversion.style'
import { breakpoints } from '../../styles/vars/breakpoints.style'

export const paddingMin = 30
export const paddingMax = 48

export const ContainerMain = styled.div`
  width: 100%;
  max-width: ${props =>
    props.fullWidth ? undefined : `${breakpoints.contained / 10}rem`};
  margin: 0 auto;
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
  overflow: ${props => (props.allowOverflow ? undefined : 'hidden')};
`
