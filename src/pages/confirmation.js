import Hero from '@components/Single/Hero'
import React from 'react'
import Seo from '../components/Seo'

const Confirmation = () => {
  return (
    <>
      <Seo
        title="Thank you for subscribing to SPARQ!"
        description="Thank you for your order!"
        noIndex={true}
      />
      <Hero
        title="Thank you for subscribing to SPARQ!"
        text="We will be in touch soon."
      />
    </>
  )
}

export default Confirmation
