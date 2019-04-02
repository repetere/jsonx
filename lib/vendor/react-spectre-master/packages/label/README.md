<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/label`
React components for Spectre.css's label

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/label
```

```shell
npm install @react-spectre/label --save
```

<br><br><br>

## Usage

### Label

There is one single component used for labels: `Label`.

```js
import { Label } from '@react-spectre/label'
```

#### Colors

A Label can have 5 different color using props: `primary`, `secondary`, `success`, `warning` and `error`.

```jsx
<Label primary>primary</Label>
<Label secondary>secondary</Label>
<Label success>success</Label>
<Label warning>warning</Label>
<Label error>error</Label>
```

#### Rounded

A Label can have rounded corner using the `rounded` prop

```jsx
<Label rounded>rounded</Label>
<Label rounded primary>rounded primary</Label>
```

#### Small

A Label can be rendered in a `<small />` element.

```jsx
<Label small>small</Label>
<Label small primary>small primary</Label>
<Label small primary rounded>small primary rounded</Label>
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
