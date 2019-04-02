import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from './Icon'
import { Presence } from './Presence'

const Avatar = ({ children, ...props }) => {
  const { className, src, initial, icon, xs, sm, lg, xl, ...otherProps } = props
  const imageNode = src && <img src={src} />
  const iconNode = icon && <Icon src={src} />
  const classNames = classnames(
    'avatar',
    {
      'avatar-xl': xl,
      'avatar-lg': lg,
      'avatar-sm': sm,
      'avatar-xs': xs
    },
    className
  )

  return (
    <figure className={classNames} data-initial={initial} {...otherProps}>
      {children}
      {imageNode}
      {iconNode}
    </figure>
  )
}

Avatar.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  src: PropTypes.string,
  initial: PropTypes.string,
  icon: PropTypes.string,
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool
}

Avatar.Icon = Icon
Avatar.Presence = Presence

export { Avatar }
