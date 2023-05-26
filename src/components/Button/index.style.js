import styled, { css } from 'styled-components'
import { colors } from '@styles/vars/colors.style'
import { clamp } from '@styles/utils/conversion.style'
import { easings } from '@styles/vars/easings.style'
import { mq } from '@styles/vars/media-queries.style'

export const ButtonFill = styled.span`
  border-radius: inherit;
  bottom: 0;
  content: '';
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(-102%);
  z-index: 1;
  transition: transform 0.7s ${easings.inOut.default};
  will-change: transform;
`

export const ButtonDot = styled.span`
  background-color: currentColor;
  border-radius: 50%;
  height: 1.2rem;
  margin-top: -0.6rem;
  position: absolute;
  top: 50%;
  transform: scale(0);
  transition: transform 0.4s ${easings.inOut.default};
  width: 1.2rem;
  z-index: 2;
`

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: color 0.3s ${easings.out.default},
    opacity 0.5s ${easings.inOut.default},
    transform 0.7s ${easings.inOut.default};
  white-space: nowrap;
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

export const ButtonMain = styled.button`
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  border: 0.1rem solid ${colors.orange};
  z-index: 2;

  ${mq.desk} {
    :not(:disabled):hover {
      ${ButtonDot} {
        transform: scale(1);
        transition: transform 0.7s ${easings.inOut.default};
      }
      ${ButtonFill} {
        transform: translateX(0);
      }
      ${ButtonDot} + ${ButtonContent} {
        transform: translateX(1.2rem);
      }
    }
  }

  &[disabled] {
    cursor: default;
    color: ${colors.light};
    background-color: ${colors.darkgrey};
    border-color: ${colors.darkgrey};
  }

  ${props =>
    props.keyboard &&
    `
    left: -200vw;
    position: absolute;

    &:focus {
      left: auto;
      position: relative;
    }
  `}

  ${({ variant }) => {
    if (variant === 'primary') {
      return ButtonPrimary
    }

    if (variant === 'secondary') {
      return ButtonSecondary
    }

    if (variant === 'tertiary') {
      return ButtonTertiary
    }
  }}

  ${({ size }) => {
    if (size === 'large') {
      return ButtonLarge
    }

    if (size === 'small') {
      return ButtonSmall
    }
  }}
`

const ButtonPrimary = css`
  color: ${colors.light};
  background-color: ${colors.orange};
  border: none;
  transition-property: background-color, color;
  transition-duration: 0.2s;
  transition-timing-function: ${easings.inOut.default};

  ${mq.desk} {
    :not(:disabled):hover {
      color: ${colors.light};
    }
  }

  ${ButtonFill} {
    background-color: ${colors.lightorange};
  }
`

const ButtonSecondary = css`
  color: ${colors.dark};
  background-color: transparent;
  transition-property: background-color, color;
  transition-duration: 0.2s;
  transition-timing-function: ${easings.inOut.default};

  &[disabled] {
    color: ${colors.darkgrey};
    background-color: transparent;
    border-color: ${colors.darkgrey};
  }

  ${mq.desk} {
    :not(:disabled):hover {
      color: ${colors.light};
    }
  }

  ${ButtonFill} {
    background-color: ${colors.lightorange};
  }

  ${ButtonDot} {
    background-color: ${colors.light};
  }
`

const ButtonTertiary = css`
  color: ${colors.light};
  background-color: transparent;
  border: 0.1rem solid ${colors.light};
  transition-property: background-color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ${easings.inOut.default};

  ${mq.desk} {
    :not(:disabled):hover {
      color: ${colors.light};
    }
  }

  ${ButtonFill} {
    background-color: ${colors.lightorange};
  }
`

const ButtonLarge = css`
  ${clamp('border-radius', 50, 70)};
  ${clamp('padding-bottom', 17, 25)};
  ${clamp('padding-left', 16, 50)};
  ${clamp('padding-right', 16, 50)};
  ${clamp('padding-top', 17, 25)};

  ${ButtonDot} {
    ${clamp('left', 16, 50)};
    margin-left: -1.2rem;
  }
`

const ButtonSmall = css`
  ${clamp('border-radius', 36, 50)};
  ${clamp('padding-bottom', 9, 15)};
  ${clamp('padding-left', 12, 32)};
  ${clamp('padding-right', 12, 32)};
  ${clamp('padding-top', 10, 15)};

  ${mq.desk} {
    ${clamp('padding-left', 20, 33)};
    ${clamp('padding-right', 20, 33)};
  }

  ${ButtonDot} {
    ${clamp('left', 12, 30)};
    margin-left: -0.8rem;
  }
`

export const ButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;

  svg {
    width: 100%;
  }
`
