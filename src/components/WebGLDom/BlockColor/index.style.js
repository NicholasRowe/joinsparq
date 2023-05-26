import styled from 'styled-components'

export const BlockColorEl = styled.div`
  background-color: ${props => props.bgColor};
  visibility: ${props => (props.webgl ? 'hidden' : 'visible')};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${props => props.zIndex};
`
