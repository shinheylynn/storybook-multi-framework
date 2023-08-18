import { automateStoriesFromProps, disableArgs } from '../../../src/utils';
import StyledSelect from '../../../src/components/styled-select/medistream.vue';

const componentName = StyledSelect.__docgenInfo.displayName;
const initialTemplate = `<${componentName} v-bind="args"></${componentName}>`;
const { Playground, Name, Label, Options, PlaceHolder, Disabled, IsRequired, MaxHeight, ForceDesktopStyle } =
  automateStoriesFromProps(StyledSelect, initialTemplate);

const ownArgTypes = {
  value: {
    name: 'value (v-model)',
    defaultValue: 1,
  },
  Label: {
    defaultValue: '라벨 위치',
  },
  Name: {
    defaultValue: 'Sample Name',
  },
  PlaceHolder: {
    defaultValue: '플레이스 홀더 위치',
  },
  Options: {
    defaultValue: [
      {
        value: 1,
        text: 'Options는 선택할 수 있는 데이터입니다.',
      },
      {
        value: 2,
        text: 'Options는 string 배열 또는 object 배열이 올 수 있습니다.',
      },
      {
        value: 3,
        text: '선택되는 옵션의 value 값에 따라 v-model 값도 변합니다.',
      },
      {
        value: 4,
        text: 'v-model 값이 변하면 선택되는 옵션도 변합니다.',
      },
    ],
  },
  Disabled: {
    defaultValue: false,
  },
  IsRequired: {
    defaultValue: true,
  },
  MaxHeight: {
    defaultValue: 'auto',
  },
  ForceDesktopStyle: {
    defaultValue: false,
  },
};

// Props
Playground.args = {
  Label: '라벨 위치',
  Name: 'Sample Name',
  PlaceHolder: '플레이스 홀더 위치',
  disavled: false,
  IsRequired: true,
  value: 1,
  Options: [
    {
      value: 1,
      text: 'Options는 선택할 수 있는 데이터입니다.',
    },
    {
      value: 2,
      text: 'Options는 string 배열 또는 object 배열이 올 수 있습니다.',
    },
    {
      value: 3,
      text: '선택되는 옵션의 value 값에 따라 v-model 값도 변합니다.',
    },
    {
      value: 4,
      text: 'v-model 값이 변하면 선택되는 옵션도 변합니다.',
    },
  ],
};

Label.args = {
  Name: 'StoryBookSelect',
  Label: 'Label을 바꿔보세요!',
  Options: ['foo', 'bar', 'baz'],
};

Options.args = {
  value: 'baz',
  Name: 'StoryBookSelect',
  PlaceHolder: 'Options는 선택 대상 데이터 배열입니다. 🐞🐶🍎🏉',
  Options: ['foo', 'bar', 'baz'],
};

PlaceHolder.args = {
  Name: 'StoryBookSelect',
  PlaceHolder: 'PlaceHolder 입니다. 🐞🐶🍎🏉',
  Options: ['foo', 'bar', 'baz'],
};

Disabled.args = {
  Name: 'StoryBookSelect',
  Disabled: true,
  Options: ['foo', 'bar', 'baz'],
};

IsRequired.args = {
  Name: 'StoryBookSelect',
  IsRequired: true,
  Label: 'Label',
  PlaceHolder: '필수 선택 사항인지 알려주는 IsRequired입니다. 🐞🐶🍎🏉',
  Options: ['foo', 'bar', 'baz'],
};

MaxHeight.args = {
  Name: 'StoryBookSelect',
  MaxHeight: '220px',
  Options: ['foo', 'bar', 'baz', 'qux', 'zzz'],
};

ForceDesktopStyle.args = {
  Name: 'StoryBookSelect',
  ForceDesktopStyle: true,
  Options: ['foo', 'bar', 'baz'],
};

// Docs 탭에 자동생성되는 코드를 이쁘게 만들어주기 위한 추가 작업입니다.
disableArgs([Name, Label, Options, PlaceHolder, Disabled, IsRequired, MaxHeight, ForceDesktopStyle], StyledSelect);

export { Playground, Label, Options, PlaceHolder, Disabled, IsRequired, MaxHeight, ForceDesktopStyle };

export default {
  title: 'Medistream/StyledSelect',
  component: StyledSelect,
  argTypes: { ...ownArgTypes },
};
