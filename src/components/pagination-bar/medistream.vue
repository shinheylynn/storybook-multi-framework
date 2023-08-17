<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div v-if="SyncRouter" class="pagination-bar">
		<template v-if="!isWebview">
			<router-link
				v-if="prevQuery"
				class="prev"
				title="이전"
				:to="{ query: prevQuery }"
			>
				<i class="ii ii-chevron-left ii-weight-600"></i>
			</router-link>
			<router-link
				v-for="page in pages"
				v-bind:key="page.number"
				v-bind:class="{ active: page.active }"
				:to="{ query: page.query }"
			>
				<strong v-if="page.active">{{ page.number }}</strong>
				<span v-else>{{ page.number }}</span>
			</router-link>
			<router-link
				v-if="nextQuery"
				class="next"
				title="다음"
				:to="{ query: nextQuery }"
			>
				<i class="ii ii-chevron-right ii-weight-600"></i>
			</router-link>
		</template>
		<!-- MARK: 웹뷰인 경우 router replace 를 해서 뒤로 가면 마켓으로 돌아가게 한다 -->
		<template v-else>
			<router-link
				v-if="prevQuery"
				class="prev"
				title="이전"
				:to="{ query: prevQuery }"
				replace
			>
				<i class="ii ii-chevron-left ii-weight-600"></i>
			</router-link>
			<router-link
				v-for="page in pages"
				v-bind:key="page.number"
				v-bind:class="{ active: page.active }"
				:to="{ query: page.query }"
				replace
			>
				<strong v-if="page.active">{{ page.number }}</strong>
				<span v-else>{{ page.number }}</span>
			</router-link>
			<router-link
				v-if="nextQuery"
				class="next"
				title="다음"
				:to="{ query: nextQuery }"
				replace
			>
				<i class="ii ii-chevron-right ii-weight-600"></i>
			</router-link>
		</template>
	</div>
	<!-- MARK: 라우터와 별개로 동작하는 Pagination -->
	<div class="pagination-bar" v-else>
		<a v-if="prevPagesExist" class="prev" title="이전" v-on:click="toPrevPages">
			<i class="ii ii-chevron-left ii-weight-600"></i>
		</a>
		<a
			v-for="pageNumber in Array(PagesCount)
				.fill(null)
				.map((x, i) => basePageNumber + i + 1)
				.filter((pageNumber) => (pageNumber - 1) * Limit < AllItemsCount)"
			v-bind:key="pageNumber"
			v-bind:class="{ active: pageNumber === currentPage }"
			v-on:click="toPage(pageNumber)"
		>
			<strong v-if="pageNumber === currentPage">{{ pageNumber }}</strong>
			<span v-else>{{ pageNumber }}</span>
		</a>
		<a v-if="nextPagesExist" class="next" title="다음" v-on:click="toNextPages">
			<i class="ii ii-chevron-right ii-weight-600"></i>
		</a>
	</div>
</template>

<script>
import "../../colors/medistream.variables.scss";
import { isWebview } from "../../../src/utils/webview";
export default {
	props: {
		SyncRouter: {
			type: Boolean,
			default: true,
		},
		Limit: {
			type: Number,
			default: 10,
		},
		Start: {
			type: Number,
			default: 0,
		},
		AllItemsCount: {
			type: Number,
			default: 10000,
		},
		PagesCount: {
			type: Number,
			default: 5,
		},
	},
	data() {
		return {
			pages: [],
			prevQuery: null,
			nextQuery: null,
			// syncRouter: false일 때만 사용하는 값들 ---
			basePageNumber: 0,
			limit: this.Limit,
			start: this.Start,
			prevPagesExist: false,
			nextPagesExist: this.AllItemsCount > this.PagesCount * this.Limit,
			// -------------------------------------
			isWebview: isWebview(),
		};
	},
	created() {
		this.setPages();
	},
	watch: {
		AllItemsCount(newVal, oldVal) {
			if (newVal !== oldVal) {
				this.reset();
			}
		},
		Limit() {
			this.reset();
		},
	},
	computed: {
		currentPage() {
			return Math.floor(this.Start / this.Limit) + 1;
		},
	},
	methods: {
		setPages: function () {
			this.pages = [];
			this.prevQuery = null;
			this.nextQuery = null;

			// 현재 페이지 URL 에 검색 쿼리가 있다고 가정합니다.
			// 쿼리에는 반드시 'limit' 와 'start' 파라미터가 있어야 합니다.
			// e.g. "/search?keyword=foo&type=bar&limit=10&start=0"
			var _this = this;
			var QueryModel = function () {
				return JSON.parse(JSON.stringify(_this.$route.query));
			};
			// this.PagesCount 값(갯수) 만큼 페이지 항목을 만듭니다. (e.x. 1...5 까지)
			for (var i = 0; i < this.PagesCount; i++) {
				var n, a;
				// 페이지 숫자: 목록 당 항목 갯수와 페이지 노출 갯수에 따른 값을 도출합니다.
				n =
					i +
					1 +
					this.PagesCount *
						Math.floor(this.Start / (this.Limit * this.PagesCount));
				// 현재 페이지: 도출된 페이지 숫자와 this.Start, this.limit 근거로 산출한 값이 일치하면 현재 페이지로 인정합니다.
				if (n === Math.floor(this.Start / this.Limit) + 1) {
					a = true;
				} else {
					a = false;
				}
				// 페이지 링크: 현재 주소창의 쿼리 값 중 limit 와 start 항목만 새로 계산하여 덮어쓰기 합니다.
				var queryPage = new QueryModel();
				queryPage.limit = this.Limit;
				queryPage.start = this.Limit * (n - 1);
				// 완성된 값들을 this.pages 배열에 축적합니다.
				// 단, 페이지에 포함된 총 항목 갯수가 전체 갯수(this.AllItemsCount)를 넘는 경우에는 피합니다.
				if (this.AllItemsCount + this.Limit > this.Limit * n) {
					this.pages.push({
						number: n,
						active: a,
						query: queryPage,
					});
				}
				// 이제, template 에서는 this.pages 내용 대로 뿌리기만 합니다.
				// HTML 내에서 연산은 피하도록 합니다.
			}
			// 이전 버튼 쿼리를 만듭니다.
			var queryPrev = new QueryModel();
			queryPrev.limit = this.Limit;
			queryPrev.start = this.pages[0].query.start - this.Limit;
			if (queryPrev.start >= 0) {
				this.prevQuery = queryPrev;
			}
			// 다음 버튼 쿼리를 만듭니다.
			var queryNext = new QueryModel();
			queryNext.limit = this.Limit;
			queryNext.start =
				this.pages[this.pages.length - 1].query.start + this.Limit;
			if (queryNext.start < this.AllItemsCount) {
				this.nextQuery = queryNext;
			}
		},
		// syncRouter: false일 때만 사용하는 methods들 ---
		reset: function () {
			this.basePageNumber = 0;

			this.nextPagesExist =
				this.AllItemsCount >
				(this.basePageNumber + this.PagesCount) * this.Limit;
			this.prevPagesExist = this.basePageNumber > 0;

			this.start = 0;
			this.limit = this.Limit;
		},
		toPrevPages: function () {
			this.basePageNumber -= this.PagesCount;

			this.start = (this.basePageNumber + this.PagesCount - 1) * this.Limit;

			this.nextPagesExist =
				this.AllItemsCount >
				(this.basePageNumber + this.PagesCount) * this.Limit;
			this.prevPagesExist = this.basePageNumber > 0;

			this.$emit("OnPaginationChanged", {
				start: this.start,
				limit: this.limit,
			});
		},
		toPage: function (pageNumber) {
			this.start = (pageNumber - 1) * this.Limit;

			this.$emit("OnPaginationChanged", {
				start: this.start,
				limit: this.limit,
			});
		},
		toNextPages: function () {
			this.basePageNumber += this.PagesCount;
			// this.currentPage = this.basePageNumber + 1

			this.start = this.basePageNumber * this.Limit;

			this.nextPagesExist =
				this.AllItemsCount >
				(this.basePageNumber + this.PagesCount) * this.Limit;
			this.prevPagesExist = this.basePageNumber > 0;

			this.$emit("OnPaginationChanged", {
				start: this.start,
				limit: this.limit,
			});
		},
		// -------------------------------------------
	},
};
</script>

<style lang="scss" scoped>
a {
	cursor: pointer;
}

.pagination-bar {
	margin: 30px 0 80px;
	font-size: 0;
	text-align: center;
}

.pagination-bar a {
	display: inline-block;
	min-width: 32px;
	height: 42px;
	padding: 0 5px;
	margin: 0 2px;
	background: none;
	border-radius: 6px;
	color: var(--blue-grey-500);
	font-family: "Inter";
	font-size: 15px;
	font-weight: 600;
	line-height: 40px;
	outline: none;
	text-align: center;
	text-decoration: none;
	vertical-align: top;
	zoom: 1;
}

.pagination-bar a strong {
	font-weight: 600;
}

.pagination-bar a:hover {
	background-color: var(--blue-grey-100);
}

.pagination-bar a:focus {
	background-color: var(--blue-grey-200);
}

.pagination-bar a.active {
	background-color: var(--blue-grey-600);
	color: var(--white);
}

.pagination-bar a.prev,
.pagination-bar a.next {
	font-size: 22px;
}

.dark-theme {
	.pagination-bar a {
		color: var(--blue-grey-600);
	}

	.pagination-bar a:hover {
		background-color: var(--blue-grey-900);
	}

	.pagination-bar a:focus {
		background-color: var(--blue-grey-800);
	}

	.pagination-bar a.active {
		background-color: var(--blue-grey-500);
		color: var(--blue-grey-800);
	}
}
</style>
