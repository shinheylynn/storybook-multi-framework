<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span
    v-bind:class="[
      'styled-radio',
      { dark: isDark },
      { selected: checkedValue === Val },
      { 'un-selected': checkedValue !== Val },
      { disabled: Disabled },
    ]"
    :style="{
      height: Height + 'px',
      'line-height': Height + 'px',
    }">
    <input type="radio" v-model="checkedValue" v-bind:name="Name" v-bind:value="Val" v-bind:disabled="Disabled" />
    <transition name="bounce" mode="out-in">
      <svg
        key="checked"
        v-if="checkedValue === Val"
        class="selected-icon"
        v-bind:width="Width"
        v-bind:height="Height"
        v-bind:viewBox="'0 0 26 26'"
        v-bind:fill="isDark ? '#000' : '#fff'"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_860_13850)">
          <circle
            class="out-circle"
            cx="13"
            cy="13"
            r="12.25"
            :stroke="isDark ? 'var(--blue-grey-700)' : 'var(--blue-grey-300)'"
            stroke-width="1.5" />
          <circle cx="13" cy="13" r="7" :fill="isDark ? 'var(--blue-400)' : 'var(--blue-600)'" />
        </g>
      </svg>

      <svg
        key="unchecked"
        v-else
        v-bind:width="Width"
        v-bind:height="Height"
        v-bind:viewBox="'0 0 26 26'"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="selected-icon">
        <circle
          class="out-circle"
          cx="13"
          cy="13"
          r="12.25"
          :stroke="isDark ? 'var(--blue-grey-700)' : 'var(--blue-grey-300)'"
          stroke-width="1.5" />
        <circle cx="13" cy="13" r="7" fill="none" />
      </svg>
    </transition>
  </span>
</template>

<script>
// import { mapState } from 'vuex'
import '../../colors/medistream.variables.scss';

export default {
  props: {
    value: {
      // Comes from 'v-model' value of component element (vue2)
      type: [String, Number],
    },
    modelValue: {
      // Comes from 'v-model' value of component element (vue3)
      type: [String, Number],
    },
    Name: {
      required: true,
    },
    Val: {
      required: true,
    },
    Disabled: {
      type: Boolean,
      default: false,
    },
    Width: {
      type: Number,
      default: 26,
    },
    Height: {
      type: Number,
      default: 26,
    },
  },

  data() {
    return {
      checkedValue: this.value || this.modelValue,
    };
  },
  computed: {
    // ...mapState('theme', {
    //   isDark: 'isDark'
    // })
    isDark: function () {
      return false;
    },
  },

  watch: {
    value: function (newVal) {
      this.checkedValue = newVal;
    },
    modelValue: function (newVal) {
      this.checkedValue = newVal;
    },
    checkedValue: function (newVal) {
      this.$emit('input', newVal); // Update component's v-model' value (vue2)
      this.$emit('update:modelValue', newVal); // Update component's v-model' value (vue3)
    },
  },
};
</script>

<style lang="scss" scoped>
.styled-radio {
  display: inline-block;
  vertical-align: middle;
}

.styled-radio input {
  position: absolute;
  left: -9999px;
}

.selected-icon,
.un-selected,
.selected {
  position: relative;
}

.disabled {
  cursor: not-allowed !important;
  opacity: 0.3;
  pointer-events: none;
}

/* 쉐도우 이미지 공통 스타일링 */

.selected:hover::before,
.un-selected:hover::before,
.selected:focus-within::before,
.un-selected:focus-within::before,
.selected:active::before,
.un-selected:active::before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 130%;
  height: 130%;
  background-color: var(--blue-200);
  border-radius: 50%;
  content: '';
  transform: translate(-50%, -50%);
}

/* 개별 스타일링 */

.selected:hover::before,
.un-selected:hover::before {
  opacity: 0.25;
}

.un-selected:hover::before {
  background-color: var(--blue-grey-200);
}
.un-selected.dark:hover::before {
  background-color: var(--blue-grey-700);
}

.selected:focus-within::before,
.un-selected:focus-within::before {
  background-color: var(--blue-grey-200);
  opacity: 0.5;
}
.selected.dark:focus-within::before,
.un-selected.dark:focus-within::before {
  background-color: var(--blue-grey-700);
  opacity: 0.5;
}

.selected:active::before {
  background-color: var(--blue-200);
  opacity: 0.75;
}
.un-selected:active::before {
  background-color: var(--blue-grey-200);
  opacity: 0.75;
}
.selected.dark:active::before {
  background-color: var(--blue-700);
  opacity: 0.75;
}
.un-selected.dark:active::before {
  background-color: var(--blue-grey-700);
  opacity: 0.75;
}

/* out-circle 스타일링 */

.selected:hover .out-circle {
  stroke: var(--blue-200);
}
.selected.dark:hover .out-circle {
  stroke: var(--blue-700);
}

.un-selected:hover .out-circle,
.un-selected:focus-within .out-circle {
  stroke: var(--blue-grey-400);
}
.un-selected.dark:hover .out-circle,
.un-selected.dark:focus-within .out-circle {
  stroke: var(--blue-grey-700);
}

.un-selected:active .out-circle {
  stroke: var(--blue-grey-500);
}
.un-selected.dark:active .out-circle {
  stroke: var(--blue-grey-600);
}
</style>
