import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Row = ({ children, ...props }) => {
  const { className, gapless, oneline, ...otherProps } = props
  const classNames = classnames(
    'columns',
    {
      'col-gapless': gapless,
      'col-oneline': oneline
    },
    className
  )

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Row.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  gapless: PropTypes.bool,
  oneline: PropTypes.bool
}

export { Row }
