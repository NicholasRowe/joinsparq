import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { isMobile } from 'react-device-detect'
import FontFaceObserver from 'fontfaceobserver'

// Components
import {
  useStore,
  updatePathname,
  updatePopState,
  loadFonts,
} from '../../Store'
import TransitionMask from '@components/PageTransitionMask'
import Gridlines from '@components/Gridlines'
import Header from '@components/Header'
import SmoothScroll from '@components/SmoothScroll'
import CookieBar from '@components/CookieBar'
import CheckoutForm from '@components/CheckoutForm'
import NewsletterForm from '@components/NewsletterForm'
import Cursor from '@components/Cursor'

// Fonts
import PlainWOFFLight from '../../fonts/Plain/Plain-Light.woff'
import PlainWOFF2Light from '../../fonts/Plain/Plain-Light.woff2'
import PlainWOFFMedium from '../../fonts/Plain/Plain-Medium.woff'
import PlainWOFF2Medium from '../../fonts/Plain/Plain-Medium.woff2'

// Styles
import { GlobalStyles } from '../../styles/GlobalStyles.style'
import { breakpoints } from '../../styles/vars/breakpoints.style'
import { font } from '../../styles/vars/font.style'
import styled from 'styled-components'
import { colors } from '@styles/vars/colors.style'

const ScrollWrapper = styled.div``

const Layout = ({ children, location }) => {
  const [, dispatch] = useStore()
  const [vw, setVw] = useState(null)
  const [keyMode, setKeyMode] = useState(false)

  const scrollWrapperRef = useRef(null)

  const handleBrowserNavigationInteraction = useCallback(
    e => {
      updatePathname(dispatch, window.location.pathname)
      updatePopState(dispatch)
    },
    [dispatch]
  )

  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    setVw(window.innerWidth)
  }

  const handleWebfontLoad = useCallback(() => {
    const fontA = new FontFaceObserver(font.primary.family)

    fontA.load(null, 15000).then(
      () => {
        loadFonts(dispatch)
      },
      () => {
        console.log('Font is not available')
      }
    )
  }, [dispatch])

  useEffect(() => {
    setViewportHeight()
    handleWebfontLoad()

    window.addEventListener('resize', setViewportHeight)
    window.addEventListener('popstate', handleBrowserNavigationInteraction)

    return () => {
      window.removeEventListener('resize', setViewportHeight)
      window.removeEventListener('popstate', handleBrowserNavigationInteraction)
    }
  }, [dispatch, handleWebfontLoad, handleBrowserNavigationInteraction, setVw])

  const setMouseMode = () => {
    if (!keyMode) return
    setKeyMode(false)
    document.body.classList.remove('add-focus')
  }

  const setKeyboardMode = e => {
    if (keyMode || e.keyCode !== 9) return
    setKeyMode(true)
    document.body.classList.add('add-focus')
  }

  useEffect(() => {
    document.body.addEventListener('mousedown', setMouseMode)
    document.body.addEventListener('keydown', setKeyboardMode)

    return () => {
      document.body.removeEventListener('mousedown', setMouseMode)
      document.body.removeEventListener('keydown', setKeyboardMode)
    }
  })

  return (
    <>
      <GlobalStyles />
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content={colors.grey} />
        <style>{`
          @font-face {
            font-family: 'Plain';
            src: url(${PlainWOFFLight}) format('woff'),
              url(${PlainWOFF2Light}) format('woff2');
            font-weight: ${font.primary.weight.light};
          }
          @font-face {
            font-family: 'Plain';
            src: url(${PlainWOFFMedium}) format('woff'),
              url(${PlainWOFF2Medium}) format('woff2');
            font-weight: ${font.primary.weight.medium};
          }
        `}</style>
        <script type="text/javascript">
          window._mfq = window._mfq || []; var mf =
          document.createElement("script"); mf.type = "text/javascript";
          mf.defer = true; mf.src =
          "//cdn.mouseflow.com/projects/28d10850-7327-4fcc-8777-49649c7bc159.js";
          document.getElementsByTagName("head")[0].appendChild(mf);
        </script>
      </Helmet>

      <Gridlines show={false} />

      <SmoothScroll callbacks={location} desktop={vw > breakpoints.tabletL} />

      <TransitionMask />

      <ScrollWrapper
        ref={scrollWrapperRef}
        id="scroll-container"
        data-scroll-container
      >
        <Header pathname={location.pathname} />
        {children}
        <CheckoutForm />
        <NewsletterForm />
        <CookieBar />
      </ScrollWrapper>

      {!isMobile ? <Cursor /> : null}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
