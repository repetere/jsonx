import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FormGroup } from './FormGroup'

const TextArea = props => {
  const { children, className, label, id, ...otherProps } = props
  const formGroupProps = { label, id }
  const inputProps = { id, ...otherProps }
  const classNames = classnames('form-input', className)

  return (
    <FormGroup {...formGroupProps}>
      <textarea {...inputProps} className={classNames}>
        {children}
      </textarea>
    </FormGroup>
  )
}

TextArea.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string
}

export { TextArea }
