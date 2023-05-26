import React from 'react'
import PropTypes from 'prop-types'

import { SpacerMain } from './index.style'

const Spacer = ({ axis = 'vertical', size = 8 }) => {
  return <SpacerMain axis={axis} size={size} />
}

Spacer.propTypes = {
  axis: PropTypes.oneOf(['vertical', 'horizontal']),
  size: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
}

export default Spacer
