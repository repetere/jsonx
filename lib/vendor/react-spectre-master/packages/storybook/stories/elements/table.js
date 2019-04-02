import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Table, Header, Body, Row, Heading, Cell } from '@react-spectre/table'

export default stories => {
  stories.add(
    'Table',
    withInfo(`
      React components for Spectre.css's table.

      ## Installation

      ~~~shell
      npm install @react-spectre/table --save
      ~~~

      ## Usage

      ~~~js
      import { Table, Header, Body, Row, Heading, Cell } from '@react-spectre/table'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/table)**
    `)(() => (
      <div>
        <Table>
          <Header>
            <Row>
              <Heading>Name</Heading>
              <Heading>Genre</Heading>
              <Heading>Release Date</Heading>
            </Row>
          </Header>
          <Body>
            <Row>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
            </Row>
            <Row>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
            </Row>
            <Row>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
            </Row>
          </Body>
        </Table>
        <br />
        <br />
        <Table striped hover>
          <Header>
            <Row>
              <Heading>Name</Heading>
              <Heading>Genre</Heading>
              <Heading>Release Date</Heading>
            </Row>
          </Header>
          <Body>
            <Row>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
            </Row>
            <Row>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
            </Row>
            <Row>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
            </Row>
          </Body>
        </Table>
        <br />
        <br />
        <Table striped scroll>
          <Header>
            <Row>
              <Heading>Name</Heading>
              <Heading>Genre</Heading>
              <Heading>Release Date</Heading>
            </Row>
          </Header>
          <Body>
            <Row active>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
            </Row>
            <Row>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
            </Row>
            <Row>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
              <Cell>The Shawshank Redemption</Cell>
              <Cell>Crime, Drame</Cell>
              <Cell>14 October 1994</Cell>
            </Row>
          </Body>
        </Table>
      </div>
    ))
  )
}
