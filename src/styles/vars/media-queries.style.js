import { breakpoints } from './breakpoints.style'

export const mq = {
  tiny: `@media (min-width: ${breakpoints.tiny}px)`,
  mobileMax: `@media (max-width: ${breakpoints.mobile - 1}px)`,
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  mobileLMax: `@media (max-width: ${breakpoints.mobileL - 1}px)`,
  mobileL: `@media (min-width: ${breakpoints.mobileL}px)`,
  tabletPMax: `@media (max-width: ${breakpoints.tabletP - 1}px)`,
  tabletP: `@media (min-width: ${breakpoints.tabletP}px)`,
  tabletPToDesk: `@media (min-width: ${
    breakpoints.tabletP
  }px) and (max-width: ${breakpoints.desk - 1}px)`,
  tabletLMax: `@media (max-width: ${breakpoints.tabletL - 1}px)`,
  tabletL: `@media (min-width: ${breakpoints.tabletL}px)`,
  deskMax: `@media (max-width: ${breakpoints.desk - 1}px)`,
  desk: `@media (min-width: ${breakpoints.desk}px)`,
  deskL: `@media (min-width: ${breakpoints.deskL}px)`,
  contained: `@media (min-width: ${breakpoints.contained}px)`,
  setMinWidth(breakpoint) {
    return `@media (min-width: ${breakpoint}px)`
  },
}
