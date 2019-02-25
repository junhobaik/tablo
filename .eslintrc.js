module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 0,
    'no-class-assign': 0,
    'no-restricted-syntax': ['error', 'ForInStatement'],
    'jsx-a11y/click-events-have-key-events': 0,
    'react/prefer-stateless-function': 0,
  },
};
