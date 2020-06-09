module.exports = {
  extends: "@mate-academy/eslint-config-react-typescript",
  rules: {
    "no-restricted-syntax": [
      "error",
      "BinaryExpression[operator='in']",
    ],
    "guard-for-in": 0,
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true,
    }],
    "arrow-body-style": 0,
    "object-curly-newline": [2, {
      "ObjectExpression": {
        "consistent": true,
        "minProperties": 5,
      },
    }],
  }
};
