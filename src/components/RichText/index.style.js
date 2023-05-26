import { colors } from '@styles/vars/colors.style'
import styled from 'styled-components'
import { flow } from '../../styles/utils/functions.style'
import { easings } from '../../styles/vars/easings.style'
import { font } from '../../styles/vars/font.style'
import {
  Heading3,
  TextBody,
  TextBodySmall,
} from '../../styles/vars/textStyles.style'

export const RichTextMain = styled.div`
  ${flow(2)}

  > * + ${Heading3} {
    margin-top: 6rem;
  }

  strong,
  em,
  u,
  a {
    display: inline-block;
  }

  strong {
    white-space: break-spaces;
  }

  a {
    text-decoration: underline;
  }
`

export const UnorderedList = styled.ul`
  list-style: none;
`

export const OrderedList = styled.ol`
  counter-reset: ol;
  list-style: none;
  padding-left: 1em;

  & & {
    margin-top: 1em;
  }
`

export const ListItem = styled.li`
  ${TextBody},
  ${TextBodySmall} {
    position: relative;

    :before {
      counter-increment: ol;
      position: absolute;
      left: 0.1em;
      display: block;
      overflow: hidden;
      opacity: ${props => (props.inView && props.animate ? 1 : 0)};
      transition: opacity 0.3s ${easings.inOut.default};
      transition-delay: ${props => `${props.delay + 0.05}s`};
    }

    ul & {
      padding-left: 1.2em;

      :before {
        content: '';
        top: 0.6em;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background-color: ${colors.orange};
      }
    }

    ol & {
      padding-left: 1.8em;

      :before {
        content: counter(ol) '.';
        top: 0;
        font-weight: ${font.primary.weight.regular};
      }
    }
    ol ol & {
      :before {
        content: counter(ol, lower-alpha) '.';
      }
    }
  }

  & + & {
    margin-top: 0.2em;
  }

  div + div > & {
    margin-top: 1em;
  }
`
export const Table = styled.table`
  border: 1px solid;
  td, th{
    border: 1px solid;
    padding: 4px 6px;
  }
  border-collapse: collapse;
  >tbody tr {
    text-align:center;
  }
  >tbody tr:first-child p{
    font-weight: 800;
  }
`