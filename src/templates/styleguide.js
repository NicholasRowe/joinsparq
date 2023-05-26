import React, { useState } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import { Heading2, Heading3, TextBody } from '../components/TextStyles'
import Spacer from '../components/Spacer'
import Flow from '../components/Flow'
import ScrollSection from '../components/ScrollSection'
import AnimateSplitText from '../components/animation/AnimateSplitText'
import AnimateSlideIn from '../components/animation/AnimateSlideIn'
import AnimateFadeIn from '../components/animation/AnimateFadeIn'
import Tabs from '../components/Tabs'
import { colors } from '../styles/vars/colors.style'
import VimeoPlayer from '../components/VimeoPlayer'
import Button from '../components/Button'
import IconArrowheadLeft from '../components/svgs/IconArrowheadLeft'
import IconArrowheadRight from '../components/svgs/IconArrowheadRight'
import RichText from '../components/RichText'
import Accordion from '../components/Accordion'
import Modal, { modalAnimationDurationS } from '../components/Modal'
import { clamp } from '../styles/utils/conversion.style'

const DummyModal = styled.div`
  width: 90%;
  max-width: 78rem;
  ${clamp('padding', 24, 48)};
  ${clamp('border-radius', 8, 12)};
  background-color: ${colors.light};
`

const StyleguidePage = ({ data }) => {
  const [openAccordion, setOpenAccordion] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const {
    seoTitle,
    seoDescription: { seoDescription },
    seoImage,
    slug,
    content,
  } = data.contentfulStyleguide

  const dummyTabData = [
    {
      title: 'Tab 1',
      content: <TextBody>Tab 1 content</TextBody>,
    },
    {
      title: 'Tab 2',
      content: <TextBody>Tab 2 content</TextBody>,
    },
    {
      title: 'Tab 3',
      content: <TextBody>Tab 3 content</TextBody>,
    },
  ]

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        imageUrl={seoImage.resize.src}
        pathname={slug+'/'}
      />

      <ScrollSection>
        <Container>
          <Spacer size={[120, 260]} />

          <Grid>
            <GridItem tabletL={5} tabletLStart={5}>
              {content && (
                <>
                  <Heading2 color={colors.blue}>
                    <AnimateSplitText>Rich text</AnimateSplitText>
                  </Heading2>

                  <Spacer size={[12, 24]} />
                  <RichText content={content} />
                </>
              )}

              <Spacer size={[40, 80]} />

              <Heading2 color={colors.blue}>
                <AnimateSplitText>Components</AnimateSplitText>
              </Heading2>

              <Spacer size={[24, 48]} />

              <Heading3>
                <AnimateSplitText>Buttons</AnimateSplitText>
              </Heading3>

              <Spacer size={[12, 24]} />

              <Flow direction="horizontal">
                <AnimateSlideIn>
                  <Button onClick={() => alert('A primary click')}>
                    Primary button
                  </Button>
                </AnimateSlideIn>

                <AnimateSlideIn>
                  <Button
                    variant="secondary"
                    onClick={() => alert('A secondary click')}
                  >
                    Secondary button
                  </Button>
                </AnimateSlideIn>
              </Flow>

              <Spacer size={[9, 18]} />

              <Flow direction="horizontal">
                <AnimateSlideIn>
                  <Button disabled onClick={() => {}}>
                    Disabled button
                  </Button>
                </AnimateSlideIn>

                <AnimateSlideIn>
                  <Button
                    type="externalLink"
                    href="https://toyfight.co"
                    iconRight={<IconArrowheadRight />}
                    target="_blank"
                  >
                    An external link
                  </Button>
                </AnimateSlideIn>
              </Flow>

              <Spacer size={[9, 18]} />

              <Flow direction="horizontal">
                <AnimateSlideIn>
                  <Button
                    type="internalLink"
                    to="/"
                    iconLeft={<IconArrowheadLeft />}
                  >
                    A page navigation button
                  </Button>
                </AnimateSlideIn>

                <AnimateSlideIn>
                  <Button label="Go back" onClick={() => {}}>
                    <IconArrowheadLeft responsive={false} />
                  </Button>
                </AnimateSlideIn>
              </Flow>

              <Spacer size={[24, 48]} />

              <Heading3>
                <AnimateSplitText>Accordion</AnimateSplitText>
              </Heading3>

              <Spacer size={[12, 24]} />

              <AnimateSlideIn>
                <Button onClick={() => setOpenAccordion(!openAccordion)}>
                  {openAccordion ? 'Close' : 'Open'} the accordion
                </Button>

                <Spacer size={[12, 24]} />

                <Accordion open={openAccordion}>
                  <TextBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </TextBody>
                </Accordion>
              </AnimateSlideIn>

              <Spacer size={[24, 48]} />

              <Heading3>
                <AnimateSplitText>Modal</AnimateSplitText>
              </Heading3>

              <Spacer size={[12, 24]} />

              <Button onClick={openModal}>Open the modal</Button>

              <Modal
                isOpen={showModal}
                onDismiss={closeModal}
                ariaLabel="An example modal"
              >
                <DummyModal>
                  <Heading2 as="h2">
                    <AnimateSplitText
                      delay={modalAnimationDurationS}
                      triggerOnce={false}
                    >
                      This is a modal
                    </AnimateSplitText>
                  </Heading2>

                  <Spacer size={[12, 24]} />

                  <TextBody>
                    <AnimateSplitText
                      delay={modalAnimationDurationS}
                      triggerOnce={false}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Labore sint soluta facilis rem consequatur, assumenda
                      maiores unde molestiae, modi, animi quisquam illo at
                      necessitatibus reprehenderit ab hic quae dicta laboriosam.
                    </AnimateSplitText>
                  </TextBody>

                  <Spacer size={[12, 24]} />

                  <AnimateFadeIn
                    delay={modalAnimationDurationS}
                    triggerOnce={false}
                  >
                    <Button onClick={closeModal}>Close</Button>
                  </AnimateFadeIn>
                </DummyModal>
              </Modal>

              <Spacer size={[24, 48]} />

              <Heading3>
                <AnimateSplitText>Vimeo Player</AnimateSplitText>
              </Heading3>

              <Spacer size={[12, 24]} />

              <AnimateSlideIn>
                <VimeoPlayer id="148751763" />
              </AnimateSlideIn>

              <Spacer size={[24, 48]} />

              <Heading3>
                <AnimateSplitText>Tabs</AnimateSplitText>
              </Heading3>

              <Spacer size={[12, 24]} />

              <AnimateSlideIn>
                <Tabs data={dummyTabData} />
              </AnimateSlideIn>
            </GridItem>
          </Grid>

          <Spacer size={[120, 360]} />
        </Container>
      </ScrollSection>
    </>
  )
}

export default StyleguidePage

export const pageQuery = graphql`
  query StyleguidePage($slug: String!) {
    contentfulStyleguide(slug: { eq: $slug }) {
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
          ... on ContentfulStyleguide {
            contentful_id
            slug
          }
        }
      }
    }
  }
`
