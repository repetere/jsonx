import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Body = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('panel-body', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Body.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export { Body }
