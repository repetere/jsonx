<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/icon`
React components for Spectre.css's icons.

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/icon
```

```shell
npm install @react-spectre/icon --save
```

<br><br><br>

## Usage

### Icons

There is 1 single component used for icons: `Icon`.

```js
import { Icon } from '@react-spectre/icon'
```

### Icon set

The `Icon` component only have one require property: `name`. The name should be one from [the Spectre.css icon set](https://picturepan2.github.io/spectre/elements.html#icons). For example, if we want to use the `icon-forward` we use the name after the `icon-` as shown:

```jsx
<Icon name="forward" />
```

### Icon Sizes

The `Icon` component can have 3 different sizes using the `size` prop:

```jsx
<Icon name="mail" size="2x" /> // 32px
<Icon name="mail" size="3x" /> // 48px
<Icon name="mail" size="4x" /> // 64px
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
