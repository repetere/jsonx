import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Header = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('card-header', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export { Header }
