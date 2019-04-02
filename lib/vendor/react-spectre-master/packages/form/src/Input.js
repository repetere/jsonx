import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FormGroup } from './FormGroup'

const Input = props => {
  const { className, label, id, ...otherProps } = props
  const formGroupProps = { label, id }
  const inputProps = { id, ...otherProps }
  const classNames = classnames('form-input', className)

  return (
    <FormGroup {...formGroupProps}>
      <input {...inputProps} className={classNames} />
    </FormGroup>
  )
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string
}

export { Input }
