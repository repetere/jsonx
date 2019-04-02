<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/navbar`
React components for Spectre.css's navigation bar

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/navbar
```

```shell
npm install @react-spectre/navbar --save
```

<br>

## Usage

### Navbar

Navbar is a layout container that appears in the header of apps and websites.

```js
import { Navbar, Brand, Section } from '@react-spectre/navbar'
```

```jsx
<Navbar>
    <Navbar.Section>
        <Navbar.Brand>MyAwesomeBrand</Navbar.Brand>
        <a href="#" className="btn btn-link">Docs</a>
        <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
    </Navbar.Section>
    <Navbar.Section>
        <div className="input-group input-inline">
              <input className="form-input" type="text" placeholder="search"/>
        </div>
    </Navbar.Section>
</Navbar>
```

> **Note:** The main component is `Navbar`, other component can be accessed through it, for example: `Navbar.Section` and `Navbar.Brand`.

### Section

The navbar component can include logo brand, nav links and buttons, search box or any combination of those elements. Each section with the navbar-section className will be evenly distributed in the container.

The `Section` components provide a `center` props in case you want to center the elements inside the section.

```jsx
<Navbar>
    <Navbar.Section center>
        <Navbar.Brand>MyAwesomeBrand</Navbar.Brand>
        <a href="#" className="btn btn-link">Docs</a>
        <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
    </Navbar.Section>
</Navbar>
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
