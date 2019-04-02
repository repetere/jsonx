import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, text } from '@storybook/addon-knobs/react'

import { H1, H2, H3, H4, H5, H6 } from '@react-spectre/typography'

export default stories => {
  stories.addDecorator(withKnobs)
  stories.add(
    'Typography',
    withInfo(`
      React components for Spectre.css's typography

      ## Installation

      ~~~shell
      npm install @react-spectre/typography --save
      ~~~

      ## Usage

      ~~~js
      import { H1, H2, H3, H4, H5, H6, Label } from '@react-spectre/typography'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/typography)**
    `)(() => (
      <div>
        <H1 contents={text('h1.contents', '')} label={text('h1.label', '40px')}>
          {text('h1.children', 'H1 Heading')}
        </H1>
        <H2 contents={text('h2.contents', '')} label={text('h2.label', '32px')}>
          {text('h2.children', 'H2 Heading')}
        </H2>
        <H3 contents={text('h3.contents', '')} label={text('h3.label', '28px')}>
          {text('h3.children', 'H3 Heading')}
        </H3>
        <H4 contents={text('h4.contents', '')} label={text('h4.label', '24px')}>
          {text('h4.children', 'H4 Heading')}
        </H4>
        <H5 contents={text('h5.contents', '')} label={text('h5.label', '20px')}>
          {text('h5.children', 'H5 Heading')}
        </H5>
        <H6 contents={text('h6.contents', '')} label={text('h6.label', '16px')}>
          {text('h6.children', 'H6 Heading')}
        </H6>
      </div>
    ))
  )
}
