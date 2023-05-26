import styled from 'styled-components'
import { easings } from '../../../styles/vars/easings.style'

export const FadeInWrapper = styled.div.attrs(props => ({
  style: {
    transitionDelay: `${props.delay}s`,
  },
}))`
  opacity: ${props => (props.inView ? 1 : 0)};
  transition: opacity 0.6s ${easings.in.cubic};
`
