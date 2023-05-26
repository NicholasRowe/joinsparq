import React, { forwardRef } from 'react'
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  TextBodyLarge,
  TextBody,
  TextBodySmall,
  Cta,
} from '../../styles/vars/textStyles.style'

const ThisHeading1 = forwardRef(
  ({ children, as, color, maxWidth, ...props }, ref) => (
    <Heading1 ref={ref} as={as} color={color} maxWidth={maxWidth} {...props}>
      {children}
    </Heading1>
  )
)

const ThisHeading2 = forwardRef(
  ({ children, as, color, maxWidth, ...props }, ref) => (
    <Heading2 ref={ref} as={as} color={color} maxWidth={maxWidth} {...props}>
      {children}
    </Heading2>
  )
)

const ThisHeading3 = forwardRef(
  ({ children, as, color, maxWidth, ...props }, ref) => (
    <Heading3 ref={ref} as={as} color={color} maxWidth={maxWidth} {...props}>
      {children}
    </Heading3>
  )
)

const ThisHeading4 = forwardRef(
  ({ children, as, color, maxWidth, ...props }, ref) => (
    <Heading4 ref={ref} as={as} color={color} maxWidth={maxWidth} {...props}>
      {children}
    </Heading4>
  )
)

const ThisBodyLarge = forwardRef(
  ({ children, as, color, maxWidth, ...props }, ref) => (
    <TextBodyLarge
      ref={ref}
      as={as}
      color={color}
      maxWidth={maxWidth}
      {...props}
    >
      {children}
    </TextBodyLarge>
  )
)

const ThisTextBody = forwardRef(
  ({ children, as, color, maxWidth, ...props }, ref) => (
    <TextBody ref={ref} as={as} color={color} maxWidth={maxWidth} {...props}>
      {children}
    </TextBody>
  )
)

const ThisTextBodySmall = forwardRef(
  ({ children, as, color, maxWidth, ...props }, ref) => (
    <TextBodySmall
      ref={ref}
      as={as}
      color={color}
      maxWidth={maxWidth}
      {...props}
    >
      {children}
    </TextBodySmall>
  )
)

const ThisCta = forwardRef(
  ({ children, as, color, maxWidth, ...props }, ref) => (
    <Cta ref={ref} as={as} color={color} maxWidth={maxWidth} {...props}>
      {children}
    </Cta>
  )
)

export {
  ThisHeading1 as Heading1,
  ThisHeading2 as Heading2,
  ThisHeading3 as Heading3,
  ThisHeading4 as Heading4,
  ThisBodyLarge as TextBodyLarge,
  ThisTextBody as TextBody,
  ThisTextBodySmall as TextBodySmall,
  ThisCta as Cta,
}
