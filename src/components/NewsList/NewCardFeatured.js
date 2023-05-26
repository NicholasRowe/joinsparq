import React from 'react'
import Spacer from '@components/Spacer'
import Container from '@components/Container'
import AnimateImage from '@components/animation/AnimateImage'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import { animation } from '@styles/vars/animation.style'
import { TextBodySmall } from '@components/TextStyles'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import { slugify } from '../../utils/utils'
import {
  FeaturedCard,
  FeaturedImage,
  CardImage,
  CardHeading,
  CardMeta,
  CardAuthor,
  CardDate,
  Readmore,
  PageHeading,
  FeaturedImageMobile,
} from './index.style'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

function NewCardFeatured({ featuredPost }) {
  return (
    <FeaturedCard>
      <Spacer size={[80, 100]} />
      <Container>
        <PageHeading>News</PageHeading>
        <Grid columnCount={6}>
          <GridItem tabletL={3} tabletLStart={4}>
            <FeaturedImageMobile>
              <AnimateImage delay={0.4}>
                <CardImage>
                  <GatsbyImage
                    image={getImage(featuredPost.seoImage.gatsbyImageData)}
                    alt={featuredPost.heading}
                  />
                </CardImage>
              </AnimateImage>
            </FeaturedImageMobile>
          </GridItem>
          <GridItem tabletL={2} tabletLStart={1}>
            <CardMeta>
              <CardDate>{featuredPost?.publishedDate}</CardDate>
              <CardAuthor>{featuredPost?.categories}</CardAuthor>
            </CardMeta>
            <CardHeading>{featuredPost?.heading}</CardHeading>
            <Spacer size={[10, 12]} />
            <TextBodySmall>
              {featuredPost?.seoDescription?.seoDescription}
            </TextBodySmall>
            <Readmore>
              <Link to={`/newsroom/${slugify(featuredPost.slug)}`} label={'Read more'}>
                <AnimateSplitText delay={0.6 + animation.textDelay}>
                  Read more
                  <svg
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: 'relative', top: '2px' }}
                  >
                    <path
                      d="M12.5 1L20 8.09184M20 8.09184L12.5 15.1837M20 8.09184L0 8.09183"
                      stroke="#FE522E"
                    />
                  </svg>
                </AnimateSplitText>
              </Link>
            </Readmore>
          </GridItem>
          <GridItem tabletL={3} tabletLStart={4}>
            <FeaturedImage>
              <AnimateImage delay={0.4}>
                <CardImage>
                  <GatsbyImage
                    image={getImage(featuredPost.seoImage.gatsbyImageData)}
                    alt={featuredPost.heading}
                  />
                </CardImage>
              </AnimateImage>
            </FeaturedImage>
          </GridItem>
        </Grid>
      </Container>
    </FeaturedCard>
  )
}

export default NewCardFeatured
