import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { Grid, Row, Col } from '@react-spectre/grid'
import { Panel } from '@react-spectre/panel'

export default stories => {
  stories.add(
    'Panel',
    withInfo(`
      React components for Spectre.css panel element.

      ### Installation

      ~~~shell
      npm install @react-spectre/panel --save
      ~~~

      ### Usage

      ~~~js
      import { Panel } from '@react-spectre/panel'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/panel)**
    `)(() => (
      <div style={{ padding: 20 }}>
        <Grid>
          <Row>
            <Col all={6}>
              <Panel style={{ height: '65vh' }}>
                <Panel.Header>
                  <Panel.Title h6>Comments</Panel.Title>
                </Panel.Header>

                <Panel.Body>
                  <div className="tile">
                    <div className="tile-icon">
                      <figure className="avatar">
                        <img
                          src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                          alt="Avatar"
                        />
                      </figure>
                    </div>
                    <div className="tile-content">
                      <p className="tile-title">Thor Odinson</p>
                      <p className="tile-subtitle">
                        Earths Mightiest Heroes joined forces to take on threats
                        that were too big for any one hero to tackle...
                      </p>
                    </div>
                  </div>
                  <div className="tile">
                    <div className="tile-icon">
                      <figure className="avatar">
                        <img
                          src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                          alt="Avatar"
                        />
                      </figure>
                    </div>
                    <div className="tile-content">
                      <p className="tile-title">Thor Odinson</p>
                      <p className="tile-subtitle">
                        Earths Mightiest Heroes joined forces to take on threats
                        that were too big for any one hero to tackle...
                      </p>
                    </div>
                  </div>
                  <div className="tile">
                    <div className="tile-icon">
                      <figure className="avatar">
                        <img
                          src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                          alt="Avatar"
                        />
                      </figure>
                    </div>
                    <div className="tile-content">
                      <p className="tile-title">Thor Odinson</p>
                      <p className="tile-subtitle">
                        Earths Mightiest Heroes joined forces to take on threats
                        that were too big for any one hero to tackle...
                      </p>
                    </div>
                  </div>
                  <div className="tile">
                    <div className="tile-icon">
                      <figure className="avatar">
                        <img
                          src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                          alt="Avatar"
                        />
                      </figure>
                    </div>
                    <div className="tile-content">
                      <p className="tile-title">Thor Odinson</p>
                      <p className="tile-subtitle">
                        Earths Mightiest Heroes joined forces to take on threats
                        that were too big for any one hero to tackle...
                      </p>
                    </div>
                  </div>
                  <div className="tile">
                    <div className="tile-icon">
                      <figure className="avatar">
                        <img
                          src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                          alt="Avatar"
                        />
                      </figure>
                    </div>
                    <div className="tile-content">
                      <p className="tile-title">Thor Odinson</p>
                      <p className="tile-subtitle">
                        Earths Mightiest Heroes joined forces to take on threats
                        that were too big for any one hero to tackle...
                      </p>
                    </div>
                  </div>
                  <div className="tile">
                    <div className="tile-icon">
                      <figure className="avatar">
                        <img
                          src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                          alt="Avatar"
                        />
                      </figure>
                    </div>
                    <div className="tile-content">
                      <p className="tile-title">Thor Odinson</p>
                      <p className="tile-subtitle">
                        Earths Mightiest Heroes joined forces to take on threats
                        that were too big for any one hero to tackle...
                      </p>
                    </div>
                  </div>
                </Panel.Body>

                <Panel.Footer>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Hello"
                    />
                    <button className="btn btn-primary input-group-btn">
                      Send
                    </button>
                  </div>
                </Panel.Footer>
              </Panel>
            </Col>
            <Col all={6}>
              <Panel style={{ height: '65vh' }}>
                <Panel.Header center>
                  <Panel.Title h6>Comments</Panel.Title>
                </Panel.Header>

                <Panel.Nav>
                  <ul className="tab tab-block">
                    <li className="tab-item active">
                      <a href="#panels">Profile</a>
                    </li>
                    <li className="tab-item">
                      <a href="#panels">Files</a>
                    </li>
                    <li className="tab-item">
                      <a href="#panels">Tasks</a>
                    </li>
                  </ul>
                </Panel.Nav>
                <Panel.Body>
                  <div
                    style={{ margin: '.75rem 0' }}
                    className="tile tile-centered"
                  >
                    <div className="tile-content">
                      <div className="tile-title">E-mail</div>
                      <div className="tile-subtitle">bruce.banner@hulk.com</div>
                    </div>
                    <div className="tile-action">
                      <button className="btn btn-link btn-action btn-lg">
                        <i className="icon icon-edit" />
                      </button>
                    </div>
                  </div>
                  <div
                    style={{ margin: '.75rem 0' }}
                    className="tile tile-centered"
                  >
                    <div className="tile-content">
                      <div className="tile-title">E-mail</div>
                      <div className="tile-subtitle">bruce.banner@hulk.com</div>
                    </div>
                    <div className="tile-action">
                      <button className="btn btn-link btn-action btn-lg">
                        <i className="icon icon-edit" />
                      </button>
                    </div>
                  </div>
                </Panel.Body>

                <Panel.Footer>
                  <button className="btn btn-primary btn-block">Send</button>
                </Panel.Footer>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    ))
  )
}
