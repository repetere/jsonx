import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Body = ({ children, ...props }) => {
  const { className, ...otherProps } = props
  const classNames = classnames('accordion-body', className)

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
