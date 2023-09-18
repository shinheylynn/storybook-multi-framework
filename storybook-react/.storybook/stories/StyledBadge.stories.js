import React from 'react';
import { StyledBadge } from '../../../src/components/styled-badge/moreden.jsx';
import { automateStoriesFromProps } from '../../../src/utils/automateStorybook.jsx';

const { Playground, color, size, shape, rounded } = automateStoriesFromProps(StyledBadge);

const ownArgTypes = {
  size: {
    control: {
      type: 'inline-radio',
    },
    options: ['x-small', 'small', 'medium', 'large', 'x-large'],
  },
  shape: {
    control: {
      type: 'inline-radio',
    },
    options: ['embossed', 'engraved', 'outlined'],
  },
};

Playground.args = {
  size: 'x-large',
  shape: 'outlined',
  rounded: false,
};

color.args = {
  color: '#1d77ff',
};
size.args = {
  size: 'x-large',
};
shape.args = {
  shape: 'outlined',
};
rounded.args = {
  rounded: true,
};

export { Playground, color, size, shape, rounded };

export default {
  title: 'Moreden/StyledBadge',
  component: StyledBadge,
  argTypes: { ...ownArgTypes },
};
