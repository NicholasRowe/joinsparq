import React from 'react'
import PropTypes from 'prop-types'
import { InView } from 'react-intersection-observer'

const InViewSection = ({ threshold = 0.2, children }) => (
  <InView triggerOnce={true} threshold={threshold}>
    {({ inView, ref }) => (
      <div ref={ref} data-inview={inView.toString()}>
        {React.cloneElement(children, { inView: inView })}
      </div>
    )}
  </InView>
)

InViewSection.propTypes = {
  threshold: PropTypes.number,
  children: PropTypes.node.isRequired,
}

export default InViewSection
