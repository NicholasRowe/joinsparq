import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import PropTypes from 'prop-types'
import { Phased } from 'recondition'
import { ModalContent, ModalOverlay, ModalWrapper } from './index.style'

export const modalAnimationDurationMs = 750
export const modalAnimationDurationS = modalAnimationDurationMs / 1000

const ModalInner = ({
  isOpen,
  open,
  setClosed,
  onDismiss,
  ariaLabel,
  children,
}) => {
  const $overlay = useRef()
  const $content = useRef()
  const animate = useRef()

  useEffect(() => {
    animate.current = gsap.timeline({
      defaults: {
        ease: 'power1.inOut',
      },
    })

    return () => {
      if (animate.current) {
        animate.current.kill()
      }
    }
  }, [])

  useEffect(() => {
    if (animate.current) {
      animate.current.clear()
    }

    if (open) {
      const animateDelay = 0.01 // this is required so that Reach modal is rendered before animation is attempted

      gsap.delayedCall(animateDelay, () => {
        const fullDuration = modalAnimationDurationS - animateDelay

        animate.current
          .to($overlay.current, {
            opacity: 1,
            duration: fullDuration,
          })
          .fromTo(
            $content.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: fullDuration * 0.5,
            },
            `<${fullDuration * 0.5}`
          )
      })
    } else {
      if (!$overlay.current) return

      animate.current
        .to($overlay.current, {
          opacity: 0,
          duration: modalAnimationDurationS * 0.5,
        })
        .to(
          $content.current,
          {
            opacity: 0,
            duration: modalAnimationDurationS * 0.5,
          },
          '<'
        )
    }
  }, [open])

  return (
    <ModalWrapper isOpen={isOpen} open={open} onDismiss={onDismiss}>
      <ModalOverlay ref={$overlay} onClick={setClosed} />
      <ModalContent ref={$content} aria-label={ariaLabel}>
        {children}
      </ModalContent>
    </ModalWrapper>
  )
}

const Modal = ({ isOpen, setClosed, onDismiss, ariaLabel, children }) => (
  <Phased value={isOpen} phases={0} timeouts={[modalAnimationDurationMs]}>
    {({ value, nextValue }) => (
      <ModalInner
        isOpen={value || nextValue}
        open={nextValue}
        setClosed={setClosed}
        onDismiss={onDismiss}
        ariaLabel={ariaLabel}
        children={children}
      />
    )}
  </Phased>
)

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setClosed: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
