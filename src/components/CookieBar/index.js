import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useStore } from '@Store/'
import { useLocation } from '@reach/router'
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
import Link from '@components/Link'
import { CookieBarMain, CookieBarWrapper, CookieBarText } from './index.style'
import { TextBodySmall } from '@styles/vars/textStyles.style'
import Button from '@components/Button'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'

const CookieBar = () => {
  const [store] = useStore()
  const { showPageMask } = store

  const { contentfulGlobals } = useStaticQuery(graphql`
    query {
      contentfulGlobals {
        privacyPage {
          slug
          seoTitle
        }
      }
    }
  `)

  const analyticsKey = 'gatsby-gdpr-google-analytics'
  const fbPixelKey = 'gatsby-gdpr-facebook-pixel'
  const location = useLocation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const cookie = document.cookie

    if (cookie.length === 0) {
      setShow(true)
    } else {
      let accepted = cookie
        .split('; ')
        .find(row => row.startsWith(`${analyticsKey}=`))

      if (accepted) {
        accepted = accepted.split('=')[1]
      }

      if (accepted === 'true') {
        setShow(false)
      } else {
        setShow(true)
      }
    }
  }, [])

  const enableCookies = () => {
    document.cookie = `${analyticsKey}=true;path=/`
    document.cookie = `${fbPixelKey}=true;path=/`
    initializeAndTrack(location)
    setShow(false)
  }

  return (
    <CookieBarMain show={show && !showPageMask} aria-hidden={!show}>
      <CookieBarWrapper show={show && !showPageMask}>
        <CookieBarText>
          <AnimateSlideIn
            animate={show && !showPageMask}
            animateOut={!show}
            delay={1.2}
          >
            <TextBodySmall>
              This site uses cookies. View our <br />
              <Link
                to={`/${contentfulGlobals.privacyPage.slug}`}
                label={contentfulGlobals.privacyPage.seoTitle}
              >
                Privacy Policy
              </Link>{' '}
              for more information.
            </TextBodySmall>
          </AnimateSlideIn>
        </CookieBarText>
        <AnimateSlideIn
          animate={show && !showPageMask}
          animateOut={!show}
          delay={1.4}
        >
          <Button variant={'secondary'} size={'small'} onClick={enableCookies}>
            Ok
          </Button>
        </AnimateSlideIn>
      </CookieBarWrapper>
    </CookieBarMain>
  )
}

export default CookieBar
