import { automateStoriesFromProps, disableArgs } from '../utils'
import PaginationBar from '../../src/components/pagination-bar/medistream.vue'
import { vueRouter } from 'storybook-vue3-router'

const componentName = PaginationBar.__docgenInfo.displayName
const initialTemplate = `<${componentName} v-bind="args"></${componentName}>`
const { Playground, PagesCount, AllItemsCount, DefaultTemplate } = automateStoriesFromProps(
  PaginationBar,
  initialTemplate
)

PagesCount.args = {
  PagesCount: 3
}

AllItemsCount.argTypes = {
  ...AllItemsCount.argTypes,
  Limit: {
    control: {
      disable: false
    }
  }
}

AllItemsCount.args = {
  AllItemsCount: 40
}

// Prop을 바탕으로 하지 않은 임의의 story를 만들어주려면 DefaultTemplate을 복사해 만들어줍니다.
const FirstPage = DefaultTemplate.bind({})
FirstPage.argTypes = {
  Limit: {
    table: {
      disable: true
    }
  },
  AllItemsCount: {
    table: {
      disable: true
    }
  },
  PagesCount: {
    table: {
      disable: true
    }
  }
}

FirstPage.args = {
  Start: 0
}

const LastPage = DefaultTemplate.bind({})
LastPage.argTypes = {
  PagesCount: {
    table: {
      disable: true
    }
  }
}

LastPage.args = {
  Start: 99,
  Limit: 10,
  AllItemsCount: 100
}

// Docs 탭에 자동생성되는 코드를 이쁘게 만들어주기 위한 추가 작업입니다.
disableArgs([PagesCount, AllItemsCount, FirstPage, LastPage], PaginationBar)

export { Playground, PagesCount, AllItemsCount, FirstPage, LastPage }

export default {
  title: 'Controls/PaginationBar',
  component: PaginationBar,
  // router-link를 사용하기 위해 추가
  decorators: [vueRouter()]
}
