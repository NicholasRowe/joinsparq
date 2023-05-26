import styled from 'styled-components'
import { transparentize } from 'polished'
import { colors } from '../../../styles/vars/colors.style'

export const BlockquoteMain = styled.blockquote`
  position: relative;
  padding-left: calc(0.5em + 0.4rem);

  .split__text:before,
  .split__text:after {
    content: '"';
    display: inline;
  }
`

export const BlockquoteBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 0.4rem;
  background-color: ${transparentize(0.5, colors.dark)};
`
