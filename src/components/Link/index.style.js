import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'

export const LinkMain = styled.a`
  position: relative;
  display: inline-flex;
  cursor: pointer;
  text-decoration: none;
`

export const LinkContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;

  > span > span {
    &:first-child {
      display: none;

      ${mq.tabletL} {
        display: block;
      }
    }
    &:last-child {
      ${mq.tabletL} {
        display: none;
      }
    }
  }
`

export const LinkIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  margin-left: ${props => (props.right ? '0.5em' : undefined)};
  margin-right: ${props => (props.left ? '0.5em' : undefined)};

  svg {
    width: 100%;
  }
`
