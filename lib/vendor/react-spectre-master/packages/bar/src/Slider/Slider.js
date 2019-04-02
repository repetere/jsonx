import React from 'react'
import { Bar } from '../Bar'
import { Item } from './Item'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * The Slider component.
 */
const Slider = ({ children, ...props }) => {
  const { className, progress, ...otherProps } = props

  // Prepare class names.
  const classNames = classnames('bar-slider', className)

  return (
    <Bar {...otherProps} className={classNames}>
      {progress === undefined || children !== undefined ? (
        children
      ) : (
        <Item progress={progress} />
      )}
    </Bar>
  )
}

Slider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  progress: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
}

// Create alias of Item component inside Slider component.
Slider.Item = Item

export { Slider }
