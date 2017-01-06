const ip = require('ip')
const path = require('path')

module.exports = {
  src: path.resolve(__dirname, 'src'),
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    // host: ip.address(),
    host: 'localhost',
    port: 8082,
    proxyTable: {}
  }
}
