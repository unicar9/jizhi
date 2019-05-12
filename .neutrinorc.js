const copy = require('@neutrinojs/copy')

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
    '@neutrinojs/standardjs',
    ['@neutrinojs/react', {
      html: { title: 'New Tab' }
    }],
    ['@neutrinojs/jest', {
      setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.js'
    }]
  ]
};
