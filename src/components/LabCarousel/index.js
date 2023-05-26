import React, { useEffect, useState } from 'react'
import { useStore, setCursor, setCursorCounter } from '@Store/'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import {
  LabCarouselMain,
  LabCarouselImage,
  LabCarouselKeyboardButtons,
} from './index.style'
import Button from '@components/Button'
import { GatsbyImage } from 'gatsby-plugin-image'

const LabCarousel = ({ images }) => {
  const [, dispatch] = useStore()
  const [active, setActive] = useState(0)

  const [ref, inView] = useInView({
    rootMargin: '-20% 0px -20% 0px',
    triggerOnce: false,
  })

  const nextImage = () => {
    setActive(active === images.length - 1 ? 0 : active + 1)
  }

  useEffect(() => {
    setCursorCounter(dispatch, [active + 1, images.length])
  }, [dispatch, images.length, active])

  return (
    <LabCarouselMain
      ref={ref}
      onClick={nextImage}
      onMouseEnter={() => setCursor(dispatch, 'carousel')}
      onMouseLeave={() => setCursor(dispatch, 'default')}
    >
      {React.Children.toArray(
        images.map((image, imageIndex) => {
          return (
            <LabCarouselImage show={active === imageIndex && inView}>
              <GatsbyImage
                image={image.gatsbyImageData}
                alt={image.description}
              />
            </LabCarouselImage>
          )
        })
      )}
      <LabCarouselKeyboardButtons>
        <Button onClick={nextImage} label={`Next Image`} keyboard={true}>
          Next
        </Button>
      </LabCarouselKeyboardButtons>
    </LabCarouselMain>
  )
}

LabCarousel.propTypes = {
  images: PropTypes.array,
}

export default LabCarousel
