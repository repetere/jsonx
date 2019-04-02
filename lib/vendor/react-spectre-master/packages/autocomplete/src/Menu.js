import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Menu = ({ children, ...props }) => {
  const { className, ...otherProps } = props
  const classNames = classnames('menu', className)

  return (
    <ul className={classNames} {...otherProps}>
      {children}
    </ul>
  )
}

Menu.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export { Menu }
