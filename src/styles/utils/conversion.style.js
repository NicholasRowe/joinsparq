import { breakpoints } from '../vars/breakpoints.style'
import { mq } from '../vars/media-queries.style'

export function pxToRem(pixelValue) {
  return `${pixelValue / 10}rem`
}

export function pxToEm(pixelValue, pixelBase) {
  return `${pixelValue / pixelBase}em`
}

export function getClampValue(
  minValue,
  maxValue,
  minBreakpoint = breakpoints.mobile,
  maxBreakpoint = breakpoints.deskL
) {
  const valuesAreNegative =
    Math.sign(minValue) + Math.sign(maxValue) === -2 ? true : false
  const minValueRem = minValue / 10
  const maxValueRem = maxValue / 10
  const minBreakpointRem = minBreakpoint / 10
  const maxBreakpointRem = maxBreakpoint / 10
  const slope =
    (maxValueRem - minValueRem) / (maxBreakpointRem - minBreakpointRem)
  const yAxisIntersection = -minBreakpointRem * slope + minValueRem
  const preferredValue = `${yAxisIntersection.toFixed(4)}rem + ${(
    slope * 100
  ).toFixed(4)}vw`

  return `clamp(${
    valuesAreNegative ? maxValueRem : minValueRem
  }rem, ${preferredValue}, ${valuesAreNegative ? minValueRem : maxValueRem}rem)`
}

export function clamp(
  property,
  minValue,
  maxValue,
  minBreakpoint = breakpoints.mobile,
  maxBreakpoint = breakpoints.deskL,
  fluid = false
) {
  return `
    ${property}: ${pxToRem(minValue)};
    ${property}: ${getClampValue(
    minValue,
    maxValue,
    minBreakpoint,
    maxBreakpoint
  )};

  ${
    fluid
      ? `
    ${mq.setMinWidth(maxBreakpoint)} {
      ${property}: ${(maxValue / maxBreakpoint) * 100}vw;
    }
    `
      : ``
  }
  `
}

export function setVh(property, value, includeMobileAddressBar = false) {
  // On mobile, if you need a component to fill the viewport and not overflow then set includeMobileAddressBar to true. This means that the layout will jump when the address bar slides out of view.
  // When includeMobileAddressBar is set to false, if the mobile address bar is visible 100vh will be taller than the visible viewport

  return `
    ${property}: ${value}vh;
    
    ${
      includeMobileAddressBar
        ? `${property}: calc(var(--vh, 1vh) * ${value});`
        : ``
    }
  `
}
