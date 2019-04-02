import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FormGroup } from './FormGroup'

const Select = props => {
  const { children, className, label, id, ...otherProps } = props
  const formGroupProps = { label, id }
  const inputProps = { id, ...otherProps }
  const classNames = classnames('form-select', className)

  return (
    <FormGroup {...formGroupProps}>
      <select {...inputProps} className={classNames}>
        {children}
      </select>
    </FormGroup>
  )
}

Select.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string
}

export { Select }
