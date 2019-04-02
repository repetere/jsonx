import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Toast } from '@react-spectre/toast'

export default stories => {
  stories.add(
    'Toast',
    withInfo(`
      React components for Spectre.css toast.

      ### Installation

      ~~~shell
      npm install @react-spectre/toast --save
      ~~~

      ### Usage

      ~~~js
      import { Toast } from '@react-spectre/toast'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/toast)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Toast>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Toast>
        <Toast primary>
          <button className="btn btn-clear float-right" />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Toast>
        <Toast success>
          <button className="btn btn-clear float-right" />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Toast>
        <Toast warning>
          <button className="btn btn-clear float-right" />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Toast>
        <Toast error>
          <button className="btn btn-clear float-right" />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Toast>
      </div>
    ))
  )
}
