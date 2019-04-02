<div align=center>
<img src="assets/react-spectre-logo.png" width="256" height="256">

# `@react-spectre/form`
React components for Spectre.css's form.

<br><br><br>
</div>

## Installation

```shell
yarn add @react-spectre/form
```

```shell
npm install @react-spectre/form --save
```

<br><br><br>

## Usage

### Form

There are 7 components exported for form: `FormGroup`, `Input`, `TextArea`, `Select`, `Radio`, `CheckBox` and `Switch`.

```js
import { FormGroup, Input, TextArea, Select, Radio, CheckBox, Switch } from '@react-spectre/form'
```

#### FormGroup

A form group is a wrapper for form controls.

```jsx
<FormGroup label="Name">
  <Input />
</FormGroup>
```

#### Input

```jsx
<Input />              // Default type="text"
<Input type="email" />
```

#### TextArea

```jsx
<TextArea />
<TextArea rows="3" />
```

#### Select

```jsx
<Select>
  <option>Choose an option</option>
  <option>Slack</option>
  <option>Skype</option>
  <option>Hipcat</option>
</Select>

<Select multiple>
  <option>Choose an option</option>
  <option>Slack</option>
  <option>Skype</option>
  <option>Hipcat</option>
</Select>
```

#### Radio

```jsx
<FormGroup label="Genre">
  <Radio label="Male"   name="genre" defaultChecked>
  <Radio label="Female" name="genre">
</FormGroup>
```

#### CheckBox

```jsx
<FormGroup>
  <CheckBox label="Remember me">
  <CheckBox label="Remember me" defaultChecked>
</FormGroup>
```

#### Switch

```jsx
<FormGroup>
  <Switch label="Send me emails with news and tips">
  <Switch label="Send me emails with news and tips" defaultChecked>
</FormGroup>
```

<div align=center>
<br><br><br>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT License](LICENSE)

</div>
