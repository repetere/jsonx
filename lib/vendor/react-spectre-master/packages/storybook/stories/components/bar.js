import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Bar, Slider } from '@react-spectre/bar'

export default stories => {
  stories.add(
    'Bar',
    withInfo(`
      React components for Spectre.css bar.

      ### Installation

      ~~~shell
      npm install @react-spectre/bar --save
      ~~~

      ### Usage

      ~~~js
      import { Avatar } from '@react-spectre/bar'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/bar)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Bar progress={20} />
        <br />
        <Bar progress={40} small />
        <br />
        <Bar>
          <Bar.Item progress={60} />
        </Bar>
        <br />
        <Bar>
          <Bar.Item progress={60}>60%</Bar.Item>
        </Bar>
        <br />
        <Bar>
          <Bar.Item progress={60}>System 60%</Bar.Item>
          <Bar.Item progress={20} style={{ background: '#817fe3' }}>
            Documents 20%
          </Bar.Item>
        </Bar>
        <br />
        <Slider progress={20} />
        <br />
        <Slider>
          <Slider.Item progress={40} />
        </Slider>
        <br />
        <Slider>
          <Slider.Item progress={20} />
          <Slider.Item progress={60} />
        </Slider>
      </div>
    ))
  )
}
