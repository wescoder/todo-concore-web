const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const { DefinePlugin } = require('webpack')
const { resolve } = require('path')
const paths = require('./config/paths')
const { raw: ENV } = require('./config/env')

let config = {
  serverRuntimeConfig: {
    ...ENV
  },
  publicRuntimeConfig: {
    ...ENV
  },
  webpack (config, { dev, buildId/* , isServer, defaultLoaders */ }) {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: 'file-loader',
          publicPath: '/_next/',
          outputPath: 'static/images/',
          name: '[name]-[hash].[ext]'
        }
      }
    })

    config.plugins.push(new DefinePlugin({
      'process.env': JSON.stringify(ENV)
    }))

    if (!dev) {
      config.devtool = 'source-map'
    }

    config.resolve.alias['@components'] = paths.appComponents
    config.resolve.alias['@reducers'] = paths.appReducers
    config.resolve.alias['@pages'] = paths.appPages
    config.resolve.alias['@root'] = paths.appRoot

    return config
  }
}

config = withCss({
  ...config,
  cssModules: true
})

config = withSass({
  ...config,
  cssModules: true
})

module.exports = config
