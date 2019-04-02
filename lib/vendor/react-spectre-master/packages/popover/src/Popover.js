import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Popover = ({ right, bottom, left, className, children, ...props }) => {
  const classNames = classnames('popover', className, {
    'popover-right': right,
    'popover-left': left,
    'popover-bottom': bottom
  })
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  )
}
Popover.propTypes = {
  right: PropTypes.bool,
  left: PropTypes.bool,
  bottom: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any
}

const Container = ({ children, ...props }) => (
  <div className="popover-container" {...props}>
    {children}
  </div>
)
Container.propTypes = {
  children: PropTypes.any
}

Popover.Container = Container

export { Popover, Container }
