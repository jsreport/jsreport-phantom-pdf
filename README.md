# jsreport-phantom-pdf
[![NPM Version](http://img.shields.io/npm/v/jsreport-phantom-pdf.svg?style=flat-square)](https://npmjs.com/package/jsreport-phantom-pdf)
[![Build Status](https://travis-ci.org/jsreport/jsreport-phantom-pdf.png?branch=master)](https://travis-ci.org/jsreport/jsreport-phantom-pdf)

> jsreport recipe which is rendering pdf from html using phantomjs

See the docs https://jsreport.net/learn/phantom-pdf

## Installation

> **npm install jsreport-phantom-pdf**


## Usage
To use `recipe` in for template rendering set `template.recipe=phantom-pdf` in the rendering request.

```js
{
  template: { content: '...', recipe: 'phantom-pdf', engine: '...', phantom: { ... } }
}
```

## jsreport-core
You can apply this extension also manually to [jsreport-core](https://github.com/jsreport/jsreport-core)

```js
var jsreport = require('jsreport-core')()
jsreport.use(require('jsreport-phantom-pdf')({ strategy: 'phantom-server' }))
```

### Migration from 1.X to 2.X

If you use jsreport-phantom-pdf with jsreport-core and migrated from version 1.x, the configuration for phantom pdf margin can't be passed anymore as an object, because of the new validation logic in jsreport 2.0.

Henceforth you can no longer do :
```js
 margin: {
    top: '25px',
    left: '1cm',
    right: '1cm',
    bottom: '5px'
}
```

but you have to pass config as a json compliant string, as :
```js
margin: '{"top": "25px","left": "1cm","right": "1cm","bottom": "5px"}'
```

You could also still pass a single margin as a integer-like string :  
```js
margin : '25'
```

