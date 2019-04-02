import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Section } from './Section'
import { Brand } from './Brand'

const Navbar = ({ children, ...props }) => {
  const { className, ...otherProps } = props
  const classNames = classnames('navbar', className)

  return (
    <header className={classNames} {...otherProps}>
      {children}
    </header>
  )
}

Navbar.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

Navbar.Section = Section
Navbar.Brand = Brand

export { Navbar }
