import { storiesOf } from '@storybook/react'

import typography from './elements/typography'
import table from './elements/table'
import button from './elements/button'
import form from './elements/form'
import icon from './elements/icon'
import label from './elements/label'
import media from './elements/media'

import grid from './layout/grid'
import navbar from './layout/navbar'

import accordion from './components/accordion'
import autocomplete from './components/autocomplete'
import avatar from './components/avatar'
import badge from './components/badge'
import bar from './components/bar'
import step from './components/step'
import tab from './components/tab'
import tile from './components/tile'
import toast from './components/toast'
import card from './components/card'
import popover from './components/popover'
import panel from './components/panel'

const elementStories = storiesOf('Elements', module)
const layoutStories = storiesOf('Layout', module)
const componentsStories = storiesOf('Components', module)

// Elements Stories
typography(elementStories)
button(elementStories)
table(elementStories)
form(elementStories)
icon(elementStories)
label(elementStories)
media(elementStories)

// Layout Stories
grid(layoutStories)
navbar(layoutStories)

// Components Stories
accordion(componentsStories)
autocomplete(componentsStories)
avatar(componentsStories)
badge(componentsStories)
bar(componentsStories)
step(componentsStories)
toast(componentsStories)
tab(componentsStories)
tile(componentsStories)
card(componentsStories)
popover(componentsStories)
panel(componentsStories)
