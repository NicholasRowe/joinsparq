import React from 'react'
import { useStore, speedUp, slowDown } from '@Store/'
import PropTypes from 'prop-types'
import {
  ButtonContent,
  ButtonMain,
  ButtonFill,
  ButtonDot,
  ButtonIcon,
} from './index.style'
import { Cta } from '../TextStyles'
import PageTransitionLink from '../PageTransitionLink'

/**
 *
 * @prop type
 * Defines the markup and functionality
 * @prop variant
 * Defines the visual style
 * @prop size
 * Defines the visual size
 * @prop href
 * If defined this renders the component as an anchor element with an href attribute <a href={href} />
 * @prop to
 * If type is internalLink this is the url used in the PageTransitionLink component
 * @prop label
 * If defined this adds an aria-label to the component. Necessary for icon only buttons.
 */

const Button = ({
  type,
  variant,
  size,
  disabled,
  keyboard,
  href,
  to,
  label,
  iconLeft,
  iconRight,
  onClick,
  children,
  ...props
}) => {
  const [, dispatch] = useStore()

  return (
    <>
      {type === 'button' && (
        <ButtonMain
          as="button"
          variant={variant}
          size={size}
          disabled={disabled}
          keyboard={keyboard}
          aria-label={label}
          onClick={onClick}
          onMouseEnter={() => speedUp(dispatch)}
          onMouseLeave={() => slowDown(dispatch)}
          {...props}
        >
          <ButtonFill />
          {children && <ButtonDot />}
          <ButtonContent>
            {iconLeft && <ButtonIcon left>{iconLeft}</ButtonIcon>}
            {children && <Cta>{children}</Cta>}
            {iconRight && <ButtonIcon right>{iconRight}</ButtonIcon>}
          </ButtonContent>
        </ButtonMain>
      )}

      {type === 'externalLink' && (
        <ButtonMain
          as="a"
          href={href}
          variant={variant}
          size={size}
          disabled={disabled}
          keyboard={keyboard}
          aria-label={label}
          onClick={onClick}
          {...props}
        >
          <ButtonFill />
          {children && <ButtonDot />}
          <ButtonContent>
            {iconLeft && <ButtonIcon left>{iconLeft}</ButtonIcon>}
            {children && <Cta>{children}</Cta>}
            {iconRight && <ButtonIcon right>{iconRight}</ButtonIcon>}
          </ButtonContent>
        </ButtonMain>
      )}

      {type === 'internalLink' && (
        <PageTransitionLink to={to} onClick={onClick}>
          <ButtonMain
            as="div"
            variant={variant}
            size={size}
            disabled={disabled}
            keyboard={keyboard}
            aria-label={label}
            {...props}
          >
            <ButtonFill />
            {children && <ButtonDot />}
            <ButtonContent>
              {iconLeft && <ButtonIcon left>{iconLeft}</ButtonIcon>}
              {children && <Cta>{children}</Cta>}
              {iconRight && <ButtonIcon right>{iconRight}</ButtonIcon>}
            </ButtonContent>
          </ButtonMain>
        </PageTransitionLink>
      )}
    </>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'internalLink', 'externalLink']).isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  size: PropTypes.oneOf(['large', 'small']),
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  keyboard: PropTypes.bool,
  href: function (props, propName) {
    if (
      props['type'] === 'externalLink' &&
      (props[propName] === undefined || typeof props[propName] !== 'string')
    ) {
      return new Error('Please provide a href prop!')
    }
  },
  to: function (props, propName) {
    if (
      props['type'] === 'internalLink' &&
      (props[propName] === undefined || typeof props[propName] !== 'string')
    ) {
      return new Error('Please provide a to prop!')
    }
  },
  label: PropTypes.string,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  onClick: function (props, propName) {
    if (
      props['type'] === 'button' &&
      (props[propName] === undefined || typeof props[propName] !== 'function')
    ) {
      return new Error('Please provide an onClick function!')
    }
  },
  children: PropTypes.node,
}

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  size: 'large',
}

export default Button
