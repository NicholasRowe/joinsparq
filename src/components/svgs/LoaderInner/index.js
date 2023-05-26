import React from 'react'
import { colors } from '../../../styles/vars/colors.style'

const LoaderInner = ({
  width = 74,
  height = 74,
  fill = colors.orange,
  responsive = false,
}) => {
  const svgAttributes = responsive
    ? {}
    : {
        width,
        height,
      }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 74 74"
      focusable="false"
      role="img"
      {...svgAttributes}
    >
      <circle
        cx="37"
        cy="37"
        r="35"
        strokeWidth={4}
        stroke={fill}
        fill="none"
        strokeDasharray={220}
      />
    </svg>
  )
}

export default LoaderInner
