import React from 'react'
import styled from 'styled-components'
import { clamp } from '../../styles/utils/conversion.style'
import { breakpoints } from '../../styles/vars/breakpoints.style'
import Seo from '../../components/Seo'
import ScrollSection from '../../components/ScrollSection'
import WebGLDom from '../../components/WebGLDom'

// Styles
import { colors } from '../../styles/vars/colors.style'
import { Heading2, TextBody } from '../../styles/vars/textStyles.style'

// Images
import SmoothImage2 from '../../images/scroll/smooth-2.jpg'
import SmoothImage3 from '../../images/scroll/smooth-3.jpg'
import SmoothImage4 from '../../images/scroll/smooth-4.jpg'
import SmoothImage5 from '../../images/scroll/smooth-5.jpg'
import SmoothImage6 from '../../images/scroll/smooth-6.jpg'
import SmoothImage7 from '../../images/scroll/smooth-7.jpg'

// Dummy Image Section
import Spacer from '../../components/Spacer'
import Container from '../../components/Container'
import Grid from '../../components/Grid'
import GridItem from '../../components/GridItem'
import BlockColor from '../../components/WebGLDom/BlockColor'
import Image from '../../components/WebGLDom/Image'
import AnimateSplitText from '../../components/animation/AnimateSplitText'

const DummyImageWrapper = styled.div`
  position: relative;
  z-index: 2;

  ${props =>
    props.fullWidth &&
    `
    ${clamp('margin-left', -24, -48, breakpoints.mobile, breakpoints.tabletL)}
    ${clamp('margin-right', -24, -48, breakpoints.mobile, breakpoints.tabletL)}
  `}
`

const DummyImageInner = styled.div`
  position: relative;
`

const DummyImageTitle = styled.div`
  color: ${colors.light};
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  white-space: nowrap;
  z-index: 2;
`

const DummyImageCopy = styled.div``

let images = [
  {
    title: 'Smooth',
    url: SmoothImage2,
    size: 3,
    pos: 5,
  },
  {
    title: 'Smoooth',
    url: SmoothImage3,
    size: 5,
    pos: 11,
    copy: 'Diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    copyPos: 4,
  },
  {
    url: SmoothImage4,
    size: 16,
    pos: 0,
  },
  {
    title: 'Smooooth',
    url: SmoothImage5,
    size: 3,
    pos: 10,
  },
  {
    title: 'Smooooooth',
    url: SmoothImage6,
    size: 7,
    pos: 2,
    copy: 'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    copyPos: 10,
    bg: colors.grey,
  },
  {
    title: 'Smoooooth',
    url: SmoothImage7,
    size: 5,
    pos: 11,
    copy: 'Diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    copyPos: 4,
  },
]

const WebGLImagesPage = () => {
  return (
    <>
      <Seo title="Home" />
      <WebGLDom />
      <ScrollSection>
        <Container>
          {images.map((imageBlock, x) => {
            return (
              <DummyImageWrapper
                fullWidth={imageBlock.size === 16}
                key={`dummy-images-image-${x}`}
              >
                {imageBlock.bg && (
                  <BlockColor
                    color={imageBlock.bg}
                    webgl={imageBlock.webgl}
                    zIndex={-1}
                  />
                )}
                <Grid>
                  {imageBlock.copy && (
                    <GridItem
                      desk={4}
                      deskStart={imageBlock.copyPos}
                      deskAlign={'center'}
                      deskOrder={imageBlock.pos > imageBlock.copyPos ? -1 : 1}
                    >
                      <DummyImageCopy>
                        <TextBody>
                          <AnimateSplitText delay={0.2}>
                            {imageBlock.copy}
                          </AnimateSplitText>
                        </TextBody>
                      </DummyImageCopy>
                    </GridItem>
                  )}
                  <GridItem desk={imageBlock.size} deskStart={imageBlock.pos}>
                    <Spacer size={[80, 180]} />
                    <DummyImageInner>
                      {imageBlock.title && (
                        <DummyImageTitle>
                          <Heading2>{imageBlock.title}</Heading2>
                        </DummyImageTitle>
                      )}
                      <Image
                        url={imageBlock.url}
                        title={imageBlock.title}
                        borderRadius={imageBlock.imgBorderRadius}
                        webgl={imageBlock.webgl}
                      />
                    </DummyImageInner>
                    <Spacer size={[80, 180]} />
                  </GridItem>
                </Grid>
              </DummyImageWrapper>
            )
          })}
        </Container>
      </ScrollSection>
    </>
  )
}

export default WebGLImagesPage
