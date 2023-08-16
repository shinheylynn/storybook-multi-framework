<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <mark class="styled-badge" v-bind:style="[paddingStyle, sizes[size], colorStyle]">
    <slot></slot>
    <span class="bg" v-bind:style="[opacityStyle, bgColorStyle, radiusStyle, hexToRgba]"> </span>
  </mark>
</template>

<script>
import '../../colors/medistream.variables.scss'

export default {
  props: {
    color: {
      type: String,
      default: '#000000'
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['x-small', 'small', 'medium', 'large', 'x-large'].includes(value)
      }
    },
    shape: {
      type: String,
      default: 'embossed',
      validator(value) {
        // embossed: 양각 (글씨가 흰색, 배경 단색)), engraved: 음각 ()
        return ['embossed', 'engraved', 'outlined'].includes(value)
      }
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sizes: {
        'x-small': {
          height: '20px',
          lineHeight: '20px',
          fontSize: '11px',
          letterSpacing: '-0.36px',
          padding: '0 8px'
        },
        small: {
          height: '24px',
          lineHeight: '24px',
          fontSize: '9px',
          letterSpacing: '-0.34px',
          padding: '0 10px'
        },
        medium: {
          height: '30px',
          lineHeight: '30px',
          fontSize: '12px',
          letterSpacing: '-0.32px',
          padding: '0 13px'
        },
        large: {
          height: '34px',
          lineHeight: '34px',
          fontSize: '15px',
          letterSpacing: '-0.3px',
          padding: '0 16px'
        },
        'x-large': {
          height: '40px',
          lineHeight: '40px',
          fontSize: '18px',
          letterSpacing: '-0.28px',
          padding: '0 19px'
        }
      },
      shapeStyles: {
        embossed: {
          color: '#ffffff',
          backgroundColor: this.color,
          border: `1px solid ${this.color}`
        },
        engraved: {
          color: this.color,
          backgroundColor: this.color,
          border: `1px solid ${this.color}`,
          opacity: 0.3
        },
        outlined: {
          color: this.color,
          border: `1px solid ${this.color}`
        }
      }
    }
  },
  computed: {
    paddingStyle: function () {
      let shapeStyle = this.sizes[this.size] || {}
      return { padding: shapeStyle.padding }
    },
    radiusStyle: function () {
      let borderPixel = Number(this.sizes[this.size].height.slice(0, 2))
      if (this.rounded) {
        return { borderRadius: `${borderPixel / 2}px` }
      } else {
        return { borderRadius: '3px' }
      }
    },
    colorStyle: function () {
      let shapeStyle = this.shapeStyles[this.shape] || {}
      return { color: shapeStyle.color }
    },
    opacityStyle: function () {
      let shapeStyle = this.shapeStyles[this.shape] || {}
      return { opacity: shapeStyle.opacity }
    },
    bgColorStyle: function () {
      let shapeStyle = this.shapeStyles[this.shape] || {}
      return { backgroundColor: shapeStyle.backgroundColor }
    },
    hexToRgba: function () {
      let r = parseInt(this.color.slice(1, 3), 16)
      let g = parseInt(this.color.slice(3, 5), 16)
      let b = parseInt(this.color.slice(5, 7), 16)
      return { boxShadow: `inset 0 0 0 1px rgba(${r}, ${g}, ${b}, 0.4)` }
    }
  }
}
</script>

<style scoped>
.styled-badge {
  position: relative;
  z-index: 1;
  zoom: 1;
  display: inline-block;
  height: 22px;
  line-height: 22px;
  padding: 0 3px;
  background-color: transparent;
  font-family: 'Inter';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  color: var(--white);
  text-align: center;
  letter-spacing: -0.3px;
  vertical-align: middle;
}
.bg {
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>
