module.exports = {  
    extends: "@mate-academy/eslint-config-react-typescript",
    rules: {
        // TODO: add to config
        // from typescript-eslint documentation
        // This rule extends the base eslint/no-use-before-define rule.
        // It adds support for type, interface and enum declarations.
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        // note you must disable the base rule as it can report incorrect errors
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
        // note you must disable the base rule as it can report incorrect errors
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-underscore-dangle': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'class-methods-use-this': 'off',
        camelcase: 'off',
        'react/button-has-type': 'off',
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
};
