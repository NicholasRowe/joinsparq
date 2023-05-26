import React from 'react'
import PropTypes from 'prop-types'
import { GridlinesColumn, GridlinesMain } from './index.style'
import Grid from '../Grid'
import { grid } from '../../styles/vars/grid.style'
import GridItem from '../GridItem'
import Container from '../Container'

const Gridlines = ({ show = false, dark = true }) => {
  const gridColumns = []

  for (let i = 0; i < grid.columnCount; i++) {
    gridColumns.push(
      <GridItem tiny={1}>
        <GridlinesColumn dark={dark} />
      </GridItem>
    )
  }

  return (
    <>
      {show && (
        <GridlinesMain>
          <Container>
            <Grid data-grid>
              {React.Children.toArray(gridColumns.map(column => column))}
            </Grid>
          </Container>
        </GridlinesMain>
      )}
    </>
  )
}

Gridlines.propTypes = {
  show: PropTypes.bool,
  dark: PropTypes.bool,
}

export default Gridlines
