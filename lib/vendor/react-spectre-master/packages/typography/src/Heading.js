import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

/**
 * The Heading component.
 */
const Heading = ({ children, ...props }) => {
  const { tag: Component, contents, label, ...otherProps } = props
  return (
    <Component {...otherProps}>
      {children || contents} {label && <Label contents={label} />}
    </Component>
  )
}

Heading.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.any,
  contents: PropTypes.any,
  label: PropTypes.any
}

/**
 * The Label component.
 */
const Label = ({ children, ...props }) => {
  const { contents, className, ...otherProps } = props
  return (
    <small className={cn('label', className)} {...otherProps}>
      {children || contents}
    </small>
  )
}

Label.propTypes = {
  children: PropTypes.any,
  contents: PropTypes.any,
  className: PropTypes.any
}

/**
 * The Headings components.
 */

const H1 = props => <Heading {...props} tag="h1" />
const H2 = props => <Heading {...props} tag="h2" />
const H3 = props => <Heading {...props} tag="h3" />
const H4 = props => <Heading {...props} tag="h4" />
const H5 = props => <Heading {...props} tag="h5" />
const H6 = props => <Heading {...props} tag="h6" />

H1.propTypes = H2.propTypes = H3.propTypes = H4.propTypes = H5.propTypes = H6.propTypes = {
  children: PropTypes.any,
  contents: PropTypes.any,
  label: PropTypes.any
}

H1.Label = H2.Label = H3.Label = H4.Label = H5.Label = H6.Label = Label

export { H1, H2, H3, H4, H5, H6, Label }
