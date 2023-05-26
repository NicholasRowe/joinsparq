import styled from 'styled-components'
import { mq } from '../../styles/vars/media-queries.style'
import { easings } from '../../styles/vars/easings.style'
import { clamp } from '../../styles/utils/conversion.style'
import { zIndex } from '../../styles/vars/zIndex.style'
import { PageTransitionLinkMain } from '../PageTransitionLink/index.style'
import { ButtonContent, ButtonMain } from '@components/Button/index.style'
import { colors } from '@styles/vars/colors.style'

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.header};
`

export const HeaderMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: -1rem;
  margin-right: -1rem;
  ${clamp('padding-top', 15, 50)};

  ${mq.tabletL} {
    margin-left: 0;
    margin-right: 0;
  }
`

export const HeaderPreLogo = styled.button`
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`

export const HeaderLogo = styled.div`
  ${clamp('height', 20, 41)}
  position: relative;
  ${clamp('width', 88, 181)}
  z-index: ${zIndex.mobileNavButtons};

  a {
    height: 100%;
    width: 100%;
  }
`

export const HeaderLogoText = styled.div`
  height: 100%;
  ${clamp('left', 23, 52)};
  position: relative;
  width: 100%;

  path {
    transform: translateY(${props => (props.show ? 0 : 100)}%);
    transition: opacity 1s ${easings.inOut.default},
      transform 1s ${easings.inOut.default};

    &:nth-of-type(1) {
      transition-delay: 0s;
    }
    &:nth-of-type(2) {
      transition-delay: 0.05s;
    }
    &:nth-of-type(3) {
      transition-delay: 0.1s;
    }
    &:nth-of-type(4) {
      transition-delay: 0.15s;
    }
    &:nth-of-type(5) {
      transition-delay: 0.2s;
    }
  }
`

export const HeaderLogoShapes = styled.div`
  font-size: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotateZ(-45deg);

  svg {
    ${clamp('height', 8, 17)}
    transform: translateX(${props => (props.show ? 0 : 100)}%);
    transition: transform 0.35s ${easings.inOut.default};
    ${clamp('width', 13, 27)}

    &:nth-child(2) {
      ${clamp('margin-top', 1, 1)};
      transform: rotateZ(180deg) translateX(${props => (props.show ? 0 : 100)}%);
    }
  }

  path {
    fill: ${props =>
      props.colorMode === `light` ? colors.light : colors.dark};
    transition: fill 0.5s ${easings.inOut.default};
  }
`

export const HeaderNav = styled.nav`
  opacity: ${props => (props.show ? 1 : 0)};
  pointer-events: ${props => (props.show ? `auto` : `none`)};
  transition: opacity 0.5s ${easings.inOut.default}
    ${props => (props.show ? `1s` : `0s`)};
`

export const HeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  text-align: right;
`

export const HeaderMenuItem = styled.li`
  padding-right: 2rem;

  &:last-child {
    padding-right: 0;
  }

  ${PageTransitionLinkMain} {
    display: inline-flex;
  }

  ${ButtonContent} {
    color: ${props => (props.colorMode === `light` ? colors.light : ``)};
  }
`

export const HeaderBottomCTA = styled.div`
  bottom: 0;
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  transform: translateY(${props => (props.show ? 0 : 105)}%);
  transition: transform 1s ${easings.inOut.default};
  z-index: ${zIndex.header};

  ${mq.desk} {
    display: block;
  }

  ${ButtonMain} {
    border-radius: 0;
    width: 100%;
  }
`
