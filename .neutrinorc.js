const copy = require('@neutrinojs/copy')
const standardjs = require('@neutrinojs/standardjs')
const react = require('@neutrinojs/react')
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
    tests: 'src'
  },
  use: [
    copy({
      patterns: [
        {
          from: 'src/static',
          to: 'static'
        },
        {
          from: 'manifest.json',
          to: './manifest.json'
        },
        {
          from: 'background.js',
          to: './background.js'
        }
      ]
    }),
    standardjs(),
    react({
      html: {
        title: 'New Tab',
      },
    }),
    jest({
      setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.js'
    })
  ]
};
