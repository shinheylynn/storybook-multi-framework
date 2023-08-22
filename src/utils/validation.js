import Vue from "vue";
import Vuelidate from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
Vue.use(Vuelidate);

const rules = {
	// 공통
	username: {
		required,
		minLength: minLength(1),
		maxLength: maxLength(10),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "word");
		},
	},
	birthday: {
		required,
		minLength: minLength(8),
		maxLength: maxLength(8),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	email: {
		required,
		minLength: minLength(1),
		maxLength: maxLength(100),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "email");
		},
	},
	phone: {
		required,
		minLength: minLength(8),
		maxLength: maxLength(20),
		correctFormat: (value) => {
			// 010 으로 시작하는 번호 자릿수 반드시 일치하는지 기본 확인
			if (value && value.indexOf("010") === 0 && value.length < 11) {
				return false;
			}
			return Vue.filter("validate")(value, "tel");
		},
	},
	mobile: {
		required,
		minLength: minLength(10),
		maxLength: maxLength(11),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "mobile");
		},
	},
	telAuthCode: {
		required,
		minLength: minLength(6),
		maxLength: maxLength(6),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "telAuthCode");
		},
	},
	password: {
		minLength: minLength(1),
		maxLength: maxLength(20),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "password");
		},
	},
	points: {
		minLength: minLength(1),
		maxLength: maxLength(10),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	medicash: {
		minLength: minLength(1),
		maxLength: maxLength(15),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	age: {
		minLength: minLength(1),
		maxLength: maxLength(3),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	// 가입프로필 전용
	nickname: {
		minLength: minLength(2),
		maxLength: maxLength(20),
	},
	usercareer: {
		minLength: minLength(2),
		maxLength: maxLength(100),
	},
	// 가입인증 전용
	licenseNumber: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(20),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "word");
		},
	},
	licenseDate: {
		required,
		minLength: minLength(8),
		maxLength: maxLength(8),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	school: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(10),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "shortText");
		},
	},
	schoolYear: {
		required,
		minLength: minLength(2),
		maxLength: maxLength(2),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	referral: {
		minLength: minLength(1),
		maxLength: maxLength(20),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "shortText");
		},
	},
	// 주문서 전용
	full_name: {
		required,
		minLength: minLength(1),
		maxLength: maxLength(30),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "word");
		},
	},
	postal_code: {
		minLength: minLength(5),
		maxLength: maxLength(5),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	address1: {
		required,
		minLength: minLength(1),
		maxLength: maxLength(100),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "longText");
		},
	},
	address2: {
		minLength: minLength(1),
		maxLength: maxLength(100),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "longText");
		},
	},
	company: {
		required,
		minLength: minLength(1),
		maxLength: maxLength(100),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "shortText");
		},
	},
	tax_number: {
		required,
		minLength: minLength(10),
		maxLength: maxLength(10),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	tax_number_yoyang: {
		required,
		minLength: minLength(8),
		maxLength: maxLength(8),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	order_comments: {
		minLength: minLength(0),
		maxLength: maxLength(20),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "longText");
		},
	},
	// 주문 상담하기 전용
	note_quantity: {
		required,
		minLength: minLength(1),
		maxLength: maxLength(100),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "shortText");
		},
	},
	note_lowest_price: {
		minLength: minLength(1),
		maxLength: maxLength(100),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "shortText");
		},
	},
	// 간편결제 전용
	card_number: {
		minLength: minLength(3),
		maxLength: maxLength(4),
		required,
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	card_expiry_year: {
		minLength: minLength(2),
		maxLength: maxLength(2),
		required,
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	card_expiry_month: {
		minLength: minLength(2),
		maxLength: maxLength(2),
		required,
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	card_birth: {
		minLength: minLength(6),
		maxLength: maxLength(10),
		required,
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	card_pwd_2digit: {
		minLength: minLength(2),
		maxLength: maxLength(2),
		required,
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	// 환불계좌정보
	accountNumber: {
		required,
		minLength: minLength(1),
		maxLength: maxLength(30),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "number");
		},
	},
	accountHolder: {
		required,
		minLength: minLength(2),
		maxLength: maxLength(20),
	},
	cardNickname: {
		minLength: minLength(1),
		maxLength: maxLength(10),
	},
	// 검색 키워드
	searchKeyword: {
		minLength: minLength(1),
		maxLength: maxLength(10),
		correctFormat: (value) => {
			return Vue.filter("validate")(value, "word");
		},
	},
};

export default rules;
