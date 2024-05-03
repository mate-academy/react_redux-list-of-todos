module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: { '@typescript-eslint/default-param-last': 'off' },
};
