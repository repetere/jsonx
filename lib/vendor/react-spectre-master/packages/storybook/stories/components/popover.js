import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Button } from '@react-spectre/button'
import { Popover } from '@react-spectre/popover'
import { Card } from '@react-spectre/card'

export default stories => {
  stories.add(
    'Popover',
    withInfo(`
      React components for Spectre.css popover.

      ### Installation

      ~~~shell
      npm install @react-spectre/popover --save
      ~~~

      ### Usage

      ~~~js
      import { Popover } from '@react-spectre/popover'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/popover)**
    `)(() => (
      <div style={{ padding: 50, textAlign: 'center', marginTop: 100 }}>
        <Popover>
          <Button primary>top popover</Button>
          <Popover.Container>
            <Card>
              <Card.Header>
                <Card.Title h2>Apple</Card.Title>
                <Card.SubTitle>Software and hardware</Card.SubTitle>
              </Card.Header>
              <Card.Body>
                To make a contribution to the world by making tools for the mind
                that advance humankind.
              </Card.Body>
              <Card.Footer>
                <Button primary>Buy</Button>
              </Card.Footer>
            </Card>
          </Popover.Container>
        </Popover>
        <br />
        <br />
        <Popover right>
          <Button primary>right popover</Button>
          <Popover.Container>
            <Card>
              <Card.Header>
                <Card.Title h2>Apple</Card.Title>
                <Card.SubTitle>Software and hardware</Card.SubTitle>
              </Card.Header>
              <Card.Body>
                To make a contribution to the world by making tools for the mind
                that advance humankind.
              </Card.Body>
              <Card.Footer>
                <Button primary>Buy</Button>
              </Card.Footer>
            </Card>
          </Popover.Container>
        </Popover>
        <br />
        <br />
        <Popover left>
          <Button primary>left popover</Button>
          <Popover.Container>
            <Card>
              <Card.Header>
                <Card.Title h2>Apple</Card.Title>
                <Card.SubTitle>Software and hardware</Card.SubTitle>
              </Card.Header>
              <Card.Body>
                To make a contribution to the world by making tools for the mind
                that advance humankind.
              </Card.Body>
              <Card.Footer>
                <Button primary>Buy</Button>
              </Card.Footer>
            </Card>
          </Popover.Container>
        </Popover>
        <br />
        <br />
        <Popover bottom>
          <Button primary>bottom popover</Button>
          <Popover.Container>
            <Card>
              <Card.Header>
                <Card.Title h2>Apple</Card.Title>
                <Card.SubTitle>Software and hardware</Card.SubTitle>
              </Card.Header>
              <Card.Body>
                To make a contribution to the world by making tools for the mind
                that advance humankind.
              </Card.Body>
              <Card.Footer>
                <Button primary>Buy</Button>
              </Card.Footer>
            </Card>
          </Popover.Container>
        </Popover>
      </div>
    ))
  )
}
