import React from 'react'
import { useStore, setCursor } from '@Store/'
import PropTypes from 'prop-types'
import { LinkContent, LinkMain, LinkIcon } from './index.style'
import PageTransitionLink from '../PageTransitionLink'

/**
 *
 * @prop href
 * If defined this renders the component as an anchor element with an href attribute <a href={href} />
 * @prop to
 * If type is internalLink this is the url used in the PageTransitionLink component
 * @prop label
 * If defined this adds an aria-label to the component. Necessary for icon only buttons.
 */

const Link = ({
  disabled,
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
      {href !== undefined && (
        <LinkMain
          as="a"
          href={href}
          aria-label={label}
          onClick={onClick}
          onMouseEnter={() => setCursor(dispatch, 'hide')}
          onMouseLeave={() => setCursor(dispatch, 'default')}
          {...props}
        >
          <LinkContent>
            {iconLeft && <LinkIcon left>{iconLeft}</LinkIcon>}
            {children}
            {iconRight && <LinkIcon right>{iconRight}</LinkIcon>}
          </LinkContent>
        </LinkMain>
      )}
      {to !== undefined && (
        <PageTransitionLink to={to} onClick={onClick}>
          <LinkMain
            as="span"
            disabled={disabled}
            aria-label={label}
            style={{ transition: `inherit` }}
            onMouseEnter={() => setCursor(dispatch, 'hide')}
            onMouseLeave={() => setCursor(dispatch, 'default')}
          >
            <LinkContent>
              {iconLeft && <LinkIcon left>{iconLeft}</LinkIcon>}
              {children}
              {iconRight && <LinkIcon right>{iconRight}</LinkIcon>}
            </LinkContent>
          </LinkMain>
        </PageTransitionLink>
      )}
    </>
  )
}

Link.propTypes = {
  disabled: PropTypes.bool,
  href: function (props, propName) {
    if (
      (props['to'] === undefined || typeof props['to'] !== 'string') &&
      (props[propName] === undefined || typeof props[propName] !== 'string')
    ) {
      return new Error('Please provide either a href or to prop!')
    }
  },
  to: function (props, propName) {
    if (
      (props['href'] === undefined || typeof props['href'] !== 'string') &&
      (props[propName] === undefined || typeof props[propName] !== 'string')
    ) {
      return new Error('Please provide either a href or to prop!')
    }
  },
  label: PropTypes.string,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  children: PropTypes.node.isRequired,
}

Link.defaultProps = {
  variant: 'primary',
}

export default Link
