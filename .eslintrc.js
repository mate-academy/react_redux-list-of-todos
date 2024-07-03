module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {},
  overrides: [
    {
      files: ['src/features/**'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
};
