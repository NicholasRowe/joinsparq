import React from 'react'
import PropTypes from 'prop-types'
import { FlowMain } from './index.style'

const Flow = ({ scale = 1.2, direction = 'vertical', children }) => (
  <FlowMain direction={direction} spaceScale={scale}>
    {children}
  </FlowMain>
)

Flow.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  scale: PropTypes.number,
  children: PropTypes.node,
}

export default Flow
