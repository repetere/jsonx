import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Radio = props => {
  const { className, label, ...otherProps } = props
  const classNames = classnames('form-radio', className)

  return (
    <label className={classNames}>
      <input {...otherProps} type="radio" />
      <i className="form-icon" /> {label}
    </label>
  )
}

Radio.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string
}

export { Radio }
