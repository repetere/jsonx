import React from 'react'
import { withInfo } from '@storybook/addon-info'

import { Image, Figure, Video } from '@react-spectre/media'

export default stories => {
  stories.add(
    'Media',
    withInfo(`
      React components for Spectre.css's media elements.

      ## Installation

      ~~~shell
      npm install @react-spectre/media --save
      ~~~

      ## Usage

      ~~~js
      import { Media } from '@react-spectre/media'
      ~~~

      **[Complete documentation](https://github.com/react-spectre/react-spectre/tree/master/packages/media)**
    `)(() => (
      <div style={{ borderRight: '#333 solid 1px', width: 401 }}>
        <br />
        <Image src="http://via.placeholder.com/450x100?text=default" />
        <br />
        <br />
        <Image
          responsive
          src="http://via.placeholder.com/450x100?text=responsive"
        />
        <br />
        <br />
        <Image
          style={{ background: '#a22', width: 300, height: 100 }}
          src="http://via.placeholder.com/450x100?text=default"
        />
        <br />
        <br />
        <Image
          contain
          style={{ background: '#a22', width: 300, height: 100 }}
          src="http://via.placeholder.com/450x100?text=contain"
        />
        <br />
        <br />
        <Image
          cover
          style={{ background: '#a22', width: 300, height: 100 }}
          src="http://via.placeholder.com/450x100?text=cover"
        />
        <br />
        <br />
        <Figure caption="Caption figure">
          <Image
            responsive
            src="http://via.placeholder.com/450x100?text=inside figure"
          />
        </Figure>
        <br />
        <br />
        <Figure caption="Caption figure" captionAlignment="center">
          <Image
            responsive
            src="http://via.placeholder.com/450x100?text=inside figure"
          />
        </Figure>
        <br />
        <br />
        <Figure caption="Caption figure" captionAlignment="right">
          <Image
            responsive
            src="http://via.placeholder.com/450x100?text=inside figure"
          />
        </Figure>
        <br />
        <br />
        <Video.Container>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/BzMLA8YIgG0"
          />
        </Video.Container>
        <br />
        <br />
        <Video.Container responsive>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/BzMLA8YIgG0"
          />
        </Video.Container>
        <br />
        <br />
        <Video.Container responsive="4:3">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/BzMLA8YIgG0"
          />
        </Video.Container>
        <br />
        <br />
        <Video.Container responsive="1:1">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/BzMLA8YIgG0"
          />
        </Video.Container>
      </div>
    ))
  )
}
