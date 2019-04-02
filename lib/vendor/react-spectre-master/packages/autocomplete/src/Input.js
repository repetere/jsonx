import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Input = ({ children, ...props }) => {
  const { className, focus, ...otherProps } = props
  const classNames = classnames(
    'form-autocomplete-input',
    {
      'is-focused': focus
    },
    className
  )

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Input.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  focus: PropTypes.bool
}

export { Input }
