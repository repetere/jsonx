import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * The Video Container component.
 */
const VideoContainer = ({ children, ...props }) => {
  const { tag: Element, responsive, ...otherProps } = props

  // Prepare class names.
  const classNames = classnames({
    'video-responsive': responsive, // 16:9
    'video-responsive-1-1': responsive === '1:1',
    'video-responsive-4-3': responsive === '4:3'
  })

  return (
    <Element {...otherProps} className={classNames}>
      {children}
    </Element>
  )
}

const Video = props => <VideoContainer {...props} tag="video" />
const Container = props => <VideoContainer {...props} tag="div" />

VideoContainer.propTypes = Video.propTypes = Container.propTypes = {
  children: PropTypes.node,
  responsive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['1:1', '4:3', '16:9'])
  ])
}

Video.Container = Container

export { Video, Container }
