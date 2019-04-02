<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/avatar`
React components for Spectre.css avatar element.

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/avatar
```

```shell
npm install @react-spectre/avatar --save
```

<br>

## Usage

### Avatar

Avatars are user profile pictures.

```js
import { Avatar, Presence, Icon } from '@react-spectre/avatar'
```

```jsx
<Avatar src="img/avatar-1.png" icon />
```

```jsx
<Avatar src="assets/react-spectre-logo.png" lg>
  <Avatar.Icon src="img/avatar-2.png" />
</Avatar>
```

```jsx
<Avatar initial={'YZ'} style={{ backgroundColor: '#5755d9' }} xl>
  <Avatar.Presence online />
</Avatar>
```

> **Note:** The main component is `Avatar`, other component can be accessed through it, for example: `Avatar.Presence` and `Avatar.Icon`.


<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
