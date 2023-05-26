import styled from 'styled-components'

export const ScrollBlock = styled.div`
  position: relative;
  z-index: ${props => props.zIndex};

  ${props =>
    props.topGapFiller &&
    `
    &:before {
      background-color: ${props.topGapFiller};
      content: "";
      height: .5rem;
      left: 0;
      position: absolute;
      right: 0;
      top: -.2rem;
      z-index: 2;
    }
  `}
`
