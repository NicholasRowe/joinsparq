import React from 'react'
import PropTypes from 'prop-types'
import { ContainerMain } from './index.style'

const Container = ({ allowOverflow = true, fullWidth = false, children }) => (
  <ContainerMain allowOverflow={allowOverflow} fullWidth={fullWidth}>
    {children}
  </ContainerMain>
)

Container.propTypes = {
  allowOverflow: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
}

export default Container
