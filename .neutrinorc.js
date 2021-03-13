const copy = require('@neutrinojs/copy');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const eslint = require('@neutrinojs/eslint');

module.exports = {
  options: {
    root: __dirname,
    tests: 'src',
  },
  use: [
    eslint({
      // Uses extensions from neutrino.options.extensions
      // test: neutrino.regexFromExtensions(),
      include: [],
      exclude: [/node_modules/],
      eslint: {
        baseConfig: {
          env: {
            es6: true,
            browser: true,
            node: true,
            jest: true,
          },
          extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', 'prettier/react'],
          globals: {
            process: true,
          },
          overrides: [],
          parser: require.resolve('babel-eslint'),
          parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
          },
          plugins: ['prettier', 'import'],
          root: true,
          rules: {
            'prettier/prettier': ['error'],
            'no-unexpected-multiline': 0,
            'no-duplicate-imports': ['error'],
            'no-console': 0,
            'jsx-a11y/anchor-is-valid': 0,
            'jsx-a11y/anchor-has-content': 0,
            'import/order': [
              'error',
              {
                groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
              },
            ],
          },
        },
      },
    }),
    copy({
      patterns: [
        {
          from: 'src/static',
          to: 'static',
        },
      ],
    }),
    react(),
    jest({
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    }),
  ],
};
