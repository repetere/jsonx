<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/accordion`
React components for Spectre.css accordion element.

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/accordion
```

```shell
npm install @react-spectre/accordion --save
```

<br>

## Usage

### Accordion

Accordions are used to toggle sections of content.

```js
import { Accordion, Header, Body } from '@react-spectre/accordion'
```

```jsx
<Accordion>
  <Accordion.Header id="acc-1">Element</Accordion.Header>
  <Accordion.Body>
    <ul className="menu menu-nav">
      <li className="menu-item">
        <a href="#accordions">Element 1</a>
      </li>
      <li className="menu-item">
        <a href="#accordions">Element 2</a>
      </li>
    </ul>
  </Accordion.Body>
</Accordion>
<Accordion>
  <Accordion.Header id="acc-2">Layout</Accordion.Header>
  <Accordion.Body>
    <ul className="menu menu-nav">
      <li className="menu-item">
        <a href="#accordions">Layout 1</a>
      </li>
      <li className="menu-item">
        <a href="#accordions">Layout 2</a>
      </li>
    </ul>
  </Accordion.Body>
</Accordion>
<Accordion>
  <Accordion.Header id="acc-3">Component</Accordion.Header>
  <Accordion.Body>
    <ul className="menu menu-nav">
      <li className="menu-item">
        <a href="#accordions">Component 1</a>
      </li>
      <li className="menu-item">
        <a href="#accordions">Component 2</a>
      </li>
    </ul>
  </Accordion.Body>
</Accordion>
```

> **Note:** The main component is `Accordion`, other component can be accessed through it, for example: `Accordion.Header` or `Accordion.Body`.


<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
