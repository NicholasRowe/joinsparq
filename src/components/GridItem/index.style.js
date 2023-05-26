import styled from 'styled-components'
import { breakpoints } from '../../styles/vars/breakpoints.style'
import { mq } from '../../styles/vars/media-queries.style'

export const GridItemMain = styled.div`
  ${props => {
    const defaultColumnSpanStyles = Object.keys(breakpoints).reduce(
      (stylesString, breakpointName) => {
        if (!props[breakpointName] && props[`${breakpointName}Parent`]) {
          stylesString += `
          ${mq[breakpointName]} {
            grid-column: 1 / span ${props[`${breakpointName}Parent`]};
          }
        `
        }

        return stylesString
      },
      ''
    )

    const breakpointColumnSpanStyles = Object.keys(breakpoints).reduce(
      (stylesString, breakpointName) => {
        if (props[breakpointName]) {
          const colSpan = props[breakpointName]
          const colSpanStart = props[`${breakpointName}Start`]
            ? `${props[`${breakpointName}Start`]} / `
            : ''

          stylesString += `
            ${mq[breakpointName]} {
              grid-column: ${colSpanStart}span ${colSpan};
            }
          `
        }

        if (props[`${breakpointName}Order`]) {
          stylesString += `
            ${mq[breakpointName]} {
              order: ${props[`${breakpointName}Order`]};
            }
          `
        }

        if (props[`${breakpointName}Align`]) {
          stylesString += `
            ${mq[breakpointName]} {
              align-self: ${props[`${breakpointName}Align`]};
            }
          `
        }

        return stylesString
      },
      ''
    )

    return `
      grid-column: 1 / span ${props.parentcolumnCount};
      ${defaultColumnSpanStyles}
      ${breakpointColumnSpanStyles}
    `
  }}
`
