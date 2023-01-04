npx prettier --write .

<!-- package.json -->

```json
"`scripts": {`
    `// "dev": "vite",`
    `// "build": "run-p type-check build-only",`
    `"serve": "vite", //未指定默认取.env中的配置`
    `"dev": "vite --mode dev",   // 取 .env.dev文件中的配置`
    `"pro": "vite --mode pro",   // 取 .env.pro文件中的配置`
    `"build": "vue-tsc --noEmit && vite build", //未指定默认取.env中的配置`
    `"build:dev": "vue-tsc --noEmit && vite build --mode dev",    // build的时候取dev的配置`
    `"build:pro": "vue-tsc --noEmit && vite build --mode pro",  // build的时候取pro的配置`
    `"preview": "vite preview --port 4173",`
    `"build-only": "vite build",`
    `"type-check": "vue-tsc --noEmit",`
    `"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",`
  },
```

```json
{
  "bracketSameLine": false,
  // 大括号内的首尾需要空格
  "bracketSpacing": true,
  // 一行最多 100 字符
  "printWidth": 200,
  // 使用 2 个空格缩进
  "tabWidth": 4,
  // 不使用缩进符，而使用空格
  "useTabs": false,
  // 行尾需要有分号
  "semi": true,
  // 使用单引号
  "singleQuote": false,
  // 对象的 key 仅在必要时用引号
  "quoteProps": "as-needed",
  // jsx 不使用单引号，而使用双引号
  "jsxSingleQuote": false,
  // 末尾不需要逗号
  "trailingComma": "es5",
  // jsx 标签的反尖括号需要换行
  "jsxBracketSameLine": false,
  // 箭头函数，只有一个参数的时候，也需要括号
  "arrowParens": "avoid",
  // 不需要写文件开头的 @prettier
  "requirePragma": false,
  // 不需要自动在文件开头插入 @prettier
  "insertPragma": false,
  // 当超出print width（上面有这个参数）时就折行
  "proseWrap": "preserve",
  // 根据显示样式决定 html 要不要折行
  "htmlWhitespaceSensitivity": "css",
  // 换行符使用 lf
  "endOfLine": "lf",
  // 在VUE文件中不要缩进脚本和样式标记
  "vueIndentScriptAndStyle": false
}

```

