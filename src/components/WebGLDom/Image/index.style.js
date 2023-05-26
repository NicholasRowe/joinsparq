import styled from 'styled-components'

export const ImageEl = styled.img`
  border-radius: ${props => (props.borderRadius ? props.borderRadius : 0)}px;
  opacity: ${props => (props.webgl ? 0 : 1)};
`
