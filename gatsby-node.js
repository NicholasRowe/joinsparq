const path = require('path')
const slugify = (str) => { 
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}                 
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const data = [
    {
      query: 'allContentfulStyleguide',
      template: path.resolve('./src/templates/styleguide.js'),
    },
    {
      query: 'allContentfulTextPage',
      template: path.resolve('./src/templates/standardContent.js'),
    },
    {
      query: 'allContentfulNewsRoom',
      template: path.resolve('./src/templates/newsRoom.js'),
    },
  ]

  const query = `
    {
    ${data
      .map(
        dataItem => `
        ${dataItem.query}(filter: { slug: { ne: "/" } }) {
          edges {
            node {
              id
              slug
              __typename
            }
          }
        }`
      )
      .join('')}
    }
  `

  const queryResults = await graphql(query)

  if (queryResults.errors) {
    reporter.panicOnBuild(
      `There was an error loading your content`,
      queryResults.errors
    )
    return
  }

  data.forEach(dataItem => {
    const pages = queryResults.data[dataItem.query].edges

    pages.forEach(page => {
      
      let pagePath =
        page.node.__typename === 'ContentfulNewsRoom'
          ? `/newsroom/${slugify(page.node.slug)}/`
          : `/${slugify(page.node.slug)}/`

      createPage({
        path: pagePath,
        component: dataItem.template,
        ownerNodeId: page.node.id,
        context: {
          id: page.node.id,
          slug:page.node.slug
        },
      })
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  /**
   * Contentful types:
   * Media file: ContentfulAsset @link(by: "id", from: "image___NODE")
   * Date: Date @dateformat
   */

  const typeDefs = `
    type ContentfulStyleguide implements Node {
      seoImage: ContentfulAsset @link(by: "id", from: "seoImage___NODE")
      content: ContentfulStyleguideContent
    }
    
    type ContentfulHome implements Node {
      canonicalUrl: String
      keywords: String
    }
    type ContentfulTextPage implements Node {
      seoImage: ContentfulAsset @link(by: "id", from: "seoImage___NODE")
      content: ContentfulTextPageContent
      canonicalUrl: String
      keywords: String
    }

    union ContentfulContentReferences = ContentfulAsset | ContentfulStyleguide | ContentfulTextPage

    type ContentfulStyleguideContent {
      raw: String
      references: [ContentfulContentReferences] @link(by: "id", from: "references___NODE")
    }

    type ContentfulTextPageContent {
      raw: String
      references: [ContentfulContentReferences] @link(by: "id", from: "references___NODE")
    }

    type ContentfulGlobals {
      instagramUrl: String
      twitterUrl: String
      discordUrl: String
      facebookUrl: String
    }
  `

  createTypes(typeDefs)
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /locomotive-scroll/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
