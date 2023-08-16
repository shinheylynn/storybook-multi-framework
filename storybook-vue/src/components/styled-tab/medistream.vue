<template>
  <div
    ref="styledTab"
    class="styled-tab"
    v-bind:class="{ shape: shape, block: block }"
    v-bind:style="{
      height: tabSizes[size].height,
      backgroundColor: ['switch'].indexOf(shape) > -1 ? 'rgba(0, 0, 0, 0.05)' : '',
      borderRadius: ['switch'].indexOf(shape) > -1 ? '30px' : '',
      boxShadow: ['tab'].indexOf(shape) > -1 ? 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.2)' : '',
    }">
    <div
      v-if="shape !== 'text'"
      class="indicator-wrap"
      v-bind:style="{
        left: checkedValue > 0 ? tabPositionLeft[checkedValue - 1] + 'px' : 0,
        width: tabWidths[checkedValue] + 'px',
        transition: animation === true ? 'all 0.2s ease' : '',
      }">
      <div class="indicator" v-bind:style="indicatorStylesType[shape]"></div>
    </div>
    <label v-for="(item, index) in items" :key="index">
      <input type="radio" name="styled-tab" v-model="checkedValue" v-bind:value="index" />
      <span
        v-bind:class="{ active: index === checkedValue }"
        v-bind:style="{
          margin: ['pill'].indexOf(shape) > -1 ? '0 10px' : '',
          padding: tabSizes[size].padding,
          height: tabSizes[size].height,
          lineHeight: tabSizes[size].height,
          color: checkedValue === index ? (['switch', 'pill'].indexOf(shape) > -1 ? '#fff' : color) : '',
          borderRadius: ['pill'].indexOf(shape) > -1 ? '30px' : '',
          backgroundColor: ['pill'].indexOf(shape) > -1 ? 'rgba(0, 0, 0, 0.05)' : '',
          fontsize: tabSizes[size].fontsize,
          transition: animation === true ? 'color 0.2s linear' : '',
        }">
        {{ item }}
      </span>
    </label>
  </div>
</template>

<script>
import '../../colors/medistream.variables.scss';

export default {
  name: 'StyledTab',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    items: {
      type: Array,
      // default: function () {
      //   return ['Tab 1', 'Tab 2', 'Tab 3']
      // }
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'].includes(value);
      },
    },
    shape: {
      type: String,
      default: 'bar',
      validator(value) {
        return ['text', 'bar', 'switch', 'tab', 'pill'].includes(value);
      },
    },
    color: {
      type: String,
      default: '#000',
    },
    block: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      checkedValue: this.modelValue || this.value,
      tabPositionLeft: [],
      tabWidths: [],
      tabSizes: {
        'x-small': {
          height: '20px',
          fontsize: '9px',
          padding: '0 10px',
        },
        small: {
          height: '25px',
          fontsize: '11px',
          padding: '0 15px',
        },
        medium: {
          height: '30px',
          fontsize: '13px',
          padding: '0 20px',
        },
        large: {
          height: '35px',
          fontsize: '15px',
          padding: '0 25px',
        },
        'x-large': {
          height: '40px',
          fontsize: '17px',
          padding: '0 30px',
        },
        'xx-large': {
          height: '50px',
          fontsize: '17px',
          padding: '0 35px',
        },
      },
      indicatorStylesType: {
        text: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        bar: {
          right: '0px',
          bottom: '0px',
          left: '0px',
          height: '2px',
          backgroundColor: this.color,
        },
        switch: {
          top: '4px',
          right: '4px',
          bottom: '4px',
          left: '4px',
          borderRadius: '30px',
          backgroundColor: this.color,
        },
        tab: {
          top: '-1px',
          right: '10px',
          bottom: '0px',
          left: '10px',
          borderTop: '1px solid rgba(0, 0, 0, 0.3)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.3)',
          borderRight: '1px solid rgba(0, 0, 0, 0.3)',
          borderRadius: '5px 5px 0px 0px',
          backgroundColor: '#fff',
        },
        pill: {
          top: '0px',
          right: '10px',
          bottom: '0px',
          left: '10px',
          borderRadius: '30px',
          backgroundColor: this.color,
        },
      },
    };
  },
  watch: {
    value: function () {
      this.checkedValue = this.value;
      // MARK: label 의 width 가 동적으로 변하는 경우가 있기 때문에 tab 이 변경될 때마다 indicator 의 위치를 새로 계산합니다.
      this.tabWidths = [];
      this.tabPositionLeft = [];
      // MARK: 초기화 후 10ms 뒤에 indicator 위치를 계산합니다.
      setTimeout(() => {
        this.setTabWidth();
      }, 10);
    },
    modelValue: function () {
      this.checkedValue = this.modelValue;
      // MARK: label 의 width 가 동적으로 변하는 경우가 있기 때문에 tab 이 변경될 때마다 indicator 의 위치를 새로 계산합니다.
      this.tabWidths = [];
      this.tabPositionLeft = [];
      // MARK: 초기화 후 10ms 뒤에 indicator 위치를 계산합니다.
      setTimeout(() => {
        this.setTabWidth();
      }, 10);
    },
    checkedValue: function (checkedValue) {
      this.$emit('input', checkedValue);
      this.$emit('update:modelValue', checkedValue);
    },
  },
  mounted() {
    this.setTabWidth();
  },
  methods: {
    setTabWidth: function () {
      for (let i = 0; i < this.$refs.styledTab?.querySelectorAll('label').length; i++) {
        this.tabWidths.push(this.$refs.styledTab?.querySelectorAll('label')[i].clientWidth);
      }
      let styledTabIndex = 0;
      for (let i = 0; i < this.$refs.styledTab?.querySelectorAll('label').length; i++) {
        styledTabIndex = styledTabIndex + this.$refs.styledTab?.querySelectorAll('label')[i].clientWidth;
        this.tabPositionLeft.push(styledTabIndex);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.styled-tab {
  display: inline-block;
  position: relative;
  label span {
    display: inline-block;
  }
  &.block {
    display: flex;
    label {
      flex: auto;
    }
    label span {
      display: block;
    }
  }
}
.indicator-wrap {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
.indicator {
  position: absolute;
}
label {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
label span {
  overflow: hidden;
  max-width: 100%;
  font-size: 12px;
  letter-spacing: -0.3px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
label input {
  position: absolute;
  left: -9999px;
}
</style>
