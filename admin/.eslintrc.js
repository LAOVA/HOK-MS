module.exports = {
  root: true, // 停止在父级目录中寻找
  env: {
    es6: true, // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
    node: true // Node.js 全局变量和 Node.js 作用域
  },
  extends: ['plugin:vue/essential'],
  rules: {
    "no-unused-components": "off",
    "vue/multi-word-component-names": "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};