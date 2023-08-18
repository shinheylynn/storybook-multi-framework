/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	refs: {
		vue: {
			title: "Vue",
			url: "https://64dc812a8d1c331facc2ed4f-eccesdahqk.chromatic.com",
		},
		react: {
			title: "React",
			url: "https://64dc8351623e3a642cdd9b84-puafziibsl.chromatic.com",
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
