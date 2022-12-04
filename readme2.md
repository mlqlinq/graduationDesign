npx prettier --write .

<!-- package.json -->
"scripts": {
    // "dev": "vite",
    // "build": "run-p type-check build-only",
    "serve": "vite", //未指定默认取.env中的配置
    "dev": "vite --mode dev",   // 取 .env.dev文件中的配置
    "pro": "vite --mode pro",   // 取 .env.pro文件中的配置
    "build": "vue-tsc --noEmit && vite build", //未指定默认取.env中的配置
    "build:dev": "vue-tsc --noEmit && vite build --mode dev",    // build的时候取dev的配置
    "build:pro": "vue-tsc --noEmit && vite build --mode pro",  // build的时候取pro的配置
    "preview": "vite preview --port 4173",
    "build-only": "vite build",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
  },
