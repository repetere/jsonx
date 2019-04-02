<div align=center>
<img src=".github/react-spectre-logo.png" width="256" height="256">

# react-spectre
React components for Spectre.css - a Lightweight, Responsive and Modern CSS Framework

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Build Status](https://travis-ci.org/react-spectre/react-spectre.svg?branch=master)](https://travis-ci.org/react-spectre/react-spectre)

<br><br><br>
</div>

<div align=center>

# This project is under development.
## Not ready for production use.
### [Check the roadmap](#roadmap)

</div>

<br><br><br>

## Packages

### Elements

 Package | Size (min+gzip) <sup>1</sup> | Components 
 :------ | :--------------------------- | :---------
 ||
 [**Elements**](packages/elements) | **<!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/elements/dist/elements.umd.js) -->3.98 kB<!-- /markdown-exec -->** | **Contains all subsequent elements packages.**
 ||
 [**Typography**](packages/typography) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/typography/dist/typography.umd.js) -->1.67 kB<!-- /markdown-exec --> | `H1`, `H2`, `H3`, `H4`, `H5`, `H6`, `Label`.
 [**Table**](packages/table) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/table/dist/table.umd.js) -->1.67 kB<!-- /markdown-exec --> | `Table`, `Header`, `Body`, `Row`, `Heading`, `Cell`.
 [**Button**](packages/button) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/button/dist/button.umd.js) -->1.74 kB<!-- /markdown-exec --> | `Button`, `Group`.
 [**Form**](packages/form) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/form/dist/form.umd.js) -->1.82 kB<!-- /markdown-exec --> | `FormGroup`, `Input`, `TextArea`, `Select`, `Radio`, `CheckBox`, `Switch`.
 [**Icon**](packages/icon) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/icon/dist/icon.umd.js) -->1.49 kB<!-- /markdown-exec --> | `Icon`.
 [**Label**](packages/label) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/label/dist/label.umd.js) -->1.6 kB<!-- /markdown-exec --> | `Label`.
 [**Media**](packages/media) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/media/dist/media.umd.js) -->1.82 kB<!-- /markdown-exec --> | `Image`, `Figure`, `Video`, `Container`.

### Layout

 Package | Size (min+gzip) <sup>1</sup> | Components 
 :------ | :--------------------------- | :---------
 ||
 [**Layout**](packages/layout) | **<!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/layout/dist/layout.umd.js) -->2.07 kB<!-- /markdown-exec -->** | **Contains all subsequent layout packages.**
 ||
 [**Grid**](packages/grid) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/grid/dist/grid.umd.js) -->1.77 kB<!-- /markdown-exec --> | `Grid`, `Row`, `Col`.
 [**Navbar**](packages/navbar) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/navbar/dist/navbar.umd.js) -->1.59 kB<!-- /markdown-exec --> | `Navbar`, `Section`, `Brand`.


### Components

 Package | Size (min+gzip) <sup>1</sup> | Components
 :------ | :--------------------------- | :---------
 ||
 [**Components**](packages/components) | **<!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/components/dist/components.umd.js) -->3.11 kB<!-- /markdown-exec -->** | **Contains all subsequent components packages.**
 ||
 [**Accordion**](packages/accordion) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/accordion/dist/accordion.umd.js) -->1.6 kB<!-- /markdown-exec --> | `Accordion`, `Header`, `Body`.
 [**Autocomplete**](packages/autocomplete) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/autocomplete/dist/autocomplete.umd.js) -->1.58 kB<!-- /markdown-exec --> | `Autocomplete`, `Input`, `Menu`.
 [**Avatar**](packages/avatar) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/avatar/dist/avatar.umd.js) -->1.75 kB<!-- /markdown-exec --> | `Avatar`, `Icon`, `Presence`.
 [**Badge**](packages/badge) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/badge/dist/badge.umd.js) -->1.4 kB<!-- /markdown-exec --> | `Badge`.
 [**Bar**](packages/bar) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/bar/dist/bar.umd.js) -->1.75 kB<!-- /markdown-exec --> | `Bar`, `Slider`.
 [**Toast**](packages/toast) | <!-- markdown-exec(cmd:./node_modules/.bin/gzip-size ./packages/toast/dist/toast.umd.js) -->1.62 kB<!-- /markdown-exec --> | `Toast`.

**Note:** <sup>1</sup> the gzipped size of the UMD build.

<br><br><br>

## Development

It is recommended to use `yarn` for easy development.

### Setup

 1. `yarn` or `npm install`
 2. `yarn lerna -- bootstrap` o `npm run lerna -- bootstrap`

### Creating a new package

**The script way**:

```shell
yarn package:create -- <name-of-package>
```

**The manual way**:

  1. Create a directory inside [`packages`](packages).
  2. Copy [`LICENSE`](packages/typography/LICENSE) file from another package.
  3. Copy [`README.md`](packages/typography/README.md) file from another package and modify it.
  4. Copy [`assets`](packages/typography/assets) directory from another package.
  5. Run `yarn init` or `npm package` (don't worry for the version, it will be overriden on publishing).
  6. Modify the `package.json` file and add `{ "publishConfig": { "access": "public" } }` (this allow the package to be published with lerna as scoped package).


<br><br><br>

## Roadmap

  - **Elements**
    - [x] Typography
    - [x] Tables
    - [x] Buttons
    - [x] Forms
    - [x] Icons
    - [x] Labels
    - [ ] ~Code~
    - [x] Media

  - **Layout**
    - [x] Flexbox Grid
    - [x] Responsive
    - [x] Navbar

  - **Components**
    - [x] Accordions
    - [x] Autocomplete
    - [x] Avatars
    - [x] Badges
    - [x] Bars
    - [ ] Breadcrumbs - [View issue](https://github.com/react-spectre/react-spectre/issues/9)
    - [x] Cards
    - [ ] Chips - [View issue](https://github.com/react-spectre/react-spectre/issues/11)
    - [ ] Empty states - [View issue](https://github.com/react-spectre/react-spectre/issues/12)
    - [ ] Menus - [View issue](https://github.com/react-spectre/react-spectre/issues/13)
    - [ ] Modals - [View issue](https://github.com/react-spectre/react-spectre/issues/14)
    - [ ] Navs - [View issue](https://github.com/react-spectre/react-spectre/issues/15)
    - [ ] Pagination - [View issue](https://github.com/react-spectre/react-spectre/issues/16)
    - [x] Panels
    - [ ] Popovers - [View issue](https://github.com/react-spectre/react-spectre/issues/18)
    - [x] Steps
    - [ ] Tabs - [View issue](https://github.com/react-spectre/react-spectre/issues/20)
    - [ ] Tiles - [View issue](https://github.com/react-spectre/react-spectre/issues/21)
    - [x] Toasts
    - [ ] Tooltips - [View issue](https://github.com/react-spectre/react-spectre/issues/23)

  - **Utilities**:
    - [ ] ~Colors~
    - [ ] ~Cursors~
    - [ ] ~Display~
    - [ ] Divider - [View issue](https://github.com/react-spectre/react-spectre/issues/24)
    - [ ] Loading - [View issue](https://github.com/react-spectre/react-spectre/issues/25)
    - [ ] ~Position~
    - [ ] ~Shapes~
    - [ ] ~Text~

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
