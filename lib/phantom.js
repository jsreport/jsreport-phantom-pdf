/*!
 * Copyright(c) 2017 Jan Blaha
 *
 * Recipe rendering pdf files using phantomjs.
 */

var Promise = require('bluebird')
var Conversion = require('phantom-html-to-pdf')
var toArrayAsync = Promise.promisify(require('stream-to-array'))
var extend = require('node.extend')
var fs = require('fs')
var path = require('path')
var conversion
var readdirAsync = Promise.promisify(fs.readdir)

var defaultPhantomjsVersion = '1.9.8'

var Phantom = function (reporter, definition) {
  this.reporter = reporter
  this.definition = definition

  this.allowLocalFilesAccess = definition.options.hasOwnProperty('allowLocalFilesAccess') ? definition.options.allowLocalFilesAccess : false

  reporter.extensionsManager.recipes.push({
    name: 'phantom-pdf',
    execute: Phantom.prototype.execute.bind(this)
  })

  reporter.documentStore.registerComplexType('PhantomType', {
    margin: { type: 'Edm.String' },
    header: { type: 'Edm.String', document: { extension: 'html', engine: true } },
    headerHeight: { type: 'Edm.String' },
    footer: { type: 'Edm.String', document: { extension: 'html', engine: true } },
    footerHeight: { type: 'Edm.String' },
    orientation: { type: 'Edm.String' },
    format: { type: 'Edm.String' },
    width: { type: 'Edm.String' },
    height: { type: 'Edm.String' },
    printDelay: { type: 'Edm.Int32' },
    resourceTimeout: { type: 'Edm.Int32' },
    phantomjsVersion: { type: 'Edm.String' },
    customPhantomJS: { type: 'Edm.Boolean' },
    blockJavaScript: { type: 'Edm.Boolean' },
    waitForJS: { type: 'Edm.Boolean' },
    fitToPage: { type: 'Edm.Boolean' }
  })

  if (reporter.documentStore.model.entityTypes['TemplateType']) {
    reporter.documentStore.model.entityTypes['TemplateType'].phantom = { type: 'jsreport.PhantomType' }
  }
}

Phantom.prototype.init = function () {
  if (this.reporter.execution) {
    var phantomjsPackage = require(this.reporter.execution.resolve('phantomjsPackage.json'))
    var names = phantomjsPackage.name.split('phantomjs-exact-')

    this.definition.options.phantoms = [{
      version: names.length === 2 ? names[1].replace(/-/g, '.') : defaultPhantomjsVersion
    }]

    return Promise.resolve()
  }

  var npm = path.join(this.reporter.options.appDirectory, 'node_modules')
  var self = this

  function crawlAvailiblePhantomVersions () {
    return readdirAsync(npm).then(function (files) {
      return files.filter(function (f) {
        return f.indexOf('phantomjs-exact-') !== -1
      }).map(function (f) {
        return {
          path: path.join(npm, f),
          version: f.replace('phantomjs-exact-', '').replace(/-/g, '.')
        }
      })
    })
  }

  return crawlAvailiblePhantomVersions().then(function (versions) {
    self.definition.options.phantoms = versions

    self.definition.options.phantoms.splice(0, 0, {
      version: defaultPhantomjsVersion
    })

    if (self.definition.options.defaultPhantomjsVersion && self.definition.options.defaultPhantomjsVersion !== defaultPhantomjsVersion) {
      var defPhantomInstance
      self.definition.options.phantoms = self.definition.options.phantoms.filter(function (p) {
        if (p.version === self.definition.options.defaultPhantomjsVersion) {
          defPhantomInstance = p
          return false
        } else {
          return true
        }
      })

      if (!defPhantomInstance) {
        throw new Error('defaultPhantomjsVersion ' + self.definition.options.defaultPhantomjsVersion + ' was not found')
      }

      self.definition.options.phantoms.splice(0, 0, defPhantomInstance)
    }
  }).then(function () {
    if (self.reporter.compilation) {
      if (self.definition.options.defaultPhantomjsVersion && self.definition.options.defaultPhantomjsVersion !== defaultPhantomjsVersion) {
        self.reporter.compilation.resourceInTemp('phantomjs.exe', require(self.definition.options.phantoms[0].path).path)
        self.reporter.compilation.include('phantomjsPackage.json', path.join(path.dirname(require.resolve(self.definition.options.phantoms[0].path)), 'package.json'))
      } else {
        self.reporter.compilation.resourceInTemp('phantomjs.exe', require('phantomjs').path)
        self.reporter.compilation.include('phantomjsPackage.json', path.join(path.dirname(require.resolve('phantomjs')), '../package.json'))
      }
    }
  })
}

Phantom.prototype.execute = function (request, response) {
  var self = this
  var margin

  request.template.phantom = request.template.phantom || {}

  margin = request.template.phantom.margin

  if (margin) {
    if (typeof margin === 'string') {
      try {
        // margin value should always be a string or object, never a number
        margin = isNaN(parseInt(margin, 10)) ? JSON.parse(margin) : String(JSON.parse(margin))
      } catch (e) {}
    }
  }

  request.template.phantom.paperSize = {
    width: request.template.phantom.width,
    height: request.template.phantom.height,
    headerHeight: request.template.phantom.headerHeight,
    footerHeight: request.template.phantom.footerHeight,
    format: request.template.phantom.format,
    orientation: request.template.phantom.orientation,
    margin: margin
  }

  request.template.phantom.allowLocalFilesAccess = self.allowLocalFilesAccess
  request.template.phantom.settings = {
    javascriptEnabled: request.template.phantom.blockJavaScript !== 'true',
    resourceTimeout: request.template.phantom.resourceTimeout
  }

  if (request.template.phantom.waitForJS) {
    request.template.phantom.waitForJS = JSON.parse(request.template.phantom.waitForJS)
  }

  request.template.phantom.fitToPage = JSON.parse(request.template.phantom.fitToPage || 'false')

  request.template.phantom.waitForJSVarName = 'JSREPORT_READY_TO_START'

  request.template.phantom.html = response.content.toString()

  if (this.reporter.execution) {
    request.template.phantom.phantomPath = this.reporter.execution.resourceTempPath('phantomjs.exe')
  } else {
    if (JSON.parse(request.template.phantom.customPhantomJS || 'false')) {
      request.template.phantom.phantomPath = require.main.require('phantomjs-prebuilt').path
    }

    if (request.template.phantom.phantomjsVersion) {
      var phantom = this.definition.options.phantoms.filter(function (p) {
        return p.version === request.template.phantom.phantomjsVersion
      })

    // default doesn't have a path
      if (phantom.length === 1 && phantom[0].path) {
        request.template.phantom.phantomPath = require(phantom[0].path).path
      }
    } else {
      if (this.definition.options.defaultPhantomjsVersion && this.definition.options.defaultPhantomjsVersion !== defaultPhantomjsVersion) {
        request.template.phantom.phantomPath = require(this.definition.options.phantoms[0].path).path
      }
    }
  }

  function processPart (options, req, type) {
    if (!options[type]) {
      return Promise.resolve()
    }

    req.logger.debug('Starting child request to render pdf ' + type)

    var _req = extend(true, {}, req)
    extend(true, _req.template, { content: options[type], recipe: 'html' })
    _req.options.isChildRequest = true

    return req.reporter.render(_req).then(function (res) {
      options[type] = res.content.toString()
    })
  }

  return processPart(request.template.phantom, request, 'header').then(function () {
    return processPart(request.template.phantom, request, 'footer')
  }).then(function () {
    return Promise.promisify(conversion)(request.template.phantom)
  }).then(function (res) {
    res.logs.forEach(function (m) {
      request.logger[m.level](m.message, { timestamp: m.timestamp })
    })

    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'inline; filename="report.pdf"'
    response.headers['File-Extension'] = 'pdf'
    response.headers['Number-Of-Pages'] = res.numberOfPages

    return toArrayAsync(res.stream).then(function (arr) {
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

  if (reporter.execution) {
    definition.options.standaloneScriptPath = reporter.execution.resourceTempPath('standaloneScript.js')
  }

  if (reporter.compilation) {
    reporter.compilation.resourceInTemp('standaloneScript.js', path.join(path.dirname(require.resolve('phantom-html-to-pdf')), 'lib', 'scripts', 'standaloneScript.js'))
  }

  conversion = Conversion(definition.options)

  reporter[definition.name] = new Phantom(reporter, definition)
  Object.defineProperty(reporter[definition.name], 'conversion', {
    get: conversion,
    set: function (val) { conversion = val }
  })

  return reporter[definition.name].init()
}
