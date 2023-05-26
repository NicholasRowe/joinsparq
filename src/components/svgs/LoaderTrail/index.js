import React from 'react'
import { colors } from '../../../styles/vars/colors.style'

const LoaderTrail = ({
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
      <linearGradient id="trail" x1="1" y1="0.5" x2="1" y2="1">
        <stop offset="0%" stopColor={'#1a1c1e'} stopOpacity={0}></stop>
        <stop offset="100%" stopColor={colors.orange}></stop>
      </linearGradient>
      <circle
        cx="37"
        cy="37"
        r="35"
        strokeWidth={4}
        stroke="url(#trail)"
        fill="none"
        strokeDasharray={220}
        strokeDashoffset={165}
      />
    </svg>
  )
}

export default LoaderTrail
