<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="styled-select"
    v-bind:class="{
      error: hasError,
      disabled: Disabled,
      'without-label': !Label,
      'dropdown-opened': isDropdownVisible
    }"
    ref="selectBox"
  >
    <label v-if="!!Label" v-bind:for="Name" v-bind:class="{ 'disabled-color': Disabled }">
      {{ Label }}
      <em v-if="IsRequired && !Disabled">*</em>
    </label>
    <p v-if="!isMobileUx" class="value-text" v-bind:class="{ 'disabled-color': Disabled }">
      <span v-if="!selectedOption">{{ PlaceHolder }}</span>
      <span v-else class="value-selected">{{ selectedOption.text }}</span>
    </p>
    <!-- 1) PC 일 경우 -->
    <transition name="fade">
      <div
        v-if="isDropdownVisible && !isMobileUx && !Disabled"
        class="pc-option-box"
        v-bind:class="{ 'pc-without-label': !Label }"
      >
        <ul
          class="pc-option-ul"
          v-bind:style="{ 'max-height': maxHeight }"
          v-bind:class="{ scroll: maxHeight }"
        >
          <li
            class="pc-option"
            v-for="(option, index) in structuredOptions"
            v-bind:class="{
              selected: multipleSelectedValue[0] === option.value,
              'disabled-option': !option.isSelectable
            }"
            v-bind:key="index"
            v-on:click="handleClickLi(option)"
            v-bind:data-value="option.value"
            ref="dropdownLiTags"
          >
            <span class="text" :class="{ 'disab  led-option': !option.isSelectable }">
              {{ option.text }}
            </span>
            <!-- extraContent: 기본 텍스트 외 뱃지, 상태 등을 자유롭게 표기할 수 있게 제공된 영역입니다. -->
            <span
              v-if="option.extraContent"
              class="extra"
              :class="{ 'disabled-option': !option.isSelectable }"
              v-html="option.extraContent"
            >
            </span>
          </li>
        </ul>
      </div>
    </transition>
    <div class="select-tag-hide" v-if="!isMobileUx">
      <select
        multiple
        v-on:keydown="handleKeyDownSelect"
        v-model="multipleSelectedValue"
        ref="select"
      >
        <option
          v-for="(option, index) in structuredOptions"
          v-bind:key="index"
          v-bind:value="option.value"
        >
          {{ option.text }}
          <!--
            MARK: 모바일 버전에서는 extraContent 를 표기해주지 않습니다.
                  extraContent 를 표기해주기 위해서는 :ForceDesktopStyle 을 true 로 지정해야 합니다.
          -->
        </option>
      </select>
    </div>
    <!-- 2) Mobile일 경우 -->
    <select
      v-if="isMobileUx"
      v-model="selectedValue"
      class="styled-select-refactor"
      v-bind:class="{ 'without-label': !Label, disabled: Disabled }"
      v-bind:id="Name"
      v-bind:disabled="Disabled"
    >
      <option value="" selected disabled hidden>{{ PlaceHolder }}</option>
      <option
        v-for="(child, index) in structuredOptions"
        v-bind:key="index"
        v-bind:disabled="!child.isSelectable"
        v-bind:value="child.value"
      >
        {{ child.text }}
        <!--
            MARK: 모바일 버전에서는 extraContent 를 표기해주지 않습니다.
                  extraContent 를 표기해주기 위해서는 :ForceDesktopStyle 을 true 로 지정해야 합니다.
          -->
      </option>
    </select>
    <i
      class="ii ii-caret-down drop-down-icon"
      v-bind:class="{ 'ii-rotate-180': isDropdownVisible }"
    ></i>
  </div>
</template>

<script>
import '../../colors/medistream.variables.scss'
// import Vue from 'vue'
// import Vuelidate from 'vuelidate'
// import { required } from 'vuelidate/lib/validators'
// Vue.use(Vuelidate)

export default {
  props: {
    value: {
      // Comes from 'v-model' value of component element
      required: true
    },
    Name: {
      // required,
      type: String
    },
    Label: {
      type: String
    },
    Options: {
      type: Array
    },
    PlaceHolder: {
      type: String,
      default: '선택해주세요.'
    },
    Disabled: {
      type: Boolean,
      default: false
    },
    IsRequired: {
      type: Boolean,
      default: false
    },
    MaxHeight: {
      type: [Number, String],
      default: 'auto'
    },
    ForceDesktopStyle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedValue: '',
      hasError: false,
      isDropdownVisible: false
    }
  },
  computed: {
    isMobile: function () {
      let isMobile =
        ('ontouchstart' in window &&
          (navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0)) ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      return isMobile
    },
    isMobileUx: function () {
      if (this.ForceDesktopStyle) {
        return false
      }
      return this.isMobile
    },
    maxHeight: function () {
      let maxHeight = this.MaxHeight
      if ((typeof maxHeight).toLowerCase() === 'number') {
        return maxHeight + 'px'
      }
      if (maxHeight === 'auto') {
        return null
      }
      return maxHeight
    },
    structuredOptions: function () {
      let options = this.Options
      if (options && typeof options[0] !== 'object') {
        options = options.map((option) => {
          return {
            value: option,
            text: option
          }
        })
      }

      if (options) {
        options.forEach((option) => {
          if (!Object.prototype.hasOwnProperty.call(option, 'isSelectable')) {
            option.isSelectable = true
          }
        })
      }

      return options
    },
    selectedOption: function () {
      return (
        this.structuredOptions &&
        this.structuredOptions.find(({ value }) => value === this.multipleSelectedValue[0])
      )
    },
    multipleSelectedValue: {
      get() {
        return [this.value]
      },
      set(newVal) {
        this.$emit('input', newVal[0])
      }
    }
  },
  watch: {
    selectedValue: function (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    handleKeyDownSelect: function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        // MARK: Space 입력 시 스크롤을 방지한다.
        e.preventDefault()
        this.isDropdownVisible = false
        this.$refs.select.blur()
      }
    },
    handleClickLi: function (option) {
      if (!option.isSelectable) {
        return
      }
      this.multipleSelectedValue = [option.value]
      // MARK: 컴포넌트 모델 데이터에는 할당 되었으나, 실제 select tag value 에는 할당 되지 않아 직접 재할당합니다.
      this.$refs.select.value = this.multipleSelectedValue
      this.isDropdownVisible = false
      // MARK: 아이폰 사파리에서 ForceDesktopStyle 드롭다운 토글하면 네이티브 선택창이 동시에 뜨는 현상이 있어서,
      //       모바일 디바이스에서는 매뉴얼 focus 를 하지 않게 합니다.
      if (!this.isMobile) {
        this.$refs.select.focus()
      }
    },
    toggleDropdown: function (event) {
      let selectBox = this.$refs.selectBox
      let dropdownLiTags = this.$refs.dropdownLiTags
      let isClickedLi = !dropdownLiTags?.every((li) => li === event.target)

      // MARK: 비활성화된 옵션 선택시 닫히지 않게 합니다.
      if (
        event.target?.className &&
        event.target.className.toString().split(' ').includes('disabled-option')
      ) {
        return
      }

      if (event.target === selectBox || (selectBox.contains(event.target) && isClickedLi)) {
        this.isDropdownVisible = !this.isDropdownVisible
        // MARK: 아이폰 사파리에서 ForceDesktopStyle 드롭다운 토글하면 네이티브 선택창이 동시에 뜨는 현상이 있어서,
        //       모바일 디바이스에서는 매뉴얼 focus 를 하지 않게 합니다.
        if (!this.isMobile) {
          this.$refs.select.focus()
        }
      } else {
        this.isDropdownVisible = false
      }
    }
  },
  mounted() {
    if (!this.isMobileUx) {
      // document 이벤트 리스너로 레이어 열고 닫힘을 제어한다
      document.addEventListener('click', this.toggleDropdown)
    }
  },
  unmounted() {
    if (!this.isMobileUx) {
      // 컴포넌트가 제거될 때 이벤트 리스너도 반드시 Clean up.
      document.removeEventListener('click', this.toggleDropdown)
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.styled-select {
  position: relative;
  width: 100%;
  height: 64px;
  max-height: 64px;
  box-sizing: border-box;
  padding: 10px 14px;
  border: 1px solid transparent;
  background: var(--blue-grey-100);
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
}

.without-label {
  height: 44px;
  padding-top: 0px;
}

select.without-label {
  transform: translate(-14px, 0);
}

.dropdown-opened {
  border: 1px solid var(--black) !important;
  background: var(--white);
}

.invisible-select {
  visibility: hidden;
}

select {
  display: block;
  /* styled-select의 패딩값 * 2 만큼 크기를 늘려준다. */
  /* TODO: styled-select의 패딩값을 변수화 해야 한다. */
  width: calc(100% + (2 * 15px));
  height: 64px;
  /* TODO: Label이 있을떄와 없을때 padding-top과 위치를 분기해야한다. */
  padding: 15px 15px 0 14px;
  border: none;
  -webkit-appearance: none;
  appearance: none;
  background: none;
  border-radius: 6px;
  color: var(--blue-grey-700);
  cursor: pointer;
  font-size: 14px;
  outline: none;
  transform: translate(-14px, -27px);
}

option {
  height: 44px;
  padding: 10px 14px;
  border: 1px solid var(--blue-grey-100);
  background: var(--white);
  border-radius: 6px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
}

label {
  color: var(--blue-grey-700);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 16px;
  pointer-events: none;
}

label em {
  color: var(--red-500);
  font-style: normal;
}

.drop-down-icon {
  position: absolute;
  right: 14px;
  bottom: 10px;
  width: 24px;
  height: 24px;
  font-size: 24px;
}

i {
  pointer-events: none;
}

i.ii::before {
  transition: 0.2s all ease;
}
/* pc */

.pc-option-box {
  position: absolute;
  z-index: 10;
  top: 64px;
  left: 0;
  width: 100%;
  border: 1px solid var(--blue-grey-100);
  margin-top: 3px;
  background: var(--white);
  border-radius: 6px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
}

.pc-option-box.pc-without-label {
  top: 44px;
}

.pc-option-ul {
  overflow: hidden;
  width: 100%;
  padding-left: 0px;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 4px;
  list-style-type: none;
  text-align: left;
}

.scroll {
  overflow-y: scroll;
}

.pc-option {
  display: flex;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  align-content: center;
  padding: 10px 14px;
  background: var(--white);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 24px;
  user-select: none;
}

.pc-option .text {
  overflow: hidden;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pc-option .extra {
  flex: 0;
  padding-left: 10px;
  white-space: nowrap;
}

.value-text {
  position: absolute;
  bottom: 14px;
  color: var(--blue-grey-600);
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  pointer-events: none;
  margin: 0;
}

.value-selected {
  color: var(--black);
}

.error {
  border: 1px solid var(--red-500) !important;
}

.disabled {
  border: 1px solid var(--white) !important;
  background: var(--blue-grey-50);
  color: var(--blue-grey-300);
  cursor: not-allowed;
}

.disabled-color {
  color: var(--blue-grey-300);
}

.disabled-color label {
  color: var(--blue-grey-400);
}

.selected {
  background: var(--blue-grey-100) !important;
  font-weight: 700;
}

.disabled-option {
  cursor: not-allowed;
  opacity: 0.6;
}

.select-tag-hide {
  overflow: hidden;
  width: 0;
  height: 0;
}
@media (hover: hover) {
  .styled-select:hover {
    border: 1px solid var(--blue-grey-300);
  }

  .pc-option:hover {
    background: var(--blue-grey-50);
  }

  .disabled-option:hover {
    background-color: transparent;
  }
}

.dark-theme {
  label {
    color: var(--blue-grey-400);
  }
  option {
    border-color: var(--blue-grey-800);
  }
  select {
    color: var(--blue-grey-400);
  }
  .styled-select {
    background: var(--blue-grey-900);
  }
  .dropdown-opened {
    border-color: var(--blue-grey-300) !important;
    background: var(--black);
  }
  .pc-option-box {
    border-color: var(--blue-grey-800);
    background: (--black);
  }

  .pc-option {
    background: var(--black);
  }
  .value-text {
    color: var(--blue-grey-500);
  }
  .value-selected {
    color: var(--blue-grey-300);
  }
  .error {
    border-color: var(--red-700) !important;
  }
  .disabled {
    border-color: var(--blue-grey-900) !important;
    background: var(--blue-grey-900);
    color: var(--blue-grey-700);
  }
  .disabled-color {
    color: var(--blue-grey-700);
  }

  .disabled-color label {
    color: var(--blue-grey-600);
  }

  .selected {
    background: var(--blue-grey-900) !important;
  }

  @media (hover: hover) {
    .styled-select:hover {
      border-color: var(--blue-grey-700);
    }

    .pc-option:hover {
      background: var(--blue-grey-900);
    }
  }
}
</style>
