import React from 'react'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import Container from '@components/Container'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Spacer from '@components/Spacer'
import AnimateImage from '@components/animation/AnimateImage'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import { animation } from '@styles/vars/animation.style'
import { TextBodySmall } from '@components/TextStyles'
import { slugify } from '../../utils/utils'
import {
  CardWrapper,
  CardMain,
  CardImageWrap,
  CardImage,
  CardHeading,
  CardMeta,
  CardAuthor,
  CardDate,
  Readmore,
} from './index.style'
import { Link } from 'gatsby'
export function index({ restPosts }) {
  return (
    <CardWrapper>
      <Container>
        <Grid columnCount={6} gap={90}>
          {restPosts.map((post, index) => {
            return (
              <GridItem tabletP={3} desk={2} key={post.heading}>
                <CardMain>
                  <CardImageWrap>
                    <AnimateImage delay={0.4}>
                      <CardImage>
                        {post?.seoImage?.gatsbyImageData?.images?.fallback ? (
                          <GatsbyImage
                            image={getImage(post?.seoImage?.gatsbyImageData)}
                            alt={post.heading}
                          />
                        ) : (
                          <img
                            src={post?.seoImage?.url}
                            loading="lazy"
                            height={320}
                            style={{ objectFit: 'cover' }}
                            alt={post.heading}
                          />
                        )}
                      </CardImage>
                    </AnimateImage>
                  </CardImageWrap>
                  <CardMeta>
                    <CardDate>{post?.publishedDate}</CardDate>
                    <CardAuthor>{post?.categories}</CardAuthor>
                  </CardMeta>
                  <CardHeading>
                    <AnimateSplitText delay={0.6}>
                      {post?.heading}
                    </AnimateSplitText>
                  </CardHeading>
                  <Spacer size={[10, 12]} />
                  <TextBodySmall>
                    <AnimateSplitText delay={0.6 + animation.textDelay}>
                      {post?.seoDescription?.seoDescription}
                    </AnimateSplitText>
                  </TextBodySmall>
                  <Readmore>
                    <Link
                      to={`/newsroom/${slugify(post.slug)}`}
                      label={'Read more'}
                    >
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
                </CardMain>
              </GridItem>
            )
          })}
        </Grid>
      </Container>
    </CardWrapper>
  )
}

export default index
