<p align="center">
  <a href="https://toyfight.co/">
    <img alt="Toyfight" src="./static/images/favicon.png" width="74" />
  </a>
</p>

<h1 align="center">
  Gatsby Contentful Starter.
</h1>

This starter creates a Gatsby site powered by Contentful. Check out the [demo site](https://toyfight-starter.netlify.app/).

## ✨ Features

- Locomotive smooth scroll
- Customiseable page transitions and content build-ons
- CSS grid component system
- Fluid spacing system/methods
- Global context store

## 🚀 Getting started

1. **Create a Gatsby site**

Use the Gatsby CLI ([install instructions](https://www.gatsbyjs.com/docs/tutorial/part-0/#gatsby-cli)) to create a new site, specifying the gatsby-contentful-starter.

```
npx gatsby new my-gatsby-contentful-starter https://github.com/toyfight/gatsby-contentful-starter
```

2. **Link to your Contentful site**

Rename `.env.example` to `.env.development` and add the required Contentful API keys.

3. **Develop**

Navigate into your new site’s directory and start it up.

```
cd my-gatsby-contentful-starter
gatsby develop
```

Your site is now running at http://localhost:8000

## 🧐 What's inside?

```
├── src
├── static
├── .env.example
├── gatsby-browser.js
├── gatsby-config.js
└── gatsby-node.js
└── gatsby-ssr.js
```

1. `/src`: This directory will contain all of the code related to what you will see on the front-end of your site
2. `/static`: Every file in this directory will be copied over to the public folder during the build.
3. `/.env.example`: Duplicate this file, rename it to .env.development, and fill out the keys. You'll need to define those environment variables to get the Contentful source plugin working.
4. `gatsby-browser.js`: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/). These allow customization of settings affecting the browser. In this project it wraps the whole application with the context provider of the store and imports webfonts.
5. `gatsby-config.js`: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc.
6. `gatsby-node.js`: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/). These allow customization of settings affecting pieces of the site build process. In this project it adds a dynamic page creation function and Contentful type schema customisation.
7. `gatsby-ssr.js`: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/). These allow customization of settings affecting server-side rendering. In this project it wraps the whole application with the context provider of the store.

> You generally should implement the same components in both gatsby-ssr.js and gatsby-browser.js so that pages generated through SSR are the same after being hydrated in the browser.

### Detailed look into `src`

```
├── components
├── pages
├── Store
├── styles
├── templates
└── utils
```

1. `/components`: Contains the React components used for building out the pages.
2. `/pages`: Contains the homepage, styleguide page and all automatically generated pages
3. `/Store`: Contains the store context (e.g. for toggling the page transition mask, toggling the mobile nav and updating when the webfonts are loaded).
4. `/styles`: Contains global styles, global variables, utility conversion methods and resets
5. `/templates`: Contains the styleguide page template as an example of using the `createPages` method in `gatsby-node.js`
6. `/utils`: Contains utility functions for disabling/enabling page scroll and setting keyboard focus

## 🎨 Styling

The site uses [Styled Components](https://styled-components.com/) for styling. Theme values such as fonts, colors and breakpoints are set in `src/styles/vars`.

### Fluid scaling

The starter encourages the use of scaling styles fluidly rather than using static media queries. This is achieved with the `clamp()` function found in `src/styles/utils/conversion.style.js`.

```
# This linearly scales the font-size from 16px to 24px between viewport sizes of 375px and 1800px

const Element = styled.div`
  ${clamp('font-size', 16, 22, 375, 1800)}
`
```

## Fonts

To use Google or Typekit fonts follow the Gatsby [Using Web Fonts](https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/) docs.

This starter uses Google's Poppins. The npm package `@fontsource/poppins` is installed and weight imports are declared in `gatsby-browser.js`.css'

The font family name variable is set in `src/styles/vars/font.style.js`.

> Be aware that for the `<AnimateSplitText>` component to work a webfont must be specified correctly as this uses FontFaceObserver to confirm when text is ready to split

## Components

**Global**

- Seo
- Header
- Layout
- PageTransitionMask
- SmoothScroll

**Layout**

- Container
- Grid/GridItem

**Atoms**

- Button
- PageTransitionLink
- Spacer
- SVGs
- RichText
- TextStyles

**Build-ons**

- AnimateFadeIn
- AnimateImage
- AnimateSlideIn
- AnimateSplitText

**Other**

- CookieBar
- VimeoPlayer
- WebGL

## Plugins

The following plugins require configuration in `gatsby-config.js`

| Plugin                                                                                     | Description                                                                                                            |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| [gatsby-plugin-gdpr-cookies](https://www.gatsbyjs.com/plugins/gatsby-plugin-gdpr-cookies/) | Add Google Analytics, Google Tag Manager and Facebook Pixel in a GDPR form to your site                                |
| [gatsby-plugin-robots-txt](https://www.gatsbyjs.com/plugins/gatsby-plugin-robots-txt/)     | Create a robots.txt for your Gatsby site                                                                               |
| [gatsby-plugin-manifest](https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/)         | The web app manifest enabled by this plugin allows users to add your site to their home screen on most mobile browsers |

## Testing

### Jest

Run tests:

```
npm test
```

Watch tests:

```
npm test -- --watch
```

### Cypress

```
npx cypress open
```
