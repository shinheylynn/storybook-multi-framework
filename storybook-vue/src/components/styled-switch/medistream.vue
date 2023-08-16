<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <label class="toggle-switch">
    <input type="checkbox" v-model="isChecked" v-on:change="toggleFlag" />
    <span class="slider"></span>
  </label>
</template>

<script>
import '../../colors/medistream.variables.scss'

export default {
  props: {
    flag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isChecked: this.flag
    }
  },
  methods: {
    toggleFlag: function () {
      this.$emit('toggle-handler', this.isChecked)
    }
  },
  watch: {
    flag: function (newVal) {
      this.isChecked = newVal
    },
    isChecked: function (newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  border-radius: 34px;
  overflow: hidden;
  cursor: pointer;
}
.toggle-switch input {
  position: absolute;
  left: -9999px;
}
.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--blue-grey-200);
  transition: 0.25s ease-out;
}
.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 1px;
  bottom: 1px;
  background-color: var(--white);
  transition: 0.2s;
  border-radius: 26px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
input:checked + .slider {
  background-color: var(--green-500);
}
input:checked + .slider::before {
  transform: translateX(22px);
}
</style>
