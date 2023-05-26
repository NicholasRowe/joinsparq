import React from 'react'
import { colors } from '../../../styles/vars/colors.style'

const Arrow = ({
  width = 21,
  height = 47,
  stroke = colors.dark,
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
      viewBox="0 0 21 47"
      focusable="false"
      role="img"
      {...svgAttributes}
    >
      <path d="M10.5 0V46M10.5 46L1 36.5M10.5 46L20 36.5" stroke={stroke} />
    </svg>
  )
}

export default Arrow
