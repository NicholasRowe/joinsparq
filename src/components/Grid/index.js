import React from 'react'
import PropTypes from 'prop-types'
import { grid } from '../../styles/vars/grid.style'
import { GridMain } from './index.style'
import GridItem from '../GridItem'
import { breakpoints } from '../../styles/vars/breakpoints.style'

/**
 *
 * The columnCount can be set at breakpoints by passing global breakpoint names
 * as props with a number value src/styles/vars/breakpoints.style.js
 *
 * <Grid tabletP={6} />
 */

const Grid = ({
  columnCount = grid.columnCount,
  gutters = true,
  gap = null,
  children,
  ...props
}) => {
  return (
    <GridMain columnCount={columnCount} gutters={gutters} gap={gap} {...props}>
      {React.Children.map(children, child => {
        if (child?.type === GridItem) {
          const breakpointProps = {}
          const breakpointNames = Object.keys(breakpoints)

          for (const [propKey, propValue] of Object.entries(props)) {
            if (breakpointNames.find(breakpoint => breakpoint === propKey)) {
              breakpointProps[`${propKey}Parent`] = propValue
            }
          }

          return React.cloneElement(child, {
            parentcolumnCount: columnCount,
            ...breakpointProps,
          })
        }

        return child
      })}
    </GridMain>
  )
}

Grid.propTypes = {
  columnCount: PropTypes.number,
  gutters: PropTypes.bool,
  children: PropTypes.node,
}

export default Grid
