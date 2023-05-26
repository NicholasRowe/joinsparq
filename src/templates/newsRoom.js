import React from 'react'
import Container from '@components/Container'
import Footer from '@components/Footer'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import ScrollSection from '@components/ScrollSection'
import Seo from '@components/Seo'
import Spacer from '@components/Spacer'
import { Heading3, TextBody } from '@components/TextStyles'
import NewsFooter from '@components/NewsFooter'
import RichText from '@components/RichText'
import { animation } from '@styles/vars/animation.style'
import { Link, graphql } from 'gatsby'
import { slugify } from '../utils/utils'
const NewsRoomPage = ({ data }) => {
  const {
    seoTitle,
    seoDescription: { seoDescription },
    seoImage,
    slug,
    categories,
    authorName,
    publishedDate,
    heading,
    content,
    publishedArticle,
  } = data.contentfulNewsRoom

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        imageUrl={seoImage?.resize?.src}
        pathname={`newsroom/${slugify(slug)}/`}
      />
      <ScrollSection>
        <Container>
          <Grid>
            <GridItem>
              <Spacer size={[100, 180]} />
              <Heading3>News</Heading3>
              <Spacer size={[60, 80]} />
              <div style={{ fontWeight: '400' }}>
                <TextBody>{categories}</TextBody>
              </div>
              <TextBody>{authorName}</TextBody>
              <Spacer size={[20, 30]} />
              <TextBody>{publishedDate}</TextBody>
              <Spacer size={[60, 80]} />
              <h1
                style={{
                  fontSize: '4.2rem',
                  lineHeight: '1.2',
                  fontWeight: '400',
                }}
              >
                {heading}
              </h1>
              <Spacer size={[60, 80]} />
              {content && (
                <RichText
                  delay={animation.textDelay}
                  content={content}
                  smallText={false}
                />
              )}
              <Spacer size={[100, 120]} />

              <Link
                to={publishedArticle}
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <TextBody>
                  <span>View Published Article</span>
                  <svg
                    style={{
                      display: 'inline-block',
                      position: 'relative',
                      top: '2px',
                      marginLeft: '30px',
                    }}
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 1L20 8.09184M20 8.09184L12.5 15.1837M20 8.09184L0 8.09183"
                      stroke="#FE522E"
                    />
                  </svg>
                </TextBody>
              </Link>
              <Spacer size={[30, 40]} />
            </GridItem>
          </Grid>
        </Container>
        <NewsFooter />
      </ScrollSection>
      <Footer />
    </>
  )
}

export default NewsRoomPage

export const pageQuery = graphql`
  query NewsRoomPage($id: String!) {
    contentfulNewsRoom(id: { eq: $id }) {
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
      categories
      authorName
      publishedDate(formatString: "MMMM DD, YYYY")
      heading
      publishedArticle
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
        }
      }
    }
  }
`
