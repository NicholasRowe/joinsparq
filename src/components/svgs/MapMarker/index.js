import React from 'react'
import { colors } from '../../../styles/vars/colors.style'

const MapMarker = ({
  width = 40,
  height = 52,
  fill = colors.orange,
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
      viewBox="0 0 40 52"
      focusable="false"
      role="img"
      {...svgAttributes}
    >
      <g>
        <circle cx="20.5" cy="49.499" r="2.5" fill={fill} />
      </g>
      <g>
        <circle cx="20" cy="19.999" r="20" fill={fill} />
        <path
          d="M17.6316 7.61079L9.75781 15.489L16.9195 22.6466L24.7933 14.7684L17.6316 7.61079Z"
          fill="#030303"
        />
        <path
          d="M23.3557 18.3535L15.4819 26.2317L22.6436 33.3893L30.5174 25.5111L23.3557 18.3535Z"
          fill="#030303"
        />
        <path
          d="M16.9171 15.4854C18.894 17.4636 18.894 20.6692 16.9171 22.6474C14.9402 24.6256 11.7359 24.6256 9.75903 22.6474C7.78215 20.6692 7.78215 17.4636 9.75903 15.4854C11.7359 13.5072 14.9402 13.5072 16.9171 15.4854Z"
          fill="#030303"
        />
        <path
          d="M23.3591 25.5122C21.3822 23.534 21.3822 20.3283 23.3591 18.3501C25.336 16.3719 28.5403 16.3719 30.5172 18.3501C32.4941 20.3283 32.4941 23.534 30.5172 25.5122C28.5403 27.4904 25.336 27.4904 23.3591 25.5122Z"
          fill="#030303"
        />
      </g>
    </svg>
  )
}

export default MapMarker
