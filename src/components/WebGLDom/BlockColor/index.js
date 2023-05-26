import React, { useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { GlDomState } from '../../../Store/glDom'

// Styles
import { BlockColorEl } from './index.style'

const BlockColor = ({ color, webgl, zIndex }) => {
  const store = useContext(GlDomState)

  const block = useRef()

  useEffect(() => {
    if (!store.handleBlockColor || !webgl) return
    store.handleBlockColor(block.current, color)
  }, [store, webgl, color])

  return (
    <BlockColorEl bgColor={color} ref={block} webgl={webgl} zIndex={zIndex} />
  )
}

BlockColor.propTypes = {
  color: PropTypes.string.isRequired,
  webgl: PropTypes.bool,
  zIndex: PropTypes.number,
}

BlockColor.defaultProps = {
  webgl: true,
  zIndex: 1,
}

export default BlockColor
