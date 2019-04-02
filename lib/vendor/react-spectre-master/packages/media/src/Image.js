import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * The Image component.
 */
const Image = props => {
  const { responsive, contain, cover, ...otherProps } = props

  // Prepare class names.
  const classNames = classnames({
    'img-responsive': responsive,
    'img-fit-contain': contain,
    'img-fit-cover': cover
  })

  return <img {...otherProps} className={classNames} />
}

Image.propTypes = {
  responsive: PropTypes.bool,
  contain: PropTypes.bool,
  cover: PropTypes.bool
}

export { Image }
