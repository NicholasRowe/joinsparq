import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function Seo({
  pathname = '',
  title,
  overWriteTitle = null,
  description,
  imageUrl,
  meta = [],
  noIndex = false,
  keywords
}) {
  const {
    contentfulGlobals: {
      siteUrl,
      seoSiteTitle,
      seoSiteDescription: { seoSiteDescription },
      seoSiteImage,
      twitterUsername,
    },
  } = useStaticQuery(
    graphql`
      query {
        contentfulGlobals {
          siteUrl
          seoSiteTitle
          seoSiteDescription {
            seoSiteDescription
          }
          seoSiteImage {
            file {
              url
            }
          }
          twitterUsername
        }
      }
    `
  )

  const metaTitle = overWriteTitle
    ? overWriteTitle
    : title
    ? `${title} | ${seoSiteTitle}`
    : seoSiteTitle
  const metaDescription = description || seoSiteDescription
  const metaImage = imageUrl || `https:${seoSiteImage.file.url}`
  const url = `${siteUrl}/${pathname}`
  const metaTags = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: metaTitle,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:image`,
      content: metaImage,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:url`,
      content: url,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:title`,
      content: metaTitle,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: `keywords`,
      content: keywords,
    },
  ]

  if (twitterUsername) {
    metaTags.push({
      name: `twitter:site`,
      content: `@${twitterUsername}`,
    })
  }

  if (noIndex) {
    metaTags.push({
      name: `robots`,
      content: `noindex`,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
      title={metaTitle}
      meta={[...metaTags, ...meta]}
      link={[{ rel: 'canonical', href: url }]}
    />
  )
}

Seo.propTypes = {
  pathname: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  noIndex: PropTypes.bool,
}

export default Seo
