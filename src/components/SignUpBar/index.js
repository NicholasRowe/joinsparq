import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { useStore, setCursor } from '@Store/'
import Grid from '@components/Grid'
import GridItem from '@components/GridItem'
import Container from '@components/Container'
import AnimateSplitText from '@components/animation/AnimateSplitText'
import { animation } from '@styles/vars/animation.style'
import Spacer from '@components/Spacer'
import { BarMain, BarInner, BarItems, BarText } from './index.style'
import { Heading3, TextBodySmall } from '@components/TextStyles'

const SignUpBar = ({ items, labels }) => {
  const [ref, inView] = useInView({ triggerOnce: true })
  const [store, dispatch] = useStore()
  const { showPageMask } = store

  return (
    <BarMain>
      <Container>
        <BarInner
          ref={ref}
          show={inView && !showPageMask}
          onMouseEnter={() => setCursor(dispatch, 'dark')}
          onMouseLeave={() => setCursor(dispatch, 'default')}
        >
          <BarItems>
            <Grid tabletL={4} desk={8}>
              {React.Children.toArray(
                items.map((item, itemIndex) => {
                  return (
                    <GridItem tabletL={2} desk={2}>
                      <BarText>
                        <Heading3>
                          <AnimateSplitText
                            delay={animation.textDelay + 0.1 * (1 + itemIndex)}
                          >
                            {item.heading}
                          </AnimateSplitText>
                        </Heading3>
                        <Spacer size={[18, 22]} />
                        <TextBodySmall>
                          <AnimateSplitText
                            delay={
                              animation.textDelay * 2 + 0.1 * (1 + itemIndex)
                            }
                          >
                            {item.text}
                          </AnimateSplitText>
                        </TextBodySmall>
                      </BarText>
                    </GridItem>
                  )
                })
              )}
            </Grid>
          </BarItems>
        </BarInner>
      </Container>
      <Spacer size={[70, 120]} />
    </BarMain>
  )
}

SignUpBar.propTypes = {
  items: PropTypes.array,
  labels: PropTypes.array,
}

export default SignUpBar
