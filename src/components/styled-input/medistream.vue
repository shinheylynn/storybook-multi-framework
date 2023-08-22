<template>
	<div class="styled-input">
		<!-- input[type="text"][type="email"][type="number"][type="password"] 유형 -->
		<div
			v-if="isTextType"
			v-bind:class="[
				'default-input',
				{ error: isValueUnPassed },
				{ disabled: Disabled },
			]"
		>
			<div class="input-wrapper">
				<label
					v-if="Label"
					v-bind:for="Name"
					v-bind:class="Disabled && 'disabled'"
				>
					{{ Label }}
					<em v-if="isRequiredType">*</em>
				</label>
				<div
					v-bind:class="[
						'input-container',
						{
							'value-passed': isValuePassed,
							'value-unpassed': isValueUnPassed,
						},
					]"
				>
					<input
						autocomplete="off"
						v-bind:value="$v[Name].$model"
						v-on:keydown="$emit('keydown', $event)"
						v-on:keyup="
							$emit('keyup', $event);
							tidyInputsUp(Name, $event);
						"
						v-on:input="tidyInputsUp(Name, $event)"
						v-on:focus="
							$emit('focus', $event);
							inputFocused();
						"
						v-on:blur="
							$emit('blur', $event);
							inputFocused();
						"
						v-bind:type="Type"
						v-bind:id="Name"
						v-bind:maxlength="$v[Name].$params.maxLength.max"
						v-bind:placeholder="Placeholder"
						v-bind:readonly="Readonly"
						v-bind:disabled="Disabled"
						v-bind:class="[
							inputClasses,
							{ 'text-align-right': TextAlign === 'right' },
						]"
					/>
				</div>
			</div>
			<span class="input-extentions">
				<span
					v-if="!Disabled"
					v-bind:class="['state-icon', { 'with-label': Label }]"
				>
					<transition name="bounce" mode="out-in">
						<i
							v-if="isValuePassed && !isValueUnPassed"
							class="icon ii-check"
							key="success"
						></i>
						<i
							v-else-if="isValueUnPassed"
							class="icon ii-warning-circle-outline error-color"
							key="error"
						></i>
					</transition>
				</span>
				<span v-bind:class="['state-icon', { 'with-label': Label }]">
					<i
						v-if="Clearable && !Disabled && $v[Name].$model"
						v-bind:class="[
							'icon ii-remove-circle',
							{ 'button-focused': isFocused || $v[Name].$model },
						]"
						v-on:click="$emit('clear')"
					></i>
				</span>
				<span v-if="isSlotAppendExists" v-bind:class="{ 'with-label': Label }">
					<!-- <div
              v-bind:class="[
                'focused',
                { 'un-focused': isFocused || $v[Name].$model },
              ]">
              <slot name="append"></slot>
            </div> -->
					<slot name="append"></slot>
				</span>
			</span>
			<div class="tooltip-wrapper">
				<tooltip-message
					v-if="$v[Name].$anyError && !isFocused && ShowTooltipHint"
					v-bind:visibility="true"
					v-bind:message="moreHint"
					v-bind:position="'bottom'"
					v-bind:alignment="'left'"
					v-bind:closeButton="false"
					v-on:closeTooltip="true"
				>
				</tooltip-message>
			</div>
		</div>
		<small v-if="Comments" class="comments">{{ Comments }}</small>
	</div>
</template>

<script>
import required from "vuelidate/lib/validators";

import rules from "../../utils/validation";

import TooltipMessage from "../../utils/TooltipMessage.vue";

export default {
	props: {
		value: {
			// Comes from 'v-model' value of component element
			type: [Number, String],
		},
		Type: {
			type: String,
			default: "text",
		},
		Name: {
			required,
			type: String,
		},
		Label: {
			type: String,
		},
		Placeholder: {
			type: String,
		},
		Readonly: {
			type: Boolean,
			default: false,
		},
		Comments: {
			type: String,
			default: "",
		},
		MoreHint: {
			type: String,
			default: "올바른 형식을 입력해야 합니다.",
		},
		Disabled: {
			type: Boolean,
			default: false,
		},
		Clearable: {
			type: Boolean,
			default: false,
		},
		// TODO: Optional props 를 추후 제거한다 2022-12-22
		Optional: {
			type: Boolean,
			default: false,
		},
		IsUpdateVModelEvenifInvalidValue: {
			type: Boolean,
			default: false,
		},
		TextAlign: {
			type: String,
			default: "left", // left, right
		},
		ShowTooltipHint: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			rules: rules,
			isFocused: false,
			// 공통
			username: this.value || "",
			nickname: this.value || "",
			usercareer: this.value || "",
			birthday: this.value || "",
			email: this.value || "",
			phone: this.value || "",
			mobile: this.value || "",
			telAuthCode: this.value || "", // 휴대폰 인증번호
			password: this.value || "",
			points: this.value || "",
			medicash: this.value || "",
			age: this.value || "",
			// 가입인증 전용
			licenseNumber: this.value || "",
			licenseDate: this.value || "",
			school: this.value || "",
			schoolYear: this.value || "",
			referral: this.value || "",
			//
			// 마켓 관련 폼 모델 속성명은 Cezerin API의 속성과 동일하게 사용합니다.
			// 속성명이 같더라도 실제 레이블은 다르게 사용하는 케이스가 있습니다.
			// e.x. ['받는 분', '이름'] 둘 다 full_name 속성값을 사용하지만 표현은 다름.
			//
			// 주문서 전용
			full_name: this.value || "",
			postal_code: this.value || "",
			address1: this.value || "",
			address2: this.value || "",
			company: this.value || "",
			tax_number: this.value || "",
			tax_number_yoyang: this.value || "",
			order_comments: this.value || "",
			// 간편결제 전용
			card_number: this.value || "",
			card_expiry_year: this.value || "",
			card_expiry_month: this.value || "",
			card_birth: this.value || "",
			card_pwd_2digit: this.value || "",
			// 상담신청 전용
			note_quantity: this.value || "",
			note_lowest_price: this.value || "",
			isMobile: this.$options.filters.isMobile(),
			// 환불계좌정보
			accountNumber: this.value || "",
			accountHolder: this.value || "",
			// 카드별명
			cardNickname: this.value || "",
			// 검색 키워드 등록
			searchKeyword: this.value || "",
		};
	},

	watch: {
		value: {
			immediate: true,
			handler: function (newVal, oldVal) {
				this[this.Name] = newVal;
			},
			deep: true,
		},
		// 공통
		username: function (newVal, oldVal) {
			if (
				!this.$v["username"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		birthday: function (newVal, oldVal) {
			if (
				!this.$v["birthday"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		email: function (newVal, oldVal) {
			if (!this.$v["email"].$invalid || this.IsUpdateVModelEvenifInvalidValue) {
				this.$emit("input", newVal);
			}
		},
		phone: function (newVal, oldVal) {
			if (!this.$v["phone"].$invalid || this.IsUpdateVModelEvenifInvalidValue) {
				this.$emit("input", newVal);
			}
		},
		mobile: function (newVal, oldVal) {
			if (
				!this.$v["mobile"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		telAuthCode: function (newVal, oldVal) {
			if (!this.$v["telAuthCode"].$invalid) {
				this.$emit("input", newVal);
			}
		},
		password: function (newVal, oldVal) {
			if (
				!this.$v["password"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		points: function (newVal, oldVal) {
			if (
				!this.$v["points"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		medicash: function (newVal, oldVal) {
			if (
				!this.$v["medicash"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		age: function (newVal, oldVal) {
			if (!this.$v["age"].$invalid || this.IsUpdateVModelEvenifInvalidValue) {
				this.$emit("input", newVal);
			}
		},
		// 가입프로필 전용
		nickname: function (newVal) {
			if (
				!this.$v["nickname"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		usercareer: function (newVal) {
			if (
				!this.$v["usercareer"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		// 가입인증 전용
		licenseNumber: function (newVal, oldVal) {
			if (
				!this.$v["licenseNumber"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		licenseDate: function (newVal, oldVal) {
			if (
				!this.$v["licenseDate"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		school: function (newVal, oldVal) {
			if (
				!this.$v["school"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		schoolYear: function (newVal, oldVal) {
			if (
				!this.$v["schoolYear"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		referral: function (newVal, oldVal) {
			if (
				!this.$v["referral"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		// 주문서 전용
		full_name: function (newVal, oldVal) {
			if (
				!this.$v["full_name"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		postal_code: function (newVal, oldVal) {
			if (
				!this.$v["postal_code"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		address1: function (newVal, oldVal) {
			if (
				!this.$v["address1"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		address2: function (newVal, oldVal) {
			if (
				!this.$v["address2"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		company: function (newVal, oldVal) {
			if (
				!this.$v["company"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		tax_number: function (newVal, oldVal) {
			if (
				!this.$v["tax_number"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		tax_number_yoyang: function (newVal, oldVal) {
			if (
				!this.$v["tax_number_yoyang"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		order_comments: function (newVal, oldVal) {
			this.$emit("input", newVal);
		},
		// 주문 상담하기 전용
		note_quantity: function (newVal, oldVal) {
			if (
				!this.$v["note_quantity"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		note_lowest_price: function (newVal, oldVal) {
			if (
				!this.$v["note_lowest_price"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		// 간편결제 전용
		card_number: function (newVal, oldVal) {
			if (
				!this.$v["card_number"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			} else {
				this.card_number = newVal.replace(/[^\d]/g, "");
			}
		},
		card_expiry_year: function (newVal, oldVal) {
			if (
				!this.$v["card_expiry_year"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		card_expiry_month: function (newVal, oldVal) {
			if (
				!this.$v["card_expiry_month"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		card_birth: function (newVal, oldVal) {
			if (
				!this.$v["card_birth"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			} else {
				this.card_birth = newVal.replace(/[^\d]/g, "");
			}
		},
		card_pwd_2digit: function (newVal, oldVal) {
			if (
				!this.$v["card_pwd_2digit"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		// 환불계좌정보
		accountNumber: function (newVal, oldVal) {
			if (
				!this.$v["accountNumber"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			} else {
				this.accountNumber = newVal.replace(/[^\d]/g, "");
			}
		},
		accountHolder: function (newVal, oldVal) {
			if (
				!this.$v["accountHolder"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		cardNickname: function (newVal, oldVal) {
			if (
				!this.$v["cardNickname"].$invalid ||
				this.IsUpdateVModelEvenifInvalidValue
			) {
				this.$emit("input", newVal);
			}
		},
		// 검색 키워드는 Validate 통과하지 못해도 입력됩니다.
		searchKeyword: function (newVal, oldVal) {
			this.$emit("input", newVal);
		},
	},

	computed: {
		moreHint: function () {
			if (this.$v[this.Name].$anyError) {
				if (!this.Optional && this.$v[this.Name].required === false) {
					return "필수 입력 항목입니다.";
				}
				if (!this.$v[this.Name].minLength) {
					return "너무 짧습니다";
				}
				if (!this.$v[this.Name].maxLength) {
					return "너무 깁니다";
				}
				if (
					!this.$v[this.Name].correctFormat &&
					this.$v[this.Name].$model.length
				) {
					return this.MoreHint;
				}
			}
			return "";
		},
		inputClasses: function () {
			return {
				disabled: this.Disabled,
				"no-label": !this.Label,
				readOnly: this.Readonly,
			};
		},
		fieldType: function () {
			// MARK: 모바일에서 사용자가 쉽게 숫자를 입력할 수 있는 인터페이스 제공하기 위해 tel 을 강제합니다.
			if (this.Type === "tel") {
				let fieldType = this.isMobile ? "tel" : "text";
				return fieldType;
			}
			return this.Type;
		},
		isValuePassed: function () {
			return (
				!this.Readonly &&
				!this.$v[this.Name].$invalid &&
				this.$v[this.Name].required
			);
		},
		isValueUnPassed: function () {
			return !this.Optional && !this.Readonly && this.$v[this.Name].$anyError;
		},
		isTextType: function () {
			return (
				["text", "email", "number", "password", "tel"].indexOf(this.Type) > -1
			);
		},
		isRequiredType: function () {
			return (
				!this.Optional &&
				this.$v[this.Name].$params.required &&
				this.$v[this.Name].$params.required.type === "required"
			);
		},
		isSlotAppendExists: function () {
			const slotAppend = this.$slots.append;
			if (slotAppend) {
				return true;
			} else {
				return false;
			}
		},
	},
	validations() {
		return this.rules;
	},

	methods: {
		inputFocused: function () {
			this.isFocused = !this.isFocused;
		},
		tidyInputsUp: function (fieldName, event) {
			// MARK: 모바일 환경 혹은 입력 이벤트가 정확히 발동되지 않을 때,
			// MARK: model 값에 마지막 글자나 단어가 누락되는 현상을 방어하기 위한 조치로 입력필드 value 를 강제로 modal 에 밀어넣습니다.
			this.$v[fieldName].$model = event.target.value;
		},
		cleanUpInput: function (fieldName) {
			this.$v[fieldName].$model = "";
		},
	},

	components: { TooltipMessage },
};
</script>

<style scoped>
label {
	position: absolute;
	z-index: 1;
	top: 0.5rem;
	left: 0.6rem;
	width: fit-content;
	flex: none;
	flex-grow: 0;
	align-self: stretch;
	order: 0;
	color: var(--blue-grey-600-to-500);
	font-feature-settings: "case" on, "ss02" on;
	font-size: 12px;
	font-style: normal;
	font-weight: 700;
	letter-spacing: -0.01em;
	line-height: 16px;
}

label em {
	color: var(--red-500);
	font-style: normal;
}

.no-label {
	width: 100%;
	padding: 15px 0 15px 0;
	border: none;
	background: none;
	border-radius: 6px;
	text-indent: 0.6rem;
}

.no-label:focus {
	padding: 15px 0 15px 0;
}

.with-label {
	padding-top: 10px;
}

small {
	margin-top: 12px;
	color: var(--blue-grey-500-to-600);
	font-size: 12px;
}

input::-webkit-input-placeholder,
input::placeholder {
	color: var(--blue-grey-400-to-600);
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
	margin: 0;
	-webkit-appearance: none;
}

input:-ms-input-placeholder {
	/*! autoprefixer: off */
	/* IE 11 needs the !important flag to override the default user agent styles. */
	color: var(--blue-grey-400-to-600) !important;
}

input {
	width: 100%;
	padding: 30px 0 10px;
	border: none;
	background: none;
	border-radius: 6px;
	color: var(--black-to-blue-grey-300);
	font-size: 14px;
	text-indent: 0.6rem;
}

input.text-align-right {
	text-align: right;
}

input:focus {
	padding: 30px 0 10px;
	outline: none;
}

input:disabled::placeholder {
	background-color: var(--blue-grey-50-to-900);
	color: var(--blue-grey-300-to-700);
}

.state-icon {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	color: var(--blue-grey-400-to-600);
}

.error {
	border: 1px solid var(--red-500) !important;
}

.error-color {
	color: var(--red-500);
}

.default-input {
	position: relative;
	display: flex;
	align-items: center;
	padding-right: 11px;
	border: 1px solid var(--white-to-black);
	margin-bottom: 5px;
	background: var(--blue-grey-100-to-900);
	border-radius: 6px;
	transition: border 0.08s, background-color 0.08s;
}

.default-input.disabled,
.default-input.disabled label {
	padding-right: 21px;
	background-color: var(--blue-grey-50-to-900);
	border-radius: 6px;
	color: var(--blue-grey-400-to-600);
	cursor: not-allowed;
	pointer-events: none;
}

.default-input:hover {
	border: 1px solid var(--blue-grey-300-to-700);
	background: var(--blue-grey-50-to-900);
}

.default-input:focus-within {
	border: 1px solid var(--blue-grey-700-to-200);
	background: var(--white-to-black);
}

.default-input:focus {
	border: 1px solid var(--blue-grey-700-to-200);
	background: var(--white-to-black);
}

.input-extentions {
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: center;
	padding-left: 10px;
}

.input-wrapper {
	width: 100%;
}

.icon {
	padding: 4px 1.5px 0 0;
	font-size: 18px;
	-webkit-text-stroke: 0.1px;
}

.tooltip-wrapper {
	position: absolute;
	bottom: -8px;
	left: 20px;
}

.focused {
	color: var(--blue-grey-700-to-400);
	cursor: pointer;
	opacity: 0.3;
	transition: opacity 0.08s;
}

.un-focused {
	opacity: 1;
}

.button-focused {
	color: var(--blue-grey-700-to-400);
	cursor: pointer;
}

/* .button {
    margin: 0 5px 0 10px;
    pointer-events: none;
  } */

.comments {
	padding: 7px;
}
</style>
