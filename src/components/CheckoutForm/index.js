import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { useStore, hideCheckoutForm } from '@Store/'
import Modal from '@components/Modal'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'
import Spacer from '@components/Spacer'
import {
  CheckoutFormMain,
  CheckoutFormImageMask,
  CheckoutFormImage,
  CheckoutFormText,
  CheckoutFormClose,
  CheckoutFormButton,
} from './index.style'
import { Heading3, TextBodySmall } from '@styles/vars/textStyles.style'
import { ListItem, UnorderedList } from '@components/RichText/index.style'
import Button from '@components/Button'
import Close from '@components/svgs/Close'
import { animation } from '@styles/vars/animation.style'

const CheckoutForm = () => {
  const [inViewRef, inView] = useInView({ triggerOnce: false })

  const { contentfulSignUpModal } = useStaticQuery(graphql`
    query {
      contentfulSignUpModal {
        heading
        text
        listItems
        buttonLabel
        image {
          description
          gatsbyImageData
        }
      }
    }
  `)

  const { heading, text, listItems, buttonLabel, image } = contentfulSignUpModal

  const [store, dispatch] = useStore()
  const { checkoutFormIsOpen } = store

  return (
    <Modal
      isOpen={checkoutFormIsOpen}
      setClosed={() => hideCheckoutForm(dispatch)}
      onDismiss={() => {}}
      ariaLabel="Sign Up to SPARQ"
    >
      <CheckoutFormMain ref={inViewRef} show={inView} delay={0.5}>
        <CheckoutFormClose
          onClick={() => hideCheckoutForm(dispatch)}
          show={inView}
          delay={1}
        >
          <Close />
        </CheckoutFormClose>
        <Grid mobile={4}>
          <GridItem mobile={4} tabletL={2}>
            <CheckoutFormImageMask show={inView} delay={0.5}>
              <CheckoutFormImage show={inView} delay={0.5}>
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={image.description ? image.description : ''}
                />
              </CheckoutFormImage>
            </CheckoutFormImageMask>
          </GridItem>
          <GridItem
            mobile={4}
            tabletL={2}
            tabletLStart={3}
            tabletLAlign={`center`}
          >
            <CheckoutFormText>
              <Spacer size={[16, 36]} />
              <Heading3>
                <AnimateSplitText delay={0.75}>{heading}</AnimateSplitText>
              </Heading3>
              <Spacer size={15} />
              {text && (
                <>
                  <TextBodySmall>
                    <AnimateSplitText delay={0.75 + animation.textDelay}>
                      {text}
                    </AnimateSplitText>
                  </TextBodySmall>
                  <Spacer size={15} />
                </>
              )}
              {listItems && (
                <>
                  <UnorderedList>
                    {React.Children.toArray(
                      listItems.map((item, itemIndex) => {
                        return (
                          <ListItem inView={true} animate={true}>
                            <AnimateSlideIn
                              delay={
                                0.75 +
                                animation.textDelay * (text ? 2 : 1) +
                                itemIndex * animation.lineDuration
                              }
                            >
                              <TextBodySmall>{item}</TextBodySmall>
                            </AnimateSlideIn>
                          </ListItem>
                        )
                      })
                    )}
                  </UnorderedList>
                  <Spacer size={15} />
                </>
              )}
              <Spacer size={[10, 50]} />
              <CheckoutFormButton>
                <AnimateSlideIn
                  delay={
                    0.75 +
                    animation.textDelay *
                      (1 + (text ? 1 : 0) + (listItems ? 1 : 0))
                  }
                >
                  {/* <Button onClick={redirectToCheckout}>{buttonLabel}</Button> */}
                  <Button
                    type="externalLink"
                    href={process.env.GATSBY_STRIPE_URL}
                  >
                    {buttonLabel}
                  </Button>
                </AnimateSlideIn>
              </CheckoutFormButton>
            </CheckoutFormText>
          </GridItem>
        </Grid>
      </CheckoutFormMain>
    </Modal>
  )
}

export default CheckoutForm
