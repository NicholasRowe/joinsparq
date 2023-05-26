import React, { useRef, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import axios from 'axios'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { useStore, hideNewsletterForm } from '@Store/'
import Modal from '@components/Modal'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'
import Spacer from '@components/Spacer'
import {
  NewsletterFormMain,
  NewsletterFormImageMask,
  NewsletterFormImage,
  NewsletterFormInner,
  NewsletterFormText,
  NewsletterFormConfirmation,
  NewsletterFormClose,
  NewsletterFormForm,
  NewsletterFormInput,
  NewsletterFormButton,
  NewsletterFormSubmittedButton,
} from './index.style'
import { Heading3, TextBodySmall } from '@styles/vars/textStyles.style'
import { ListItem, UnorderedList } from '@components/RichText/index.style'
import Input from '@components/Input'
import Button from '@components/Button'
import Close from '@components/svgs/Close'
import { animation } from '@styles/vars/animation.style'

const NewsletterForm = () => {
  const [submitted, setSubmitted] = useState(false),
    [error, setError] = useState(false)

  const [inViewRef, inView] = useInView({ triggerOnce: false })

  const { contentfulGlobals, contentfulNewsletterModal } =
    useStaticQuery(graphql`
      query {
        contentfulGlobals {
          supportEmailAddress
        }
        contentfulNewsletterModal {
          heading
          text
          listItems
          image {
            description
            gatsbyImageData
          }
        }
      }
    `)

  const { heading, text, listItems, image } = contentfulNewsletterModal,
    { supportEmailAddress } = contentfulGlobals

  const [store, dispatch] = useStore()
  const { newsletterFormIsOpen } = store

  const formInputValueRef = useRef()

  const handleSubmit = ev => {
    ev.preventDefault()

    const options = {
      method: 'POST',
      url: 'https://connect.mailerlite.com/api/subscribers',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GATSBY_MAILERLITE_API_KEY}`,
      },
      data: {
        email: formInputValueRef.current,
        resubscribe: true,
        type: 'null',
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setSubmitted(true)
      })
      .catch(function (error) {
        setError(true)
      })
  }

  return (
    <Modal
      isOpen={newsletterFormIsOpen}
      setClosed={() => hideNewsletterForm(dispatch)}
      onDismiss={() => {}}
      ariaLabel="Sign Up to SPARQ emails"
    >
      <NewsletterFormMain ref={inViewRef} show={inView} delay={0.5}>
        <NewsletterFormClose
          onClick={() => hideNewsletterForm(dispatch)}
          show={inView}
          delay={1}
        >
          <Close />
        </NewsletterFormClose>
        <Grid mobile={4}>
          <GridItem mobile={4} tabletL={2}>
            <NewsletterFormImageMask show={inView} delay={0.5}>
              <NewsletterFormImage show={inView} delay={0.5}>
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={image.description ? image.description : ''}
                />
              </NewsletterFormImage>
            </NewsletterFormImageMask>
          </GridItem>
          <GridItem
            mobile={4}
            tabletL={2}
            tabletLStart={3}
            tabletLAlign={`center`}
          >
            <NewsletterFormInner>
              <NewsletterFormText show={!submitted && !error}>
                <Spacer size={[16, 36]} />
                <Heading3>
                  <AnimateSplitText animate={!submitted && !error} delay={0.75}>
                    {heading}
                  </AnimateSplitText>
                </Heading3>
                <Spacer size={15} />
                {text && (
                  <>
                    <TextBodySmall>
                      <AnimateSplitText
                        animate={!submitted && !error}
                        delay={0.75 + animation.textDelay}
                      >
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
                                animate={!submitted && !error}
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
                <NewsletterFormForm onSubmit={ev => handleSubmit(ev)}>
                  <NewsletterFormInput>
                    <AnimateSlideIn
                      animate={!submitted && !error}
                      delay={
                        0.75 +
                        animation.textDelay *
                          (1 + (text ? 1 : 0) + (listItems ? 1 : 0))
                      }
                    >
                      <Input
                        valueRef={formInputValueRef}
                        label="Enter your Email"
                        type="email"
                        required
                      />
                      <NewsletterFormButton>
                        <Button onClick={() => {}}>Join</Button>
                      </NewsletterFormButton>
                    </AnimateSlideIn>
                  </NewsletterFormInput>
                </NewsletterFormForm>
              </NewsletterFormText>
              <NewsletterFormConfirmation show={submitted && !error}>
                <Spacer size={[16, 36]} />
                <Heading3>
                  <AnimateSplitText animate={submitted && !error} delay={1.75}>
                    Subscription Successful
                  </AnimateSplitText>
                </Heading3>
                <Spacer size={15} />
                <TextBodySmall>
                  <AnimateSplitText
                    animate={submitted && !error}
                    delay={1.75 + animation.textDelay}
                  >
                    Thank you for subscribing to the SPARQ newsletter.
                  </AnimateSplitText>
                </TextBodySmall>
                <Spacer size={15} />
                <NewsletterFormSubmittedButton>
                  <AnimateSlideIn
                    animate={submitted && !error}
                    delay={1.75 + animation.textDelay * 2}
                  >
                    <Button onClick={() => hideNewsletterForm(dispatch)}>
                      Close
                    </Button>
                  </AnimateSlideIn>
                </NewsletterFormSubmittedButton>
              </NewsletterFormConfirmation>
              <NewsletterFormConfirmation show={!submitted && error}>
                <Spacer size={[16, 36]} />
                <Heading3>
                  <AnimateSplitText animate={!submitted && error} delay={1.75}>
                    Error: Subscription Unsuccessful
                  </AnimateSplitText>
                </Heading3>
                <Spacer size={15} />
                <TextBodySmall>
                  <AnimateSplitText
                    animate={!submitted && error}
                    delay={1.75 + animation.textDelay}
                  >
                    There was an issue submitting your email address. Please
                    refresh the page and try again, or contact us directly.
                  </AnimateSplitText>
                </TextBodySmall>
                <Spacer size={15} />
                <NewsletterFormSubmittedButton>
                  <AnimateSlideIn
                    animate={!submitted && error}
                    delay={1.75 + animation.textDelay * 2}
                  >
                    <Button
                      href={`mailto:${supportEmailAddress}?subject=Newsletter Sign Up&body=I would like to subscribe to the SPARQ newsletter`}
                      // onClick={() => {}}
                      type={`externalLink`}
                    >
                      Contact Us
                    </Button>
                  </AnimateSlideIn>
                </NewsletterFormSubmittedButton>
              </NewsletterFormConfirmation>
            </NewsletterFormInner>
          </GridItem>
        </Grid>
      </NewsletterFormMain>
    </Modal>
  )
}

export default NewsletterForm
