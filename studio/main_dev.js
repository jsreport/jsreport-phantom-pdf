import PhantomEditor from './PhantomEditor.js'
import Properties from './PhantomProperties.js'
import PhantomTitle from './PhantomTitle.js'
import * as Constants from './constants.js'
import Studio from 'jsreport-studio'

Studio.addPropertiesComponent('phantom pdf', Properties, (entity) => entity.__entitySet === 'templates' && entity.recipe === 'phantom-pdf')

Studio.addApiSpec({
  template: {
    phantom: {
      margin: '...',
      header: '...',
      footer: '...',
      footerHeight: '...',
      orientation: '...',
      format: '...',
      width: '...',
      height: '...',
      printDelay: 1000,
      resourceTimeout: 1000,
      customPhantomJS: true,
      blockJavaScript: false,
      waitForJS: false
    }
  }
})
Studio.addEditorComponent(Constants.PHANTOM_TAB_EDITOR, PhantomEditor)
Studio.addTabTitleComponent(Constants.PHANTOM_TAB_TITLE, PhantomTitle)
