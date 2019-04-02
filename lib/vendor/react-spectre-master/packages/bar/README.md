<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/bar`
React components for Spectre.css's bar

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/bar
```

```shell
npm install @react-spectre/bar --save
```

<br><br><br>

## Usage

There are 2 components used for bar: `Bar` and `Slider`.

```js
import { Bar, Slider } from '@react-spectre/bar'
```

### Bar

```jsx
<Bar progress={20}>

<Bar>
  <Bar.Item progress={20} />
</Bar>

<Bar>
  <Bar.Item progress={20} />
  <Bar.Item progress={20} />
</Bar>
```

### Slider

```jsx
<Slider progress={20}>

<Slider>
  <Slider.Item progress={20} />
</Slider>

<Slider>
  <Slider.Item progress={20} />
  <Slider.Item progress={20} />
</Slider>
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
