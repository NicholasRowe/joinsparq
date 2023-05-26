import React, { useEffect } from 'react'
import {
  useStore,
  setCursor,
  setHeader,
  showNewsletterForm,
  showCheckoutForm,
} from '@Store/'
import { useInView } from 'react-intersection-observer'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import ScrollSection from '@components/ScrollSection'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import Container from '@components/Container'
import Seperator from '@components/Seperator'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import { animation } from '@styles/vars/animation.style'
import Spacer from '@components/Spacer'
import {
  JoinMain,
  JoinInner,
  JoinText,
  JoinMobileCar,
  JoinButton,
} from './index.style'
import { Heading2, TextBody } from '@components/TextStyles'
import Button from '@components/Button'
import AnimateFadeIn from '@components/animation/AnimateFadeIn'
import { colors } from '@styles/vars/colors.style'

const Join = ({ label, heading, text }) => {
  const [store, dispatch] = useStore()
  const { cursor } = store

  const [ref, inView] = useInView({
    rootMargin: '0px 0px -95% 0px',
    triggerOnce: false,
  })

  const { contentfulFixedImagery, contentfulGlobals } = useStaticQuery(graphql`
    query {
      contentfulFixedImagery {
        joinMobileCar {
          gatsbyImageData(quality: 100)
          description
        }
      }
      contentfulGlobals {
        salesFunnelMode
      }
    }
  `)

  const { salesFunnelMode } = contentfulGlobals
  const newsletterMode = salesFunnelMode === 'Newsletter'

  useEffect(() => {
    setHeader(dispatch, inView ? `light` : `dark`)
  }, [dispatch, inView])

  return (
    <ScrollSection zIndex={5}>
      <JoinMain
        ref={ref}
        onClick={() =>
          newsletterMode
            ? showNewsletterForm(dispatch)
            : showCheckoutForm(dispatch)
        }
        onMouseEnter={() => setCursor(dispatch, 'signup')}
        onMouseMove={() => cursor !== 'signup' && setCursor(dispatch, 'signup')}
        onMouseLeave={() => setCursor(dispatch, 'default')}
        show={inView}
      >
        <Seperator label={label} color={colors.light} />
        <JoinInner>
          <Container>
            <Grid>
              <GridItem
                desk={5}
                deskStart={2}
                deskAlign={`center`}
                deskL={4}
                deskLStart={2}
              >
                <JoinText>
                  <Heading2 as={`h2`} maxWidth={8}>
                    <AnimateSplitText type={`lines,chars`}>
                      {heading}
                    </AnimateSplitText>
                  </Heading2>
                  <Spacer size={[28, 37]} />
                  <TextBody maxWidth={22}>
                    <AnimateSplitText delay={animation.textDelay}>
                      {text}
                    </AnimateSplitText>
                  </TextBody>
                </JoinText>
                <JoinMobileCar>
                  <AnimateFadeIn>
                    <GatsbyImage
                      image={
                        contentfulFixedImagery.joinMobileCar.gatsbyImageData
                      }
                      alt={contentfulFixedImagery.joinMobileCar.description}
                    />
                  </AnimateFadeIn>
                </JoinMobileCar>
                <JoinButton>
                  <Button onClick={() => {}} label={'Sign up'}>
                    Sign Up
                  </Button>
                </JoinButton>
              </GridItem>
            </Grid>
          </Container>
        </JoinInner>
      </JoinMain>
    </ScrollSection>
  )
}

Join.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  card: PropTypes.object,
}

export default Join
