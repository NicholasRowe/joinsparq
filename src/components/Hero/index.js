import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useStore, showNewsletterForm, showCheckoutForm } from '@Store/'
import PropTypes from 'prop-types'
import ScrollSection from '@components/ScrollSection'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import Container from '@components/Container'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'
import { animation } from '@styles/vars/animation.style'
import Spacer from '@components/Spacer'
import Button from '@components/Button'
import {
  HeroMain,
  HeroInner,
  HeroText,
  HeroMobileCar,
  HeroButton,
} from './index.style'
import { Heading2, TextBody } from '@components/TextStyles'
import AnimateFadeIn from '@components/animation/AnimateFadeIn'

const Hero = ({ carIsVisible, heading, text, labels }) => {
  const [, dispatch] = useStore()

  const { contentfulGlobals, contentfulFixedImagery } = useStaticQuery(graphql`
    query {
      contentfulGlobals {
        salesFunnelMode
      }
      contentfulFixedImagery {
        heroMobileCar {
          gatsbyImageData(quality: 100)
          description
        }
      }
    }
  `)

  const { salesFunnelMode } = contentfulGlobals
  const newsletterMode = salesFunnelMode === 'Newsletter'

  return (
    <ScrollSection>
      <HeroMain>
        <Container>
          <HeroInner>
            <Grid>
              <GridItem tabletL={5} tabletLAlign={`flex-end`}>
                <HeroText>
                  <Heading2 as={`h1`} maxWidth={7}>
                    <AnimateSplitText
                      type={`lines,chars`}
                      delay={carIsVisible ? 1 : 0}
                    >
                      {heading}
                    </AnimateSplitText>
                  </Heading2>
                  <Spacer size={13} />
                  <TextBody maxWidth={18}>
                    <AnimateSplitText
                      delay={(carIsVisible ? 1 : 0) + animation.textDelay}
                    >
                      {text}
                    </AnimateSplitText>
                  </TextBody>
                </HeroText>
                <HeroMobileCar>
                  <Spacer size={[10, 50]} />
                  <AnimateFadeIn delay={animation.textDelay * 1.5}>
                    <GatsbyImage
                      image={
                        contentfulFixedImagery.heroMobileCar.gatsbyImageData
                      }
                      alt={contentfulFixedImagery.heroMobileCar.description}
                    />
                  </AnimateFadeIn>
                  <Spacer size={[10, 50]} />
                </HeroMobileCar>
                <HeroButton>
                  <AnimateSlideIn
                    delay={(carIsVisible ? 1 : 0) + animation.textDelay * 2}
                  >
                    <Button
                      onClick={() =>
                        newsletterMode
                          ? showNewsletterForm(dispatch)
                          : showCheckoutForm(dispatch)
                      }
                      label={labels[0]}
                    >
                      <span>{labels[0]}</span>
                      <span>{labels[1]}</span>
                    </Button>
                  </AnimateSlideIn>
                </HeroButton>
              </GridItem>
            </Grid>
          </HeroInner>
        </Container>
      </HeroMain>
    </ScrollSection>
  )
}

Hero.propTypes = {
  carIsVisible: PropTypes.bool,
  heading: PropTypes.string,
  text: PropTypes.string,
  labels: PropTypes.array,
}

export default Hero
