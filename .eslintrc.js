module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'jest'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'consistent-return': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-unused-vars': 0,
    'no-unused-vars': 'off',
    'jest/expect-expect': 'off',
    'object-curly-newline': 'off',
    'arrow-body-style': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  globals: {
    JSX: true,
  },
};
