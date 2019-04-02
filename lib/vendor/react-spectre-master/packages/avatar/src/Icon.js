import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Icon = props => {
  const { className, ...otherProps } = props
  const classNames = classnames('avatar-icon', className)

  return <img className={classNames} {...otherProps} />
}

Icon.propTypes = {
  className: PropTypes.string
}

export { Icon }
