import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import useMousePosition from '@hooks/useMousePosition'
import {
  ModelsMain,
  ModelsFront,
  ModelsFrontOuter,
  ModelsFrontInner,
  ModelsBack,
  ModelsShimmer,
  ModelsShadow,
  ModelCarousel,
  ModalCarouselItem,
  ModalCarouselImagery,
  ModalCarouselImageryBottom,
} from './index.style'
import PhoneImg from './images/iphone.png'
import BackImg from './images/hardware.png'
import ShadowImg from './images/shadow.png'
import Dash0 from './images/dash/dash-0.jpg'
import Dash1 from './images/dash/dash-1.png'
import Dash2 from './images/dash/dash-2.png'
import Dash3 from './images/dash/dash-3.png'
import Health0 from './images/health/health-0.jpg'
import Health1 from './images/health/health-1.png'
import Health2 from './images/health/health-2.png'
import Health3 from './images/health/health-3.png'
import Health4 from './images/health/health-4.png'
import Health5 from './images/health/health-5.png'
import Health6 from './images/health/health-6.png'
import Health7 from './images/health/health-7.png'
import Health8 from './images/health/health-8.png'
import Health9 from './images/health/health-9.png'
import Status0 from './images/status/status-0.jpg'
import Status1 from './images/status/status-1.png'
import Status2 from './images/status/status-2.png'
import Status3 from './images/status/status-3.png'
import Status4 from './images/status/status-4.png'
import Spacer from '@components/Spacer'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'

const CarouselModalScreen = ({ label, active }) => {
  switch (label) {
    case 'Health Check':
      return (
        <ModalCarouselImagery image={Health0}>
          <Spacer size={[55, 70]} />
          <AnimateSlideIn
            animate={active}
            delay={0.1}
            animateOut={true}
            block={true}
          >
            <img src={Health1} alt="Health" width={160} height={30} />
          </AnimateSlideIn>
          <Spacer size={15} />
          <AnimateSlideIn
            animate={active}
            delay={0.3}
            animateOut={true}
            block={true}
          >
            <img src={Health2} alt="Health" width={160} height={30} />
          </AnimateSlideIn>
          <Spacer size={[5, 7]} />
          <AnimateSlideIn
            animate={active}
            delay={0.4}
            animateOut={true}
            block={true}
          >
            <img src={Health3} alt="Health" width={160} height={30} />
          </AnimateSlideIn>
          <Spacer size={[5, 7]} />
          <AnimateSlideIn
            animate={active}
            delay={0.5}
            animateOut={true}
            block={true}
          >
            <img src={Health4} alt="Health" width={160} height={30} />
          </AnimateSlideIn>
          <Spacer size={[5, 7]} />
          <AnimateSlideIn
            animate={active}
            delay={0.6}
            animateOut={true}
            block={true}
          >
            <img src={Health5} alt="Health" width={160} height={30} />
          </AnimateSlideIn>
          <Spacer size={[7, 9]} />
          <AnimateSlideIn
            animate={active}
            delay={0.7}
            animateOut={true}
            block={true}
          >
            <img
              src={Health6}
              style={{ opacity: 0.3 }}
              alt="Health"
              width={160}
              height={30}
            />
          </AnimateSlideIn>
          <Spacer size={[7, 9]} />
          <AnimateSlideIn
            animate={active}
            delay={0.8}
            animateOut={true}
            block={true}
          >
            <img
              src={Health7}
              style={{ opacity: 0.3 }}
              alt="Health"
              width={160}
              height={30}
            />
          </AnimateSlideIn>
          <Spacer size={[7, 9]} />
          <AnimateSlideIn
            animate={active}
            delay={0.9}
            animateOut={true}
            block={true}
          >
            <img
              src={Health8}
              style={{ opacity: 0.3 }}
              alt="Health"
              width={160}
              height={30}
            />
          </AnimateSlideIn>
          <Spacer size={15} />
          <ModalCarouselImageryBottom>
            <AnimateSlideIn
              animate={active}
              delay={1.2}
              animateOut={true}
              block={true}
            >
              <img src={Health9} alt="Health" width={170} height={100} />
            </AnimateSlideIn>
          </ModalCarouselImageryBottom>
        </ModalCarouselImagery>
      )
    case 'Dashboard':
      return (
        <ModalCarouselImagery image={Dash0}>
          <Spacer size={[35, 45]} />
          <AnimateSlideIn
            animate={active}
            delay={0.1}
            animateOut={true}
            block={true}
          >
            <img src={Dash1} alt="Dash" width={160} height={60} />
          </AnimateSlideIn>
          <Spacer size={15} />
          <AnimateSlideIn
            animate={active}
            delay={0.3}
            animateOut={true}
            block={true}
          >
            <img src={Dash2} alt="Dash" width={160} height={120} />
          </AnimateSlideIn>
          <Spacer size={5} />
          <AnimateSlideIn
            animate={active}
            delay={0.4}
            animateOut={true}
            block={true}
          >
            <img src={Dash3} alt="Dash" width={160} height={140} />
          </AnimateSlideIn>
        </ModalCarouselImagery>
      )
    case 'Health Status':
      return (
        <ModalCarouselImagery image={Status0}>
          <Spacer size={[50, 65]} />
          <AnimateSlideIn
            animate={active}
            delay={0.1}
            animateOut={true}
            block={true}
          >
            <img src={Status1} alt="Status" width={160} height={20} />
          </AnimateSlideIn>
          <Spacer size={15} />
          <AnimateSlideIn
            animate={active}
            delay={0.2}
            animateOut={true}
            block={true}
          >
            <img src={Status2} alt="Status" width={151} height={134} />
          </AnimateSlideIn>
          <Spacer size={[15, 25]} />
          <AnimateSlideIn
            animate={active}
            delay={0.4}
            animateOut={true}
            block={true}
          >
            <img src={Status3} alt="Status" width={160} height={120} />
          </AnimateSlideIn>
          <Spacer size={15} />
          <AnimateSlideIn
            animate={active}
            delay={0.5}
            animateOut={true}
            block={true}
          >
            <img src={Status4} alt="Status4" width={160} height={120} />
          </AnimateSlideIn>
        </ModalCarouselImagery>
      )
    default:
      return <ModalCarouselImagery image={Health0}></ModalCarouselImagery>
  }
}

const CarouselModels = ({ active, items }) => {
  const frontRef = useRef(),
    backRef = useRef(),
    shimmerRef = useRef(),
    shadowRef = useRef()

  const mousePosition = useMousePosition(true)

  useEffect(() => {
    const frontRotation = (mousePosition.x - 0.5) * 20,
      backX = (mousePosition.x - 0.5) * -70,
      backScale = 1 - (mousePosition.x - 0.5) * 0.15,
      shadowScale = 1 + 0.2 * Math.abs(mousePosition.x - 0.5)

    gsap.to(backRef.current, {
      x: backX,
      scale: backScale,
      duration: 0.5,
    })

    gsap.to(shimmerRef.current, {
      x: -frontRotation * 1,
      y: -frontRotation * 2,
      duration: 0.5,
    })

    gsap.to(frontRef.current, {
      rotationY: frontRotation,
      duration: 0.5,
    })

    gsap.to(shadowRef.current, {
      scale: shadowScale,
      duration: 0.5,
    })
  }, [mousePosition])

  return (
    <ModelsMain>
      <ModelsFront>
        <ModelsFrontOuter>
          <ModelsFrontInner ref={frontRef}>
            <ModelsShimmer ref={shimmerRef} />
            <img src={PhoneImg} alt={'Phone'} width={240} height={481} />
            <ModelCarousel>
              {React.Children.toArray(
                items.map((item, itemIndex) => {
                  return (
                    <ModalCarouselItem x={itemIndex - active}>
                      <CarouselModalScreen
                        label={item.screen}
                        active={active === itemIndex}
                      />
                    </ModalCarouselItem>
                  )
                })
              )}
            </ModelCarousel>
          </ModelsFrontInner>
        </ModelsFrontOuter>
      </ModelsFront>
      <ModelsBack ref={backRef}>
        <img src={BackImg} alt={'Hardware'} width={178} height={217} />
      </ModelsBack>
      <ModelsShadow ref={shadowRef}>
        <img src={ShadowImg} alt="" width={428} height={91} />
      </ModelsShadow>
    </ModelsMain>
  )
}

CarouselModels.propTypes = {
  active: PropTypes.number,
  items: PropTypes.array,
}

export default CarouselModels
