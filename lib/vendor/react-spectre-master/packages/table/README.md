<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/table`
React components for Spectre.css's table.

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/table
```

```shell
npm install @react-spectre/table --save
```

<br><br><br>

## Usage

### Table

There are 6 components exported for tables: `Table`, `Header` (thead), `Body` (tbody), `Row` (tr), `Heading` (th) and `Cell` (td).

```js
import { Table, Header, Body, Row, Heading, Cell } from '@react-spectre/table'
```

> **Note:** The main component is `Table`, other component can be accessed through `Table` for example: `Table.Header`, `Table.Body`, `Table.Row`, etc...

#### Example

```jsx
<Table striped hover scroll>
  <Header>
    <Row>
      <Heading>Name</Heading>
      <Heading>Age</Heading>
      <Heading>Is admin?</Heading>
    </Row>
  </Header>
  <Body>
    <Row active>
      <Cell>Rubens</Cell>
      <Cell>98</Cell>
      <Cell>Yes</Cell>
    </Row>
  </Body>
</Table>
```

Tables can have 2 different style decorators: `striped` and `hover`.

```jsx
<Table></Table>
<Table striped></Table>
<Table hover></Table>
<Table hover striped></Table>
```

#### Rows

Table rows can be marked as active using: `active` prop:

```jsx
<Table>
  <Body>
    <Row></Row>
    <Row active></Row>
  </Body>
<Table>
```

#### Scroll

A table can have horizontal scroll using the `scroll` props:

```jsx
<Table scroll></Table>
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
