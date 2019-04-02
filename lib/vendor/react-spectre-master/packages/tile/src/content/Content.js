import React from 'react'
import proptypes from 'prop-types'
import classnames from 'classnames'
import { Title } from './Title'
import { SubTitle } from './SubTitle'

const Content = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('tile-content', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Content.propTypes = {
  children: proptypes.node,
  className: proptypes.string
}

Content.Title = Title
Content.SubTitle = SubTitle

export { Content }
