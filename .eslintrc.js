module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
  }
  // extends: ['@mate-academy/eslint-config-react', 'plugin:cypress/recommended'],
};
