import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Input } from './Input'
import { Menu } from './Menu'

const Autocomplete = ({ children, ...props }) => {
  const { className, ...otherProps } = props
  const classNames = classnames('form-autocomplete', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Autocomplete.Input = Input
Autocomplete.Menu = Menu

Autocomplete.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export { Autocomplete }
