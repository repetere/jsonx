import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Card } from '@react-spectre/card'
import { Button } from '@react-spectre/button'
import { Grid, Col } from '@react-spectre/grid'

export default stories => {
  stories.add(
    'Card',
    withInfo(`
      React components for Spectre.css card element.

      ### Installation

      ~~~shell
      npm install @react-spectre/card --save
      ~~~

      ### Usage

      ~~~js
      import { Card } from '@react-spectre/card'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/card)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Grid>
          <Col all={6}>
            <Card>
              <Card.Image src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" />

              <Card.Header>
                <Card.Title h2>Microsoft</Card.Title>
                <Card.SubTitle>Software and hardware</Card.SubTitle>
              </Card.Header>

              <Card.Body>
                Empower every person and every organization on the planet to
                achieve more.
              </Card.Body>

              <Card.Footer>
                <Button primary>Do</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Grid>
      </div>
    ))
  )
}
