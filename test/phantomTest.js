var path = require('path')
var Reporter = require('jsreport-core').Reporter

require('should')

describe('phantom pdf', function () {
  var reporter

  beforeEach(function () {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../')
    })

    reporter.use(require('../')())

    return reporter.init()
  })

  afterEach(() => reporter && reporter.close())

  it('should not fail when rendering', function () {
    var request = {
      template: { content: 'Heyx', recipe: 'phantom-pdf', engine: 'none' }
    }

    return reporter.render(request).then(function (response) {
      response.content.toString().should.containEql('%PDF')
    })
  })

  it('should provide logs', function () {
    var request = {
      template: { content: 'Heyx <script>console.log("hello world")</script>', recipe: 'phantom-pdf', engine: 'none' }
    }

    return reporter.render(request).then(function (response) {
      response.meta.logs.map(l => l.message).should.matchAny(/hello world/)
    })
  })

  it('should run in default phantomjs', function () {
    var request = {
      template: { content: 'Hey', recipe: 'phantom-pdf', engine: 'none' }
    }

    return reporter.render(request).then(function (response) {
      response.meta.logs.map(l => l.message).should.matchAny(new RegExp(reporter['phantom-pdf'].definition.options.phantoms[0].version))
    })
  })

  it('should be able to choose phantomjs version', function () {
    var request = {
      template: { content: 'Hey', recipe: 'phantom-pdf', engine: 'none', phantom: { phantomjsVersion: '2.1.1' } }
    }

    return reporter.render(request).then(function (response) {
      response.meta.logs.map(l => l.message).should.matchAny(/2.1.1/)
    })
  })

  it('should be able to use margin as string', function () {
    var request = {
      template: {
        content: `Hey <script>console.log('hello')</script>`,
        recipe: 'phantom-pdf',
        engine: 'none',
        phantom: {
          margin: '25px'
        }
      }
    }

    return reporter.render(request).then(function (response) {
      response.meta.logs.map(l => l.message).should.matchAny(/hello/)
    })
  })

  it('should be able to use margin as object', function () {
    var request = {
      template: {
        content: `Hey <script>console.log('hello')</script>`,
        recipe: 'phantom-pdf',
        engine: 'none',
        phantom: {
          margin: {
            top: '25px',
            left: '1cm',
            right: '1cm',
            bottom: '5px'
          }
        }
      }
    }

    return reporter.render(request).then(function (response) {
      response.meta.logs.map(l => l.message).should.matchAny(/hello/)
    })
  })
})

describe('phantom pdf with defaultPhantomjsVersion', function () {
  var reporter

  beforeEach(function () {
    reporter = new Reporter({
      templatingEngines: {
        strategy: 'in-process'
      },
      rootDirectory: path.join(__dirname, '../'),
      phantom: {
        defaultPhantomjsVersion: '2.1.1'
      }
    })

    reporter.use(require('../')())

    return reporter.init()
  })

  afterEach(() => reporter && reporter.close())

  it('should apply defaultPhantomjsVersion global option', function () {
    reporter['phantom-pdf'].definition.options.phantoms[0].version.should.be.eql('2.1.1')
    reporter['phantom-pdf'].definition.options.phantoms[1].version.should.be.eql('1.9.8')

    var request = {
      template: { content: 'Hey', recipe: 'phantom-pdf', engine: 'none' }
    }

    return reporter.render(request).then(function (response) {
      response.meta.logs.map(l => l.message).should.matchAny(new RegExp(reporter['phantom-pdf'].definition.options.phantoms[0].version))
    })
  })
})
