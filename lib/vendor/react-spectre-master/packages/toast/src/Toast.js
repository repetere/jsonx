import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Toast = ({
  className,
  primary,
  success,
  warning,
  error,
  children,
  ...props
}) => {
  const base = 'toast'
  const composeVariantClass = variant => `toast-${variant}`
  const classNames = classnames(base, className, {
    [composeVariantClass('primary')]: primary,
    [composeVariantClass('success')]: success,
    [composeVariantClass('warning')]: warning,
    [composeVariantClass('error')]: error
  })
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  )
}
Toast.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.any
}

export { Toast }
