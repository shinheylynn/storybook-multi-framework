<template>
	<span class="tooltip-message">
		<span
			v-if="isMobile && mode === 'hover'"
			v-on:click.stop="toggleVisibilityLocally(!localVisibility)"
		>
			<slot></slot>
		</span>
		<span
			v-else-if="mode === 'hover'"
			v-on:mouseenter="toggleVisibilityLocally(true)"
			v-on:mouseleave="toggleVisibilityLocally(false)"
		>
			<slot></slot>
		</span>
		<slot v-else></slot>
		<transition name="fade">
			<div v-bind:style="computedPosition" v-if="modeDependency" class="bubble">
				<div id="message">
					<h4 v-if="title">{{ title }}</h4>
					<pre>{{ message }}</pre>
				</div>
				<div id="close" v-if="closeButton">
					<button type="button" v-on:click="close">창닫기</button>
				</div>
				<span v-bind:style="automatedTailPosition" id="tail"></span>
			</div>
		</transition>
	</span>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
		message: {
			type: String,
			default: "메시지를 입력해주세요",
		},
		position: {
			type: String,
			default: "top",
			validator: function (value) {
				if (["top", "bottom", "left", "right"].indexOf(value) <= -1) {
					throw new Error(
						"[Tooltip] The position value must be one of the following. (top|bottom|left|right)."
					);
				} else {
					return true;
				}
			},
		},
		alignment: {
			type: String,
			default: "center",
		},
		closeButton: {
			type: Boolean,
			default: true,
		},
		visibility: {
			type: Boolean,
		},
		mode: {
			type: String,
			default: "default",
		},
		offset: {
			type: Number,
			default: 0,
		},
		offsetX: {
			type: Number,
			default: 0,
		},
		offsetY: {
			type: Number,
			default: 0,
		},
		closeTiming: {
			type: Number,
			default: 3000,
		},
	},
	data() {
		return {
			localVisibility: false,
			isMobile: this.$options.filters.isMobile(),
			timer: null,
		};
	},
	emits: ["closeTooltip"],
	computed: {
		modeDependency() {
			return this.mode === "hover" ? this.localVisibility : this.visibility;
		},

		computedPosition() {
			switch (this.position) {
				case "bottom":
					return `top:${140 + this.offset}%;left:50%;transform:${
						this.computedAlignment.bubble
					}`;
				case "left":
					return `top:50%;right:${120 + this.offset}%;transform:${
						this.computedAlignment.bubble
					}`;
				case "right":
					return `top:50%;left:${120 + this.offset}%;transform:${
						this.computedAlignment.bubble
					}`;
				case "top":
					return `bottom:${140 + this.offset}%;left:50%;transform:${
						this.computedAlignment.bubble
					}`;
			}
			return null;
		},

		computedAlignment() {
			if (this.position === "top" || this.position === "bottom") {
				switch (this.alignment) {
					case "center":
						return {
							bubble: `translateX(-50%) translateX(${this.offsetX}px) translateY(${this.offsetY}px)`,
							tail: "left:50%",
						};
					case "right":
						return {
							bubble: `translateX(-85%) translateX(${this.offsetX}px) translateY(${this.offsetY}px)`,
							tail: "left:85%",
						};
					case "left":
						return {
							bubble: `translateX(-15%) translateX(${this.offsetX}px) translateY(${this.offsetY}px)`,
							tail: "left:15%",
						};
					default:
						throw new Error(
							"[Tooltip] The horizontal alignment value must be one of the following. (center|right|left)"
						);
				}
			} else if (this.position === "left" || this.position === "right") {
				switch (this.alignment) {
					case "middle":
						return {
							bubble: `translateY(-50%) translateX(${this.offsetX}px) translateY(${this.offsetY}px)`,
							tail: "top:50%",
						};
					case "top":
						return {
							bubble: `translateY(-25%) translateX(${this.offsetX}px) translateY(${this.offsetY}px)`,
							tail: "top:25%",
						};
					case "bottom":
						return {
							bubble: `translateY(-70%) translateX(${this.offsetX}px) translateY(${this.offsetY}px)`,
							tail: "top:70%",
						};
					default:
						throw new Error(
							"[Tooltip] The vertical alignment value must be one of the following. (middle|top|bottom)"
						);
				}
			}
			return null;
		},
		automatedTailPosition() {
			switch (this.position) {
				case "bottom":
					return `top:-4px;${this.computedAlignment.tail};transform:;transform:translateX(-50%)`;
				case "left":
					return `right:-6px;${this.computedAlignment.tail};transform:translateY(-50%)rotate(90deg)`;
				case "right":
					return `left:-6px;${this.computedAlignment.tail};transform:translateY(-50%)rotate(270deg)`;
				case "top":
					return `bottom:-4px;${this.computedAlignment.tail};transform:translateX(-50%)rotate(180deg)`;
			}
			return null;
		},
	},
	methods: {
		close() {
			if (this.mode === "default") {
				this.$emit("closeTooltip");
			} else {
				this.toggleVisibilityLocally(false);
			}
		},
		toggleVisibilityLocally(value) {
			this.localVisibility = value;
		},
	},
	mounted() {
		if (this.mode === "default" && this._events.closeTooltip === undefined) {
			throw new Error(
				'Custom event "closeTooltip" should be provided when the "mode" prop is set as a default'
			);
		}
		if (this.mode === "default" && this.visibility === undefined) {
			throw new Error(
				'"visibility" prop is required when the "mode" prop is set as a default.'
			);
		}
	},
	watch: {
		localVisibility(newValue) {
			if (this.isMobile && newValue) {
				this.timer = setTimeout(() => {
					this.localVisibility = false;
				}, this.closeTiming);
			} else if (!newValue) {
				clearTimeout(this.timer);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.tooltip-message {
	position: relative;
	z-index: 99;
	display: inline-block;

	& > div.bubble {
		position: absolute;
		display: flex;
		padding: 8px;
		background-color: var(--blue-grey-900);
		border-radius: 3px;

		div#message {
			padding-right: 3px;

			h4 {
				padding: 0;
				margin: 0;
				margin-bottom: 4px;
				color: var(--white);
				font-size: 12px;
				font-weight: 700;
				letter-spacing: -0.1px;
				white-space: nowrap;
			}

			pre {
				color: var(--white);
				font-family: inherit;
				font-size: 12px;
				font-weight: 400;
				line-height: 140%;
			}
		}

		div#close {
			display: flex;

			button {
				width: 15px;
				height: 15px;
				border: none;
				margin-left: 3px;
				background: none;
				background-image: url("../../assets/ico-close-white.svg");
				background-repeat: no-repeat;
				background-size: cover;
				cursor: pointer;
				font-size: 0;
				-webkit-tap-highlight-color: transparent;
			}
		}

		#tail {
			position: absolute;
			width: 8px;
			height: 4px;
			background-image: url("../../assets/ico-tooltip-point.svg");
			background-repeat: no-repeat;
			background-size: cover;
		}
	}
}
</style>
