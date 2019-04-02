import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Avatar } from '@react-spectre/avatar'

export default stories => {
  stories.add(
    'Avatar',
    withInfo(`
      React components for Spectre.css avatar element.

      ### Installation

      ~~~shell
      npm install @react-spectre/avatar --save
      ~~~

      ### Usage

      ~~~js
      import { Avatar } from '@react-spectre/avatar'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/avatar)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Avatar src="img/avatar-1.png" icon />
        <br />
        <Avatar src="assets/react-spectre-logo.png" lg>
          <Avatar.Icon src="img/avatar-2.png" />
        </Avatar>
        <br />
        <Avatar initial={'YZ'} style={{ backgroundColor: '#5755d9' }} xl>
          <Avatar.Presence online />
        </Avatar>
      </div>
    ))
  )
}
