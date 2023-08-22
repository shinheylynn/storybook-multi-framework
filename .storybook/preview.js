/** @type { import('@storybook/react').Preview } */
import "../src/tailwind.css";

const preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	options: {
		// 스토리 정렬 순서만 정의 가능
		// 어느 폴더에 속할 것인지는 각 스토리에서 정의 가능 (export defalut >>> title)
		storySort: {
			order: ["Welcome", "Example"],
		},
	},
};

export default preview;
