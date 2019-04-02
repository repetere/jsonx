<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/popover`

React components for Spectre.css's popover

<br><br><br>

</div>

## Installation

With yarn

```shell
yarn add @react-spectre/popover
```

Or with npm

```shell
npm install @react-spectre/popover --save
```

<br><br><br>

## Usage

Import the components.

```js
import { Popover, Container } from '@react-spectre/popover'
```

**NOTE:** The `Container` component is optional. You can also get it from the `Popover` component itself like this: `Popover.Container`.

In JSX

```jsx
<Popover>
  <Button primary>This is my popover</Button>
  <Popover.Container>This is my popover text</Popover.Container>
</Popover>
```

## Positioning

You can pass the desired position for the popover as props for the `Popover` component. These props corresponds to `right`, `bottom`, `left`. By default, if no positioning props are passed, the popover will appear on top.

```jsx
// Top (default)
<Popover>
  ...
</Popover>

// Right
<Popover right>
  ...
</Popover>

// Left
<Popover left>
  ...
</Popover>

// Bottom
<Popover bottom>
  ...
</Popover>
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
