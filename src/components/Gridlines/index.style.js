import styled from 'styled-components'
import { transparentize } from 'polished'

export const GridlinesMain = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index: 1000;

  > [data-grid] {
    height: 100%;
  }
`

export const GridlinesColumn = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${transparentize(0.9, 'red')};
`
