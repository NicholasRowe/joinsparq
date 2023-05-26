import React from 'react'

const IconArrowheadLeft = ({
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
        d="M.646 3.646a.5.5 0 0 0 0 .708l3.182 3.182a.5.5 0 1 0 .708-.708L1.707 4l2.829-2.828a.5.5 0 1 0-.708-.708L.646 3.646ZM17 3.5H1v1h16v-1Z"
      />
    </svg>
  )
}

export default IconArrowheadLeft
