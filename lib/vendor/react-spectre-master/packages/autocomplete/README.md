<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/autocomplete`
React components for Spectre.css autocomplete element.

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/autocomplete
```

```shell
npm install @react-spectre/autocomplete --save
```

<br>

## Usage

### Autocomplete

Autocomplete form component provides suggestions while you type. It is often used for tags and contacts input.

The component does NOT include JavaScript code, you will need to implement your JS to interact with the autocomplete. Nevertheless [here's](assets/js_autocomplete.js) an example with JS.

```js
import { Autocomplete, Input, Menu } from '@react-spectre/autocomplete'
```

```jsx
<Autocomplete>
  <Autocomplete.Input focus>
    <div className="chip">
      <img className="avatar avatar-sm" alt="Thor Odinson" />
      Thor Odinson
      <a href="#" className="btn btn-clear" aria-label="Close" role="button" />
    </div>

    <input className="form-input" type="text" placeholder="typing here" />
  </Autocomplete.Input>
  <Autocomplete.Menu>
    <li className="menu-item">
      <a href="#">
        <div className="tile tile-centered">
          <div className="tile-icon">
            <img className="avatar avatar-sm" alt="Steve Rogers" />
          </div>
          <div className="tile-content">
            Steve Rogers
          </div>
        </div>
      </a>
    </li>
  </Autocomplete.Menu>
</Autocomplete>
```

> **Note:** The main component is `Autocomplete`, other component can be accessed through it, for example: `Autocomplete.Input` or `Autocomplete.Menu`.

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
