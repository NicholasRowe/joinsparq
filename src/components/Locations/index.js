import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { useStore } from '@Store/'
import ScrollSection from '@components/ScrollSection'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import Container from '@components/Container'
import Seperator from '@components/Seperator'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import AnimateImage from '@components/animation/AnimateImage'
import { animation } from '@styles/vars/animation.style'
import Spacer from '@components/Spacer'
import {
  LocationsMain,
  LocationsText,
  LocationsMap,
  LocationMarker,
} from './index.style'
import { Heading2, Heading4, TextBody } from '@components/TextStyles'
import Table from '@components/Table'
import MapMarker from '@components/svgs/MapMarker'

const Locations = ({ label, heading, text, locations }) => {
  const [ref, inView] = useInView({ triggerOnce: true })
  const [store] = useStore()
  const { showPageMask } = store

  const { contentfulFixedImagery } = useStaticQuery(graphql`
    query {
      contentfulFixedImagery {
        locationMap {
          gatsbyImageData
          description
        }
      }
    }
  `)

  const markers = [
    { xPerc: 14, yPerc: 25.7 },
    { xPerc: 29.6, yPerc: 51 },
    { xPerc: 59, yPerc: 39.3 },
    { xPerc: 70.3, yPerc: 49.3 },
  ]
  return (
    <ScrollSection>
      <LocationsMain ref={ref}>
        <Spacer size={[70, 120]} />
        <Seperator label={label} margin={120} />
        <Container>
          <Grid>
            <GridItem
              tabletP={8}
              tabletPStart={3}
              tabletL={5}
              tabletLStart={2}
              deskL={4}
              deskLStart={2}
              deskLAlign={`center`}
            >
              <LocationsText>
                <Heading2 as={`h2`}>
                  <AnimateSplitText type={`lines,chars`}>
                    {heading}
                  </AnimateSplitText>
                </Heading2>
                <Spacer size={[28, 35]} />
                <TextBody>
                  <AnimateSplitText delay={animation.textDelay}>
                    {text}
                  </AnimateSplitText>
                </TextBody>
                <Spacer size={[50, 77]} />
                <Heading4 as={`h3`}>
                  <AnimateSplitText delay={animation.textDelay * 2}>
                    {locations.heading}
                  </AnimateSplitText>
                </Heading4>
                <Spacer size={24} />
                <Table
                  data={locations.table.tableData}
                  removeHeaders={true}
                  delay={animation.textDelay * 2 + 0.1}
                />
              </LocationsText>
            </GridItem>
            <GridItem
              tabletL={4}
              tabletLStart={8}
              tabletLAlign={`center`}
              deskL={5}
              deskLStart={7}
            >
              <AnimateImage delay={0.5} size={`large`}>
                <LocationsMap>
                  {React.Children.toArray(
                    markers.map((marker, markerIndex) => (
                      <LocationMarker
                        xPerc={marker.xPerc}
                        yPerc={marker.yPerc}
                        show={inView && !showPageMask}
                        delay={
                          animation.textDelay * 2 + 0.6 + markerIndex * 0.3
                        }
                      >
                        <MapMarker />
                      </LocationMarker>
                    ))
                  )}
                  <GatsbyImage
                    image={contentfulFixedImagery.locationMap.gatsbyImageData}
                    alt={contentfulFixedImagery.locationMap.description}
                  />
                </LocationsMap>
              </AnimateImage>
            </GridItem>
          </Grid>
        </Container>
        <Spacer size={[70, 120]} />
      </LocationsMain>
    </ScrollSection>
  )
}

Locations.propTypes = {
  label: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.string,
  locations: PropTypes.object,
}

export default Locations
