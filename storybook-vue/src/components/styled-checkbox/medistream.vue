<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span
    class="styled-checkbox"
    v-bind:class="{
      dark: isDark,
      selected: isChecked,
      'un-selected': !isChecked,
      disabled: Disabled
    }"
    v-bind:style="{
      height: Height + 'px',
      'line-height': Height + 'px'
    }"
  >
    <input type="checkbox" v-model="isChecked" v-bind:disabled="Disabled" />
    <transition name="bounce" mode="out-in">
      <svg
        v-if="isChecked"
        key="checked"
        class="selected-icon"
        v-bind:width="Width"
        v-bind:height="Height"
        v-bind:viewBox="'0 0 26 26'"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="check-circle"
          cx="13"
          cy="13"
          r="12.25"
          :fill="isDark ? 'var(--blue-400)' : 'var(--blue-600)'"
          :stroke="isDark ? 'var(--blue-500)' : 'var(--blue-700)'"
          stroke-width="1.5"
        />
        <path
          d="M7 13.0938L11.125 17.2188L19 9.34375"
          stroke="#ffffff"
          fill="transparent"
          stroke-width="2"
        />
      </svg>
      <svg
        v-else
        key="unchecked"
        class="selected-icon"
        v-bind:width="Width"
        v-bind:height="Height"
        v-bind:viewBox="'0 0 26 26'"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="check-circle"
          cx="13"
          cy="13"
          r="12.25"
          fill="transparent"
          :stroke="isDark ? 'var(--blue-grey-700)' : 'var(--blue-grey-400)'"
          stroke-width="1.5"
        />
        <path
          d="M7 13.0938L11.125 17.2188L19 9.34375"
          stroke="transparent"
          fill="transparent"
          stroke-width="2"
        />
      </svg>
    </transition>
  </span>
</template>

<script>
// import { mapState } from 'vuex'
import '../../colors/medistream.variables.scss'

export default {
  props: {
    value: {
      // Comes from 'v-model' value of component element (vue2)
      type: Boolean,
      default: false
    },
    modelValue: {
      // Comes from 'v-model' value of component element (vue3)
      type: Boolean,
      default: false
    },
    Width: {
      type: Number,
      default: 26
    },
    Height: {
      type: Number,
      default: 26
    },
    Disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isChecked: this.value || this.modelValue
    }
  },
  computed: {
    // ...mapState('theme', {
    //   isDark: 'isDark'
    // })
    isDark: function () {
      return false
    }
  },
  watch: {
    value: function (newVal) {
      this.isChecked = newVal
    },
    modelValue: function (newVal) {
      this.isChecked = newVal
    },
    isChecked: function (newVal) {
      this.$emit('input', newVal) // Update component's v-model' value (vue2)
      this.$emit('update:modelValue', newVal) // Update component's v-model' value (vue3)
    }
  }
}
</script>

<style lang="scss" scoped>
.styled-checkbox {
  display: inline-block;
  vertical-align: middle;
}

.styled-checkbox input {
  position: absolute;
  left: -9999px;
}

.selected-icon,
.un-selected,
.selected {
  position: relative;
}

.styled-checkbox.disabled {
  position: relative;
  cursor: not-allowed !important;
  opacity: 0.3 !important;
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

.selected:hover::before {
  background-color: var(--blue-200);
  opacity: 0.25;
}

.selected.dark:hover::before {
  background-color: var(--blue-700);
  opacity: 0.25;
}

.un-selected:hover::before {
  background-color: var(--blue-grey-200);
  opacity: 0.25;
}

.un-selected.dark:hover::before {
  background-color: var(--blue-grey-700);
  opacity: 0.25;
}

.selected:focus-within::before {
  background-color: var(--blue-200);
  opacity: 0.5;
}

.selected.dark:focus-within::before {
  background-color: var(--blue-700);
  opacity: 0.5;
}

.un-selected:focus-within::before {
  background-color: var(--blue-grey-200);
  opacity: 0.5;
}

.un-selected.dark:focus-within::before {
  background-color: var(--blue-grey-700);
  opacity: 0.5;
}

.selected:active::before {
  background-color: var(--blue-200);
  opacity: 0.75;
}

.selected.dark:active::before {
  background-color: var(--blue-700);
  opacity: 0.75;
}

.un-selected:active::before {
  background-color: var(--blue-grey-400);
  opacity: 0.75;
}

.un-selected.dark:active::before {
  background-color: var(--blue-grey-700);
  opacity: 0.75;
}
/* check-circle 스타일링 */

.selected:active .check-circle {
  stroke: var(--blue-800);
}

.selected.dark:active .check-circle {
  stroke: var(--blue-600);
}

.un-selected:hover .check-circle,
.un-selected:focus-within .check-circle {
  stroke: var(--blue-grey-400);
}

.un-selected.dark:hover .check-circle,
.un-selected.dark:focus-within .check-circle {
  stroke: var(--blue-grey-700);
}

.un-selected:active .check-circle {
  stroke: var(--blue-grey-500);
}

.un-selected.dark:active .check-circle {
  stroke: var(--blue-grey-600);
}
</style>
