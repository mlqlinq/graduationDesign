/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  env: {
		browser: true,
		node: true,
		es6: true,
	},
  parserOptions: {
    ecmaVersion: "latest",
  },
};
