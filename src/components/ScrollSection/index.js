import React from 'react'
import PropTypes from 'prop-types'
import { ScrollBlock } from './index.style'

const ScrollSection = ({ children, topGapFiller, ...props }) => (
  <ScrollBlock data-scroll-section topGapFiller={topGapFiller} {...props}>
    {children}
  </ScrollBlock>
)

ScrollSection.propTypes = {
  children: PropTypes.node.isRequired,
  topGapFiller: PropTypes.string,
}

export default ScrollSection
