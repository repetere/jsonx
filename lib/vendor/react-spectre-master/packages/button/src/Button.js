import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Button = ({ children, ...props }) => {
  const {
    className,

    // Styles.
    primary,
    link,

    // Colors
    success,
    error,

    // Sizes
    block,
    small,
    large,
    action,
    circle,

    // States
    active,
    loading,
    ...otherProps
  } = props

  const classNames = classnames(
    'btn',
    {
      'btn-primary': primary,
      'btn-link': link,
      'btn-success': success,
      'btn-error': error,
      'btn-block': block,
      'btn-sm': small,
      'btn-lg': large,
      'btn-action': action || circle,
      circle: circle,
      active: active,
      loading: loading
    },
    className
  )

  return (
    <button {...otherProps} className={classNames}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  primary: PropTypes.bool,
  link: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  action: PropTypes.bool,
  circle: PropTypes.bool,
  active: PropTypes.bool,
  loading: PropTypes.bool
}

const Group = ({ children, ...props }) => {
  const { block, ...otherProps } = props
  const classNames = classnames('btn-group', { 'btn-group-block': block })

  return (
    <div {...otherProps} className={classNames}>
      {children}
    </div>
  )
}

Group.propTypes = {
  children: PropTypes.any,
  block: PropTypes.bool
}

Button.Group = Group

export { Button, Group }
