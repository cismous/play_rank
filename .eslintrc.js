const OFF = 0,
  WARN = 1,
  ERROR = 2

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  settings: {
    react: {
      version: 'detect', // React version. 'detect' automatically picks the version you have installed.
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  ],
  plugins: ['react-hooks'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'max-len': [ERROR, { code: 120 }],
    '@typescript-eslint/explicit-function-return-type': OFF,
    'react/display-name': OFF,
    'react-hooks/rules-of-hooks': ERROR, // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': WARN, // 检查 effect 的依赖
  },
}
