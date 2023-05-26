import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import ScrollSection from '@components/ScrollSection'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import Container from '@components/Container'
import Spacer from '@components/Spacer'
import { HowMain, HowMobileCar, HowCard } from './index.style'
import Card from '@components/Card'
import Seperator from '@components/Seperator'
import AnimateFadeIn from '@components/animation/AnimateFadeIn'

const HowItWorks = ({ label, cards }) => {
  const { contentfulFixedImagery } = useStaticQuery(graphql`
    query {
      contentfulFixedImagery {
        howItWorksMobileCar {
          gatsbyImageData(quality: 100)
          description
        }
      }
    }
  `)

  return (
    <ScrollSection>
      <HowMain>
        <Seperator label={label} />
        <Container>
          <Grid>
            <GridItem tabletP={8} tabletPStart={3}>
              <HowMobileCar>
                <AnimateFadeIn>
                  <GatsbyImage
                    image={
                      contentfulFixedImagery.howItWorksMobileCar.gatsbyImageData
                    }
                    alt={contentfulFixedImagery.howItWorksMobileCar.description}
                  />
                </AnimateFadeIn>
              </HowMobileCar>
            </GridItem>
            <GridItem
              tabletPOrder={-2}
              tabletL={5}
              tabletLStart={2}
              deskOrder={1}
            >
              <HowCard side={'left'} data-scroll data-scroll-speed="1.2">
                <Card {...cards[0]} />
              </HowCard>
              <Spacer size={[11]} />
            </GridItem>
            <GridItem
              tabletPOrder={-1}
              tabletL={10}
              tabletLStart={2}
              deskOrder={2}
            >
              <HowCard side={'right'} data-scroll data-scroll-speed="2.4">
                <Card {...cards[1]} />
              </HowCard>
            </GridItem>
            <GridItem tabletL={5} tabletLStart={2} deskOrder={3}>
              <HowCard side={'left'} data-scroll data-scroll-speed="2.4">
                <Card {...cards[2]} />
              </HowCard>
            </GridItem>
            <GridItem tabletL={10} tabletLStart={2} deskOrder={4}>
              <HowCard side={'right'} data-scroll data-scroll-speed="2.4">
                <Card {...cards[3]} />
              </HowCard>
            </GridItem>
          </Grid>
        </Container>
      </HowMain>
    </ScrollSection>
  )
}

HowItWorks.propTypes = {
  label: PropTypes.string,
  cards: PropTypes.array,
}

export default HowItWorks
