module.exports = function () {
  return {
    plugins: {
      'postcss-csso': {},
      'postcss-cssnext': {
        features: {
          customProperties: {
            warnings: false
          }
        }
      },
      'postcss-css-variables': {}
    }
  }
}
