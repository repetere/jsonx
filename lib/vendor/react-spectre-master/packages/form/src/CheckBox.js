import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const CheckBox = props => {
  const { className, label, ...otherProps } = props
  const classNames = classnames('form-checkbox', className)

  return (
    <label className={classNames}>
      <input {...otherProps} type="checkbox" />
      <i className="form-icon" /> {label}
    </label>
  )
}

CheckBox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string
}

export { CheckBox }
