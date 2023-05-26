import Hero from '@components/Single/Hero'
import React from 'react'
import Seo from '../components/Seo'

const NotFoundPage = () => {
  return (
    <>
      <Seo title="404" description="Page not found" noIndex={true} />
      <Hero
        title="Page not found"
        text="The page you're looking for doesn't exist."
      />
    </>
  )
}

export default NotFoundPage
