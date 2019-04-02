import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Header = ({ children, ...props }) => {
  const { className, id } = props
  const classNames = classnames('accordion-header c-hand', className)

  return (
    <React.Fragment>
      <input type="checkbox" id={id} hidden />
      <label className={classNames} htmlFor={id}>
        {children}
      </label>
    </React.Fragment>
  )
}

Header.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  id: PropTypes.string
}

export { Header }
