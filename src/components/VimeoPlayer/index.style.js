import styled from 'styled-components'
import { colors } from '../../styles/vars/colors.style'
import { easings } from '../../styles/vars/easings.style'

const overlayTransitionDuration = 0.4

export const VimeoPlayerMain = styled.div`
  position: relative;
  overflow: hidden;

  :before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: ${props =>
      props.aspectRatio ? `${props.aspectRatio * 100}%` : '56.25%'};
  }
`

export const VimeoPlayerEmbed = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.playing ? 1 : 0)};
  visibility: ${props => (props.playing ? 'visible' : 'hidden')};
  transition: ${props =>
    `opacity ${overlayTransitionDuration}s ${
      easings.inOut.default
    }, visibility 0s ${
      props.playing ? '0s' : `${overlayTransitionDuration}s`
    }`};

  iframe {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export const VimeoPlayerOverlay = styled.div`
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  bottom: -0.2rem;
  left: -0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: ${props => (props.playing ? 'none' : undefined)};
  appearance: none;
  border: none;
  background-color: ${colors.grey};
  opacity: ${props => (props.playing ? 0 : 1)};
  transition: opacity ${overlayTransitionDuration}s ${easings.inOut.default};
`

export const VimeoPlayButton = styled.button`
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  will-change: transform;
  transition: transform 0.2s ${easings.inOut.default};

  :hover,
  :focus {
    transform: scale(1.05);
  }
`
