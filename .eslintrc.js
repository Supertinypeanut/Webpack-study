module.exports = {
    root: true,
    env: {
      node: true,
      jest: true,
    },
    extends: ['alloy', 'alloy/typescript', 'plugin:vue/essential', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2017,
      sourceType: 'module',
    },
    rules: {
      eqeqeq: 'off',
      'prettier/prettier': 'error',
    },
  }