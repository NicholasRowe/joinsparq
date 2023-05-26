import React from 'react'
import PropTypes from 'prop-types'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  TextBody,
  TextBodySmall,
} from '../TextStyles'
import AnimateSplitText from '../animation/AnimateSplitText'
import AnimateFadeIn from '../animation/AnimateFadeIn'
import {
  ListItem,
  OrderedList,
  RichTextMain,
  UnorderedList,
  Table
} from './index.style'
import { GatsbyImage } from 'gatsby-plugin-image'
import PageTransitionLink from '../PageTransitionLink'
import InViewSection from '../InViewSection'
import { useStore } from '../../Store'
import Blockquote from '../TextStyles/Blockquote'
import Link from '@components/Link'

const RichText = ({
  content,
  delay = 0,
  maxWidth,
  animate = true,
  smallText = true,
}) => {
  const [store] = useStore()
  const { showPageMask } = store
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <strong>{text}</strong>,
      [MARKS.ITALIC]: text => <em>{text}</em>,
      [MARKS.UNDERLINE]: text => <u>{text}</u>,
      [MARKS.CODE]: text => <code>{text}</code>,
    },
    renderNode: {
      /*
       ** Blocks
       */

      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (children?.toString().trim() === '') return

        return smallText ? (
          <TextBodySmall maxWidth={maxWidth}>
            <AnimateSplitText animate={animate} delay={delay}>
              {children}
            </AnimateSplitText>
          </TextBodySmall>
        ) : (
          <AnimateFadeIn animate={animate} delay={delay}>
            <TextBody maxWidth={maxWidth}>{children}</TextBody>
          </AnimateFadeIn>
        )
      },

      [BLOCKS.HEADING_1]: (node, children) => (
        <Heading1 as="h1">
          <AnimateSplitText animate={animate} delay={delay}>
            {children}
          </AnimateSplitText>
        </Heading1>
      ),

      [BLOCKS.HEADING_2]: (node, children) => (
        <Heading2 as="h2">
          <AnimateSplitText animate={animate} delay={delay}>
            {children}
          </AnimateSplitText>
        </Heading2>
      ),

      [BLOCKS.HEADING_3]: (node, children) => (
        <Heading3 as="h3">
          <AnimateSplitText animate={animate} delay={delay}>
            {children}
          </AnimateSplitText>
        </Heading3>
      ),

      [BLOCKS.HEADING_4]: (node, children) => (
        <Heading4 as="h4">
          <AnimateSplitText animate={animate} delay={delay}>
            {children}
          </AnimateSplitText>
        </Heading4>
      ),

      [BLOCKS.HEADING_5]: (node, children) => (
        <h5>
          <AnimateSplitText animate={animate} delay={delay}>
            {children}
          </AnimateSplitText>
        </h5>
      ),

      [BLOCKS.HEADING_6]: (node, children) => (
        <h6>
          <AnimateSplitText animate={animate} delay={delay}>
            {children}
          </AnimateSplitText>
        </h6>
      ),

      [BLOCKS.OL_LIST]: (node, children) => (
        <OrderedList>{children}</OrderedList>
      ),

      [BLOCKS.UL_LIST]: (node, children) => (
        <UnorderedList>{children}</UnorderedList>
      ),

      [BLOCKS.LIST_ITEM]: (node, children) => {
        return (
          <InViewSection>
            <ListItem animate={animate && !showPageMask} delay={delay}>
              {children}
            </ListItem>
          </InViewSection>
        )
      },

      [BLOCKS.HR]: () => <hr />,

      [BLOCKS.QUOTE]: (node, children) => <Blockquote>{children}</Blockquote>,

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const { description, gatsbyImageData } = node.data.target

        return <GatsbyImage image={gatsbyImageData} alt={description} />
      },
      [BLOCKS.TABLE]: (node, children) => (
        <Table>
          <tbody>{children}</tbody>
        </Table>
      ),
      [BLOCKS.TABLE_ROW]: (node, children) => <tr>{children}</tr>,
      [BLOCKS.TABLE_CELL]: (node, children) => <td>{children}</td>,
      
      // [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {},

      /*
       ** Inlines
       */

      [INLINES.HYPERLINK]: (node, children) => (
        <Link href={node.data.uri} target="_blank" rel="noreferrer">
          {children}
        </Link>
      ),

      [INLINES.ASSET_HYPERLINK]: (node, children) => (
        <a href={node.data.target.file.url}>{children}</a>
      ),

      [INLINES.ENTRY_HYPERLINK]: (node, children) => (
        <PageTransitionLink to={`/${node.data.target.slug}`}>
          {children}
        </PageTransitionLink>
      ),

      // [INLINES.EMBEDDED_ENTRY]: (node, children) => {},
    },
    renderText: text =>
      React.Children.toArray(
        text.split('\n').map((t, i) =>
          i > 0 ? (
            <>
              <br />
              {t}
            </>
          ) : (
            t
          )
        )
      ),
  }

  return <RichTextMain>{renderRichText(content, options)}</RichTextMain>
}

RichText.propTypes = {
  content: PropTypes.object,
  delay: PropTypes.number,
  animate: PropTypes.bool,
  maxWidth: PropTypes.number,
  smallText: PropTypes.bool,
}

export default RichText
