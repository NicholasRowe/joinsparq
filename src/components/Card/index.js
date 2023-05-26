import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import Spacer from '@components/Spacer'
import AnimateCard from '@components/animation/AnimateCard'
import AnimateImage from '@components/animation/AnimateImage'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import { animation } from '@styles/vars/animation.style'
import { CardMain, CardImageWrap, CardImage } from './index.style'
import { Heading4, TextBodySmall } from '@components/TextStyles'

const Card = ({ title, text, image }) => {
  return (
    <CardMain>
      <AnimateCard>
        <CardImageWrap>
          <AnimateImage delay={0.4}>
            <CardImage>
              <GatsbyImage
                image={image.gatsbyImageData}
                alt={image.description ? image.description : ''}
              />
            </CardImage>
          </AnimateImage>
        </CardImageWrap>
        <Heading4>
          <AnimateSplitText delay={0.6}>{title}</AnimateSplitText>
        </Heading4>
        <Spacer size={[10, 12]} />
        <TextBodySmall>
          <AnimateSplitText delay={0.6 + animation.textDelay}>
            {text}
          </AnimateSplitText>
        </TextBodySmall>
      </AnimateCard>
    </CardMain>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.object,
}

export default Card
