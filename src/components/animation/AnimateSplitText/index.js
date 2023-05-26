import React, { useCallback, useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useInView } from 'react-intersection-observer'
import { useStore } from '@Store/'
import { SplitText as gsapSplitText } from 'gsap/SplitText'
import PropTypes from 'prop-types'
import { SplitTextWrapper } from './index.style'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(gsapSplitText)
}

const AnimateSplitText = ({
  children,
  type = 'lines',
  delay = 0,
  triggerOnce = true,
  animate = true,
}) => {
  const [store] = useStore()
  const { showPageMask } = store
  const contentRef = useRef()
  const splitContentRef = useRef()
  const [isSplit, setIsSplit] = useState(false)

  const childrenArray = children.props ? children.props.children : children
  const ariaLabel =
    typeof children === 'object'
      ? React.Children.toArray(childrenArray)
          .filter(item => (typeof item === 'object' ? '' : item))
          .join('')
      : children

  const build = useCallback(() => {
    const types = ['chars', 'words']

    splitContentRef.current = new gsapSplitText(contentRef.current, {
      type: type,
      span: true,
    })

    splitContentRef.current['lines'].forEach((item, itemIndex) => {
      item.classList.add('split__mask')

      if (type === 'lines') {
        item.setAttribute('aria-hidden', true)
        item.style.setProperty('--splitTextDelay', `${itemIndex}s`)
        item.innerHTML = `<span class="split__text">${item.innerHTML}</span>`
      }
    })

    types.forEach(typeOption => {
      if (type.indexOf(typeOption)) {
        splitContentRef.current[typeOption].forEach((item, itemIndex) => {
          item.classList.add('split__text')
          item.setAttribute('aria-hidden', true)
          item.style.setProperty('--splitTextDelay', `${itemIndex}s`)

          if (typeOption === 'chars') {
            item.style.display = 'inline-block'
          }
        })
      }
    })
  }, [type])

  const update = useCallback(() => {
    splitContentRef.current.revert()
    build()
  }, [build])

  const [inViewRef, inView] = useInView({ triggerOnce })

  const setRefs = useCallback(
    node => {
      inViewRef(node)
      contentRef.current = node
    },
    [inViewRef]
  )

  useEffect(() => {
    if (store.fontIsLoaded) {
      build()

      setTimeout(() => {
        setIsSplit(true)
      }, 10)

      window.addEventListener('resize', update)
    }
  }, [store.fontIsLoaded, build, update])

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', update)
    }
  }, [update])

  return (
    <SplitTextWrapper
      ref={setRefs}
      show={isSplit && inView && animate && !showPageMask}
      delay={delay}
      aria-label={ariaLabel}
      role="article"
      type={type}
    >
      {children}
    </SplitTextWrapper>
  )
}

AnimateSplitText.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  triggerOnce: PropTypes.bool,
  animate: PropTypes.bool,
  type: PropTypes.oneOf(['lines', 'lines,words', 'lines,chars']),
}

export default AnimateSplitText
