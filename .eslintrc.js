module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {
    'prettier/prettier': 0,
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    '@typescript-eslint/default-param-last': 'off',
  },
  // overrides: [
  //   {
  //     // files: ['src/features/todos.ts'],
  //     rules: {
  //       '@typescript-eslint/default-param-last': 'off',
  //     },
  //   },
  // ],
};
