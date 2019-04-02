import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Label } from '@react-spectre/label'

Label.displayName = 'Label'

const labelStyle = { marginRight: 10 }

export default stories => {
  stories.add(
    'Label',
    withInfo(`
      React components for Spectre.css's labels.

      ## Installation

      ~~~shell
      npm install @react-spectre/label --save
      ~~~

      ## Usage

      ~~~js
      import { Label } from '@react-spectre/label'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/label)**
    `)(() => (
      <div>
        <Label style={labelStyle}>default</Label>
        <Label style={labelStyle} primary>
          primary
        </Label>
        <Label style={labelStyle} secondary>
          secondary
        </Label>
        <Label style={labelStyle} success>
          success
        </Label>
        <Label style={labelStyle} warning>
          warning
        </Label>
        <Label style={labelStyle} error>
          error
        </Label>
        <br />
        <br />
        <Label style={labelStyle} rounded>
          default
        </Label>
        <Label style={labelStyle} rounded primary>
          primary
        </Label>
        <Label style={labelStyle} rounded secondary>
          secondary
        </Label>
        <Label style={labelStyle} rounded success>
          success
        </Label>
        <Label style={labelStyle} rounded warning>
          warning
        </Label>
        <Label style={labelStyle} rounded error>
          error
        </Label>
        <br />
        <br />
        <Label style={labelStyle} small>
          default
        </Label>
        <Label style={labelStyle} small primary>
          primary
        </Label>
        <Label style={labelStyle} small secondary>
          secondary
        </Label>
        <Label style={labelStyle} small success>
          success
        </Label>
        <Label style={labelStyle} small warning>
          warning
        </Label>
        <Label style={labelStyle} small error>
          error
        </Label>
      </div>
    ))
  )
}
