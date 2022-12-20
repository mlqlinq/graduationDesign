module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "standard-with-typescript",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    parser: require.resolve("@typescript-eslint/parser"),
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "login", "401", "404"], // 需要忽略的组件名
      },
    ],
  },
}
