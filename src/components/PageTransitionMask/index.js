import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import {
  hideMobileNav,
  hidePageMask,
  useStore,
  updateModelLoaded,
} from '../../Store'
import {
  TransitionMaskWrapper,
  TransitionMaskBlock,
  TransitionMaskHeader,
  TransitionMaskHeaderLogo,
  TransitionMaskHeaderLogoText,
  TransitionMaskHeaderLogoShapes,
  TransitionMaskLogoShapes,
  TransitionMaskVideo,
  TransitionMaskText,
  TransitionMaskTextSpan,
  TransitionMaskBarCount,
  TransitionMaskBar,
  TransitionMaskBarProgress,
} from './index.style'
import { Heading1 } from '@components/TextStyles'
import Logo from '../svgs/Logo'
import LogoShape from '../svgs/LogoShape'
import { colors } from '@styles/vars/colors.style'
import Container from '@components/Container'
import IntroVideo from './videos/intro.mp4'
import { animation } from '@styles/vars/animation.style'

const TransitionMask = () => {
  const [store, dispatch] = useStore()
  const { modelLoaded, pathname } = store
  const [masked, setMasked] = useState(true)
  const [showIcon, setShowIcon] = useState(true)
  const [loadBarFull, setLoadBarFull] = useState(false)

  const wrapperRef = useRef(),
    maskRef = useRef(),
    mask2Ref = useRef(),
    barRef = useRef(),
    countRef = useRef(),
    headingRef = useRef([]),
    headerRef = useRef(),
    videoRef = useRef()

  useEffect(() => {
    if (store.showPageMask) setMasked(true)
  }, [store.showPageMask])

  useEffect(() => {
    let tl, maskOutTimeout

    const home = pathname === '/'

    const maskOut = () => {
      if (!masked && (!home || modelLoaded === 1)) {
        const wrapper = wrapperRef.current,
          mask = maskRef.current,
          mask2 = mask2Ref.current,
          heading = headingRef.current,
          header = headerRef.current,
          video = videoRef.current,
          bar = barRef.current,
          count = countRef.current

        tl = gsap.timeline({
          onComplete: () => {
            if (window.innerWidth >= 1240) updateModelLoaded(dispatch, 0)
            setLoadBarFull(false)
            gsap.set([wrapper], { visibility: 'hidden' })
            gsap.set([mask, mask2], { y: '100%' })
            gsap.set(video, { opacity: 0 })
            gsap.set(bar, { opacity: 0, y: 0 })
            gsap.set(count, { y: 0 })
          },
        })

        if (home) {
          // Heading out
          tl.to(
            heading,
            {
              y: '-200%',
              duration: 1,
              ease: 'power2.in',
              stagger: window.innerWidth < 768 ? 0.1 : -0.1,
              onStart: () => hidePageMask(dispatch),
            },
            home ? '<0.5' : '0'
          )
          tl.to(
            heading,
            {
              opacity: 0,
              duration: 1,
              ease: 'power2.inOut',
              stagger: -0.1,
            },
            '<'
          )
        } else {
          tl.add(() => hidePageMask(dispatch))
        }

        // Header / video out
        tl.to(
          header,
          {
            y: '-100%',
            duration: 0.5,
            ease: 'power2.in',
          },
          '<0.5'
        )
        tl.to(
          [header, video],
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          '<'
        )

        // Mask out
        tl.to(
          [mask, mask2],
          {
            y: '-100%',
            duration: 1,
            ease: 'power3.inOut',
            stagger: 0.1,
          },
          '<'
        )
      }
    }

    maskOutTimeout = setTimeout(maskOut, 50)

    return () => {
      if (tl) tl.kill()
      if (maskOutTimeout) clearTimeout(maskOutTimeout)
    }
  }, [dispatch, pathname, masked, modelLoaded])

  useEffect(() => {
    let tl

    if (masked) {
      const home = pathname === '/'

      const tweenCount = {
        current: 0,
      }

      const wrapper = wrapperRef.current,
        mask = maskRef.current,
        mask2 = mask2Ref.current,
        heading = headingRef.current,
        video = videoRef.current,
        header = headerRef.current,
        bar = barRef.current,
        count = countRef.current

      tl = gsap.timeline({
        onStart: () => {
          gsap.set([wrapper], { visibility: 'visible' })
          gsap.set(header, {
            opacity: 1,
            y: 0,
          })
        },
        onComplete: () => setMasked(false),
      })

      // Mask in if needed
      tl.to([mask2, mask], {
        y: '0%',
        duration: 1,
        ease: 'power3.inOut',
        stagger: 0.1,
        onComplete: () => {
          hideMobileNav(dispatch)
          if (home) setShowIcon(true)
        },
      })

      if (home) {
        // Video in
        tl.to(video, {
          opacity: 1,
          duration: 0.5,
          ease: 'power1.inOut',
        })

        // Loader bar in
        tl.to(
          bar,
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          '<'
        )

        tl.fromTo(
          bar,
          {
            x: '-80%',
          },
          {
            x: 0,
            duration: animation.loaderShowDuration,
            ease: 'power2.inOut',
          },
          '<'
        )

        // Loader counter in
        tl.fromTo(
          tweenCount,
          {
            current: 0,
          },
          {
            current: 100,
            duration: animation.loaderShowDuration,
            ease: 'power2.inOut',
            onUpdate: () => {
              count.innerHTML = Math.round(tweenCount.current) + '%'
            },
          },
          '<'
        )

        tl.add(() => setShowIcon(false), '-=0.5')

        // Loader bar/counter out
        tl.to([count, bar], {
          y: '100%',
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.1,
          onStart: () => setLoadBarFull(true),
        })

        // Heading in
        tl.fromTo(
          heading,
          {
            y: '100%',
          },
          {
            y: 0,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.1,
            onStart: () => {
              video.pause()
              video.currentTime = 0
              video.play()
            },
          },
          '<0.2'
        )
        tl.to(
          heading,
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
            stagger: 0.1,
          },
          '<'
        )
      } else {
        // Header in
        // tl.set(
        //   header,
        //   {
        //     opacity: 1,
        //     y: 0,
        //   },
        //   '<'
        // )
        tl.add(() => setShowIcon(false))
        tl.add(() => setLoadBarFull(true))
      }
    }

    return () => {
      if (tl) {
        tl.kill()
      }
    }
  }, [masked, dispatch])

  return (
    <TransitionMaskWrapper ref={wrapperRef}>
      <TransitionMaskBlock $color={colors.dark} position={2} ref={maskRef} />
      <TransitionMaskBlock $color={colors.orange} position={1} ref={mask2Ref} />

      <TransitionMaskHeader ref={headerRef}>
        <Container>
          <TransitionMaskHeaderLogo>
            <TransitionMaskHeaderLogoShapes side={'left'} show={loadBarFull}>
              <LogoShape />
              <LogoShape />
            </TransitionMaskHeaderLogoShapes>
            <TransitionMaskHeaderLogoText show={loadBarFull}>
              <Logo />
            </TransitionMaskHeaderLogoText>
          </TransitionMaskHeaderLogo>
        </Container>
      </TransitionMaskHeader>

      <TransitionMaskLogoShapes side={'left'} show={showIcon}>
        <LogoShape />
        <LogoShape />
      </TransitionMaskLogoShapes>

      <TransitionMaskVideo aspectRatio={16 / 9}>
        <video
          ref={videoRef}
          src={IntroVideo}
          preload="auto"
          muted
          playsInline
        />
      </TransitionMaskVideo>

      <TransitionMaskText>
        <Heading1 as={'h2'}>
          <TransitionMaskTextSpan ref={ref => (headingRef.current[0] = ref)}>
            Keeps
          </TransitionMaskTextSpan>{' '}
          <TransitionMaskTextSpan ref={ref => (headingRef.current[1] = ref)}>
            You
          </TransitionMaskTextSpan>{' '}
          <TransitionMaskTextSpan ref={ref => (headingRef.current[2] = ref)}>
            Moving<sub>®</sub>
          </TransitionMaskTextSpan>
        </Heading1>
      </TransitionMaskText>

      <TransitionMaskBar>
        <TransitionMaskBarProgress ref={barRef}>
          <TransitionMaskBarCount ref={countRef}>0%</TransitionMaskBarCount>
        </TransitionMaskBarProgress>
      </TransitionMaskBar>
    </TransitionMaskWrapper>
  )
}

export default TransitionMask
