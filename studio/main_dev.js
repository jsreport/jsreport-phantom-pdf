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
      waitForJS: false,
      fitToPage: false
    }
  }
})

const reformat = (reformatter, entity, tab) => {
  const reformated = reformatter(entity.phantom[tab.headerOrFooter], 'html')

  return {
    phantom: {
      [tab.headerOrFooter]: reformated
    }
  }
}

Studio.addEditorComponent(Constants.PHANTOM_TAB_EDITOR, PhantomEditor, reformat)
Studio.addTabTitleComponent(Constants.PHANTOM_TAB_TITLE, PhantomTitle)

Studio.entityTreeIconResolvers.push((entity) => (entity.__entitySet === 'templates' && entity.recipe === 'phantom-pdf') ? 'fa-file-pdf-o' : null)
