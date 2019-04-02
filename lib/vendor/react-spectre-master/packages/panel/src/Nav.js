import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Nav = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('panel-nav', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Nav.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export { Nav }
