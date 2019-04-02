import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Badge = ({ children, label }) => {
  function addPropsToChildren(child) {
    const className = classnames('badge', child.props.className)
    const props = {
      className,
      'data-badge': label && label >= 0 ? label : ''
    }

    return React.cloneElement(child, props)
  }

  return (
    <React.Fragment>
      {React.Children.map(children, addPropsToChildren)}
    </React.Fragment>
  )
}

Badge.propTypes = {
  children: PropTypes.any,
  label: PropTypes.number
}

export { Badge }
