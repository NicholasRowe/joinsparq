import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  useStore,
  setCursor,
  showNewsletterForm,
  showCheckoutForm,
} from '@Store/'
import { useInView } from 'react-intersection-observer'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { debounce } from 'lodash'
import Draggable from 'gsap/Draggable'
import InertiaPlugin from 'gsap/InertiaPlugin'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'
import { animation } from '@styles/vars/animation.style'
import ScrollSection from '@components/ScrollSection'
import Container from '@components/Container'
import Spacer from '@components/Spacer'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import { Heading2, TextBody } from '@components/TextStyles'
import {
  CarouselMain,
  CarouselInner,
  CarouselPhone,
  CarouselWrap,
  CarouselTrack,
  CarouselItem,
  CarouselModelSpacer,
  CarouselText,
  CarouselNav,
  CarouselButton,
  CarouselDots,
  CarouselDot,
} from './index.style'
import Button from '@components/Button'
import CarouselModels from '@components/CarouselModels'
import Arrow from '@components/svgs/Arrow'
import obdVideo from '@components/Carousel/video/obd.mp4'
import AnimateImage from '@components/animation/AnimateImage'
import { graphql, useStaticQuery } from 'gatsby'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable, InertiaPlugin)
}

const Carousel = ({ items, labels }) => {
  const [ref, inView] = useInView({
    rootMargin: `-15% 0px -30% 0px`,
    triggerOnce: false,
  })

  const video = useRef()

  const [, dispatch] = useStore()

  const { contentfulGlobals } = useStaticQuery(graphql`
    query {
      contentfulGlobals {
        salesFunnelMode
      }
    }
  `)

  const { salesFunnelMode } = contentfulGlobals
  const newsletterMode = salesFunnelMode === 'Newsletter'

  const [trackBounds, setTrackBounds] = useState(0),
    [index, setIndex] = useState(0),
    [manual, setManual] = useState(false),
    [itemWidth, setItemWidth] = useState(0)

  const draggable = useRef(null),
    track = useRef(null),
    maxIndex = useRef(items.length - 1)

  const drag = useCallback(() => {
    const current = draggable.current[0].endX / trackBounds,
      currentIndex = Math.floor(maxIndex.current * current + 0.5)
    setIndex(currentIndex)
  }, [trackBounds])

  const dragEnd = useCallback(() => {
    const current = draggable.current[0].endX / trackBounds,
      currentIndex = Math.floor(maxIndex.current * current + 0.5)
    setIndex(currentIndex)
  }, [trackBounds])

  const createDraggable = useCallback(() => {
    if (draggable.current) {
      draggable.current[0].kill()
    }

    const trackWidth = track.current.getBoundingClientRect().width,
      singleItemWidth =
        track.current.childNodes[0].getBoundingClientRect().width

    setTrackBounds(-trackWidth + singleItemWidth)
    setIndex(0)

    draggable.current = Draggable.create(track.current, {
      type: 'x',
      dragResistance: 0.2,
      edgeResistance: 0.9,
      bounds: {
        minX: 0,
        maxX: -trackWidth + singleItemWidth,
      },
      inertia: true,
      throwResistance: 800,
      maxDuration: 1,
      snap: value => {
        return Math.round(value / singleItemWidth) * singleItemWidth
      },
      onDrag: drag,
      onDragEnd: dragEnd,
    })

    gsap.set(track.current, { x: 0 })

    setItemWidth(singleItemWidth)
  }, [drag, dragEnd])

  const prev = () => {
    if (index === 0) return
    setIndex(index - 1)
    setManual(true)
  }

  const next = () => {
    if (index === items.length - 1) return
    setIndex(index + 1)
    setManual(true)
  }

  useEffect(() => {
    if (!manual) return
    gsap.to(track.current, {
      x: itemWidth * -index,
      onComplete: () => {
        draggable.current && draggable.current[0].update()
        setManual(false)
      },
    })
  }, [index, itemWidth, manual])

  useEffect(() => {
    if (track.current) createDraggable()

    const debouncedCreateDraggable = debounce(createDraggable, 500)

    window.addEventListener('resize', debouncedCreateDraggable)

    return () => {
      window.removeEventListener('resize', debouncedCreateDraggable)
    }
  }, [track, createDraggable])

  useEffect(() => {
    if (inView && index === 0) {
      video.current
        .play()
        .then(() => {})
        .catch(error => {
          console.log(error)
          video.current.setAttribute('controls', 'controls')
        })
    } else {
      video.current.pause()
    }
  }, [inView, index])

  return (
    <ScrollSection>
      <CarouselMain ref={ref}>
        <Container>
          <Spacer size={[60, 180]} />
          <CarouselInner>
            <CarouselPhone $offset={index === 0}>
              <Grid>
                <GridItem desk={6} deskStart={6}>
                  <CarouselModels active={index} items={items} />
                </GridItem>
              </Grid>
            </CarouselPhone>
            <CarouselWrap>
              <Grid>
                <GridItem desk={10} deskStart={2}>
                  <CarouselNav disabled={index === 0}>
                    <AnimateSlideIn delay={1}>
                      <Button
                        onClick={prev}
                        label={`Previous Slide`}
                        disabled={index === 0}
                        variant={`secondary`}
                        onMouseEnter={() => setCursor(dispatch, 'hide')}
                        onMouseLeave={() => setCursor(dispatch, 'default')}
                        iconRight={<Arrow responsive={true} />}
                      />
                    </AnimateSlideIn>
                  </CarouselNav>
                  <CarouselNav
                    right={true}
                    disabled={index === items.length - 1}
                  >
                    <AnimateSlideIn delay={1}>
                      <Button
                        onClick={next}
                        label={`Next Slide`}
                        disabled={index === items.length - 1}
                        variant={`secondary`}
                        onMouseEnter={() => setCursor(dispatch, 'hide')}
                        onMouseLeave={() => setCursor(dispatch, 'default')}
                        iconRight={<Arrow responsive={true} />}
                      />
                    </AnimateSlideIn>
                  </CarouselNav>
                  <CarouselTrack
                    ref={track}
                    count={items.length}
                    onMouseEnter={() => setCursor(dispatch, 'drag')}
                    onMouseLeave={() => setCursor(dispatch, 'default')}
                  >
                    {React.Children.toArray(
                      items.map((item, itemIndex) => {
                        return (
                          <CarouselItem active={index === itemIndex}>
                            <Grid desk={10}>
                              <GridItem desk={6} deskOrder={2}>
                                <CarouselModelSpacer>
                                  {itemIndex === 0 && (
                                    <AnimateImage>
                                      <video
                                        ref={video}
                                        src={obdVideo}
                                        playsInline
                                        loop
                                        muted
                                        preload="auto"
                                      />
                                    </AnimateImage>
                                  )}
                                </CarouselModelSpacer>
                              </GridItem>
                              <GridItem desk={4} deskAlign={`flex-end`}>
                                <CarouselText>
                                  <Heading2 maxWidth={6}>
                                    <AnimateSplitText type={`lines,chars`}>
                                      {item.title}
                                    </AnimateSplitText>
                                  </Heading2>
                                  <Spacer size={[28, 57]} />
                                  <TextBody maxWidth={22}>
                                    <AnimateSplitText
                                      delay={animation.textDelay}
                                    >
                                      {item.text}
                                    </AnimateSplitText>
                                  </TextBody>
                                </CarouselText>
                              </GridItem>
                            </Grid>
                          </CarouselItem>
                        )
                      })
                    )}
                  </CarouselTrack>
                </GridItem>
              </Grid>
              <CarouselDots>
                {React.Children.toArray(
                  items.map((item, itemIndex) => {
                    return <CarouselDot active={index === itemIndex} />
                  })
                )}
              </CarouselDots>
            </CarouselWrap>
          </CarouselInner>
        </Container>
        <CarouselButton>
          <Container>
            <Spacer size={[70, 166]} />
            <CarouselButton>
              <AnimateSlideIn>
                <Button
                  onClick={() =>
                    newsletterMode
                      ? showNewsletterForm(dispatch)
                      : showCheckoutForm(dispatch)
                  }
                  label={labels[0]}
                >
                  <span>{labels[0]}</span>
                  <span>{labels[1]}</span>
                </Button>
              </AnimateSlideIn>
            </CarouselButton>
            <Spacer size={[70, 120]} />
          </Container>
        </CarouselButton>
      </CarouselMain>
    </ScrollSection>
  )
}

Carousel.propTypes = {
  items: PropTypes.array,
  labels: PropTypes.array,
}

export default Carousel
