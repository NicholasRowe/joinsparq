import styled from 'styled-components'
import TransitionLink from 'gatsby-plugin-transition-link'

export const PageTransitionLinkMain = styled(TransitionLink)`
  display: inline-flex;
  text-decoration: none;
  border: none;

  ${({ fill }) => {
    if (fill) {
      return `
        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: block;
          height: auto;
        }
      `
    }
  }}
`
