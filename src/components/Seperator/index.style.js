import {
  AnimateSlideInWrap,
  AnimateSlideInContent,
} from '@components/animation/AnimateSlideIn/index.style'
import { clamp } from '@styles/utils/conversion.style'
import { mq } from '@styles/vars/media-queries.style'
import { easings } from '@styles/vars/easings.style'
import styled from 'styled-components'
import { colors } from '@styles/vars/colors.style'

export const SeperatorMain = styled.div`
  color: ${props => props.color};
  ${clamp('padding-bottom', 40, 78)};

  ${mq.desk} {
    display: ${props => (props.desktop ? `block` : `none`)};
    margin-bottom: ${props => props.margin / 10}rem;
    padding-bottom: 0;
  }
`

export const SeperatorWrap = styled.div`
  position: relative;

  ${mq.desk} {
    padding-bottom: ${props => props.padding / 10}rem;
  }

  ${AnimateSlideInWrap} {
    display: block;
    width: 100%;
  }

  ${AnimateSlideInContent} {
    display: block;
    margin-left: auto;
    margin-right: 0;
    width: 2.1rem;
  }
`

export const SeperatorLine = styled.div`
  background-color: ${props => props.color};
  height: 0.1rem;
  left: 0;
  opacity: ${props => (props.show ? 0.2 : 0)};
  position: absolute;
  right: 0;
  top: 0;
  transform: scaleX(${props => (props.show ? 1 : 0.6)});
  transform-origin: 0% 0%;
  transition: opacity 1s ${easings.inOut.default},
    transform 1s ${easings.inOut.default};

  ${mq.desk} {
    display: none;
  }
`

export const SeperatorButton = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  display: none;

  path {
    transition: stroke 0.4s ${easings.inOut.default};
  }

  ${mq.desk} {
    display: flex;

    &:hover {
      path {
        stroke: ${colors.orange};
      }
    }
  }
`

export const SeperatorTarget = styled.div`
  height: 1px;
`
