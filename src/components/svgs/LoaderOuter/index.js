import React from 'react'

const LoaderOuter = ({
  width = 82,
  height = 82,
  fill = '#1a1c1e',
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
      viewBox="0 0 82 82"
      focusable="false"
      role="img"
      {...svgAttributes}
    >
      <path
        d="M82.0005 41C82.0005 63.6437 63.6442 82 41.0005 82C18.3568 82 0.000488281 63.6437 0.000488281 41C0.000488281 18.3563 18.3568 0 41.0005 0C63.6442 0 82.0005 18.3563 82.0005 41ZM11.7037 41C11.7037 57.1802 24.8203 70.2968 41.0005 70.2968C57.1806 70.2968 70.2973 57.1802 70.2973 41C70.2973 24.8198 57.1806 11.7032 41.0005 11.7032C24.8203 11.7032 11.7037 24.8198 11.7037 41Z"
        fill={fill}
      />
    </svg>
  )
}

export default LoaderOuter
