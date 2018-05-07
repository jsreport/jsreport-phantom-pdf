
const schema = {
  type: 'object',
  properties: {
    strategy: { type: 'string', enum: ['dedicated-process', 'phantom-server'] },
    numberOfWorkers: { type: 'number' },
    timeout: { type: 'number' },
    allowLocalFilesAccess: { type: 'boolean' },
    defaultPhantomjsVersion: { type: 'string' },
    host: { type: 'string' },
    portLeftBoundary: { type: 'number' },
    portRightBoundary: { type: 'number' }
  }
}

module.exports = {
  'name': 'phantom-pdf',
  'main': 'lib/phantom.js',
  'dependencies': ['templates'],
  'optionsSchema': {
    phantom: { ...schema },
    extensions: {
      'phantom-pdf': { ...schema }
    }
  },
  'embeddedSupport': true
}
