import React from 'react'
import PropTypes from 'prop-types'
import { BlockquoteBorder, BlockquoteMain } from './index.style'
import AnimateFadeIn from '../../animation/AnimateFadeIn'

const Blockquote = ({ children }) => (
  <BlockquoteMain>
    <AnimateFadeIn>
      <BlockquoteBorder />
    </AnimateFadeIn>
    {children}
  </BlockquoteMain>
)

Blockquote.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Blockquote
