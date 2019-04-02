import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Table = ({ children, ...props }) => {
  const { className, striped, hover, scroll, ...otherProps } = props

  const classNames = classnames('table', className, {
    'table-striped': striped,
    'table-hover': hover,
    'table-scroll': scroll
  })

  return (
    <table {...otherProps} className={classNames}>
      {children}
    </table>
  )
}

Table.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  scroll: PropTypes.bool
}

const Header = ({ children, ...props }) => <thead {...props}>{children}</thead>

Header.propTypes = {
  children: PropTypes.any
}

const Body = ({ children, ...props }) => <tbody {...props}>{children}</tbody>

Body.propTypes = {
  children: PropTypes.any
}

const Row = ({ children, ...props }) => {
  const { className, active, ...otherProps } = props

  const classNames = classnames(className, { active: active })

  return (
    <tr {...otherProps} className={classNames}>
      {children}
    </tr>
  )
}

Row.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  active: PropTypes.bool
}

const Heading = ({ children, ...props }) => <th {...props}>{children}</th>

Heading.propTypes = {
  children: PropTypes.any
}

const Cell = ({ children, ...props }) => <td {...props}>{children}</td>

Cell.propTypes = {
  children: PropTypes.any
}

Table.Header = Header
Table.Body = Body
Table.Row = Row
Table.Heading = Heading
Table.Cell = Cell

export { Table, Header, Body, Row, Heading, Cell }
