module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['jest', '@typescript-eslint'],
  rules: {
    'no-useless-escape': 'off',
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 'off',
    'no-undef': 'off',
    'prettier/prettier': ['error', {'no-inline-styles': false}],
  },
};
