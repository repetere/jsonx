<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/card`
React components for Spectre.css's card.

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/card
```

```shell
npm install @react-spectre/card --save
```

<br><br><br>

## Usage

### Cards

Cards are flexible content containers.

```js
import { Card } from '@react-spectre/card'

```

```jsx
<Card>
  <Card.Image src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" />
    
  <Card.Header>
    <Card.Title h2>Microsoft</Card.Title>
    <Card.SubTitle>Software and hardware</Card.SubTitle>
  </Card.Header>
    
  <Card.Body>
    Empower every person and every organization on the planet to
    achieve more.
  </Card.Body>
    
  <Card.Footer>
    <Button primary>Do</Button>
  </Card.Footer>
</Card>
```

> **Note:** The main component is `Card`, other component can be accessed through it, for example: `Card.Header`, `Card.Title`, `Card.Body`, `Card.Footer`.

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
