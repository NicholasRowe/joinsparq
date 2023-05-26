import styled from 'styled-components'
import { colors } from '../../styles/vars/colors.style'
import { zIndex } from '../../styles/vars/zIndex.style'
import { mq } from '../../styles/vars/media-queries.style'

export const MenuToggleWrapper = styled.div`
  margin-right: -0.9rem;
  position: relative;
  z-index: ${zIndex.mobileNavButtons};
`

export const MenuToggleMain = styled.button`
  background-color: transparent;
  border: none;
  height: 4.4rem;
  position: relative;
  width: 4.4rem;

  ${mq.tabletL} {
    display: none;
  }
`

export const MenuToggleBar = styled.div`
  position: absolute;
  top: calc(50% - 0.05rem);
  left: calc(50% - 1.25rem);
  width: 2.5rem;
  height: 0.1rem;
  background-color: ${colors.dark};
  transform-origin: 50% 50%;

  :nth-child(1) {
    transform: translateY(-0.4rem);
  }

  :nth-child(3) {
    transform: translateY(0.4rem);
  }
`
