<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span
    class="styled-button"
    v-bind:class="[
      color,
      size,
      outlined ? 'outlined' : '',
      disabled ? 'disabled' : '',
      loading ? 'loading' : '',
      isDark ? 'dark' : ''
    ]"
    v-bind:style="{ width: widthValue }"
  >
    <router-link
      v-if="to"
      v-bind:to="to"
      v-bind:style="{
        height: heightValue + 'px',
        lineHeight: heightValue - 2 + 'px',
        padding: '0 ' + paddingHorizontal + 'px',
        fontSize: fontSize + 'px',
        fontWeight: fontWeight,
        borderRadius: borderRadius + 'px'
      }"
    >
      <slot></slot>
    </router-link>
    <button
      v-else
      v-on:click="$emit('click', $event)"
      v-bind:type="Type"
      v-bind:disabled="disabled || loading"
      v-bind:style="{
        height: heightValue + 'px',
        padding: '0 ' + paddingHorizontal + 'px',
        fontSize: fontSize + 'px',
        fontWeight: fontWeight,
        borderRadius: borderRadius + 'px'
      }"
    >
      <slot>button</slot>
    </button>
  </span>
</template>

<script>
// import { mapState } from 'vuex'
import '../../colors/medistream.variables.scss'

export default {
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        // TODO: 'x-small'
        return ['x-small', 'small', 'medium', 'large', 'x-large'].indexOf(value) > -1
      }
    },
    width: {
      type: [Number, String],
      default: 'auto' // 200, '200px', '100%', 'auto'
    },
    color: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'grey', 'yellow'].indexOf(value) > -1
      }
    },
    outlined: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    to: {
      type: Object
    },
    Type: {
      type: String,
      default: 'button'
    },
    HeightUnit: {
      type: Array,
      default: function () {
        return [24, 28, 36, 44, 52]
      }
    },
    PaddingUnit: {
      type: Array,
      default: function () {
        return [8, 8, 10, 14, 14]
      }
    },
    FontSizeUnit: {
      type: Array,
      default: function () {
        return [12, 13, 14, 16, 16]
      }
    },
    FontWeightUnit: {
      type: Array,
      default: function () {
        return [600, 600, 700, 700, 700]
      }
    },
    BorderRadiusUnit: {
      type: Array,
      default: function () {
        return [4, 4, 6, 6, 6]
      }
    }
  },
  computed: {
    // ...mapState('theme', {
    //   isDark: 'isDark'
    // }),
    isDark: function () {
      return false
    },
    widthValue: function () {
      let width = this.width
      if ((typeof width).toLowerCase() === 'number') {
        return width + 'px'
      }
      if (width === 'auto') {
        return null
      }
      return width
    },
    heightValue: function () {
      let size = this.size
      let heightUnit = this.HeightUnit
      switch (size) {
        case 'x-large':
          return heightUnit[4]
        case 'large':
          return heightUnit[3]
        case 'small':
          return heightUnit[1]
        case 'x-small':
          return heightUnit[0]
        case 'medium':
        default:
          return heightUnit[2]
      }
    },
    paddingHorizontal: function () {
      let size = this.size
      let paddingUnit = this.PaddingUnit
      switch (size) {
        case 'x-large':
          return paddingUnit[4]
        case 'large':
          return paddingUnit[3]
        case 'small':
          return paddingUnit[1]
        case 'x-small':
          return paddingUnit[0]
        case 'medium':
        default:
          return paddingUnit[2]
      }
    },
    fontSize: function () {
      let size = this.size
      let fontSizeUnit = this.FontSizeUnit
      switch (size) {
        case 'x-large':
          return fontSizeUnit[4]
        case 'large':
          return fontSizeUnit[3]
        case 'small':
          return fontSizeUnit[1]
        case 'x-small':
          return fontSizeUnit[0]
        case 'medium':
        default:
          return fontSizeUnit[2]
      }
    },
    fontWeight: function () {
      let size = this.size
      let fontWeightUnit = this.FontWeightUnit
      switch (size) {
        case 'x-large':
          return fontWeightUnit[4]
        case 'large':
          return fontWeightUnit[3]
        case 'small':
          return fontWeightUnit[1]
        case 'x-small':
          return fontWeightUnit[0]
        case 'medium':
        default:
          return fontWeightUnit[2]
      }
    },
    borderRadius: function () {
      let size = this.size
      let borderRadiusUnit = this.BorderRadiusUnit
      switch (size) {
        case 'x-large':
          return borderRadiusUnit[4]
        case 'large':
          return borderRadiusUnit[3]
        case 'small':
          return borderRadiusUnit[1]
        case 'x-small':
          return borderRadiusUnit[0]
        case 'medium':
        default:
          return borderRadiusUnit[2]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.styled-button {
  display: inline-block;
  vertical-align: middle;
  zoom: 1;

  button,
  a {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid var(--blue-600);
    background-color: var(--blue-600);
    border-radius: 4px;
    color: var(--white);
    cursor: pointer;
    font-size: 14px;
    outline: none;
    text-align: center;
    text-overflow: ellipsis;
    transition: border 0.08s, background-color 0.08s, color 0.08s;
    white-space: nowrap;
  }

  a {
    line-height: 35px;
    text-decoration: none;
  }

  button > img {
    vertical-align: -8px;
  }

  a > img {
    vertical-align: -7px;
  }

  i.ii {
    vertical-align: middle;
  }

  &.disabled button,
  &.disabled a {
    cursor: not-allowed;
  }

  &.loading button,
  &.loading a {
    cursor: wait;
  }

  &.loading button:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border: 2px solid;
    border-top: 2px solid transparent !important;
    margin: -8px 0 0 -8px;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: spinner;
    animation-timing-function: linear;
    border-radius: 50%;
    content: '';
  }

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}

.styled-button.primary {
  a,
  button {
    border-color: var(--blue-600);
    background-color: var(--blue-600);
    color: var(--white);

    &:hover {
      border-color: var(--blue-500);
      background-color: var(--blue-500);
      color: var(--white);
    }

    &:focus {
      border-color: var(--blue-400);
      background-color: var(--blue-400);
      color: var(--white);
    }

    &:active {
      border-color: var(--blue-700);
      background-color: var(--blue-700);
      color: var(--white);
    }
  }

  &.disabled {
    a,
    button {
      border-color: var(--blue-600);
      background-color: var(--blue-600);
      color: var(--white);
      opacity: 0.4;
    }
  }

  &.loading {
    a,
    button {
      border-color: var(--blue-600);
      background-color: var(--blue-600);
      color: transparent;

      &:after {
        border-color: var(--white);
      }
    }
  }

  &.outlined {
    a,
    button {
      border-color: var(--blue-grey-300);
      background-color: transparent;
      color: var(--blue-600);

      &:hover {
        border-color: var(--blue-grey-300);
        background-color: var(--blue-50);
        color: var(--blue-600);
      }

      &:focus {
        border-color: var(--blue-200);
        background-color: var(--blue-50);
        color: var(--blue-700);
      }

      &:active {
        border-color: var(--blue-500);
        background-color: var(--blue-100);
        color: var(--blue-700);
      }
    }

    &.disabled {
      a,
      button {
        border-color: var(--blue-grey-300);
        background-color: transparent;
        color: var(--blue-600);
        opacity: 0.4;
      }
    }

    &.loading {
      a,
      button {
        border-color: var(--blue-600);
        background-color: transparent;
        color: transparent;

        &:after {
          border-color: var(--blue-600);
        }
      }
    }
  }
}

.styled-button.primary.dark {
  a,
  button {
    border-color: var(--blue-600);
    background-color: var(--blue-600);
    color: var(--white);

    &:hover {
      border-color: var(--blue-700);
      background-color: var(--blue-700);
      color: var(--white);
    }

    &:focus {
      border-color: var(--blue-800);
      background-color: var(--blue-800);
      color: var(--white);
    }

    &:active {
      border-color: var(--blue-500);
      background-color: var(--blue-500);
      color: var(--white);
    }
  }

  &.disabled {
    a,
    button {
      border-color: var(--blue-600);
      background-color: var(--blue-600);
      color: var(--white);
      opacity: 0.4;
    }
  }

  &.loading {
    a,
    button {
      border-color: var(--blue-500);
      background-color: var(--blue-500);
      color: transparent;

      &:after {
        border-color: var(--white);
      }
    }
  }

  &.outlined {
    a,
    button {
      border-color: var(--blue-grey-700);
      background-color: transparent;
      color: var(--blue-500);

      &:hover {
        border-color: var(--blue-grey-700);
        background-color: var(--blue-grey-900);
        color: var(--blue-500);
      }

      &:focus {
        border-color: var(--blue-700);
        background-color: var(--blue-grey-900);
        color: var(--blue-500);
      }

      &:active {
        border-color: var(--blue-600);
        background-color: rgba(29, 119, 255, 0.2);
        color: var(--blue-400);
      }
    }

    &.disabled {
      a,
      button {
        border-color: var(--blue-grey-700);
        background-color: transparent;
        color: var(--blue-500);
        opacity: 0.4;
      }
    }

    &.loading {
      a,
      button {
        border-color: var(--blue-500);
        background-color: transparent;
        color: transparent;

        &:after {
          border-color: var(--blue-500);
        }
      }
    }
  }
}

.styled-button.secondary {
  a,
  button {
    border-color: var(--blue-grey-900);
    background-color: var(--blue-grey-900);
    color: var(--white);

    &:hover {
      border-color: var(--blue-grey-800);
      background-color: var(--blue-grey-800);
      color: var(--white);
    }

    &:focus {
      border-color: var(--blue-grey-700);
      background-color: var(--blue-grey-700);
      color: var(--white);
    }

    &:active {
      border-color: var(#000);
      background-color: var(#000);
      color: var(--white);
    }
  }

  &.disabled {
    a,
    button {
      border-color: var(--blue-grey-900);
      background-color: var(--blue-grey-900);
      color: var(--white);
      opacity: 0.2;
    }
  }

  &.loading {
    a,
    button {
      border-color: var(--blue-grey-900);
      background-color: var(--blue-grey-900);
      color: transparent;

      &:after {
        border-color: var(--white);
      }
    }
  }

  &.outlined {
    a,
    button {
      border-color: var(--blue-grey-400);
      background-color: transparent;
      color: var(--blue-grey-700);

      &:hover {
        border-color: var(--blue-grey-400);
        background-color: var(--blue-grey-100);
        color: var(#000);
      }

      &:focus {
        border-color: var(--blue-grey-600);
        background-color: var(--blue-grey-100);
        color: var(#000);
      }

      &:active {
        border-color: var(--blue-grey-400);
        background-color: var(---blue-grey-200);
        color: var(#000);
      }
    }

    &.disabled {
      a,
      button {
        border-color: var(--blue-grey-400);
        background-color: transparent;
        color: var(--blue-grey-700);
        opacity: 0.2;
      }
    }

    &.loading {
      a,
      button {
        border-color: var(--blue-grey-400);
        background-color: transparent;
        color: transparent;

        &:after {
          border-color: #000;
        }
      }
    }
  }
}

.styled-button.secondary.dark {
  a,
  button {
    border-color: var(--blue-grey-100);
    background-color: var(--blue-grey-100);
    color: var(--black);

    &:hover {
      border-color: var(--blue-grey-200);
      background-color: var(--blue-grey-200);
      color: var(--black);
    }

    &:focus {
      border-color: var(--blue-grey-300);
      background-color: var(--blue-grey-300);
      color: var(--black);
    }

    &:active {
      border-color: var(--blue-grey-50);
      background-color: var(--blue-grey-50);
      color: var(--black);
    }
  }

  &.disabled {
    a,
    button {
      border-color: var(--blue-grey-100);
      background-color: var(--blue-grey-100);
      color: var(--black);
      opacity: 0.4;
    }
  }

  &.loading {
    a,
    button {
      border-color: var(--blue-grey-100);
      background-color: var(--blue-grey-100);
      color: transparent;

      &:after {
        border-color: var(--black);
      }
    }
  }

  &.outlined {
    a,
    button {
      border-color: var(--blue-grey-700);
      background-color: transparent;
      color: var(--blue-grey-200);

      &:hover {
        border-color: var(--blue-grey-700);
        background-color: var(--blue-grey-900);
        color: var(--white);
      }

      &:focus {
        border-color: var(--blue-grey-600);
        background-color: var(--blue-grey-900);
        color: var(--white);
      }

      &:active {
        border-color: var(--blue-grey-600);
        background-color: var(--blue-grey-800);
        color: var(--white);
      }
    }

    &.disabled {
      a,
      button {
        border-color: var(--blue-grey-700);
        background-color: transparent;
        color: var(--blue-grey-200);
        opacity: 0.4;
      }
    }

    &.loading {
      a,
      button {
        border-color: var(--blue-grey-700);
        background-color: var(---blue-grey-800);
        color: transparent;

        &:after {
          border-color: var(--white);
        }
      }
    }
  }
}

.styled-button.grey {
  a,
  button {
    border-color: var(--blue-grey-100);
    background-color: var(--blue-grey-100);
    color: var(--blue-grey-600);

    &:hover {
      border-color: var(--blue-grey-200);
      background-color: var(--blue-grey-200);
      color: var(--blue-grey-700);
    }

    &:focus {
      border-color: var(--blue-grey-300);
      background-color: var(--blue-grey-300);
      color: var(--blue-grey-800);
    }

    &:active {
      border-color: var(--blue-grey-500);
      background-color: var(--blue-grey-300);
      color: var(--blue-grey-800);
    }
  }

  &.disabled {
    a,
    button {
      border-color: var(--blue-grey-100);
      background-color: var(--blue-grey-100);
      color: var(--blue-grey-600);
      opacity: 0.4;
    }
  }

  &.loading {
    a,
    button {
      border-color: var(--blue-grey-100);
      background-color: var(--blue-grey-100);
      color: transparent;

      &:after {
        border-color: var(--blue-grey-600);
      }
    }
  }

  &.outlined {
    a,
    button {
      border-color: var(--blue-grey-300);
      background-color: transparent;
      color: var(--blue-grey-300);

      &:hover {
        border-color: var(--blue-grey-400);
        background-color: var(--blue-grey-100);
        color: var(--blue-grey-400);
      }

      &:focus {
        border-color: var(--blue-grey-600);
        background-color: var(--blue-grey-100);
        color: var(--blue-grey-600);
      }

      &:active {
        border-color: var(--blue-grey-200);
        background-color: var(---blue-grey-400);
        color: var(--blue-grey-200);
      }
    }

    &.disabled {
      a,
      button {
        border-color: var(--blue-grey-300);
        background-color: transparent;
        color: var(--blue-grey-300);
        opacity: 0.4;
      }
    }

    &.loading {
      a,
      button {
        border-color: var(--blue-grey-300);
        background-color: transparent;
        color: transparent;

        &:after {
          border-color: var(--blue-grey-600);
        }
      }
    }
  }
}

.styled-button.grey.dark {
  a,
  button {
    border-color: var(--blue-grey-800);
    background-color: var(--blue-grey-800);
    color: var(--blue-grey-300);

    &:hover {
      border-color: var(--blue-grey-700);
      background-color: var(--blue-grey-700);
      color: var(--blue-grey-200);
    }

    &:focus {
      border-color: var(--blue-grey-700);
      background-color: var(--blue-grey-600);
      color: var(--blue-grey-100);
    }

    &:active {
      border-color: var(--blue-grey-600);
      background-color: var(--blue-grey-400);
      color: var(--blue-grey-100);
    }
  }

  &.disabled {
    a,
    button {
      border-color: var(--blue-grey-800);
      background-color: var(--blue-grey-800);
      color: var(--blue-grey-300);
      opacity: 0.4;
    }
  }

  &.loading {
    a,
    button {
      border-color: var(--blue-grey-800);
      background-color: var(--blue-grey-800);
      color: transparent;

      &:after {
        border-color: var(--blue-grey-300);
      }
    }
  }

  &.outlined {
    a,
    button {
      border-color: var(--blue-grey-300);
      background-color: transparent;
      color: var(--blue-grey-300);

      &:hover {
        border-color: var(--blue-grey-400);
        background-color: var(--blue-grey-100);
        color: var(--blue-grey-400);
      }

      &:focus {
        border-color: var(--blue-grey-600);
        background-color: var(--blue-grey-100);
        color: var(--blue-grey-600);
      }

      &:active {
        border-color: var(--blue-grey-200);
        background-color: var(---blue-grey-400);
        color: var(--blue-grey-200);
      }
    }

    &.disabled {
      a,
      button {
        border-color: var(--blue-grey-300);
        background-color: transparent;
        color: var(--blue-grey-300);
        opacity: 0.4;
      }
    }

    &.loading {
      a,
      button {
        border-color: var(--blue-grey-300);
        background-color: transparent;
        color: transparent;

        &:after {
          border-color: var(--blue-grey-600);
        }
      }
    }
  }
}

.styled-button.yellow {
  a,
  button {
    border-color: var(--amber-200);
    background-color: var(--amber-200);
    color: var(--brown-900);

    &:hover {
      border-color: #ffe240;
      background-color: #ffe240;
      color: var(--brown-900);
    }

    &:focus {
      border-color: #ffe650;
      background-color: #ffe650;
      color: var(--brown-900);
    }

    &:active {
      border-color: #f0d01d;
      background-color: #f0d01d;
      color: var(--brown-900);
    }
  }

  &.disabled {
    a,
    button {
      border-color: var(--amber-200);
      background-color: var(--amber-200);
      color: var(--brown-900);
      opacity: 0.4;
    }
  }

  &.loading {
    a,
    button {
      border-color: var(--amber-200);
      background-color: var(--amber-200);
      color: transparent;

      &:after {
        border-color: var(--brown-900);
      }
    }
  }

  &.outlined {
    a,
    button {
      border-color: var(--amber-200);
      background-color: transparent;
      color: var(--brown-900);

      &:hover {
        border-color: var(--brown-900);
        background-color: #ffec80;
        color: #ffe240;
      }

      &:focus {
        border-color: #ffe240;
        background-color: #ffe240;
        color: var(--brown-900);
      }

      &:active {
        border-color: var(--brown-900);
        background-color: var(--amber-200);
        color: var(--brown-900);
      }
    }

    &.disabled {
      a,
      button {
        border-color: var(--amber-200);
        background-color: transparent;
        color: var(--brown-900);
        opacity: 0.4;
      }
    }

    &.loading {
      a,
      button {
        border-color: var(--amber-200);
        background-color: transparent;
        color: transparent;

        &:after {
          border-color: var(--amber-200);
        }
      }
    }
  }
}
</style>
