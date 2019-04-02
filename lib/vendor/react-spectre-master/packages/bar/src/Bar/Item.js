import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * The Item component.
 */
const Item = ({ children, ...props }) => {
  const { className, progress, style, ...otherProps } = props

  // Prepare class names.
  const classNames = classnames('bar-item', className)

  // Prepare style.
  const styles = { ...style, width: `${progress}%` }

  return (
    <div
      {...otherProps}
      className={classNames}
      role="progressbar"
      style={styles}
    >
      {children}
    </div>
  )
}

Item.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  progress: PropTypes.number,
  style: PropTypes.object
}

export { Item }
