import React from 'react'
import { colors } from '../../../styles/vars/colors.style'

const LogoShape = ({
  width = 27,
  height = 17,
  fill = colors.dark,
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
      viewBox="0 0 27 17"
      focusable="false"
      role="img"
      {...svgAttributes}
    >
      <path
        d="M26.0928 0.518555L8.38208 0.523564L8.38663 16.6235L26.0974 16.6185L26.0928 0.518555Z"
        fill={fill}
      />
      <path
        d="M16.436 8.56888C16.4345 13.0158 12.8303 16.62 8.38337 16.6215C3.93645 16.623 0.333709 13.0203 0.335206 8.57337C0.336702 4.12645 3.94094 0.522211 8.38786 0.520714C12.8348 0.519217 16.4375 4.12196 16.436 8.56888Z"
        fill={fill}
      />
    </svg>
  )
}

export default LogoShape
