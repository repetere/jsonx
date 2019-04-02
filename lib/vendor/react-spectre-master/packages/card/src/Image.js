import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Image = props => {
  const { src, ...otherProps } = props
  const wrapperClassName = classNames('card-image')

  return (
    <div className={wrapperClassName}>
      <img src={src} className="img-responsive" {...otherProps} />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string
}

export { Image }
