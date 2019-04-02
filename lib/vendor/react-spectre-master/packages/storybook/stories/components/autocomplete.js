import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Autocomplete } from '@react-spectre/autocomplete'

export default stories => {
  stories.add(
    'Autocomplete',
    withInfo(`
      React components for Spectre.css autocomplete element.

      ### Installation

      ~~~shell
      npm install @react-spectre/autocomplete --save
      ~~~

      ### Usage

      ~~~js
      import { Autocomplete, Input, Menu } from '@react-spectre/autocomplete'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/autocomplete)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Autocomplete>
          <Autocomplete.Input focus>
            <div className="chip">
              <img className="avatar avatar-sm" alt="Thor Odinson" />
              Thor Odinson
              <a
                href="#"
                className="btn btn-clear"
                aria-label="Close"
                role="button"
              />
            </div>

            <input
              className="form-input"
              type="text"
              placeholder="typing here"
            />
          </Autocomplete.Input>
          <Autocomplete.Menu>
            <li className="menu-item">
              <a href="#">
                <div className="tile tile-centered">
                  <div className="tile-icon">
                    <img className="avatar avatar-sm" alt="Steve Rogers" />
                  </div>
                  <div className="tile-content">Steve Rogers</div>
                </div>
              </a>
            </li>
          </Autocomplete.Menu>
        </Autocomplete>
      </div>
    ))
  )
}
