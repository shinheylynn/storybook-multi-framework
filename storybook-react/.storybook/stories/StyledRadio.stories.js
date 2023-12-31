import { StyledRadio } from '../../../src/components/styled-radio/moreden.jsx';
import { automateStoriesFromProps } from '../../../src/utils/automateStorybook.jsx';

const { Playground, value, Val, Width: WidthHeight } = automateStoriesFromProps(StyledRadio);

const ownArgTypes = {
  value: {
    description: 'value와 Val이 같을 때 선택됩니다.',
    name: 'value',
  },
  Val: {
    name: 'Val',
  },
  Name: {
    control: false,
    table: {
      disable: true,
    },
  },
  input: {
    control: false,
    table: {
      disable: true,
    },
  },
  Disabled: {
    control: false,
    table: {
      disable: true,
    },
  },
  isDark: {
    control: false,
    table: {
      disable: true,
    },
  },
  onChange: {
    control: false,
    table: {
      disable: true,
    },
  },
};

Playground.args = {
  value: 'value',
  modelValue: 'value',
  Val: 'different value',
  Width: 40,
  Height: 40,
  Disabled: false,
};

value.args = {
  value: 'value',
  Val: 'different value',
};

value.argTypes = {
  ...value.argTypes,
  Val: {
    table: {
      disable: false,
    },
  },
};

Val.args = {
  value: 'value',
  Val: 'different value',
};

Val.argTypes = {
  ...Val.argTypes,
  Val: {
    table: {
      disable: false,
    },
  },
};

WidthHeight.args = {
  Width: 50,
  Height: 50,
};

WidthHeight.argTypes = {
  ...WidthHeight.argTypes,
  Height: {
    table: {
      disable: false,
    },
  },
  Val: {
    table: {
      disable: false,
    },
  },
  value: {
    table: {
      disable: false,
    },
  },
};

export { Playground, value, Val, WidthHeight };

export default {
  title: 'Moreden/StyledRadio',
  component: StyledRadio,
  argTypes: {
    ...ownArgTypes,
    Disabled: {
      control: 'boolean',
      name: 'Disabled',
    },
  },
};
