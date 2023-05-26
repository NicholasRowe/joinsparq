import React from 'react'
import Store from './src/Store'
import GlDom from './src/Store/glDom'

export const wrapRootElement = ({ element }) => (
  <GlDom>
    <Store>{element}</Store>
  </GlDom>
)
