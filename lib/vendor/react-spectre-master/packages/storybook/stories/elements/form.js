import React from 'react'
import { withInfo } from '@storybook/addon-info'

import {
  Input,
  Radio,
  Select,
  Switch,
  CheckBox,
  TextArea,
  FormGroup
} from '@react-spectre/form'

export default stories => {
  stories.add(
    'Form',
    withInfo(`
      React components for Spectre.css's form elements.

      ## Installation

      ~~~shell
      npm install @react-spectre/form --save
      ~~~

      ## Usage

      ~~~js
      import { FormGroup, Input, TextArea, Select, Radio, CheckBox, Switch } from '@react-spectre/form'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/form)**
    `)(() => (
      <div style={{ padding: 20, width: 400 }}>
        <Input label="Name" placeholder="Name" />
        <Input label="Email" placeholder="Email" type="email" />
        <TextArea label="Message" placeholder="Message" />
        <Select>
          <option>Choose an option</option>
          <option>Slack</option>
          <option>Skype</option>
          <option>Hipchat</option>
        </Select>
        <Select multiple>
          <option>Choose an option</option>
          <option>Slack</option>
          <option>Skype</option>
          <option>Hipchat</option>
        </Select>
        <FormGroup label="Gender">
          <Radio label="Male" name="gender" defaultChecked />
          <Radio label="Female" name="gender" />
        </FormGroup>
        <FormGroup>
          <Switch label="Send me emails with news and tips" />
          <Switch label="Send me emails with news and tips" defaultChecked />
        </FormGroup>
        <FormGroup>
          <CheckBox label="Remember me" />
        </FormGroup>
        <FormGroup>
          <CheckBox label="Remember me" defaultChecked />
        </FormGroup>
      </div>
    ))
  )
}
