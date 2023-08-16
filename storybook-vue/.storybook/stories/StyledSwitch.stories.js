import { automateStoriesFromProps, disableArgs } from '../utils'
import StyledSwitch from '../../src/components/styled-switch/medistream.vue'

const componentName = StyledSwitch.__docgenInfo.displayName
const initialTemplate = `<${componentName} v-bind="args"/>`
const { Playground, flag } = automateStoriesFromProps(StyledSwitch, initialTemplate)

const ownArgTypes = {
  // flag: {
  //     control: {
  //         type: 'radio',
  //     },
  //     options: [true, false]
  // }
}
Playground.args = {
  flag: true
}

flag.args = {
  flag: true
}

disableArgs([flag], StyledSwitch)

export { Playground, flag }

export default {
  title: 'Controls/StyledSwitch',
  component: StyledSwitch,
  argTypes: { ...ownArgTypes }
}
