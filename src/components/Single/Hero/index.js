import React from 'react'
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
import { HeroMain, HeroInner, HeroText, HeroButton } from './index.style'
import { Heading2, TextBodyLarge } from '@components/TextStyles'

const Hero = ({ title, text }) => {
  return (
    <ScrollSection>
      <HeroMain>
        <Container>
          <HeroInner>
            <Grid>
              <GridItem tabletL={8} tabletLStart={3} desk={6} deskStart={4}>
                <HeroText>
                  <Heading2 as={`h1`} maxWidth={11.2}>
                    <AnimateSplitText type={`lines,chars`} delay={1}>
                      {title}
                    </AnimateSplitText>
                  </Heading2>
                  <Spacer size={[16, 32]} />
                  <TextBodyLarge>
                    <AnimateSplitText delay={1 + animation.textDelay}>
                      {text}
                    </AnimateSplitText>
                  </TextBodyLarge>
                </HeroText>
                <Spacer size={[50, 75]} />
                <HeroButton>
                  <AnimateSlideIn delay={1 + animation.textDelay * 2}>
                    <Button to={`/`} type={`internalLink`} label={`Home`}>
                      Return to Homepage
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
  title: PropTypes.string,
  text: PropTypes.string,
}

export default Hero
