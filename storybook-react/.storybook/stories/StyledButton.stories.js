import React from 'react';
import { StyledButton } from '../../../src/components/styled-button/moreden.jsx';
import { automateStoriesFromProps } from '../../../src/utils/automateStorybook.jsx';

const { Playground, size, width, color, outlined, disabled, loading } = automateStoriesFromProps(StyledButton);

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

// Prop 값 타입과 입력 UI 를 정의합니다.
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

export { Playground, size, width, color, outlined, disabled, loading };

export default {
  title: 'Moreden/StyledButton',
  component: StyledButton,
  argTypes: { ...ownArgTypes },
};
