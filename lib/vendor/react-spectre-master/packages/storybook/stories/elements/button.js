import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Button, Group } from '@react-spectre/button'

export default stories => {
  stories.add(
    'Buttons',
    withInfo(`
      React components for Spectre.css's buttons.

      ## Installation

      ~~~shell
      npm install @react-spectre/button --save
      ~~~

      ## Usage

      ~~~js
      import { Button } from '@react-spectre/button'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/button)**
    `)(() => (
      <div>
        <Button>Default Button</Button> <Button primary>Primary Button</Button>
        <br />
        <br />
        <Button link>Link Button</Button>
        <br />
        <br />
        <Button success>Success Button</Button>{' '}
        <Button error>Error Button</Button>
        <br />
        <br />
        <Button small>Small Button</Button> <Button large>Large Button</Button>
        <br />
        <br />
        <Button block>Block Button</Button>
        <br />
        <br />
        <Button action large>
          A
        </Button>{' '}
        <Button action>A</Button>{' '}
        <Button action small>
          A
        </Button>
        <br />
        <br />
        <Button circle large>
          FAB
        </Button>{' '}
        <Button circle>FAB</Button>{' '}
        <Button circle small>
          FAB
        </Button>
        <br />
        <br />
        <Button active>Active Button</Button>
        <br />
        <br />
        <Button loading>Loading Button</Button>
        <br />
        <br />
        <Group>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Group>
      </div>
    ))
  )
}
