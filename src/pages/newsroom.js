import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import NewsList from '@components/NewsList'
import NewCardFeatured from '@components/NewsList/NewCardFeatured'
import Footer from '@components/Footer'
import NewsFooter from '@components/NewsFooter'
import ScrollSection from '@components/ScrollSection'
function Newsroom({ data: { allContentfulNewsRoom } }) {
  const featuredPost = allContentfulNewsRoom.nodes.slice(0, 1)[0]
  const restPosts = allContentfulNewsRoom.nodes.slice(1)
  return (
    <>
      <Seo
        title={'Newsroom'}
        overWriteTitle={'SPARQ | Newsroom'}
        description={'News room page'}
        pathname='newsroom/'
      />
      <ScrollSection>
        <NewCardFeatured featuredPost={featuredPost} />
        <NewsList restPosts={restPosts} />
        <NewsFooter />
      </ScrollSection>
      <Footer />
    </>
  )
}
export const pageQuery = graphql`
  query NewsRoomPage {
    allContentfulNewsRoom(sort: { fields: publishedDate, order: DESC }) {
      nodes {
        heading
        seoDescription {
          seoDescription
        }
        publishedDate(formatString: "MMMM DD, YYYY")
        categories
        slug
        seoImage {
          url
          gatsbyImageData(width: 675, height: 450, quality: 100)
        }
      }
    }
  }
`

export default Newsroom
