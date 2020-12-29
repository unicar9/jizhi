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
        }
      ]
    }),
    standardjs(),
    react({
      html: {
        title: 'New Tab',
      },
      style: {
        test: /\.(css|sass|scss)$/,
        loaders: [
          { loader: 'sass-loader', useId: 'sass' }
        ]
      }
    }),
    jest({
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
    })
  ]
};
