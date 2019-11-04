// Whilst the configuration object can be modified here, the recommended way of making
// changes is via the presets' options or Neutrino's API in `.neutrinorc.js` instead.
// Neutrino's inspect feature can be used to view/export the generated configuration.
const neutrino = require('neutrino')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const basicConfig = neutrino().webpack()

const generateConfig = (config, browser) => {
  const { output, plugins } = config
  return {
    ...config,
    output: {
      ...output,
      path: path.resolve(__dirname, `./builds/build_${browser}`)
    },
    plugins: [
      ...plugins,
      new CopyPlugin([
        { from: `./${browser}.manifest.json`, to: './manifest.json' },
        { from: `./${browser}.background.js`, to: './background.js' }
      ])
    ]
  }
}

const chromeConfig = generateConfig(basicConfig, 'chrome')
const ffConfig = generateConfig(basicConfig, 'firefox')

module.exports = [chromeConfig, ffConfig]
