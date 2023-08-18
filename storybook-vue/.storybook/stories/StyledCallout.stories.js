import { automateStoriesFromProps, disableArgs } from '../../../src/utils';
import StyledCallout from '../../../src/components/styled-callout/medistream.vue';
import 'inticons/fonts/inticons.bundle.min.css';

const componentName = StyledCallout.__docgenInfo.displayName;
const initialTemplate = `<${componentName} v-bind="args"/>`;
const { Playground, Title, Content, Color, Dismissable, Outlined } = automateStoriesFromProps(
  StyledCallout,
  initialTemplate,
);

const ownArgTypes = {
  Title: {
    defaultValue: '메디스트림 | Medistream',
  },
  Content: {
    defaultValue: '의료인이 진료에 집중할수록 사람들은 더욱 건강해집니다.',
  },
  Color: {
    defaultValue: 'var(--blue-600)',
  },
  //   Dismissable: {
  //     control: {
  //       type: 'radio',
  //     },
  //     options: [true, false]
  //   },
  //   Outlined: {
  //     control: {
  //       type: 'radio',
  //     },
  //     options: [true, false]
  //   }
};

Playground.args = {
  Title:
    "<i class='ii ii-info-circle-outline' style='font-size: 20px; color:var(--blue-600);'></i> 메디스트림 | Medistream",
  Content: '의료인이 진료에 집중할수록 사람들은 더욱 건강해집니다.',
  Color: 'var(--blue-600)',
  Dismissable: true,
  Outlined: true,
};
Title.args = {
  Title:
    "<i class='ii ii-info-circle-outline' style='font-size: 20px; color:var(--blue-600);'></i> 메디스트림 | Medistream",
};
Content.args = {
  Content: '의료인이 진료에 집중할수록 사람들은 더욱 건강해집니다.',
};
Color.args = {
  Color: 'var(--blue-600)',
};
Dismissable.args = {
  Dismissable: false,
};
Outlined.args = {
  Outlined: false,
};

disableArgs([Title, Content, Color, Dismissable, Outlined], StyledCallout);

export { Playground, Title, Content, Color, Dismissable, Outlined };

export default {
  title: 'Medistream/StyledCallout',
  component: StyledCallout,
  argTypes: { ...ownArgTypes },
};
