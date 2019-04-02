import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Title = props => {
  const { children, h1, h2, h3, h4, h5, h6, className, ...otherProps } = props
  const classNames = classnames(
    'card-title',
    {
      h1: h1,
      h2: h2,
      h3: h3,
      h4: h4,
      h5: h5,
      h6: h6
    },
    className
  )

  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  )
}

Title.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool
}

export { Title }
