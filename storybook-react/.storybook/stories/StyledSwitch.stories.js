import React from 'react';
import { StyledSwitch } from '../../../src/components/styled-switch/medistream.jsx';
import { automateStoriesFromProps } from '../../../src/utils/automateStorybook.jsx';

const { Playground, flag } = automateStoriesFromProps(StyledSwitch);

const ownArgTypes = {
  // flag: {
  //     control: {
  //         type: 'radio',
  //     },
  //     options: [true, false]
  // }
};

Playground.args = {
  flag: true,
};

flag.args = {
  flag: true,
};

export { Playground, flag };

export default {
  title: 'Controls/StyledSwitch',
  component: StyledSwitch,
  argTypes: { ...ownArgTypes },
};