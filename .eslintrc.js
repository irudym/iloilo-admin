module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off', //change it back to error!
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'vue/valid-v-model': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
      rules: {
        'max-len': [0],
        'vue/valid-v-model': "off",
        "no-console": "off"
      }
    },
  ],
};
