import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Header = props => {
  const { children, className, center, right, ...otherProps } = props
  const classNames = classnames(
    'panel-header',
    { 'text-center': center },
    { 'text-right': right },
    className
  )

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node,
  center: PropTypes.string,
  right: PropTypes.string,
  className: PropTypes.string
}

export { Header }
