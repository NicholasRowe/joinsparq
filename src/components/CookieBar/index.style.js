import styled from 'styled-components'
import { colors } from '../../styles/vars/colors.style'
import { mq } from '../../styles/vars/media-queries.style'
import { zIndex } from '../../styles/vars/zIndex.style'
import { easings } from '../../styles/vars/easings.style'
import { ButtonMain } from '@components/Button/index.style'
import { clamp } from '@styles/utils/conversion.style'
import { LinkMain } from '@components/Link/index.style'

export const CookieBarMain = styled.div`
  bottom: 0;
  pointer-events: ${props => (props.show ? 'all' : 'none')};
  position: fixed;
  left: 0;
  transition: visibility 0s ${props => (props.show ? 0 : 1.4)}s;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  width: 100%;
  z-index: ${zIndex.cookieBar};

  ${mq.tabletP} {
    ${clamp('bottom', 28, 48)};
    left: auto;
    ${clamp('right', 30, 48)};
    width: auto;
  }

  ${LinkMain} {
    color: ${colors.orange};
    text-decoration: underline;

    &:hover {
      color: ${colors.lightorange};
    }
  }

  ${ButtonMain} {
    min-height: 5rem;
    ${clamp('min-width', 80, 110)};
    text-transform: uppercase;
  }
`

export const CookieBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${clamp('padding-bottom', 20, 30)};
  ${clamp('padding-left', 30, 40)};
  ${clamp('padding-right', 30, 40)};
  ${clamp('padding-top', 20, 30)};
  color: ${colors.dark};

  &:before {
    content: '';
    background-color: ${colors.light};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: scaleY(${props => (props.show ? 1 : 0)});
    transform-origin: 50% 100%;
    transition: transform 1s ${easings.inOut.default};
    transition-delay: ${props => (props.show ? 1 : 0.4)}s;
    z-index: -1;

    ${mq.tabletP} {
      border-radius: 1rem;
    }
  }
`

export const CookieBarText = styled.div`
  margin-right: 2rem;

  ${mq.mobileLMax} {
    flex: 1;
  }
`
