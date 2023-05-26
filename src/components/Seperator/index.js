import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useStore, setCursor } from '@Store/'
import { useInView } from 'react-intersection-observer'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import {
  SeperatorMain,
  SeperatorWrap,
  SeperatorLine,
  SeperatorButton,
  SeperatorTarget,
} from './index.style'
import { TextBody } from '@components/TextStyles'
import { colors } from '@styles/vars/colors.style'
import Container from '@components/Container'
import Spacer from '@components/Spacer'
import Arrow from '@components/svgs/Arrow'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import AnimateSlideIn from '@components/animation/AnimateSlideIn'

const Seperator = ({ label, margin, padding, color, desktop }) => {
  const [store, dispatch] = useStore()
  const { showPageMask } = store

  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  const target = useRef()

  const scrollToTarget = ev => {
    if (ev) ev.stopPropagation()
    if (window.scroll && target.current) window.scroll.scrollTo(target.current)
  }

  return (
    <SeperatorMain ref={ref} margin={margin} color={color} desktop={desktop}>
      <Container>
        <SeperatorWrap padding={padding}>
          <SeperatorLine color={color} show={inView && !showPageMask} />
          <Spacer size={[12, 55]} />
          <Grid>
            <GridItem tabletP={6}>
              <TextBody>
                <AnimateSplitText animate={inView}>{label}</AnimateSplitText>
              </TextBody>
            </GridItem>
            <GridItem tabletP={6}>
              <AnimateSlideIn animate={inView}>
                <SeperatorButton
                  onClick={scrollToTarget}
                  onMouseEnter={() => setCursor(dispatch, 'hide')}
                  onMouseLeave={() => setCursor(dispatch, 'default')}
                  aria-label={`Scroll to ${label}`}
                >
                  <Arrow stroke={color} />
                </SeperatorButton>
              </AnimateSlideIn>
            </GridItem>
          </Grid>
        </SeperatorWrap>
      </Container>
      <SeperatorTarget ref={target} />
    </SeperatorMain>
  )
}

Seperator.propTypes = {
  label: PropTypes.string,
  margin: PropTypes.number,
  padding: PropTypes.number,
  color: PropTypes.string,
  desktop: PropTypes.bool,
}

Seperator.defaultProps = {
  color: colors.dark,
  margin: 0,
}

export default Seperator
