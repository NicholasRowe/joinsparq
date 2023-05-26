import React from 'react'
import PropTypes from 'prop-types'
import { showPageMask, updatePathname, useStore } from '../../Store'
import { animation } from '../../styles/vars/animation.style'
import { PageTransitionLinkMain } from './index.style'

const PageTransitionLink = ({
  children,
  to,
  fill = false,
  onClick,
  ...props
}) => {
  const [store, dispatch] = useStore()
  const preLogo =
    typeof document !== 'undefined' ? document.getElementById('pre-logo') : null

  return (
    <PageTransitionLinkMain
      to={to}
      exit={{
        delay: animation.maskShowDuration,
        length: 0,
        zIndex: 2,
      }}
      entry={{
        delay: 0,
        length: animation.maskHideDuration,
        zIndex: 1,
        trigger: () => {
          if (preLogo) preLogo.focus()
        },
      }}
      fill={fill ? 'true' : undefined}
      {...props}
      onClick={() => {
        if (onClick) {
          onClick()
        }

        if (
          to.indexOf(store.pathname) === -1 ||
          to.length !== store.pathname.length
        ) {
          updatePathname(dispatch, to)
          showPageMask(dispatch)
        }
      }}
    >
      {children}
    </PageTransitionLinkMain>
  )
}

PageTransitionLink.propTypes = {
  children: PropTypes.node,
  fill: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
}

export default PageTransitionLink
