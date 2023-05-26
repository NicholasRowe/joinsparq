import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import Container from '@components/Container'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import { Heading2, Heading3, TextBody } from '@components/TextStyles'
import Spacer from '@components/Spacer'
import NewsFooter from '@components/NewsFooter'
import ScrollSection from '@components/ScrollSection'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import Footer from '@components/Footer'
import RichText from '@components/RichText'
import { animation } from '@styles/vars/animation.style'

function Index() {
  return (
    <>
      <Seo
        title={'News room expand'}
        description={'News room expand description'}
        pathname={'news-room-expand/'}
      />
      <ScrollSection>
        <Container>
          <Grid>
            <GridItem>
              <Spacer size={[100, 180]} />
              <Heading3>News</Heading3>
              <Spacer size={[60, 80]} />
              <TextBody>Grit Daily Peter Page</TextBody>
              <Spacer size={[20, 30]} />
              <TextBody>July 18, 2022</TextBody>
              <Spacer size={[60, 80]} />
              <Heading3>
                SPARQ is the Subscription-Based Future of Car Servicing
              </Heading3>
              <Spacer size={[60, 80]} />
            </GridItem>
          </Grid>
        </Container>
        <NewsFooter />
      </ScrollSection>
      <Footer />
    </>
  )
}

export default Index
