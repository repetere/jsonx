import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const SubTitle = props => {
  const { children, className, ...otherProps } = props
  const classNames = classnames('card-subtitle text-gray', className)

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

SubTitle.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export { SubTitle }
