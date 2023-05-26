import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { useStore } from '@Store/'
import ScrollSection from '@components/ScrollSection'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import Container from '@components/Container'
import Seperator from '@components/Seperator'
import SignUpBar from '@components/SignUpBar'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import AnimateImage from '@components/animation/AnimateImage'
import { animation } from '@styles/vars/animation.style'
import Spacer from '@components/Spacer'
import {
  AppMain,
  AppScene,
  AppSceneInner,
  AppText,
  AppPhone,
  AppPhoneTop,
  AppPhoneBottom,
  AppPhoneCar,
  AppPhoneRing,
  AppScore,
  AppScoreInner,
  AppMap,
  AppMapInner,
  AppWatch,
  AppWatchInner,
} from './index.style'
import { Heading2, TextBody } from '@components/TextStyles'
import PhoneBottom from './images/app-phone-bottom.png'
import PhoneCar from './images/app-phone-car.png'
import PhoneRing from './images/app-phone-ring.png'
import PhoneTop from './images/app-phone-top.png'
import { colors } from '@styles/vars/colors.style'

const App = ({ label, heading, text, images, items, labels }) => {
  const [ref, inView] = useInView({ triggerOnce: true })
  const [store] = useStore()
  const { showPageMask } = store

  return (
    <ScrollSection topGapFiller={colors.grey}>
      <AppMain>
        <Seperator label={label} margin={120} />
        <Container>
          <Grid>
            <GridItem>
              <AppText>
                <Heading2 as={`h2`}>
                  <AnimateSplitText type={`lines,chars`}>
                    {heading}
                  </AnimateSplitText>
                </Heading2>
                <Spacer size={[23, 37]} />
                <TextBody>
                  <AnimateSplitText delay={animation.textDelay}>
                    {text}
                  </AnimateSplitText>
                </TextBody>
                <Spacer size={[46, 70]} />
              </AppText>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem
              mobile={6}
              tabletP={4}
              tabletPStart={3}
              tabletL={2}
              tabletLAlign={`center`}
            >
              <AppMap data-scroll data-scroll-speed="4">
                <AnimateImage offset={20}>
                  <AppMapInner>
                    <GatsbyImage
                      image={images[2].gatsbyImageData}
                      alt={images[2].description}
                    />
                  </AppMapInner>
                </AnimateImage>
                <Spacer size={[53, 262]} />
              </AppMap>
            </GridItem>
            <GridItem
              mobile={6}
              tabletP={4}
              tabletL={2}
              tabletLAlign={`center`}
            >
              <AppScene data-scroll data-scroll-speed="1.2">
                <Spacer size={[118, 370]} />
                <AnimateImage offset={10}>
                  <AppSceneInner>
                    <GatsbyImage
                      image={images[0].gatsbyImageData}
                      alt={images[0].description}
                    />
                  </AppSceneInner>
                </AnimateImage>
              </AppScene>
            </GridItem>
            <GridItem tabletL={4}>
              <AppPhone ref={ref}>
                <AppPhoneTop>
                  <img
                    src={PhoneTop}
                    alt="SPARQ app visuals"
                    width={403}
                    height={634}
                  />
                  <AppPhoneCar show={inView && !showPageMask} delay={1}>
                    <img
                      src={PhoneCar}
                      alt="SPARQ App Phone Car"
                      width={403}
                      height={316}
                    />
                  </AppPhoneCar>
                  <AppPhoneRing>
                    <img
                      src={PhoneRing}
                      alt="SPARQ App Phone Ring"
                      width={282}
                      height={282}
                    />
                  </AppPhoneRing>
                </AppPhoneTop>
                <AppPhoneBottom>
                  <img
                    src={PhoneBottom}
                    alt="SPARQ App Phone Bottom"
                    width={403}
                    height={170}
                  />
                </AppPhoneBottom>
              </AppPhone>
            </GridItem>
            <GridItem
              mobile={6}
              tabletP={4}
              tabletPStart={3}
              tabletL={2}
              tabletLAlign={`center`}
            >
              <AppScore data-scroll data-scroll-speed="1.2">
                <AnimateImage offset={20}>
                  <AppScoreInner>
                    <GatsbyImage
                      image={images[1].gatsbyImageData}
                      alt={images[1].description}
                    />
                  </AppScoreInner>
                </AnimateImage>
              </AppScore>
              <Spacer size={[88, 165]} />
            </GridItem>
            <GridItem
              mobile={6}
              tabletP={4}
              tabletL={2}
              tabletLAlign={`center`}
            >
              <Spacer size={[78, 164]} />
              <AppWatch data-scroll data-scroll-speed="-1.2">
                <AnimateImage offset={20}>
                  <AppWatchInner>
                    <GatsbyImage
                      image={images[3].gatsbyImageData}
                      alt={images[3].description}
                    />
                  </AppWatchInner>
                </AnimateImage>
              </AppWatch>
            </GridItem>
          </Grid>
        </Container>
        <Spacer size={[58, 245]} />
        <SignUpBar items={items} labels={labels} />
      </AppMain>
    </ScrollSection>
  )
}

App.propTypes = {
  label: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.string,
  items: PropTypes.array,
  labels: PropTypes.array,
}

export default App
