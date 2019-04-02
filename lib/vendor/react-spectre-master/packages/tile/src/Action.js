import React from 'react'
import proptypes from 'prop-types'
import classnames from 'classnames'

const Action = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('tile-action', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Action.propTypes = {
  children: proptypes.node,
  className: proptypes.string
}

export { Action }
