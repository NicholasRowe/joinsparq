require('dotenv').config({
  path: '.env.development',
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  downloadLocal: true,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.joinsparq.com/',
  },
  trailingSlash: "always",
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-gdpr-cookies',
      options: {
        googleAnalytics: {
          trackingId: process.env.GOOGLE_ANALYTICS_ID || '',
          cookieName: 'gatsby-gdpr-google-analytics',
          anonymize: true,
          allowAdFeatures: false,
        },
        facebookPixel: {
          pixelId: '2154378634740561',
          cookieName: 'gatsby-gdpr-facebook-pixel',
        },
        environments: ['production'],
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: { displayName: true, fileName: false },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-transition-link',
      options: {
        injectPageProps: false,
        layout: require.resolve('./src/components/Layout/index.js'),
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sparq`,
        short_name: `Sparq`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `static/images/favicon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.joinsparq.com',
        sitemap: 'https://www.joinsparq.com/sitemap/sitemap-index.xml',
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@components': 'src/components',
          '@hooks': 'src/hooks',
          '@Store': 'src/Store',
          '@styles': 'src/styles',
          '@utils': 'src/utils',
        },
        extensions: ['js'],
      },
    },
  ].filter(Boolean),
}
