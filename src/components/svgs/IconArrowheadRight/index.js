import React from 'react'

const IconArrowheadRight = ({
  width = 17,
  height = 8,
  fill = 'currentColor',
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
      viewBox="0 0 17 8"
      aria-hidden="true"
      focusable="false"
      {...svgAttributes}
    >
      <path
        fill={fill}
        d="M16.354 4.354a.5.5 0 0 0 0-.708L13.172.464a.5.5 0 1 0-.708.708L15.293 4l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182ZM0 4.5h16v-1H0v1Z"
      />
    </svg>
  )
}

export default IconArrowheadRight
