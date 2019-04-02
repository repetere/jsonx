import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Presence = props => {
  const { className, online, busy, away, ...otherProps } = props
  const classNames = classnames(
    'avatar-presence',
    {
      online: online,
      busy: busy,
      away: away
    },
    className
  )

  return <i className={classNames} {...otherProps} />
}

Presence.propTypes = {
  className: PropTypes.string,
  online: PropTypes.bool,
  busy: PropTypes.bool,
  away: PropTypes.bool
}

export { Presence }
