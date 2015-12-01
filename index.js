var main = require('./lib/phantom.js')
var config = require('jsreport.config.js')()

module.exports = function (options) {
  config.options = options
  config.main = main
  return config
}
