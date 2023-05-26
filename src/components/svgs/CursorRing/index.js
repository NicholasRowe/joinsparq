import React from 'react'
import { colors } from '../../../styles/vars/colors.style'

const CursorRing = ({
  width = 156,
  height = 157,
  stroke = colors.orange,
  responsive = true,
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
      viewBox="0 0 156 157"
      focusable="false"
      role="img"
      {...svgAttributes}
    >
      <circle
        cx="78"
        cy="78.0015"
        r="77.5"
        stroke={stroke}
        fill="none"
        strokeDasharray={487}
      />
    </svg>
  )
}

export default CursorRing
