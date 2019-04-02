import React from 'react'
import proptypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from './Icon'
import { Action } from './Action'
import { Content, Title, SubTitle } from './content'

const Tile = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('tile', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Tile.propTypes = {
  children: proptypes.node,
  className: proptypes.string
}

Tile.Title = Title
Tile.SubTitle = SubTitle
Tile.Content = Content
Tile.Action = Action
Tile.Icon = Icon

export { Tile }
