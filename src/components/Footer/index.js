import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useInView } from 'react-intersection-observer'
import { useStore } from '@Store/'
import PageTransitionLink from '../PageTransitionLink'
import ScrollSection from '@components/ScrollSection'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import Container from '@components/Container'
import Link from '@components/Link'
import { Link as GatsbyLink } from 'gatsby'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'
import { animation } from '@styles/vars/animation.style'
import Spacer from '@components/Spacer'
import Logo from '../svgs/Logo'
import LogoShape from '../svgs/LogoShape'
import {
  FooterMain,
  FooterLogo,
  FooterLogoShapes,
  FooterLogoText,
  FooterText,
  FooterCopyright,
  FooterLinks,
  FooterLink,
  FooterSocials,
  FooterSocialLink,
} from './index.style'
import { TextBodySmall } from '@components/TextStyles'
import { colors } from '@styles/vars/colors.style'

const Footer = () => {
  const { contentfulGlobals } = useStaticQuery(graphql`
    query {
      contentfulGlobals {
        additionalFooterMenuItems {
          slug
          seoTitle
        }
        footerAddressRich {
          raw
        }
        footerCopyright
        instagramUrl
        twitterUrl
        discordUrl
        facebookUrl
        linkedInUrl
      }
    }
  `)

  const [inViewRef, inView] = useInView({ triggerOnce: true })
  const [store] = useStore()
  const { showPageMask } = store
  const { facebookUrl, instagramUrl, linkedInUrl, twitterUrl } =
    contentfulGlobals
  const currentTime = new Date()
  const year = currentTime.getFullYear()
  // const socialLinks = [
  //   {
  //     label: 'Instagram',
  //     url: contentfulGlobals.instagramUrl,
  //   },
  //   {
  //     label: 'Twitter',
  //     url: contentfulGlobals.twitterUrl,
  //   },
  //   {
  //     label: 'Discord',
  //     url: contentfulGlobals.discordUrl,
  //   },
  //   {
  //     label: 'Facebook',
  //     url: contentfulGlobals.facebookUrl,
  //   },
  // ]

  return (
    <ScrollSection>
      <FooterMain ref={inViewRef}>
        <Spacer size={30} />
        <Container>
          <Grid>
            <GridItem tabletL={4}>
              <FooterLogo>
                <PageTransitionLink to="/">
                  <FooterLogoShapes
                    side={'left'}
                    show={inView && !showPageMask}
                  >
                    <LogoShape fill={colors.light} />
                    <LogoShape fill={colors.light} />
                  </FooterLogoShapes>
                  <FooterLogoText show={inView && !showPageMask}>
                    <Logo label={`footerLogo`} fill={colors.light} />
                  </FooterLogoText>
                </PageTransitionLink>
              </FooterLogo>
            </GridItem>
            <GridItem tabletL={8}>
              <FooterText>
                <FooterCopyright>
                  <TextBodySmall>
                    <AnimateSplitText
                      delay={animation.textDelay + animation.lineDuration}
                    >
                      {contentfulGlobals.footerCopyright.replaceAll(
                        '{year}',
                        year
                      )}
                    </AnimateSplitText>
                  </TextBodySmall>
                </FooterCopyright>
                <FooterLinks>
                  {React.Children.toArray(
                    contentfulGlobals.additionalFooterMenuItems.map(
                      (item, itemIndex) => (
                        <FooterLink>
                          <AnimateSlideIn
                            delay={
                              animation.textDelay +
                              animation.lineDuration * (2 + itemIndex)
                            }
                          >
                            <Link to={`/${item.slug}`} label={item.seoTitle}>
                              <TextBodySmall>{item.seoTitle}</TextBodySmall>
                            </Link>
                          </AnimateSlideIn>
                        </FooterLink>
                      )
                    )
                  )}
                </FooterLinks>
                <FooterSocials>
                  <FooterSocialLink>
                    <GatsbyLink
                      to={facebookUrl}
                      target="_blank"
                      label="Facebook"
                    >
                      <img
                        src="/icons/facebook-icon.svg"
                        alt="Instagram"
                        width={16}
                        height={16}
                      />
                    </GatsbyLink>
                  </FooterSocialLink>
                  <FooterSocialLink>
                    <GatsbyLink
                      to={instagramUrl}
                      target="_blank"
                      label="Instagram"
                    >
                      <img
                        src="/icons/instagram-icon.svg"
                        alt="Instagram"
                        width={16}
                        height={16}
                      />
                    </GatsbyLink>
                  </FooterSocialLink>
                  <FooterSocialLink>
                    <GatsbyLink
                      to={linkedInUrl}
                      target="_blank"
                      label="LinkedIn"
                    >
                      <img
                        src="/icons/linkedin-icon.svg"
                        alt="Instagram"
                        width={16}
                        height={16}
                      />
                    </GatsbyLink>
                  </FooterSocialLink>
                  <FooterSocialLink>
                    <GatsbyLink to={twitterUrl} target="_blank" label="Twitter">
                      <img
                        src="/icons/twitter-icon.svg"
                        alt="Instagram"
                        width={16}
                        height={16}
                      />
                    </GatsbyLink>
                  </FooterSocialLink>
                </FooterSocials>
              </FooterText>
            </GridItem>
          </Grid>
        </Container>
        <Spacer size={30} />
      </FooterMain>
    </ScrollSection>
  )
}

export default Footer
