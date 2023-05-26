import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import ScrollSection from '@components/ScrollSection'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import Container from '@components/Container'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import { animation } from '@styles/vars/animation.style'
import Spacer from '@components/Spacer'
import {
  ExploreMain,
  ExploreText,
  ExploreMobileCar,
  ExploreCard,
} from './index.style'
import { Heading2, TextBody } from '@components/TextStyles'
import Card from '@components/Card'
import Seperator from '@components/Seperator'
import AnimateFadeIn from '@components/animation/AnimateFadeIn'

const Explore = ({ label, heading, text, card }) => {
  const { contentfulFixedImagery } = useStaticQuery(graphql`
    query {
      contentfulFixedImagery {
        exploreMobileCar {
          gatsbyImageData(quality: 100)
          description
        }
      }
    }
  `)

  return (
    <ScrollSection>
      <ExploreMain>
        <Seperator label={label} margin={78} desktop={true} />
        <Container>
          <Grid>
            <GridItem
              tabletP={8}
              tabletPOrder={3}
              tabletL={8}
              tabletLStart={2}
              desk={4}
              deskStart={2}
              deskOrder={1}
              deskAlign={`flex-end`}
            >
              <ExploreText>
                <Heading2 as={`h2`} maxWidth={7}>
                  <AnimateSplitText type={`lines,chars`}>
                    {heading}
                  </AnimateSplitText>
                </Heading2>
                <Spacer size={[28, 57]} />
                <TextBody maxWidth={22}>
                  <AnimateSplitText delay={animation.textDelay}>
                    {text}
                  </AnimateSplitText>
                </TextBody>
              </ExploreText>
            </GridItem>
            <GridItem tabletP={8} tabletPStart={3} tabletPOrder={2}>
              <ExploreMobileCar>
                <AnimateFadeIn>
                  <GatsbyImage
                    image={
                      contentfulFixedImagery.exploreMobileCar.gatsbyImageData
                    }
                    alt={contentfulFixedImagery.exploreMobileCar.description}
                  />
                </AnimateFadeIn>
              </ExploreMobileCar>
            </GridItem>
            <GridItem
              tabletPOrder={1}
              tabletL={5}
              tabletLStart={7}
              desk={4}
              deskStart={8}
              deskOrder={2}
              deskL={3}
              deskLStart={9}
            >
              <ExploreCard data-scroll data-scroll-speed="2.4">
                <Card {...card} />
              </ExploreCard>
            </GridItem>
          </Grid>
        </Container>
      </ExploreMain>
    </ScrollSection>
  )
}

Explore.propTypes = {
  label: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.string,
  card: PropTypes.object,
}

export default Explore
