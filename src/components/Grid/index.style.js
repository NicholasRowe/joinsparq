import styled from 'styled-components'
import { clamp } from '../../styles/utils/conversion.style'
import { breakpoints } from '../../styles/vars/breakpoints.style'
import { grid } from '../../styles/vars/grid.style'
import { mq } from '../../styles/vars/media-queries.style'

export const GridMain = styled.div`
  display: grid;
  ${props => props.gutters && clamp('grid-gap', grid.gap.min, grid.gap.max)}
  ${props => props.gap && clamp('grid-gap', grid.gap.min, props.gap)}
  ${props => {
    const columnSpanStyles = Object.keys(breakpoints).reduce(
      (stylesString, breakpointName) => {
        let styles = stylesString

        if (props[breakpointName]) {
          styles = `${styles}
            ${mq[breakpointName]} {
              grid-template-columns: repeat(${props[breakpointName]}, 1fr);
            }
          `
        }

        return styles
      },
      ``
    )

    return `
      grid-template-columns: repeat(${props.columnCount}, 1fr);
      ${columnSpanStyles}
    `
  }}
`
