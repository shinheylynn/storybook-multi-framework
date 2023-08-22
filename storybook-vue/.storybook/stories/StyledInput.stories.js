import { automateStoriesFromProps, disableArgs, makeDisabledArgTypes } from '../../../src/utils';
import StyledInput from '../../../src/components/styled-input/medistream.vue';

const initialTemplate =
  '<styled-input v-bind="$props"><template v-slot:append><button type="button" style="background-color: black; color:white; width: 38px; height:24px; border:none; font-size: 12px; margin-left:5px; border-radius: 3px">버튼</button></template></styled-input>';
const { Playground, Name, Label, Placeholder, Readonly, Comments, MoreHint, Clearable, Disabled, DefaultTemplate } =
  automateStoriesFromProps(StyledInput, initialTemplate);
const allDisabledArgTypes = makeDisabledArgTypes(StyledInput);

const ownArgTypes = {
  Name: {
    defaultValue: 'username',
    control: {
      type: 'select',
      // FieldName은 String type이지만 정해진 값 외의 값을 입력하면 오류가 발생하므로 select로 정리했다.
      options: [
        'username',
        'birthday',
        'email',
        'phone',
        'mobile',
        'password',
        'points',
        'age',
        'nickname',
        'usercareer',
        'licenseNumber',
        'licenseDate',
        'school',
        'schoolYear',
        'referral',
        'full_name',
        'address1',
        'address2',
        'company',
        'tax_number',
        'tax_number_yoyang',
        'note_quantity',
        'note_lowest_price',
        'card_number',
        'card_expiry_year',
        'card_expiry_month',
        'card_birth',
        'card_pwd_2digit',
      ],
    },
  },
  Type: {
    description: 'text, email, number, password, tel',
  },
  input: {
    control: false,
    table: {
      disable: true,
    },
  },
  Label: { defaultValue: '라벨이름을 입력할 수 있습니다.' },
  Placeholder: { defaultValue: '타이핑에 오류가 있는 경우, 입력 후 인풋창 밖을 클릭하면 오류메세지를 볼 수 있습니다.' },
  Comments: { defaultValue: '힌트를 주기위해 comment입력이 가능합니다.' },
  Clearable: { defaultValue: true },
};

Playground.storyName = 'Playground';

Name.storyName = ':Name';
Name.args = {
  Name: 'usercareer',
  Type: 'text',
};

// FieldName이 필수적이라 각각 스토리에 맞는 FieldName을 할당해줬다.
Label.args = {
  Name: 'username',
  Label: 'username',
  Placeholder: '라벨이 있는 인풋 창 입니다.',
};

Placeholder.args = {
  Name: 'card_expiry_year',
  Placeholder: '• • • •',
};

Readonly.args = {
  Name: 'address1',
  Readonly: true,
  Placeholder: '읽기전용 인풋창입니다.',
};

Comments.args = {
  Name: 'referral',
  Comments: 'ex) ㅇㅇ 한의원 이△△, ㅇㅇ 대  11학번 김△△',
};

// 에러시 메세지 출력
MoreHint.args = {
  Name: 'birthday',
  MoreHint: '8자리 숫자 19890712 처럼 입력해주세요.',
};

Disabled.args = {
  Name: 'email',
  Label: false,
  Disabled: true,
  Placeholder: '비활성화 된 입력 창 입니다.',
};

Clearable.args = {
  Name: 'email',
  Clearable: true,
  Placeholder: '글씨를 입력하면 삭제 버튼이 생성됩니다.',
};

MoreHint.args = {
  Type: 'number',
  Name: 'schoolYear',
  Label: '학번',
  Placeholder: '타이핑에 오류가 있으면 오류메세지가 출력됩니다. 오류를 만든 후 밖을 마우스로 클릭 해 보세요',
};

const licenseNumber = DefaultTemplate.bind({});
licenseNumber.args = {
  Type: 'tel',
  Name: 'licenseNumber',
  Label: '면허 번호',
  Placeholder: '정확하게 입력해주세요.',
  MoreHint: '4~5자리 숫자로만 입력해야 합니다.',
};
licenseNumber.argTypes = {
  ...allDisabledArgTypes,
  Type: {
    table: { disable: false },
  },
  Name: {
    table: { disable: false },
  },
  Label: {
    table: { disable: false },
  },
  Placeholder: {
    table: { disable: false },
  },
  MoreHint: {
    table: { disable: false },
  },
};

const cardNumber = DefaultTemplate.bind({});
cardNumber.args = {
  Type: 'text',
  Name: 'card_number',
  Label: '카드 번호',
  Placeholder: '15 ~ 16자리 숫자만 입력해주세요.',
  Comments: '카드사 정책에 따라 15자리 번호 카드 일부는 지원되지 않을 수 있습니다.',
};
cardNumber.argTypes = {
  ...allDisabledArgTypes,
  Type: {
    table: { disable: false },
  },
  Name: {
    table: { disable: false },
  },
  Label: {
    table: { disable: false },
  },
  Placeholder: {
    table: { disable: false },
  },
  Comments: {
    table: { disable: false },
  },
};

// Docs 탭에 자동생성되는 코드를 이쁘게 만들어주기 위한 추가 작업입니다.
disableArgs(
  [Name, Label, Placeholder, Readonly, Comments, MoreHint, licenseNumber, cardNumber],
  StyledInput,
  Clearable,
  Disabled,
);

export {
  Playground,
  Name,
  Label,
  Placeholder,
  Readonly,
  Comments,
  MoreHint,
  licenseNumber,
  cardNumber,
  Clearable,
  Disabled,
};

export default {
  title: 'Controls/StyledInput',
  component: StyledInput,
  argTypes: { ...ownArgTypes },
};
