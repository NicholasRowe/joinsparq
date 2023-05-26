import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { hideMobileNav, showMobileNav, useStore } from '../../Store'
import { disablePageScroll, enablePageScroll } from '../../utils/utils'
import { MenuToggleMain, MenuToggleBar, MenuToggleWrapper } from './index.style'

const MenuToggle = () => {
  const [store, dispatch] = useStore()
  const { mobileNavIsOpen } = store
  const toggleRef = useRef()
  const barA = useRef()
  const barB = useRef()
  const barC = useRef()

  useEffect(() => {
    const tlOpen = gsap.timeline({ paused: true })
    const tlClose = gsap.timeline({ paused: true })

    tlOpen
      .to(barA.current, {
        y: 0,
        rotate: 45,
        duration: 0.2,
        ease: 'power2.inOut',
      })
      .to(
        barB.current,
        {
          opacity: 0,
          scaleX: 0,
          duration: 0.2,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        barC.current,
        {
          y: 0,
          rotate: -45,
          duration: 0.2,
          ease: 'power2.inOut',
        },
        0
      )

    tlClose
      .to(barA.current, {
        y: -4,
        rotate: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      })
      .to(
        barB.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.2,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        barC.current,
        {
          y: 4,
          rotate: 0,
          duration: 0.2,
          ease: 'power2.inOut',
        },
        0
      )

    if (mobileNavIsOpen) {
      disablePageScroll()
      tlOpen.play()
    } else {
      enablePageScroll()
      tlClose.play()
    }

    return () => {
      tlOpen.kill()
      tlClose.kill()
    }
  }, [mobileNavIsOpen])

  const handleClick = () => {
    if (mobileNavIsOpen) {
      hideMobileNav(dispatch)
    } else {
      showMobileNav(dispatch)
    }
  }

  return (
    <MenuToggleWrapper ref={toggleRef}>
      <MenuToggleMain onClick={handleClick} aria-label="Toggle menu">
        <MenuToggleBar ref={barA} />
        <MenuToggleBar ref={barB} />
        <MenuToggleBar ref={barC} />
      </MenuToggleMain>
    </MenuToggleWrapper>
  )
}

export default MenuToggle
