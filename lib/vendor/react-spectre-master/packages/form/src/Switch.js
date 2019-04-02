import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Switch = props => {
  const { className, label, ...otherProps } = props
  const classNames = classnames('form-switch', className)

  return (
    <label className={classNames}>
      <input {...otherProps} type="checkbox" />
      <i className="form-icon" /> {label}
    </label>
  )
}

Switch.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string
}

export { Switch }
