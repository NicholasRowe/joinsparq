import React from 'react'
import Seo from '../../components/Seo'
import ScrollSection from '../../components/ScrollSection'
import Car from '../../components/WebGL/Car'

const WebGLThreePage = () => {
  return (
    <>
      <Seo title="Home" />
      <Car zIndex={0} />
      <ScrollSection>
        <div style={{ height: '400vh' }}></div>
      </ScrollSection>
    </>
  )
}

export default WebGLThreePage
