import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const FormGroup = props => {
  const { children, className, label, id, ...otherProps } = props
  const classNames = classnames('form-group', className)

  return (
    <div {...otherProps} className={classNames}>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
    </div>
  )
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string
}

export { FormGroup }
