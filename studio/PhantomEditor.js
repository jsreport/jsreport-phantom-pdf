import React, { Component } from 'react'
import { TextEditor } from 'jsreport-studio'

export default class DataEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    tab: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  render () {
    const { entity, onUpdate, tab } = this.props

    return (<TextEditor
      name={entity._id + '_phantom' + tab.headerOrFooter}
      mode='handlebars'
      value={entity.phantom ? entity.phantom[tab.headerOrFooter] : ''}
      onUpdate={(v) => onUpdate(Object.assign({}, entity, { phantom: Object.assign({}, entity.phantom, { [tab.headerOrFooter]: v }) }))}
      />)
  }
}
