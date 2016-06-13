import * as Constants from './constants.js'
import React, { Component } from 'react'
import Studio from 'jsreport-studio'

export default class Properties extends Component {
  openHeaderFooter (type) {
    Studio.openTab({
      key: this.props.entity._id + '_phantom' + type,
      _id: this.props.entity._id,
      headerOrFooter: type,
      editorComponentKey: Constants.PHANTOM_TAB_EDITOR,
      titleComponentKey: Constants.PHANTOM_TAB_TITLE
    })
  }

  render () {
    const { entity, onChange } = this.props
    const phantom = entity.phantom || {}

    const changePhantom = (change) => onChange(Object.assign({}, entity, { phantom: Object.assign({}, entity.phantom, change) }))

    return (
      <div className='properties-section'>
        <div className='form-group'><label>margin</label>
          <input
            type='text' placeholder='1cm' value={phantom.margin || ''}
            onChange={(v) => changePhantom({margin: v.target.value})} />
        </div>

        <div className='form-group'><label>header height</label>
          <input
            type='text' placeholder='1cm' value={phantom.headerHeight || ''}
            onChange={(v) => changePhantom({headerHeight: v.target.value})} />
        </div>
        <div className='form-group'>
          <label>header</label>
          <button onClick={() => this.openHeaderFooter('header')}>open in tab...</button>
        </div>

        <div className='form-group'><label>footer height</label>
          <input
            type='text' placeholder='1cm' value={phantom.footerHeight || ''}
            onChange={(v) => changePhantom({footerHeight: v.target.value})} />
        </div>
        <div className='form-group'>
          <label>footer</label>
          <button onClick={() => this.openHeaderFooter('footer')}>open in tab...</button>
        </div>

        <div className='form-group'><label>paper format</label>
          <select value={phantom.format || ''} onChange={(v) => changePhantom({format: v.target.value})}>
            <option key='A4' value='A4'>A4</option>
            <option key='A3' value='A3'>A3</option>
            <option key='A5' value='A5'>A5</option>
            <option key='Legal' value='Legal'>Legal</option>
            <option key='Letter' value='Letter'>Letter</option>
            <option key='Tabloid' value='Tabloid'>Tabloid</option>
          </select>
        </div>

        <div className='form-group'><label>paper width</label>
          <input
            type='text' placeholder='1cm' value={phantom.paperWidth || ''}
            onChange={(v) => changePhantom({paperWidth: v.target.value})} />
        </div>
        <div className='form-group'><label>paper height</label>
          <input
            type='text' placeholder='1cm' value={phantom.paperHeight || ''}
            onChange={(v) => changePhantom({paperHeight: v.target.value})} />
        </div>

        <div className='form-group'><label>orientation</label>
          <select value={phantom.orientation || ''} onChange={(v) => changePhantom({orientation: v.target.value})}>
            <option key='portrait' value='portrait'>portrait</option>
            <option key='landscape' value='landscape'>landscape</option>
          </select>
        </div>

        <div className='form-group'><label>print delay</label>
          <input
            type='text' placeholder='1000' value={phantom.printDelay || ''}
            onChange={(v) => changePhantom({printDelay: v.target.value})} />
        </div>

        <div className='form-group'><label>resource timeout</label>
          <input
            type='text' placeholder='1000' value={phantom.resourceTimeout || ''}
            onChange={(v) => changePhantom({resourceTimeout: v.target.value})} />
        </div>

        <div className='form-group'>
          <label title='window.JSREPORT_READY_TO_START=true;'>wait for printing trigger</label>
          <input
            type='checkbox' title='window.JSREPORT_READY_TO_START=true;' checked={phantom.waitForJS === true}
            onChange={(v) => changePhantom({waitForJS: v.target.checked})} />
        </div>

        <div className='form-group'>
          <label>block javascript</label>
          <input
            type='checkbox' checked={phantom.blockJavaScript === true}
            onChange={(v) => changePhantom({blockJavaScript: v.target.checked})} />
        </div>

        <div className='form-group'>
          <label>use custom phantomjs</label>
          <input
            type='checkbox' checked={phantom.customPhantomJS === true}
            onChange={(v) => changePhantom({customPhantomJS: v.target.checked})} />
        </div>
      </div>
    )
  }
}

