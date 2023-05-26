import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { useStore } from '@Store/'
import { TableMain, TableRow, TableCell } from './index.style'
import { TextBodySmall } from '@components/TextStyles'
import AnimateSplitText from '@components/animation/AnimateSplitText'

const Table = ({ data, removeHeaders, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true })
  const [store] = useStore()
  const { showPageMask } = store

  return (
    <TableMain ref={ref} show={inView && !showPageMask} delay={delay}>
      {React.Children.toArray(
        data.map((row, rowIndex) => {
          if (removeHeaders && rowIndex === 0) return null
          return (
            <TableRow
              show={inView && !showPageMask}
              delay={delay + rowIndex * 0.3}
            >
              {React.Children.toArray(
                row.map((cell, cellIndex) => {
                  return (
                    <TableCell>
                      <TextBodySmall>
                        <AnimateSplitText
                          delay={delay + rowIndex * 0.3 + cellIndex * 0.2}
                        >
                          {cell}
                        </AnimateSplitText>
                      </TextBodySmall>
                    </TableCell>
                  )
                })
              )}
            </TableRow>
          )
        })
      )}
    </TableMain>
  )
}

Table.defaultProps = {
  removeHeaders: false,
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  removeHeaders: PropTypes.bool,
  delay: PropTypes.number,
}

export default Table
