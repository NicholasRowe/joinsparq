import { createGlobalStyle } from 'styled-components'
import { reset } from './partials/reset.style'
import { typography } from './partials/typography.style'
import { zIndex } from './vars/zIndex.style'
import { locomotiveScrollStyles } from './partials/locomotiveScroll.style'
import { gatsbyTransitionLinkStyles } from './partials/gatsbyTransitionLink.style'

export const GlobalStyles = createGlobalStyle`
  ${reset}
  ${typography}
  ${locomotiveScrollStyles}
  ${gatsbyTransitionLinkStyles}

  :root {
    --reach-tabs: 1; // This disables the Reach UI warning about not including matching CSS files https://reach.tech/styling/
    --reach-dialog: 1;
  }

  * {
    -webkit-marquee-increment: 0vw; // This ensures that clamp values are updated on window resize in Safari
  }

  body {
    &.disable-scroll {
      overflow: hidden;
    }
  }

  [data-reach-dialog-overlay] {
    z-index: ${zIndex.modal};
  }

  img {
    height: auto;
    width: 100%;
  }

`
