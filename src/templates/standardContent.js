import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import Container from '@components/Container'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import { Heading2, Heading4 } from '@components/TextStyles'
import Spacer from '@components/Spacer'
import ScrollSection from '@components/ScrollSection'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import Footer from '@components/Footer'
import RichText from '@components/RichText'
import { animation } from '@styles/vars/animation.style'

const StandardContentPage = ({ data }) => {
  const {
    seoTitle,
    seoDescription: { seoDescription },
    seoImage,
    slug,
    heading,
    updatedAt,
    content,
    keywords
  } = data.contentfulTextPage

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        imageUrl={seoImage.resize.src}
        pathname={slug+'/'}
        keywords={keywords}
      />

      <ScrollSection>
        <Container>
          <Spacer size={[175, 350]} />

          <Grid>
            <GridItem tabletL={8} tabletLStart={3}>
              <Heading2 as={`h1`} maxWidth={15}>
                <AnimateSplitText>{heading}</AnimateSplitText>
              </Heading2>
              <Spacer size={[28, 57]} />
              <Heading4>
                <AnimateSplitText
                  delay={animation.textDelay}
                >{`Last edited: ${updatedAt}`}</AnimateSplitText>
              </Heading4>
              <Spacer size={[12, 24]} />
              {content && (
                <RichText
                  delay={animation.textDelay}
                  content={content}
                  smallText={false}
                />
              )}
            </GridItem>
          </Grid>

          <Spacer size={[175, 350]} />
        </Container>
      </ScrollSection>
      <Footer />
    </>
  )
}

export default StandardContentPage

export const pageQuery = graphql`
  query StandardContentPage($slug: String!) {
    contentfulTextPage(slug: { eq: $slug }) {
      seoTitle
      seoDescription {
        seoDescription
      }
      seoImage {
        resize(width: 1200, height: 650, quality: 100) {
          src
        }
      }
      slug
      keywords
      updatedAt(formatString: "D MMM YYYY")
      heading
      content {
        raw
        references {
          __typename
          ... on ContentfulAsset {
            contentful_id
            gatsbyImageData
            description
            file {
              url
            }
          }
          ... on ContentfulTextPage {
            contentful_id
            slug
          }
        }
      }
    }
  }
`
