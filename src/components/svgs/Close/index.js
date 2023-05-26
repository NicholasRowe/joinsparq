import React from 'react'
import { colors } from '../../../styles/vars/colors.style'

const Close = ({
  width = 19,
  height = 19,
  fill = colors.dark,
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
      viewBox="0 0 19 19"
      focusable="false"
      role="img"
      {...svgAttributes}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.707 0 9.5 8.793 18.294 0 19 .707 10.208 9.5 19 18.294l-.707.707-8.793-8.793L.707 19 0 18.294l8.793-8.793L0 .707.707 0Z"
        fill={fill}
      />
    </svg>
  )
}

export default Close
