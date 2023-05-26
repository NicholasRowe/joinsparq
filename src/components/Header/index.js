import React, { useState, useEffect } from 'react'
import {
  useStore,
  setHeader,
  showNewsletterForm,
  showCheckoutForm,
} from '../../Store'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'
import PageTransitionLink from '../PageTransitionLink'
import Container from '../Container'
import {
  HeaderContainer,
  HeaderPreLogo,
  HeaderLogo,
  HeaderLogoText,
  HeaderLogoShapes,
  HeaderMain,
  HeaderMenu,
  HeaderMenuItem,
  HeaderNav,
} from './index.style'
import Logo from '../svgs/Logo'
import LogoShape from '../svgs/LogoShape'
import Button from '@components/Button'
import { graphql, useStaticQuery } from 'gatsby'

const Header = () => {
  const [store, dispatch] = useStore()
  const { showPageMask, header, pathname } = store

  const { contentfulGlobals } = useStaticQuery(graphql`
    query {
      contentfulGlobals {
        salesFunnelMode
      }
    }
  `)

  const { salesFunnelMode } = contentfulGlobals
  const newsletterMode = salesFunnelMode === 'Newsletter'

  const [scrolled, setScrolled] = useState(false),
    [down, setDown] = useState(true),
    [showLink, setShowLink] = useState(true)

  useEffect(() => {
    if (!store.scroll) return

    let previousScroll = 0,
      finalScrollTimeout = null

    const checkFinalScroll = () => {
      if (store.scroll.scroll.instance.scroll.y <= 10) {
        setScrolled(false)
        setDown(true)
      }
    }

    const scrollUpdate = () => {
      if (finalScrollTimeout) clearTimeout(finalScrollTimeout)

      if (store.scroll.scroll.instance.scroll.y > 10) {
        setScrolled(true)

        if (store.scroll.scroll.instance.scroll.y > previousScroll + 5) {
          setDown(true)
          previousScroll = store.scroll.scroll.instance.scroll.y
        } else if (store.scroll.scroll.instance.scroll.y < previousScroll - 5) {
          setDown(false)
          previousScroll = store.scroll.scroll.instance.scroll.y
        }
      } else {
        setScrolled(false)
        setDown(true)
        previousScroll = store.scroll.scroll.instance.scroll.y
      }

      finalScrollTimeout = setTimeout(checkFinalScroll, 750)
    }

    store.scroll.on('scroll', scrollUpdate)

    return () => {
      store.scroll.off('scroll', scrollUpdate)
    }
  }, [store.scroll])

  useEffect(() => {
    setScrolled(false)
    setDown(true)
    setHeader(dispatch, `dark`)
    setShowLink(pathname !== '/confirmation/')
  }, [pathname, dispatch])

  return (
    <>
      <HeaderContainer>
        <Container>
          <HeaderMain>
            <HeaderLogo>
              <HeaderPreLogo
                onClick={() => {}}
                id={`pre-logo`}
                aria-label={`Top of page`}
              />
              <PageTransitionLink to="/">
                <HeaderLogoShapes side={'left'} show={true} colorMode={header}>
                  <LogoShape />
                  <LogoShape />
                </HeaderLogoShapes>
                <HeaderLogoText show={!scrolled}>
                  <Logo />
                </HeaderLogoText>
              </PageTransitionLink>
            </HeaderLogo>

            <HeaderNav show={showLink}>
              <HeaderMenu>
                <HeaderMenuItem colorMode={header}>
                  <AnimateSlideIn
                    animate={!showPageMask && down}
                    animateOut={!down}
                    delay={0.2}
                  >
                    <Button
                      variant={'secondary'}
                      size={'small'}
                      onClick={() =>
                        newsletterMode
                          ? showNewsletterForm(dispatch)
                          : showCheckoutForm(dispatch)
                      }
                      label={'Sign up to the SPARQ waiting list'}
                    >
                      Get SPARQ
                    </Button>
                  </AnimateSlideIn>
                </HeaderMenuItem>
              </HeaderMenu>
            </HeaderNav>
          </HeaderMain>
        </Container>
      </HeaderContainer>
    </>
  )
}

export default Header
