import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * The Icon component.
 */
const Icon = props => {
  const { className, name, size, ...otherProps } = props

  const classNames = classnames(className, 'icon', `icon-${name}`, {
    'icon-2x': size === '2x',
    'icon-3x': size === '3x',
    'icon-4x': size === '4x'
  })

  return <i {...otherProps} className={classNames} />
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string
}

export { Icon }
