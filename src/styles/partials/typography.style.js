import { css } from 'styled-components'
import { font } from '../vars/font.style'
import { colors } from '../vars/colors.style'
import { transparentize } from 'polished'
import { easings } from '@styles/vars/easings.style'

export const typography = css`
  html {
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-size: 1.8rem;
    font-family: ${font.primary.family}, ${font.fallback.family};
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    background-color: ${colors.grey};
    color: ${colors.dark};
  }

  /* Links */
  a {
    color: ${colors.orange};
    transition: color 0.4s ${easings.inOut.default};

    &[disabled] {
      opacity: 0.5;
      cursor: default;
    }

    &:hover {
      color: ${colors.lightorange};
    }
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  /* Forms */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  /* Selection */
  ::-moz-selection {
    background: ${transparentize(0.5, colors.orange)};
    color: ${colors.dark};
    text-shadow: none;
  }

  ::selection {
    background: ${transparentize(0.5, colors.orange)};
    color: ${colors.dark};
    text-shadow: none;
  }

  /* Focus */
  *:focus {
    outline: none;

    .add-focus &:focus-visible {
      outline: ${transparentize(0.5, colors.dark)} auto 0.2rem;
      outline-style: solid;
    }
  }
`
