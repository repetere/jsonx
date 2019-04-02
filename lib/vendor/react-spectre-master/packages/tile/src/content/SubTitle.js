import React from 'react'
import proptypes from 'prop-types'
import classnames from 'classnames'

const SubTitle = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('tile-subtitle', className)

  return (
    <p className={classNames} {...otherProps}>
      {children}
    </p>
  )
}

SubTitle.propTypes = {
  children: proptypes.node,
  className: proptypes.string
}

export { SubTitle }
