import styled from 'styled-components'
import { font } from '../vars/font.style'
import { clamp } from '../utils/conversion.style'

export const textStylesConfig = {
  heading1: {
    family: font.primary.family,
    weight: font.primary.weight.light,
    size: {
      min: 45,
      max: 92,
    },
    lineHeight: 1.05,
    letterSpacing: -0.02,
  },
  heading2: {
    family: font.primary.family,
    weight: font.primary.weight.light,
    size: {
      min: 35,
      max: 68,
    },
    lineHeight: 1.05,
    letterSpacing: -0.02,
  },
  heading3: {
    family: font.primary.family,
    weight: font.primary.weight.light,
    size: {
      min: 30,
      max: 35,
    },
    lineHeight: 1.05,
    letterSpacing: -0.01,
  },
  heading4: {
    family: font.primary.family,
    weight: font.primary.weight.medium,
    size: {
      min: 16,
      max: 21,
    },
    lineHeight: 1.05,
    letterSpacing: 0,
  },
  bodyLarge: {
    family: font.primary.family,
    weight: font.primary.weight.light,
    size: {
      min: 16,
      max: 30,
    },
    lineHeight: 1.3,
    letterSpacing: -0.01,
  },
  body: {
    family: font.primary.family,
    weight: font.primary.weight.light,
    size: {
      min: 14,
      max: 21,
    },
    lineHeight: 1.4,
    letterSpacing: 0,
  },
  bodySmall: {
    family: font.primary.family,
    weight: font.primary.weight.light,
    size: {
      min: 12,
      max: 16,
    },
    lineHeight: 1.4,
    letterSpacing: 0,
  },
  cta: {
    family: font.primary.family,
    weight: font.primary.weight.medium,
    size: {
      min: 14,
      max: 18,
    },
    lineHeight: 1.05,
    letterSpacing: 0,
  },
}

export const getStyles = style => `
${clamp('font-size', style.size.min, style.size.max)}
  font-family: ${style.family};
  font-weight: ${style.weight};
  line-height: ${style.lineHeight};
  ${style.letterSpacing ? `letter-spacing: ${style.letterSpacing}em` : ''};
  ${style.uppercase ? 'text-transform: uppercase' : ''};
`

export const Heading1 = styled.p`
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}em` : undefined)};
  ${getStyles(textStylesConfig.heading1)}
  color: ${props => (props.color ? props.color : undefined)};
`

export const Heading2 = styled.p`
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}em` : undefined)};
  ${getStyles(textStylesConfig.heading2)}
  color: ${props => (props.color ? props.color : undefined)};
`

export const Heading3 = styled.p`
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}em` : undefined)};
  ${getStyles(textStylesConfig.heading3)}
  color: ${props => (props.color ? props.color : undefined)};
`

export const Heading4 = styled.p`
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}em` : undefined)};
  ${getStyles(textStylesConfig.heading4)}
  color: ${props => (props.color ? props.color : undefined)};
`

export const TextBodyLarge = styled.p`
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}em` : undefined)};
  ${getStyles(textStylesConfig.bodyLarge)}
  color: ${props => (props.color ? props.color : undefined)};
`

export const TextBody = styled.p`
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}em` : undefined)};
  ${getStyles(textStylesConfig.body)}
  color: ${props => (props.color ? props.color : undefined)};
`

export const TextBodySmall = styled.p`
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}em` : undefined)};
  ${getStyles(textStylesConfig.bodySmall)}
  color: ${props => (props.color ? props.color : undefined)};
`

export const Cta = styled.span`
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}em` : undefined)};
  ${getStyles(textStylesConfig.cta)}
  color: ${props => (props.color ? props.color : undefined)};
`
