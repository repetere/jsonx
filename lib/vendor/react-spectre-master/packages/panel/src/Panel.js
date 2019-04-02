import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Header, Title } from './Header'
import { Body } from './Body'
import { Footer } from './Footer'
import { Nav } from './Nav'

const Panel = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('panel', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Panel.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

Panel.Header = Header
Panel.Title = Title
Panel.Body = Body
Panel.Footer = Footer
Panel.Nav = Nav

export { Panel }
