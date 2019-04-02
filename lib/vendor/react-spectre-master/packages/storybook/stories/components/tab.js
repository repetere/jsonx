import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Tab, Label } from '@react-spectre/tab'

export default stories => {
  stories.add(
    'Tab',
    withInfo(`
      React components for Spectre.css tabs.

      ### Installation

      ~~~shell
      npm install @react-spectre/tab --save
      ~~~

      ### Usage

      ~~~js
      import { Tab, Label } from '@react-spectre/tab'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/tab)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <div>
          <Tab block>
            <Tab.Item active>
              <Label>Music</Label>
            </Tab.Item>
            <Tab.Item>
              <Label>Playlists</Label>
            </Tab.Item>
            <Tab.Item>
              <Label>Radio</Label>
            </Tab.Item>
            <Tab.Item>
              <Label>Connect</Label>
            </Tab.Item>
          </Tab>
        </div>
        <div>
          <Tab block>
            <Tab.Item>
              <Label badge="100">Music</Label>
            </Tab.Item>
            <Tab.Item>
              <Label badge="89">Videos</Label>
            </Tab.Item>
            <Tab.Item active>
              <Label badge="8">Movies</Label>
            </Tab.Item>
            <Tab.Item>
              <Label badge="108">History</Label>
            </Tab.Item>
          </Tab>
        </div>
        <div>
          <Tab>
            <Tab.Item active>
              <Label>Music</Label>
            </Tab.Item>
            <Tab.Item>
              <Label>Playlists</Label>
            </Tab.Item>
            <Tab.Item>
              <Label>Radio</Label>
            </Tab.Item>
            <Tab.Item>
              <Label>Connect</Label>
            </Tab.Item>
            <Tab.Item action>
              <div className="input-group input-inline">
                <input
                  className="form-input input-sm"
                  type="text"
                  placeholder="search"
                />
                <button className="btn btn-primary btn-sm input-group-btn">
                  Search
                </button>
              </div>
            </Tab.Item>
          </Tab>
        </div>
      </div>
    ))
  )
}
