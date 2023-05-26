import { css } from 'styled-components'
import { setVh } from '../utils/conversion.style'

export const locomotiveScrollStyles = css`
  /*! locomotive-scroll v3.5.4 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */
  html.has-scroll-dragging {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .has-scroll-smooth body {
    overflow: hidden;
  }

  // This prevents Chrome from hiding elements when they are outside the viewport due to virtual scroll
  .has-scroll-smooth #___gatsby {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  /* Specifying the scroll container manually */
  .has-scroll-smooth #___gatsby,
  .has-scroll-smooth [data-scroll-container] {
    ${setVh('min-height', 100)}
  }

  .c-scrollbar {
    position: absolute;
    right: 0;
    top: 0;
    width: 11px;
    ${setVh('height', 100)}
    transform-origin: center right;
    transition: transform 0.3s, opacity 0.3s;
    opacity: 0;
    z-index: 2;

    :hover {
      transform: scaleX(1.45);
    }

    :hover,
    .has-scroll-scrolling &,
    .has-scroll-dragging & {
      opacity: 1;
    }
  }

  .c-scrollbar_thumb {
    position: absolute;
    top: 0;
    right: 0;
    background-color: black;
    opacity: 0.5;
    width: 7px;
    border-radius: 10px;
    margin: 2px;
    cursor: -webkit-grab;
    cursor: grab;

    .has-scroll-dragging & {
      cursor: -webkit-grabbing;
      cursor: grabbing;
    }
  }
`
