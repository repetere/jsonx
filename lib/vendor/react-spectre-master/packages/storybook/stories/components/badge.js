import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Badge } from '@react-spectre/badge'
import { Button } from '@react-spectre/button'
import { Figure, Image } from '@react-spectre/media'

export default stories => {
  stories.add(
    'Badge',
    withInfo(`
      React components for Spectre.css badge element.

      ### Installation

      ~~~shell
      npm install @react-spectre/badge --save
      ~~~

      ### Usage

      ~~~js
      import { Badge } from '@react-spectre/badge'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/badge)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Badge label={1}>
          <span>Notifications</span>
        </Badge>
        <br />
        <br />
        <Badge label={2}>
          <Button>Badge Button</Button>
        </Badge>
        <br />
        <br />
        <Badge label={11}>
          <Figure className="avatar">
            <Image
              responsive
              src="https://picturepan2.github.io/spectre/img/avatar-1.png"
            />
          </Figure>
        </Badge>
      </div>
    ))
  )
}
