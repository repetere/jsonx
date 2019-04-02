<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/typography`
React components for Spectre.css's typography

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/typography
```

```shell
npm install @react-spectre/typography --save
```

<br><br><br>

## Usage

### Headings

There are 7 components used for headings. `H1`-`H6` for headings from level 1 to 6 and `Label` to add a label inside any `H1`-`H6`.

```js
import { H1, H2, H3, H4, H5, H6, Label } from '@react-spectre/typography'
```

Headings can have contents by passing children components or setting the `contents` prop:

```jsx
<H1>Viewing all users</H1>
<H1 contents="Viewing all users" />
```

A label can be added to a `Heading` using the `label` prop:

```jsx
<H1 contents="Viewing all users" label="(185 in total)" />

// The following is an alternative to render the same.
<H1 label="(185 in total)">Viewing all users</H1>

// The following is another alternative to render the same.
<H1>
  Viewing all users
  <H1.Label>(185 in total)</H1.Label>
</H1>

// And this one too.
<H1>
  Viewing all users
  <H1.Label contents="(185 in total)" />
</H1>
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
