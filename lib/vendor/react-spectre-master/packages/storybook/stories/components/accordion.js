import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Accordion } from '@react-spectre/accordion'

export default stories => {
  stories.add(
    'Accordion',
    withInfo(`
      React components for Spectre.css accordion element.

      ### Installation

      ~~~shell
      npm install @react-spectre/accordion --save
      ~~~

      ### Usage

      ~~~js
      import { Accordion } from '@react-spectre/accordion'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/accordion)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Accordion>
          <Accordion.Header id="acc-1">Element</Accordion.Header>
          <Accordion.Body>
            <ul className="menu menu-nav">
              <li className="menu-item">
                <a href="#accordions">Element 1</a>
              </li>
              <li className="menu-item">
                <a href="#accordions">Element 2</a>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion>
        <Accordion>
          <Accordion.Header id="acc-2">Layout</Accordion.Header>
          <Accordion.Body>
            <ul className="menu menu-nav">
              <li className="menu-item">
                <a href="#accordions">Layout 1</a>
              </li>
              <li className="menu-item">
                <a href="#accordions">Layout 2</a>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion>
        <Accordion>
          <Accordion.Header id="acc-3">Component</Accordion.Header>
          <Accordion.Body>
            <ul className="menu menu-nav">
              <li className="menu-item">
                <a href="#accordions">Component 1</a>
              </li>
              <li className="menu-item">
                <a href="#accordions">Component 2</a>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion>
      </div>
    ))
  )
}
