<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/step`

React components for Spectre.css's steps

<br><br><br>

</div>

## Installation

```shell
yarn add @react-spectre/step
```

```shell
npm install @react-spectre/step --save
```

<br><br><br>

## Usage

```js
import { Step } from '@react-spectre/step'
```

```jsx
<Step>
  <Step.Item>
    <a href="#" className="tooltip" data-tooltip="Step 1">
      Step 1
    </a>
  <Step.Item>
  // Pass the 'active' property in order to set this step as the current one selected.
  <Step.Item active>
    <a href="#" className="tooltip" data-tooltip="Step 2">
      Step 2
    </a>
  <Step.Item>
</Step>
```

<div align=center>
<br><br><br>

Made with :heart: by [Cesar Contreras](https://github.com/ccontreras).

[MIT License](LICENSE)

</div>
