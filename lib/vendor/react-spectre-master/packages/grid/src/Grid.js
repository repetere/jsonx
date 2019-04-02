import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Grid = ({ children, ...props }) => {
  const { className, ...otherProps } = props
  const classNames = classnames('container', className)
  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export { Grid }
