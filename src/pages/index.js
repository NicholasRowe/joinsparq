import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import Car from '@components/WebGL/Car'
import Hero from '@components/Hero'
import Explore from '@components/Explore'
import HowItWorks from '@components/HowItWorks'
import Carousel from '@components/Carousel'
import Labs from '@components/Labs'
import Locations from '@components/Locations'
import App from '@components/App'
import Join from '@components/Join'
import Footer from '@components/Footer'
import { breakpoints } from '@styles/vars/breakpoints.style'

const IndexPage = ({ data }) => {
  const [vw, setVw] = useState(0)

  const setViewportSize = () => {
    setVw(window.innerWidth)
  }

  useEffect(() => {
    setViewportSize()
    window.addEventListener('resize', setViewportSize)

    return () => {
      window.removeEventListener('resize', setViewportSize)
    }
  }, [setVw])

  const {
    seoTitle,
    seoDescription: { seoDescription },
    seoImage,
    heroHeading,
    heroText,
    heroButtonLabels,
    exploreLabel,
    exploreHeading,
    exploreText,
    exploreCard,
    howItWorksLabel,
    howItWorksCards,
    carouselItems,
    carouselButtonLabels,
    labsLabel,
    labsBackgrounds,
    labsHeading,
    labsText,
    locationsLabel,
    locationsHeading,
    locationsText,
    locationTable,
    appLabel,
    appHeading,
    appText,
    appImagery,
    signUpBarItems,
    signUpBarButtonLabels,
    joinLabel,
    joinHeading,
    joinText,
    keywords
  } = data.contentfulHome

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        imageUrl={seoImage.file.url}
        keywords={keywords}
      />
      {vw >= breakpoints.desk && <Car zIndex={0} />}
      <Hero
        carIsVisible={vw >= breakpoints.desk}
        heading={heroHeading}
        text={heroText}
        labels={heroButtonLabels}
      />
      <Explore
        label={exploreLabel}
        heading={exploreHeading}
        text={exploreText}
        card={exploreCard}
      />
      <HowItWorks label={howItWorksLabel} cards={howItWorksCards} />
      <Carousel items={carouselItems} labels={carouselButtonLabels} />
      <Labs
        label={labsLabel}
        images={labsBackgrounds}
        heading={labsHeading}
        text={labsText}
      />
      <Locations
        label={locationsLabel}
        heading={locationsHeading}
        text={locationsText}
        locations={locationTable}
      />
      <App
        label={appLabel}
        heading={appHeading}
        text={appText}
        images={appImagery}
        items={signUpBarItems}
        labels={signUpBarButtonLabels}
      />
      <Join label={joinLabel} heading={joinHeading} text={joinText} />
      <Footer />
    </>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPage {
    contentfulHome {
      contentful_id
      seoTitle
      keywords
      seoDescription {
        seoDescription
      }
      seoImage {
        file {
          url
        }
      }
      heroHeading
      heroText
      heroButtonLabels
      exploreLabel
      exploreHeading
      exploreText
      exploreCard {
        title
        text
        image {
          gatsbyImageData
        }
      }
      howItWorksLabel
      howItWorksCards {
        title
        text
        image {
          gatsbyImageData
          description
        }
      }
      carouselItems {
        text
        title
        screen
      }
      carouselButtonLabels
      labsLabel
      labsBackgrounds {
        gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        description
      }
      labsHeading
      labsText
      locationsLabel
      locationsHeading
      locationsText
      locationTable {
        heading
        table {
          tableData
        }
      }
      appLabel
      appHeading
      appText
      appImagery {
        gatsbyImageData
        description
      }
      signUpBarItems {
        heading
        text
      }
      signUpBarButtonLabels
      joinLabel
      joinHeading
      joinText
    }
  }
`
