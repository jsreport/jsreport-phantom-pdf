# jsreport-phantom-pdf
[![NPM Version](http://img.shields.io/npm/v/jsreport-phantom-pdf.svg?style=flat-square)](https://npmjs.com/package/jsreport-phantom-pdf)
[![Build Status](https://travis-ci.org/jsreport/jsreport-phantom-pdf.png?branch=master)](https://travis-ci.org/jsreport/jsreport-phantom-pdf)

> Adds recipe `phantom-pdf`  which render pdf from html using phantomjs


See http://jsreport.net/learn/phantom-pdf

You can apply this extension manually to`jsreport-core` and pass configuration to it directly:
```js
var jsreport = require('jsreport-core')()
jsreport.use(require('jsreport-phantom-pdf')({ strategy: 'phantom-server' }))
```
