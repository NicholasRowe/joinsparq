import styled from 'styled-components'

export const SceneDebug = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
`

export const SceneWrapper = styled.div`
  position: ${props => (props.mobile ? `fixed` : `absolute`)};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.zIndex};
`

export const SceneCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`
