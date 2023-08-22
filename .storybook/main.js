/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	refs: {
		vue: {
			title: "Vue",
			url: "https://test--64dc812a8d1c331facc2ed4f.chromatic.com/",
		},
		react: {
			title: "React",
			url: "https://test--64dc8351623e3a642cdd9b84.chromatic.com/",
		},
	},
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
};
export default config;
