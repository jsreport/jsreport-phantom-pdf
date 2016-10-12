var path = require('path')
var Reporter = require('jsreport-core').Reporter

require('should')

describe('phantom pdf', function () {
  var reporter

  beforeEach(function (done) {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../')
    })

    reporter.init().then(function () {
      done()
    }).fail(done)
  })

  it('should not fail when rendering', function (done) {
    var request = {
      template: { content: 'Heyx', recipe: 'phantom-pdf', engine: 'none' }
    }

    reporter.render(request, {}).then(function (response) {
      response.content.toString().should.containEql('%PDF')
      done()
    }).catch(done)
  })

  it('should provide logs', function (done) {
    var request = {
      template: { content: 'Heyx <script>console.log("hello world")</script>', recipe: 'phantom-pdf', engine: 'none' },
      options: { debug: { logsToResponseHeader: true } }
    }

    reporter.render(request, {}).then(function (response) {
      response.headers['Debug-Logs'].should.match(/hello world/)
      done()
    }).catch(done)
  })

  it('should run in default phantomjs', function (done) {
    var request = {
      template: { content: 'Hey', recipe: 'phantom-pdf', engine: 'none' },
      options: { debug: { logsToResponseHeader: true } }
    }

    reporter.render(request, {}).then(function (response) {
      response.headers['Debug-Logs'].should.match(new RegExp(reporter['phantom-pdf'].definition.options.phantoms[0].version))
      done()
    }).catch(done)
  })

  it('should be able to choose phantomjs version', function (done) {
    var request = {
      template: { content: 'Hey', recipe: 'phantom-pdf', engine: 'none', phantom: { phantomjsVersion: '2.1.1' } },
      options: { debug: { logsToResponseHeader: true } }
    }

    reporter.render(request, {}).then(function (response) {
      response.headers['Debug-Logs'].should.match(/2.1.1/)
      done()
    }).catch(done)
  })
})

