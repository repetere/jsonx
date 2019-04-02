import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * The Figure component.
 */
const Figure = ({ children, ...props }) => {
  const { className, caption, captionAlignment, ...otherProps } = props

  // Prepare class names.
  const figureClassNames = classnames('figure', className)
  const captionClassNames = classnames('figure-caption', {
    'text-left': captionAlignment === 'left',
    'text-center': captionAlignment === 'center',
    'text-right': captionAlignment === 'right'
  })

  return (
    <figure {...otherProps} className={figureClassNames}>
      {children}
      {caption && (
        <figcaption className={captionClassNames}>{caption}</figcaption>
      )}
    </figure>
  )
}

Figure.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  caption: PropTypes.string,
  captionAlignment: PropTypes.oneOf(['left', 'center', 'right'])
}

export { Figure }
