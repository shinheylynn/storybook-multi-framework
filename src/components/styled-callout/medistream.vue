<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		v-if="display"
		class="styled-callout"
		:style="{ 'padding-right': Dismissable ? '54px' : '' }"
	>
		<div class="box">
			<div
				v-if="Outlined"
				class="border"
				:style="{ 'border-color': Color }"
			></div>
			<div
				class="bg"
				:style="{ 'background-color': Color, 'border-color': Color }"
			></div>
		</div>
		<div v-if="$slots.left" class="left">
			<slot name="left"></slot>
		</div>
		<div class="center">
			<div class="text" :style="{ color: 'var(--black)' }">
				<h4 v-if="Title" v-html="Title"></h4>
				<p v-if="Content">{{ Content }}</p>
			</div>
			<div v-if="$slots.bottom" class="bottom">
				<slot name="bottom"></slot>
			</div>
		</div>
		<div v-if="$slots.right" class="right">
			<slot name="right"></slot>
		</div>
		<button
			class="close"
			v-if="Dismissable"
			click="
        display = false
        $emit('close')
      "
			type="button"
		>
			<i class="ii ii-remove"></i>
		</button>
	</div>
</template>

<script>
import "../../colors/medistream.variables.scss";
import "inticons/fonts/inticons.bundle.min.css";

export default {
	props: {
		Title: {
			type: String,
		},
		Content: {
			type: String,
		},
		Color: {
			type: String,
			default: "var(--blue-600)",
		},
		Dismissable: {
			type: Boolean,
			default: false,
		},
		Outlined: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			display: true,
		};
	},
};
</script>

<style lang="scss" scoped>
.styled-callout {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 14px;
	gap: 14px;
	width: 320px;

	.box {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.border,
	.bg {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: 10px;
	}

	.border {
		border: 1px solid transparent;
	}

	.bg {
		opacity: 0.1;
	}

	.text {
		position: relative;
		line-height: 150%;
		color: var(--black);
		p {
			opacity: 0.5;
			font-size: 11px;
			line-height: 14px;
		}
	}

	h4 {
		overflow: hidden;
		font-size: 13px;
		line-height: 18px;
		font-weight: bold;
		text-overflow: ellipsis;
		white-space: nowrap;

		/* >>> i,
    >>> svg,
    >>> img */
		:deep i,
		:deep svg,
		:deep img {
			margin-right: 2px;
			vertical-align: -3px;
		}
	}

	h4 + p {
		margin-top: 5px;
	}

	.close {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		width: 44px;
		height: 100%;
		border: none;
		background-color: transparent;
		color: var(--blue-grey-600);
		cursor: pointer;
		font-size: 20px;
		&:before {
			content: "";
			position: absolute;
			top: 14px;
			bottom: 14px;
			left: 0;
			width: 1px;
			background-color: rgba(0, 0, 0, 0.1);
		}
		&:hover {
			color: var(--blue-grey-800);
		}
	}

	.center {
		flex: 1;
		max-width: 100%;
	}

	.left {
		margin-right: 15px;
	}

	.right {
		margin-left: 5px;
	}

	.bottom {
		margin-top: 15px;
	}

	/*
    >>> 이 일부 환경에서 인식되지 않는 경우 대체 표현
    https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
  */
	/* /* >>> img, */
	:deep img {
		max-width: 100%;
	}
}
</style>
