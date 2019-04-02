import React from 'react'
import proptypes from 'prop-types'
import classnames from 'classnames'

const Icon = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('tile-icon', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Icon.propTypes = {
  children: proptypes.node,
  className: proptypes.string
}

export { Icon }
