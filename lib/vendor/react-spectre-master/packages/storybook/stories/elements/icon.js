import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { H4 } from '@react-spectre/typography'
import { Icon } from '@react-spectre/icon'
import { Button } from '@react-spectre/button'

const buttonStyle = { margin: '0 20px 20px 0' }

H4.displayName = 'H4'
Button.displayName = 'Button'

export default stories => {
  stories.add(
    'Icons',
    withInfo(`
      React components for Spectre.css's icons.

      ## Installation

      ~~~shell
      npm install @react-spectre/icon --save
      ~~~

      ## Usage

      ~~~js
      import { Icon } from '@react-spectre/icon'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/icon)**
    `)(() => (
      <div style={{ padding: 20, width: 400 }}>
        <H4>Navigation Icons</H4>

        <Button primary style={buttonStyle}>
          <Icon name="arrow-up" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="arrow-right" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="arrow-down" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="arrow-left" />
        </Button>

        <br />

        <Button primary style={buttonStyle}>
          <Icon name="upward" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="forward" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="downward" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="back" />
        </Button>

        <br />

        <Button primary style={buttonStyle}>
          <Icon name="caret" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="menu" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="apps" />
        </Button>

        <br />

        <Button primary style={buttonStyle}>
          <Icon name="more-horiz" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="more-vert" />
        </Button>

        <H4>Action Icons</H4>

        <Button primary style={buttonStyle}>
          <Icon name="resize-horiz" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="resize-vert" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="plus" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="minus" />
        </Button>

        <br />

        <Button primary style={buttonStyle}>
          <Icon name="cross" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="check" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="stop" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="shutdown" />
        </Button>

        <br />

        <Button primary style={buttonStyle}>
          <Icon name="refresh" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="search" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="flag" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="bookmark" />
        </Button>

        <br />

        <Button primary style={buttonStyle}>
          <Icon name="edit" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="delete" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="share" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="download" />
        </Button>

        <br />

        <Button primary style={buttonStyle}>
          <Icon name="upload" />
        </Button>

        <H4>Object Icons</H4>

        <Button primary style={buttonStyle}>
          <Icon name="mail" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="people" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="message" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="photo" />
        </Button>

        <br />

        <Button primary style={buttonStyle}>
          <Icon name="time" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="location" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="link" />
        </Button>
        <Button primary style={buttonStyle}>
          <Icon name="emoji" />
        </Button>
      </div>
    ))
  )
}
