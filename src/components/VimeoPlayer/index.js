import React, { useRef, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import Player from '@vimeo/player'
import IconVideoPlayButton from '../svgs/IconVideoPlayButton'
import {
  VimeoPlayerMain,
  VimeoPlayerEmbed,
  VimeoPlayerOverlay,
  VimeoPlayButton,
} from './index.style'

const VimeoPlayer = ({ id, options = {} }) => {
  const videoRef = useRef()
  const videoPlayer = useRef()
  const [playing, setPlaying] = useState(
    options.autoplay || options.background ? true : false
  )
  const [aspectRatio, setAspectRatio] = useState(null)

  const play = () => {
    videoPlayer.current.play().catch(error => {
      console.log(error)
    })
  }

  useLayoutEffect(() => {
    const embedOptions = {
      id,
      ...options,
    }

    videoPlayer.current = new Player(videoRef.current, embedOptions)

    Promise.all([
      videoPlayer.current.getVideoWidth(),
      videoPlayer.current.getVideoHeight(),
    ]).then(dimensions => {
      setAspectRatio(dimensions[1] / dimensions[0])
    })

    videoPlayer.current.on('pause', () => setPlaying(false))
    videoPlayer.current.on('ended', () => setPlaying(false))
    videoPlayer.current.on('play', () => setPlaying(true))

    return () => {
      videoPlayer.current.off('pause')
      videoPlayer.current.off('ended')
      videoPlayer.current.off('play')
    }
  }, [id, options])

  return (
    <VimeoPlayerMain aspectRatio={aspectRatio}>
      {(!options.autoplay || !options.background) && (
        <VimeoPlayerOverlay
          aria-label="Play video"
          playing={playing}
          onClick={play}
        >
          <VimeoPlayButton>
            <IconVideoPlayButton />
          </VimeoPlayButton>
        </VimeoPlayerOverlay>
      )}

      <VimeoPlayerEmbed ref={videoRef} playing={playing} />
    </VimeoPlayerMain>
  )
}

VimeoPlayer.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.object,
}

export default VimeoPlayer
