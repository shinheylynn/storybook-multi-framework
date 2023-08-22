import { StyledInput } from '../../../src/components/styled-input/moreden.jsx';
import { automateStoriesFromProps } from '../../../src/utils/automateStorybook.jsx';

const { Playground, Name, Label, Placeholder, Comments, Disabled } = automateStoriesFromProps(StyledInput);

Playground.args = {
  value: {},
  Name: 'username',
  Label: '라벨 이름을 입력할 수 있습니다.',
  Type: '',
  Placeholder: '타이핑에 오류가 있는 경우, 입력 후 인풋창 밖을 클릭하면 오류메세지를 볼 수 있습니다.',
  Comments: '힌트를 주기 위해 comment 입력이 가능합니다.',
  Disabled: false,
};

Name.args = {
  Name: 'usercareer',
};

Label.args = {
  Label: 'username',
  Placeholder: '라벨이 있는 인풋 창 입니다.',
};

Placeholder.args = {
  Placeholder: '• • • •',
};

Comments.args = {
  Comments: 'ex) ㅇㅇ 한의원 이△△, ㅇㅇ 대  11학번 김△△',
};

Disabled.args = {
  Label: false,
  Disabled: false,
  Placeholder: '비활성화 된 입력 창 입니다.',
};

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
  Label: { defaultValue: '라벨이름을 입력할 수 있습니다.' },
  Placeholder: { defaultValue: '타이핑에 오류가 있는 경우, 입력 후 인풋창 밖을 클릭하면 오류메세지를 볼 수 있습니다.' },
  Comments: { defaultValue: '힌트를 주기위해 comment입력이 가능합니다.' },
};

export { Playground, Name, Label, Placeholder, Comments, Disabled };

export default {
  title: 'Moreden/StyledInput',
  component: StyledInput,
  argTypes: { ...ownArgTypes },
};
