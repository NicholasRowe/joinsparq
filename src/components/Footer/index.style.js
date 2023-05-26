import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { colors } from '@styles/vars/colors.style'
import { easings } from '@styles/vars/easings.style'
import { clamp } from '@styles/utils/conversion.style'
import { TextBodySmall } from '@styles/vars/textStyles.style'
import { LinkMain } from '@components/Link/index.style'

export const FooterMain = styled.div`
  background-color: ${colors.dark};
  color: ${colors.darkgrey};
  position: relative;

  ${LinkMain} {
    color: ${colors.light};

    :not(:disabled):hover {
      color: ${colors.orange};
    }
  }
`

export const FooterLogo = styled.div`
  height: 3.2rem;
  margin: 0 auto 1.8rem;
  position: relative;
  width: 14rem;

  a {
    height: 100%;
    width: 100%;
  }

  ${mq.tabletL} {
    margin-bottom: 0;
    margin-left: 0;
  }
`

export const FooterLogoText = styled.div`
  height: 100%;
  ${clamp('left', 36, 45)};
  position: relative;
  width: 100%;

  path {
    transform: translateY(${props => (props.show ? 0 : 100)}%);
    transition: opacity 1s ${easings.inOut.default},
      transform 1s ${easings.inOut.default};

    &:nth-of-type(1) {
      transition-delay: 0.4s;
    }
    &:nth-of-type(2) {
      transition-delay: 0.45s;
    }
    &:nth-of-type(3) {
      transition-delay: 0.5s;
    }
    &:nth-of-type(4) {
      transition-delay: 0.55s;
    }
    &:nth-of-type(5) {
      transition-delay: 0.6s;
    }
  }
`

export const FooterLogoShapes = styled.div`
  font-size: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotateZ(-45deg);

  svg {
    height: 1.3rem;
    transform: translateX(${props => (props.show ? 0 : 105)}%);
    transition-property: transform;
    transition-duration: 0.3s;
    transition-delay: 0.3s;
    transition-timing-function: ${easings.inOut.default};
    width: 2rem;

    &:nth-child(2) {
      margin-top: 1px;
      transform: rotateZ(180deg) translateX(${props => (props.show ? 0 : 105)}%);
    }
  }
`

export const FooterAddress = styled.div`
  padding-bottom: 2.4rem;
  text-align: center;
  white-space: pre-line;

  ${mq.tabletL} {
    padding-bottom: 0;
    text-align: left;
  }

  ${TextBodySmall} {
    line-height: 2;
  }
`

export const FooterSocials = styled.ul`
  text-align: center;
  display: inline-flex;
  justify-content: center;
  width: 100%;
  margin-top: 1.2rem;
  ${mq.tabletL} {
    text-align: right;
    margin-left: 1.6rem;
    justify-content: normal;
    width: auto;
    margin-top: 0;
  }
`

export const FooterSocialLink = styled.li`
  display: inline-block;
  margin: 0 1.3rem;
  width: 16px;
  height: 16px;
  img {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  &:hover img {
    filter: invert(44%) sepia(81%) saturate(3144%) hue-rotate(341deg)
      brightness(101%) contrast(103%);
  }
  ${mq.tabletL} {
    display: block;
  }
`

export const FooterSeperator = styled.div`
  background-color: ${colors.dark};
  height: 0.1rem;
  opacity: ${props => (props.show ? 0.2 : 0)};
  transform: scaleX(${props => (props.show ? 1 : 0.6)});
  transform-origin: 0% 0%;
  transition: opacity 1s ${easings.inOut.default},
    transform 1s ${easings.inOut.default};
  transition-delay: ${props => props.delay}s;
  width: 100%;
`

export const FooterText = styled.div`
  ${mq.tabletL} {
    text-align: right;
  }
`

export const FooterCopyright = styled.div`
  padding-bottom: 0.8rem;
  padding-top: 0.8rem;
  text-align: center;

  ${mq.tabletL} {
    display: inline-block;
    padding-bottom: 0;
    text-align: right;
  }
`

export const FooterLinks = styled.ul`
  text-align: center;

  ${mq.tabletL} {
    display: inline-block;
    text-align: right;
  }
`

export const FooterLink = styled.li`
  display: inline-block;
  margin-left: 2rem;

  &:first-child {
    margin-left: 0;

    ${mq.tabletL} {
      margin-left: 2rem;
    }
  }
`
