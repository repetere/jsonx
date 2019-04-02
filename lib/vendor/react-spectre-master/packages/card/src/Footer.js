import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Footer = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('card-footer', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Footer.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export { Footer }
