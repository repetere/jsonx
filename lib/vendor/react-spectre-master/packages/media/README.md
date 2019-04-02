<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/media`
React components for Spectre.css's media elements

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/media
```

```shell
npm install @react-spectre/media --save
```

<br><br><br>

## Usage

### Media

There are 4 components used for media elements: `Image`, `Figure`, `Video` and `Container`<sup>1</sup>.

```js
import { Image, Figure, Video, Container } from '@react-spectre/media'
```

**Notes:** <sup>1</sup> `Container` is an alias for `Video.Container`.

### Image

An `Image` can have different styling using `responsive`, `contain` and `cover` props.

```jsx
<Image src="..." />
<Image src="..." responsive />
<Image src="..." contain />
<Image src="..." cover />
```

### Figure

An `Image` can be rendered inside a `Figure`.

```jsx
<Figure caption="A cool picture" captionAlignment="center">
  <Image src="..." />
</Figure>
```

The `captionAlignment` can have one of the following values: `left`, `center` or `right`.

### Video

A `Video` can have different aspect ratio using `responsive` prop.

```jsx
<Video responsive /> // Defaults is "16:9"
<Video responsive="1:1" />
<Video responsive="4:3" />
```

The `responsive` prop can have one fo the following values: `1:1`, `4:3` or `16:9`.

### Container

A `Video` or `<iframe />` can be rendered inside a `Container`.

```jsx
<Video.Container responsive> 
  <iframe src="https://www.youtube.com/embed/BzMLA8YIgG0" />
</Video.Container>
```

The `responsive` prop can have one fo the following values: `1:1`, `4:3` or `16:9`.

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
