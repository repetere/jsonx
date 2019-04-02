import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Col = ({ children, ...props }) => {
  const getColumnClasses = componentProps => {
    const { all, offset, hide, show } = componentProps
    const colSizes = ['xs', 'sm', 'md', 'lg', 'xl']
    const classes = []
    const colPrefix = 'col'

    if (all) {
      classes.push(`${colPrefix}-${all}`)
    } else {
      classes.push(
        colSizes.reduce((sizes, size) => {
          if (!componentProps[size]) return sizes
          return classnames(
            sizes,
            `${colPrefix}-${size}-${componentProps[size]}`
          )
        }, '')
      )
    }

    if (offset) classes.push(`${colPrefix}-${offset}-auto`)
    if (hide) classes.push(classnames(hide.map(size => `hide-${size}`)))
    if (show) classes.push(classnames(show.map(size => `show-${size}`)))

    return classes
  }

  const { className, ...otherProps } = props
  const classes = getColumnClasses(otherProps)
  const classNames = classnames('column', classes, className)

  return <div className={classNames}>{children}</div>
}

Col.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  all: PropTypes.number,
  offset: PropTypes.string,
  hide: PropTypes.array,
  show: PropTypes.array
}

export { Col }
