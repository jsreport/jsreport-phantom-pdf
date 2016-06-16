/*!
 * Copyright(c) 2014 Jan Blaha
 *
 * Recipe rendering pdf files using phantomjs.
 */

var q = require('q')
var Conversion = require('phantom-html-to-pdf')
var toArray = require('stream-to-array')
var extend = require('node.extend')
var conversion

var Phantom = function (reporter, definition) {
  this.reporter = reporter

  this.allowLocalFilesAccess = definition.options.hasOwnProperty('allowLocalFilesAccess') ? definition.options.allowLocalFilesAccess : false

  reporter.extensionsManager.recipes.push({
    name: 'phantom-pdf',
    execute: Phantom.prototype.execute.bind(this)
  })

  reporter.documentStore.registerComplexType('PhantomType', {
    margin: {type: 'Edm.String'},
    header: {type: 'Edm.String', document: {extension: 'html', engine: true}},
    headerHeight: {type: 'Edm.String'},
    footer: {type: 'Edm.String', document: {extension: 'html', engine: true}},
    footerHeight: {type: 'Edm.String'},
    orientation: {type: 'Edm.String'},
    format: {type: 'Edm.String'},
    width: {type: 'Edm.String'},
    height: {type: 'Edm.String'},
    printDelay: {type: 'Edm.Int32'},
    resourceTimeout: {type: 'Edm.Int32'},
    customPhantomJS: {type: 'Edm.Boolean'},
    blockJavaScript: {type: 'Edm.Boolean'},
    waitForJS: {type: 'Edm.Boolean'}
  })

  if (reporter.documentStore.model.entityTypes['TemplateType']) {
    reporter.documentStore.model.entityTypes['TemplateType'].phantom = {type: 'jsreport.PhantomType'}
  }
}

Phantom.prototype.execute = function (request, response) {
  var self = this
  request.template.phantom = request.template.phantom || {}

  request.template.phantom.paperSize = {
    width: request.template.phantom.width,
    height: request.template.phantom.height,
    headerHeight: request.template.phantom.headerHeight,
    footerHeight: request.template.phantom.footerHeight,
    format: request.template.phantom.format,
    orientation: request.template.phantom.orientation,
    margin: request.template.phantom.margin
  }
  request.template.phantom.allowLocalFilesAccess = self.allowLocalFilesAccess
  request.template.phantom.settings = {
    javascriptEnabled: request.template.phantom.blockJavaScript !== 'true',
    resourceTimeout: request.template.phantom.resourceTimeout
  }

  if (request.template.phantom.waitForJS) {
    request.template.phantom.waitForJS = JSON.parse(request.template.phantom.waitForJS)
  }

  request.template.phantom.waitForJSVarName = 'JSREPORT_READY_TO_START'

  request.template.phantom.html = response.content.toString()

  if (JSON.parse(request.template.phantom.customPhantomJS || 'false')) {
    request.template.phantom.phantomPath = require.main.require('phantomjs-prebuilt').path
  }

  function processPart (options, req, type) {
    if (!options[type]) {
      return q()
    }

    req.logger.debug('Starting child request to render pdf ' + type)

    var _req = extend(true, {}, req)
    extend(true, _req.template, {content: options[type], recipe: 'html'})
    _req.options.isChildRequest = true

    return req.reporter.render(_req).then(function (res) {
      options[type] = res.content.toString()
    })
  }

  return processPart(request.template.phantom, request, 'header').then(function () {
    return processPart(request.template.phantom, request, 'footer')
  }).then(function () {
    return q.nfcall(conversion, request.template.phantom)
  }).then(function (res) {
    res.logs.forEach(function (m) {
      request.logger[m.level](m.message, {timestamp: m.timestamp})
    })

    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'inline; filename="report.pdf"'
    response.headers['File-Extension'] = 'pdf'
    response.headers['Number-Of-Pages'] = res.numberOfPages

    return q.nfcall(toArray, res.stream).then(function (arr) {
      response.content = Buffer.concat(arr)
      request.logger.debug('phantom-pdf recipe finished with ' + res.numberOfPages + ' pages generated')
    })
  })
}

module.exports = function (reporter, definition) {
  if (!Object.getOwnPropertyNames(definition.options).length) {
    definition.options = reporter.options.phantom || {}
  }

  definition.options.tmpDir = reporter.options.tempDirectory
  definition.options.strategy = definition.options.strategy || 'dedicated-process'

  conversion = Conversion(definition.options)

  reporter[definition.name] = new Phantom(reporter, definition)
}
