import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Tile } from '@react-spectre/tile'
import { Image } from '@react-spectre/media'
import { Button } from '@react-spectre/button'
import { Avatar } from '@react-spectre/avatar'
import { Grid, Col, Row } from '@react-spectre/grid'

export default stories => {
  stories.add(
    'Tile',
    withInfo(`
      React components for Spectre.css tile element.

      ### Installation

      ~~~shell
      npm install @react-spectre/tile --save
      ~~~

      ### Usage

      ~~~js
      import { Tile } from '@react-spectre/tile'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/tile)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Grid>
          <Row>
            <Col all={4}>
              <Tile>
                <Tile.Icon>
                  <Avatar lg>
                    <Image
                      responsive
                      src="https://picturepan2.github.io/spectre/img/avatar-3.png"
                    />
                  </Avatar>
                </Tile.Icon>

                <Tile.Content>
                  <Tile.Title>The Avengers</Tile.Title>
                  <Tile.SubTitle className="text-gray">
                    Earth&apos;s Mightiest Heroes joined forces to take on
                    threats that were too big for any one hero to tackle...
                  </Tile.SubTitle>
                </Tile.Content>

                <Tile.Action>
                  <Button primary>Join</Button>
                </Tile.Action>
              </Tile>
            </Col>

            <Col all={4}>
              <Tile>
                <Tile.Icon>
                  <Avatar lg>
                    <Image
                      responsive
                      src="https://picturepan2.github.io/spectre/img/avatar-3.png"
                    />
                  </Avatar>
                </Tile.Icon>

                <Tile.Content>
                  <Tile.Title>The Avengers</Tile.Title>
                  <Tile.SubTitle className="text-gray">
                    Earth&apos;s Mightiest Heroes joined forces to take on
                    threats that were too big for any one hero to tackle...
                  </Tile.SubTitle>

                  <Button primary>Join</Button>
                </Tile.Content>
              </Tile>
            </Col>
          </Row>
        </Grid>
      </div>
    ))
  )
}
