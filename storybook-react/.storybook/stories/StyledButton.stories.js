import React from 'react';
import { StyledButton } from '../../../src/components/styled-button/moreden.jsx';
import { automateStoriesFromProps } from '../../../src/utils/automateStorybook.jsx';

const { Playground, size, width, color, outlined, disabled, loading } = automateStoriesFromProps(StyledButton);

const ownArgTypes = {
  width: {
    control: {
      type: 'number',
    },
  },
  size: {
    control: {
      type: 'inline-radio',
    },
    options: ['x-small', 'small', 'medium', 'large', 'x-large'],
  },
  color: {
    control: {
      type: 'inline-radio',
    },
    options: ['primary', 'secondary', 'grey', 'yellow'],
  },
  outlined: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  loading: {
    control: {
      type: 'boolean',
    },
  },
  Type: {
    control: {
      type: 'inline-radio',
    },
    options: ['button', 'submit', 'reset'],
  },
};

Playground.args = {
  width: 'auto',
  size: 'medium',
  color: 'primary',
  outlined: false,
  disabled: false,
  loading: false,
};

size.args = {
  size: 'x-large',
};

width.args = {
  width: 200,
};

color.args = {
  color: 'secondary',
};

outlined.args = {
  outlined: true,
};

disabled.args = {
  disabled: true,
};

loading.args = {
  loading: true,
};

export { Playground, size, width, color, outlined, disabled, loading };

export default {
  title: 'Moreden/StyledButton',
  component: StyledButton,
  argTypes: { ...ownArgTypes },
};
