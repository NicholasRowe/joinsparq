import styled from 'styled-components'
import {
  DialogOverlay as ReachOverlay,
  DialogContent as ReachContent,
} from '@reach/dialog'
import { transparentize } from 'polished'
import { colors } from '../../styles/vars/colors.style'
import { mq } from '@styles/vars/media-queries.style'

export const ModalWrapper = styled(ReachOverlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: auto;
`

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${transparentize(0.2, colors.dark)};
  opacity: 0;

  ${mq.desk} {
    background: ${transparentize(0.4, colors.dark)};
  }
`

export const ModalContent = styled(ReachContent)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  outline: none;
  opacity: 0;
  pointer-events: none;
  z-index: 2;

  > * {
    pointer-events: auto;
  }
`
