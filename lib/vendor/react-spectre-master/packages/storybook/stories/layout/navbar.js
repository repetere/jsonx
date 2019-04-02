import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Navbar } from '@react-spectre/navbar'

export default stories => {
  stories.add(
    'Navbar',
    withInfo(`
      React components for Spectre.css's navigation bar.

      ### Installation

      ~~~shell
      npm install @react-spectre/navbar --save
      ~~~

      ### Usage

      ~~~js
      import { Navbar, Brand, Section } from '@react-spectre/navbar'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/navbar)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Navbar>
          <Navbar.Section>
            <a href="#" className="btn btn-link">
              Docs
            </a>
            <a
              href="https://github.com/picturepan2/spectre"
              className="btn btn-link"
            >
              GitHub
            </a>
          </Navbar.Section>
          <Navbar.Section center>
            <Navbar.Brand>MyAwesomeBrand</Navbar.Brand>
          </Navbar.Section>
          <Navbar.Section>
            <div className="input-group input-inline">
              <input className="form-input" type="text" placeholder="search" />
            </div>
          </Navbar.Section>
        </Navbar>
      </div>
    ))
  )
}
