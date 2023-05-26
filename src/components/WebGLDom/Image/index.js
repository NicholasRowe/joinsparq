import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react'
import PropTypes from 'prop-types'
import { GlDomState } from '../../../Store/glDom'

// Styles
import { ImageEl } from './index.style'

const Image = ({
  animateIn,
  borderRadius,
  borderRadiusBottom,
  borderRadiusTop,
  title,
  url,
  webgl,
}) => {
  const [loaded, setLoaded] = useState(false)

  const store = useContext(GlDomState)

  const image = useRef()

  const handleLoadEvent = useCallback(() => {
    if (store.handleImage && !loaded) {
      setLoaded(true)
    }
  }, [store, loaded])

  useEffect(() => {
    if (
      store.handleImage &&
      !loaded &&
      image.current &&
      image.current.complete
    ) {
      setLoaded(true)
    }
  }, [store, loaded])

  useEffect(() => {
    if (loaded) {
      store.handleImage({
        image: image.current,
        animateIn: animateIn,
        borderRadius: borderRadius,
        borderRadiusBottom: borderRadiusBottom,
        borderRadiusTop: borderRadiusTop,
      })
    }
  }, [
    loaded,
    store,
    animateIn,
    borderRadius,
    borderRadiusBottom,
    borderRadiusTop,
  ])

  return (
    <ImageEl
      alt={title}
      borderRadius={borderRadius}
      borderRadiusBottom={borderRadiusBottom}
      borderRadiusTop={borderRadiusTop}
      ref={image}
      src={url}
      webgl={webgl}
      onLoad={webgl ? handleLoadEvent : null}
    />
  )
}

Image.propTypes = {
  animateIn: PropTypes.bool,
  borderRadius: PropTypes.number,
  borderRadiusBottom: PropTypes.bool,
  borderRadiusTop: PropTypes.bool,
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
  webgl: PropTypes.bool,
}

Image.defaultProps = {
  animateIn: true,
  borderRadius: 0,
  borderRadiusBottom: true,
  borderRadiusTop: true,
  webgl: true,
}

export default Image
