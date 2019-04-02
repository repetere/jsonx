import React from 'react'
import { Header, Title, SubTitle } from './Header'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Body } from './Body'
import { Image } from './Image'
import { Footer } from './Footer'

const Card = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('card', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

Card.Header = Header
Card.Title = Title
Card.SubTitle = SubTitle
Card.Body = Body
Card.Image = Image
Card.Footer = Footer

export { Card }
