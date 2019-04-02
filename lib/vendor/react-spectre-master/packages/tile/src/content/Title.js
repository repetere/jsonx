import React from 'react'
import proptypes from 'prop-types'
import classnames from 'classnames'

const Title = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('tile-title', className)

  return (
    <p className={classNames} {...otherProps}>
      {children}
    </p>
  )
}

Title.propTypes = {
  children: proptypes.node,
  className: proptypes.string
}

export { Title }
