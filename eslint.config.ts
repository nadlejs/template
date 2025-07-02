import nadle from "@nadle/eslint-config";
import tsEslint, { type ConfigArray } from "typescript-eslint";

const config: ConfigArray = tsEslint.config(
	...nadle.configs.recommended,
	nadle.configs.react,
	{
		ignores: [
			"**/lib",
			"**/build",
			"**/.nadle",
			"**/__temp__",
			"**/node_modules/",
			"**/.docusaurus",
			"packages/nadle/test/__fixtures__/mixed-ts-js/nadle.config.js"
		]
	},
	{
		languageOptions: {
			parserOptions: {
				project: ["**/tsconfig.eslint.json"]
			}
		}
	}
);

export default config;
