import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Step = ({ children, className, ...props }) => {
  const classNames = classnames('step', className)
  return (
    <ul className={classNames} {...props}>
      {children}
    </ul>
  )
}
Step.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

const Item = ({ children, className, active, ...props }) => {
  const classNames = classnames('step-item', className, {
    active
  })
  return (
    <li className={classNames} {...props}>
      {children}
    </li>
  )
}
Item.propTypes = {
  children: PropTypes.any,
  active: PropTypes.bool,
  className: PropTypes.string
}

Step.Item = Item

export { Step, Item }
