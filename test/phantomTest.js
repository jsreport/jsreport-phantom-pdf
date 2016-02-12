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
      logger: reporter.logger,
      template: {content: 'Heyx', recipe: 'phantom-pdf', engine: 'none'}
    }

    reporter.render(request, {}).then(function (response) {
      response.content.toString().should.containEql('%PDF')
      done()
    }).catch(done)
  })
})

