<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/tile`
React components for Spectre.css's tile

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/tile
```

```shell
npm install @react-spectre/tile --save
```

<br><br><br>

## Usage

### Tiles


```js
import { Tile } from '@react-spectre/tile'
```

```jsx
<Tile>
  <Tile.Icon>
    <Avatar lg>
      <Image
        responsive
        src="https://picturepan2.github.io/spectre/img/avatar-3.png"
      />
    </Avatar>
  </Tile.Icon>
    
  <Tile.Content>
    <Tile.Title>The Avengers</Tile.Title>
    <Tile.SubTitle className="text-gray">
      Earth's Mightiest Heroes joined forces to take on threats
      that were too big for any one hero to tackle...
    </Tile.SubTitle>
  </Tile.Content>
    
  <Tile.Action>
    <Button primary>Join</Button>
  </Tile.Action>
</Tile>
```

> **Note:** The main component is `Tile`, other component can be accessed through it, for example: `Tile.Icon`, `Tile.Content`, `Tile.Title`, `Tile.SubTitle`, `Tile.Action`.


<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
