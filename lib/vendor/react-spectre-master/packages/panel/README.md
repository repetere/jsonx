<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/panel`
React components for Spectre.css's panel

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/panel
```

```shell
npm install @react-spectre/panel --save
```

<br><br><br>

## Usage

### Panels

Panels are flexible view container with auto-expand content section.

```js
import { Panel } from '@react-spectre/panel'
```

```jsx
<Panel>
  <Panel.Header>
    <Panel.Title h6>Comments</Panel.Title>
  </Panel.Header>
   
  <Panel.Body>...</Panel.Body>

   
  <Panel.Footer>...</Panel.Footer>
</Panel>
```

> **Note:** The main component is `Panel`, other component can be accessed through it, for example: `Panel.Header`, `Panel.Title`, `Panel.Nav`, `Panel.Body`, `Panel.Footer`.

#### Header

You can set text align.

```jsx
<Panel.Header center>...</Panel.Header>
<Panel.Header right>...</Panel.Header>
```

##### Title
You can set headings.

```jsx
<Panel.Title h6>Comments</Panel.Title>
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
