import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../../Store'
import PropTypes from 'prop-types'
import useMousePosition from '@hooks/useMousePosition'
import {
  CursorMain,
  CursorTextWrap,
  CursorText,
  CursorCounterNumber,
  CursorCounterCurrent,
} from './index.style'
import CursorRing from '@components/svgs/CursorRing'
import { TextBody } from '@styles/vars/textStyles.style'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'
import { colors } from '@styles/vars/colors.style'

const Cursor = () => {
  const [store] = useStore()

  const mousePosition = useMousePosition()

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 }),
    [visible, setVisible] = useState(false)

  const raf = useRef(null)

  // eslint-disable-next-line
  const animateCursorPos = () => {
    const smoothPosition = {
      x: cursorPos.x + (mousePosition.x - cursorPos.x) * 0.25,
      y: cursorPos.y + (mousePosition.y - cursorPos.y) * 0.25,
    }
    setCursorPos(smoothPosition)
    if (!visible && mousePosition.x + mousePosition.y > 0) {
      setVisible(true)
    }
    raf.current = window.requestAnimationFrame(animateCursorPos)
  }

  useEffect(() => {
    raf.current = window.requestAnimationFrame(animateCursorPos)

    return () => {
      raf.current && window.cancelAnimationFrame(raf.current)
    }
  }, [animateCursorPos])

  return (
    <CursorMain
      x={cursorPos.x}
      y={cursorPos.y}
      visible={visible}
      hide={store.cursor === 'hide'}
      large={
        store.cursor === 'drag' ||
        store.cursor === 'signup' ||
        store.cursor === 'carousel'
      }
      bg={store.cursor !== 'drag' && store.cursor !== 'carousel'}
      dark={store.cursor === 'dark'}
    >
      <CursorRing />
      <CursorTextWrap>
        <CursorText show={store.cursor === 'drag'}>
          <AnimateSlideIn
            animate={store.cursor === 'drag'}
            animateOut={true}
            delay={0.3}
          >
            <TextBody>Drag</TextBody>
          </AnimateSlideIn>
        </CursorText>
        <CursorText show={store.cursor === 'signup'}>
          <AnimateSlideIn
            animate={store.cursor === 'signup'}
            animateOut={true}
            delay={0.3}
          >
            <TextBody color={colors.light}>Sign up</TextBody>
          </AnimateSlideIn>
        </CursorText>
        <CursorText show={store.cursor === 'carousel'}>
          <AnimateSlideIn
            animate={store.cursor === 'carousel'}
            animateOut={true}
            delay={0.3}
          >
            <CursorCounterNumber>
              {React.Children.toArray(
                Array(10)
                  .fill(1)
                  .map((count, countIndex) => {
                    return (
                      <CursorCounterCurrent
                        show={
                          store.cursor === 'carousel' &&
                          countIndex + 1 === store.cursorCounter[0]
                        }
                        delay={0.5}
                      >
                        <TextBody color={colors.light}>
                          {countIndex + 1}
                        </TextBody>
                      </CursorCounterCurrent>
                    )
                  })
              )}
            </CursorCounterNumber>
          </AnimateSlideIn>
          <CursorCounterNumber>
            <AnimateSlideIn
              animate={store.cursor === 'carousel'}
              animateOut={true}
              delay={0.3}
            >
              <TextBody color={colors.light}>
                &nbsp;/&nbsp;{store.cursorCounter[1]}
              </TextBody>
            </AnimateSlideIn>
          </CursorCounterNumber>
        </CursorText>
      </CursorTextWrap>
    </CursorMain>
  )
}

Cursor.propTypes = {
  type: PropTypes.string,
}

export default Cursor
