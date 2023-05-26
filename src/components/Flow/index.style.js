import styled from 'styled-components'

export const FlowMain = styled.div`
  ${({ direction }) => {
    if (direction === 'horizontal') {
      return `
        display: flex;
        align-items: center;
        justify-content: flex-start;
      `
    }
  }}

  > * + * {
    margin-top: ${({ spaceScale, direction }) =>
      direction === 'vertical' ? `${spaceScale}rem` : undefined};
    margin-left: ${({ spaceScale, direction }) =>
      direction === 'horizontal' ? `${spaceScale}rem` : undefined};
  }
`
