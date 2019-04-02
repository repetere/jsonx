<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/badge`
React components for Spectre.css's badges.

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/badge
```

```shell
npm install @react-spectre/badge --save
```

<br><br><br>

## Usage
### Badges

There is 1 single component used for badges: `Badge`.

```js
import { Badge } from '@react-spectre/badge'
```

Badges are used as wrapper components with the label property (this property is optional, badge will appear empty if the label is not specified). You can use badge for span, buttons and figures.

```jsx
<Badge label={1}>
  <span>Notifications</span>
</Badge>
    
<Badge label={2}>
  <Button>Badge Button</Button>
</Badge>
  
<Badge label={11}>
  <Figure className="avatar">
    <Image
      responsive
      src="https://picturepan2.github.io/spectre/img/avatar-1.png"
    />
  </Figure>
</Badge>
```


<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
