import { configure } from '@storybook/react'
import { setDefaults } from '@storybook/addon-info'

setDefaults({
  inline: false
})

// automatically import all files ending in *.stories.js
const req = require.context('../packages/storybook/stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
