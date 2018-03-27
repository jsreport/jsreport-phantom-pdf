/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _PhantomEditor = __webpack_require__(1);
	
	var _PhantomEditor2 = _interopRequireDefault(_PhantomEditor);
	
	var _PhantomProperties = __webpack_require__(4);
	
	var _PhantomProperties2 = _interopRequireDefault(_PhantomProperties);
	
	var _PhantomTitle = __webpack_require__(6);
	
	var _PhantomTitle2 = _interopRequireDefault(_PhantomTitle);
	
	var _constants = __webpack_require__(5);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _jsreportStudio = __webpack_require__(3);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	_jsreportStudio2.default.addPropertiesComponent('phantom pdf', _PhantomProperties2.default, function (entity) {
	  return entity.__entitySet === 'templates' && entity.recipe === 'phantom-pdf';
	});
	
	_jsreportStudio2.default.addApiSpec({
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
	});
	
	var reformat = function reformat(reformatter, entity, tab) {
	  var lastPhantomProperties = entity.phantom || {};
	  var reformated = reformatter(lastPhantomProperties[tab.headerOrFooter], 'html');
	
	  return {
	    phantom: _extends({}, lastPhantomProperties, _defineProperty({}, tab.headerOrFooter, reformated))
	  };
	};
	
	_jsreportStudio2.default.addEditorComponent(Constants.PHANTOM_TAB_EDITOR, _PhantomEditor2.default, reformat);
	_jsreportStudio2.default.addTabTitleComponent(Constants.PHANTOM_TAB_TITLE, _PhantomTitle2.default);
	
	_jsreportStudio2.default.entityTreeIconResolvers.push(function (entity) {
	  return entity.__entitySet === 'templates' && entity.recipe === 'phantom-pdf' ? 'fa-file-pdf-o' : null;
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DataEditor = function (_Component) {
	  _inherits(DataEditor, _Component);
	
	  function DataEditor() {
	    _classCallCheck(this, DataEditor);
	
	    return _possibleConstructorReturn(this, (DataEditor.__proto__ || Object.getPrototypeOf(DataEditor)).apply(this, arguments));
	  }
	
	  _createClass(DataEditor, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          entity = _props.entity,
	          _onUpdate = _props.onUpdate,
	          tab = _props.tab;
	
	
	      return _react2.default.createElement(_jsreportStudio.TextEditor, {
	        name: entity._id + '_phantom' + tab.headerOrFooter,
	        mode: 'handlebars',
	        value: entity.phantom ? entity.phantom[tab.headerOrFooter] : '',
	        onUpdate: function onUpdate(v) {
	          return _onUpdate(Object.assign({}, entity, { phantom: Object.assign({}, entity.phantom, _defineProperty({}, tab.headerOrFooter, v)) }));
	        }
	      });
	    }
	  }]);
	
	  return DataEditor;
	}(_react.Component);
	
	DataEditor.propTypes = {
	  entity: _react2.default.PropTypes.object.isRequired,
	  tab: _react2.default.PropTypes.object.isRequired,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = DataEditor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(5);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(3);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Properties = function (_Component) {
	  _inherits(Properties, _Component);
	
	  function Properties(props) {
	    _classCallCheck(this, Properties);
	
	    var _this = _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).call(this, props));
	
	    _this.state = {
	      customMargin: false,
	      marginOptions: undefined
	    };
	    return _this;
	  }
	
	  _createClass(Properties, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.normalizeUIState(this.props.entity);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // when component changes because another entity is selected
	      // or when saving a new entity
	      if (this.props.entity._id !== nextProps.entity._id) {
	        this.normalizeUIState(nextProps.entity);
	      }
	    }
	  }, {
	    key: 'normalizeUIState',
	    value: function normalizeUIState(entity) {
	      var stateToSet = {};
	
	      stateToSet.customMargin = false;
	      stateToSet.marginOptions = undefined;
	
	      if (entity.phantom && entity.phantom.margin) {
	        var customMargin = void 0;
	
	        if (entity.phantom.margin.trim()[0] === '{') {
	          try {
	            customMargin = JSON.parse(entity.phantom.margin);
	          } catch (e) {}
	
	          if (customMargin) {
	            stateToSet.customMargin = true;
	
	            if (customMargin.top != null || customMargin.left != null || customMargin.right != null || customMargin.bottom != null) {
	              stateToSet.marginOptions = customMargin;
	            }
	          }
	        }
	      }
	
	      if (Object.keys(stateToSet).length > 0) {
	        this.setState(stateToSet);
	      }
	    }
	  }, {
	    key: 'changeCustomMargin',
	    value: function changeCustomMargin(_ref) {
	      var left = _ref.left,
	          right = _ref.right,
	          top = _ref.top,
	          bottom = _ref.bottom,
	          customMargin = _ref.customMargin;
	      var _state$marginOptions = this.state.marginOptions;
	      _state$marginOptions = _state$marginOptions === undefined ? {} : _state$marginOptions;
	      var marginTop = _state$marginOptions.top,
	          marginLeft = _state$marginOptions.left,
	          marginRight = _state$marginOptions.right,
	          marginBottom = _state$marginOptions.bottom;
	      var _props = this.props,
	          entity = _props.entity,
	          onChange = _props.onChange;
	
	      var stateToSet = {};
	      var margin = {};
	
	      if (customMargin === false) {
	        stateToSet.customMargin = customMargin;
	        stateToSet.marginOptions = undefined;
	
	        onChange(_extends({}, entity, { phantom: _extends({}, entity.phantom, { margin: '' }) }));
	      } else {
	        if (customMargin != null) {
	          stateToSet.customMargin = customMargin;
	        }
	
	        if (top != null) {
	          margin.top = top;
	        } else {
	          margin.top = marginTop;
	        }
	
	        if (left != null) {
	          margin.left = left;
	        } else {
	          margin.left = marginLeft;
	        }
	
	        if (right != null) {
	          margin.right = right;
	        } else {
	          margin.right = marginRight;
	        }
	
	        if (bottom != null) {
	          margin.bottom = bottom;
	        } else {
	          margin.bottom = marginBottom;
	        }
	
	        stateToSet.marginOptions = margin;
	
	        if (margin.top != null || margin.left != null || margin.right != null || margin.bottom != null) {
	          onChange(_extends({}, entity, { phantom: _extends({}, entity.phantom, { margin: JSON.stringify(margin) }) }));
	        } else {
	          onChange(_extends({}, entity, { phantom: _extends({}, entity.phantom, { margin: '' }) }));
	        }
	      }
	
	      if (Object.keys(stateToSet).length > 0) {
	        this.setState(stateToSet);
	      }
	    }
	  }, {
	    key: 'openHeaderFooter',
	    value: function openHeaderFooter(type) {
	      _jsreportStudio2.default.openTab({
	        key: this.props.entity._id + '_phantom' + type,
	        _id: this.props.entity._id,
	        headerOrFooter: type,
	        editorComponentKey: Constants.PHANTOM_TAB_EDITOR,
	        titleComponentKey: Constants.PHANTOM_TAB_TITLE
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _state = this.state,
	          customMargin = _state.customMargin,
	          _state$marginOptions2 = _state.marginOptions,
	          marginOptions = _state$marginOptions2 === undefined ? {} : _state$marginOptions2;
	      var _props2 = this.props,
	          entity = _props2.entity,
	          onChange = _props2.onChange;
	
	      var phantom = entity.phantom || {};
	
	      var changePhantom = function changePhantom(change) {
	        return onChange(_extends({}, entity, { phantom: _extends({}, entity.phantom, change) }));
	      };
	
	      var phantoms = _jsreportStudio2.default.extensions['phantom-pdf'].options.phantoms;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'properties-section' },
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'phantomjs version'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: phantom.phantomjsVersion || phantoms[0].version, onChange: function onChange(v) {
	                return changePhantom({ phantomjsVersion: v.target.value });
	              } },
	            phantoms.map(function (p) {
	              return _react2.default.createElement(
	                'option',
	                { key: p.version, value: p.version },
	                p.version
	              );
	            })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'margin'
	          ),
	          _react2.default.createElement(
	            'label',
	            null,
	            _react2.default.createElement('input', {
	              type: 'checkbox', checked: customMargin === true,
	              onChange: function onChange(v) {
	                return _this2.changeCustomMargin({ customMargin: v.target.checked });
	              } }),
	            'Use custom margin'
	          ),
	          customMargin && _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'label',
	              { style: { display: 'block' } },
	              'Margin left'
	            ),
	            _react2.default.createElement('input', {
	              style: { display: 'block', width: '100%' },
	              type: 'text', placeholder: '8px', value: marginOptions.left,
	              onChange: function onChange(v) {
	                return _this2.changeCustomMargin({ left: v.target.value });
	              } })
	          ),
	          customMargin && _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'label',
	              { style: { display: 'block' } },
	              'Margin right'
	            ),
	            _react2.default.createElement('input', {
	              style: { display: 'block', width: '100%' },
	              type: 'text', placeholder: '8px', value: marginOptions.right,
	              onChange: function onChange(v) {
	                return _this2.changeCustomMargin({ right: v.target.value });
	              } })
	          ),
	          customMargin && _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'label',
	              { style: { display: 'block' } },
	              'Margin top'
	            ),
	            _react2.default.createElement('input', {
	              style: { display: 'block', width: '100%' },
	              type: 'text', placeholder: '8px', value: marginOptions.top,
	              onChange: function onChange(v) {
	                return _this2.changeCustomMargin({ top: v.target.value });
	              } })
	          ),
	          customMargin && _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'label',
	              { style: { display: 'block' } },
	              'Margin bottom'
	            ),
	            _react2.default.createElement('input', {
	              style: { display: 'block', width: '100%' },
	              type: 'text', placeholder: '8px', value: marginOptions.bottom,
	              onChange: function onChange(v) {
	                return _this2.changeCustomMargin({ bottom: v.target.value });
	              } })
	          ),
	          !customMargin && _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.margin || '',
	            onChange: function onChange(v) {
	              return changePhantom({ margin: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'header height'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.headerHeight || '',
	            onChange: function onChange(v) {
	              return changePhantom({ headerHeight: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'header'
	          ),
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.openHeaderFooter('header');
	              } },
	            'open in tab...'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'footer height'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.footerHeight || '',
	            onChange: function onChange(v) {
	              return changePhantom({ footerHeight: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'footer'
	          ),
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.openHeaderFooter('footer');
	              } },
	            'open in tab...'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'paper format'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: phantom.format || '', onChange: function onChange(v) {
	                return changePhantom({ format: v.target.value });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'A4', value: 'A4' },
	              'A4'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'A3', value: 'A3' },
	              'A3'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'A5', value: 'A5' },
	              'A5'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'Legal', value: 'Legal' },
	              'Legal'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'Letter', value: 'Letter' },
	              'Letter'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'Tabloid', value: 'Tabloid' },
	              'Tabloid'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'paper width'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.width || '',
	            onChange: function onChange(v) {
	              return changePhantom({ width: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'paper height'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.height || '',
	            onChange: function onChange(v) {
	              return changePhantom({ height: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'orientation'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: phantom.orientation || '', onChange: function onChange(v) {
	                return changePhantom({ orientation: v.target.value });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'portrait', value: 'portrait' },
	              'portrait'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'landscape', value: 'landscape' },
	              'landscape'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'print delay'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1000', value: phantom.printDelay || '',
	            onChange: function onChange(v) {
	              return changePhantom({ printDelay: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'resource timeout'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1000', value: phantom.resourceTimeout || '',
	            onChange: function onChange(v) {
	              return changePhantom({ resourceTimeout: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            { title: 'window.JSREPORT_READY_TO_START=true;' },
	            'wait for printing trigger'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', title: 'window.JSREPORT_READY_TO_START=true;', checked: phantom.waitForJS === true,
	            onChange: function onChange(v) {
	              return changePhantom({ waitForJS: v.target.checked });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'block javascript'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: phantom.blockJavaScript === true,
	            onChange: function onChange(v) {
	              return changePhantom({ blockJavaScript: v.target.checked });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'fit to page'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: phantom.fitToPage === true,
	            onChange: function onChange(v) {
	              return changePhantom({ fitToPage: v.target.checked });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'use custom phantomjs (deprecated)'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: phantom.customPhantomJS === true,
	            onChange: function onChange(v) {
	              return changePhantom({ customPhantomJS: v.target.checked });
	            } })
	        )
	      );
	    }
	  }]);
	
	  return Properties;
	}(_react.Component);
	
	exports.default = Properties;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PHANTOM_TAB_TITLE = exports.PHANTOM_TAB_TITLE = 'PHANTOM_TAB_TITLE';
	var PHANTOM_TAB_EDITOR = exports.PHANTOM_TAB_EDITOR = 'PHANTOM_TAB_EDITOR';

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (props) {
	  return _react2.default.createElement(
	    'span',
	    null,
	    props.entity.name + ' ' + props.tab.headerOrFooter + (props.entity.__isDirty ? '*' : '')
	  );
	};

/***/ }
/******/ ]);