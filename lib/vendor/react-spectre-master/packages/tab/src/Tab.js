import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Tab = ({ block, className, children, ...props }) => {
  const classNames = classnames('tab', className, {
    'tab-block': block
  })
  return (
    <ul className={classNames} {...props}>
      {children}
    </ul>
  )
}
Tab.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any
}

const Item = ({ active, action, className, children, ...props }) => {
  const classNames = classnames('tab-item', className, {
    'tab-action': action,
    active
  })
  return (
    <li className={classNames} {...props}>
      {children}
    </li>
  )
}
Item.propTypes = {
  active: PropTypes.bool,
  action: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any
}

const Label = ({ active, badge, children, ...props }) => {
  const hasBadge = badge > -1
  const classNames = classnames({
    active,
    badge: hasBadge
  })
  // Add the data-badge property only if the badge prop is greater than -1.
  const clonedProps = Object.assign(
    {},
    props,
    hasBadge ? { 'data-badge': badge } : {}
  )
  return (
    <a href="#" className={classNames} {...clonedProps}>
      {children}
    </a>
  )
}
Label.propTypes = {
  active: PropTypes.bool,
  badge: PropTypes.number,
  children: PropTypes.any
}
Label.defaultProps = {
  badge: -1
}

Item.Label = Label
Tab.Item = Item

export { Tab, Item, Label }
