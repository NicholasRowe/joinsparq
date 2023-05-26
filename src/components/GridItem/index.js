import React from 'react'
import PropTypes from 'prop-types'
import { GridItemMain } from './index.style'
import Grid from '../Grid'
import { breakpoints } from '../../styles/vars/breakpoints.style'

/**
 *
 * The column span, column start, order and align self properties can be set at breakpoints by
 * passing prefixed props with relevant values src/styles/vars/breakpoints.style.js
 *
 * <GridItem tabletP={6} tabletPStart={2} tabletPOrder={2} tabletPAlign="center" />
 */

const GridItem = ({ parentcolumnCount, children, ...props }) => (
  <GridItemMain parentcolumnCount={parentcolumnCount} {...props}>
    {React.Children.map(children, child => {
      if (child?.type === Grid) {
        const breakpointProps = {}
        const breakpointNames = Object.keys(breakpoints)

        for (const [propKey, propValue] of Object.entries(props)) {
          if (breakpointNames.find(breakpoint => breakpoint === propKey)) {
            breakpointProps[propKey] = propValue
          }
        }

        return React.cloneElement(child, breakpointProps)
      }

      return child
    })}
  </GridItemMain>
)

GridItem.propTypes = {
  children: PropTypes.node,
  parentcolumnCount: PropTypes.number,
}

export default GridItem
