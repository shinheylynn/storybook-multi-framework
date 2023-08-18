import React from 'react';
import { StyledSwitch } from '../../../src/components/styled-switch/medistream.jsx';
import { automateStoriesFromProps } from '../../../src/utils/automateStorybook.jsx';

const { Playground, flag } = automateStoriesFromProps(StyledSwitch);

const ownArgTypes = {
  flag: {
    control: {
      type: 'boolean',
    },
  },
};

Playground.args = {
  flag: true,
};

flag.args = {
  flag: true,
};

export { Playground, flag };

export default {
  title: 'Moreden/StyledSwitch',
  component: StyledSwitch,
  argTypes: { ...ownArgTypes },
};
