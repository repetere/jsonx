<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/typography`

React components for Spectre.css's typography

<br><br><br>

</div>

## Installation

```shell
yarn add @react-spectre/tab
```

```shell
npm install @react-spectre/tab --save
```

<br><br><br>

## Usage

```js
import { Tab, Label } from '@react-spectre/tab'
```

To use the `Tab` component just add it to your component's render method. And add `Tab.Item` as child elements. You can pass the `block` property to the `Tab` component for a full-width tab. The `Tab.Item` with `active` prop or its child `Label` with the active prop will be highlighted.

```jsx
<Tab block>
  <Tab.Item active>
    <Label>Music</Label>
  </Tab.Item>
  <Tab.Item>
    <Label active>Playlists</Label>
  </Tab.Item>
  <Tab.Item>
    <Label>Radio</Label>
  </Tab.Item>
  <Tab.Item>
    <Label>Connect</Label>
  </Tab.Item>
</Tab>
```

If you need badges on tabs, you can add badge class to the element within tab-item.

```jsx
<Tab block>
  <Tab.Item active>
    <Label badge="100">Music</Label>
  </Tab.Item>
</Tab>
```

You could add a search box or buttons inside a tab. Pass the `action` prop to the `Tab.Item`.

```jsx
<Tab>
  <Tab.Item active>
    <Label>
      Music
    </Label>
  </Tab.Item>
  <Tab.Item action>
    <div class="input-group input-inline">
      <input class="form-input input-sm" type="text" placeholder="search">
      <button class="btn btn-primary btn-sm input-group-btn">Search</button>
    </div>
  </Tab.Item>
</Tab>
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
