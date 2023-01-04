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
    "ecmaFeatures": true,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ["vue"],
  rules: {
    "@typescript-eslint/restrict-template-expressions":"off",
    "@typescript-eslint/strict-boolean-expressions":"off",
    "@typescript-eslint/no-floating-promises":"off",
    "@typescript-eslint/no-misused-promises":"off",
    "@typescript-eslint/explicit-function-return-type":"off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-throw-literal": ["error"],
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "login", "401", "404"], // 需要忽略的组件名
      },
    ],
  },
}
