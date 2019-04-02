import React from 'react'
import { Item } from './Item'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * The Bar component.
 */
const Bar = ({ children, ...props }) => {
  const { className, small, progress } = props

  // Prepare class names.
  const classNames = classnames('bar', className, {
    'bar-sm': small
  })

  return (
    <div className={classNames}>
      {progress === undefined || children !== undefined ? (
        children
      ) : (
        <Item progress={progress} />
      )}
    </div>
  )
}

Bar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  small: PropTypes.bool,
  progress: PropTypes.number
}

// Create alias of Item component inside Bar component.
Bar.Item = Item

export { Bar }
