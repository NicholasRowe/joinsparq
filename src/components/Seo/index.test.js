import React from 'react'
import { render } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import Seo from '../Seo'

describe('SEO component', () => {
  beforeAll(() => {
    useStaticQuery.mockReturnValue({
      contentfulGlobals: {
        siteUrl: 'https://toyfight.co',
        seoSiteTitle: 'Toyfight',
        seoSiteDescription: {
          seoSiteDescription: 'The Toyfight site',
        },
        seoSiteImage: {
          fixed: {
            src: 'https://toyfight.co/sharing.jpg',
          },
        },
        twitterUsername: '@Toy_Fight',
      },
    })
  })

  it('renders default metadata', () => {
    render(<Seo />)

    const { metaTags } = Helmet.peek()

    expect(metaTags[5].content).toBe('https://toyfight.co/')
    expect(metaTags[1].content).toBe('Toyfight')
    expect(metaTags[0].content).toBe('The Toyfight site')
    expect(metaTags[3].content).toBe('https://toyfight.co/sharing.jpg')
  })

  it('renders metadata passed in props', () => {
    render(
      <Seo
        pathname="about"
        title="About"
        description="The About page"
        image="https://toyfight.co/image.png"
        meta={[{ property: 'twitter:creator', content: '@Toy_Fight' }]}
      />
    )

    const { metaTags } = Helmet.peek()

    expect(metaTags[5].content).toBe('https://toyfight.co/about')
    expect(metaTags[1].content).toBe('About | Toyfight')
    expect(metaTags[0].content).toBe('The About page')
    expect(metaTags[3].content).toBe('https://toyfight.co/image.png')
    expect(metaTags[10].content).toBe('@Toy_Fight')
  })
})
