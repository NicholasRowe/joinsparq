import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { colors } from '@styles/vars/colors.style'
import { clamp } from '@styles/utils/conversion.style'
import { breakpoints } from '@styles/vars/breakpoints.style'
import { easings } from '@styles/vars/easings.style'
import { Heading2, TextBody } from '@styles/vars/textStyles.style'
import Shadow from './images/shadow.png'

export const LocationsMain = styled.div`
  background-color: ${colors.grey};

  ${mq.desk} {
    ${clamp('padding-top', 80, 100, breakpoints.desk, breakpoints.deskL)};
  }
`

export const LocationsText = styled.div`
  padding-bottom: 5rem;

  ${mq.tabletL} {
    padding-bottom: 0;
  }

  ${Heading2} {
    ${clamp('max-width', 460, 560, breakpoints.desk, breakpoints.contained)}
  }

  ${TextBody} {
    color: ${colors.darkgrey};
    ${clamp('max-width', 460, 560, breakpoints.desk, breakpoints.contained)}
  }
`

export const LocationsMap = styled.div`
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  ${clamp('border-radius', 5, 10)};
  overflow: hidden;
  position: relative;
`

export const LocationMarker = styled.div`
  ${clamp('height', 24, 52)};
  position: absolute;
  left: ${props => props.xPerc}%;
  opacity: ${props => (props.show ? 1 : 0)};
  top: ${props => props.yPerc}%;
  transform: ${props =>
    props.show
      ? 'rotateX(0deg) translateY(0)'
      : 'rotateX(-95deg) translateY(100%)'};
  transition: opacity 1s ${easings.inOut.default},
    transform 1s ${easings.inOut.default};
  transition-delay: ${props => props.delay}s;
  ${clamp('width', 18, 40)};
  will-change: transform;
  z-index: 2;

  &:after {
    background-image: url(${Shadow});
    background-size: contain;
    ${clamp('bottom', -7, -15)};
    content: '';
    ${clamp('height', 13, 28)};
    left: -50%;
    opacity: ${props => (props.show ? 1 : 0)};
    transition: opacity 1s ${easings.inOut.default};
    transition-delay: ${props => props.delay}s;
    position: absolute;
    ${clamp('width', 45, 98)};
    z-index: -1;
  }

  g {
    &:first-child {
      transform: ${props =>
        props.show ? 'translateY(0)' : 'translateY(-1.5rem)'};
      transition: transform 1s ${easings.inOut.default};
      transition-delay: ${props => props.delay + 0.3}s;
    }
  }
`
