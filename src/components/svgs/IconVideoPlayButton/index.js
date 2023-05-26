import React from 'react'

const IconVideoPlayButton = ({
  width = 88,
  height = 88,
  fill = 'currentColor',
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
      viewBox="0 0 88 88"
      aria-hidden="true"
      focusable="false"
      fill="none"
      {...svgAttributes}
    >
      <circle cx="44" cy="44" r="43.5" stroke={fill} />
      <path d="M52 44l-12 6.928V37.072L52 44z" fill={fill} />
    </svg>
  )
}

export default IconVideoPlayButton
