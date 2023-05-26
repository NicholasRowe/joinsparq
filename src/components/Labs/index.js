import React from 'react'
import PropTypes from 'prop-types'
import ScrollSection from '@components/ScrollSection'
import Seperator from '@components/Seperator'
import LabCarousel from '@components/LabCarousel'
import { LabsMain, LabsInner } from './index.style'
// import Grid from '@components/Grid'
// import GridItem from '@components/GridItem'
// import Container from '@components/Container'
// import AnimateSplitText from '@components/animation/AnimateSplitText'
// import { animation } from '@styles/vars/animation.style'
// import Spacer from '@components/Spacer'
// import { LabsTextWrap, LabsText } from './index.style'
// import { Heading2, TextBody } from '@components/TextStyles'

const Labs = ({ label, images, heading, text }) => {
  return (
    <ScrollSection>
      <LabsMain>
        <Seperator label={label} padding={78} />
        <LabsInner>
          {/* <LabsTextWrap>
            <Spacer size={[0, 70]} />
            <Container>
              <Grid>
                <GridItem
                  tabletP={8}
                  tabletPStart={3}
                  tabletL={6}
                  tabletLStart={2}
                  desk={4}
                  deskStart={2}
                  deskL={3}
                  deskLStart={2}
                >
                  <LabsText>
                    <Heading2 as={`h2`}>
                      <AnimateSplitText type={`lines,chars`}>
                        {heading}
                      </AnimateSplitText>
                    </Heading2>
                    <Spacer size={[28, 37]} />
                    <TextBody>
                      <AnimateSplitText delay={animation.textDelay}>
                        {text}
                      </AnimateSplitText>
                    </TextBody>
                  </LabsText>
                </GridItem>
              </Grid>
            </Container>
            <Spacer size={[70, 70]} />
          </LabsTextWrap> */}
          <LabCarousel images={images} />
        </LabsInner>
      </LabsMain>
    </ScrollSection>
  )
}

Labs.propTypes = {
  label: PropTypes.string,
  images: PropTypes.array,
  heading: PropTypes.string,
  text: PropTypes.string,
}

export default Labs
