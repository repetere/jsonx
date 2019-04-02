import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Label = ({ children, ...props }) => {
  const {
    // Colors.
    primary,
    secondary,
    success,
    warning,
    error,
    // Styles.
    rounded,
    // Modifiers.
    small,
    // Remaining props to transfer.
    ...otherProps
  } = props

  const classNames = classnames('label', {
    'label-primary': primary,
    'label-secondary': secondary,
    'label-success': success,
    'label-warning': warning,
    'label-error': error,
    'label-rounded': rounded
  })

  const Element = small ? 'small' : 'span'

  return (
    <Element {...otherProps} className={classNames}>
      {children}
    </Element>
  )
}

Label.propTypes = {
  children: PropTypes.node,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  rounded: PropTypes.bool,
  small: PropTypes.bool
}

export { Label }
