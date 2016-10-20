module.exports =
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
/*!***********************!*\
  !*** ./server/app.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var _http = __webpack_require__(/*! http */ 48);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _express = __webpack_require__(/*! express */ 6);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(/*! compression */ 42);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _morgan = __webpack_require__(/*! morgan */ 49);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _cookieParser = __webpack_require__(/*! cookie-parser */ 43);
	
	var _cookieParser2 = _interopRequireDefault(_cookieParser);
	
	var _bodyParser = __webpack_require__(/*! body-parser */ 40);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _expressSession = __webpack_require__(/*! express-session */ 46);
	
	var _expressSession2 = _interopRequireDefault(_expressSession);
	
	var _csurf = __webpack_require__(/*! csurf */ 44);
	
	var _csurf2 = _interopRequireDefault(_csurf);
	
	var _config = __webpack_require__(/*! ./config/config.json */ 10);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(/*! ./routes/index */ 36);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(/*! ./apis/index */ 32);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _allowCrossDomain = __webpack_require__(/*! ./utils/allowCrossDomain */ 38);
	
	var _allowCrossDomain2 = _interopRequireDefault(_allowCrossDomain);
	
	var _renderReactMiddleware = __webpack_require__(/*! ./utils/renderReactMiddleware */ 39);
	
	var _renderReactMiddleware2 = _interopRequireDefault(_renderReactMiddleware);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _helmet = __webpack_require__(/*! helmet */ 47);
	
	var _helmet2 = _interopRequireDefault(_helmet);
	
	var _socket = __webpack_require__(/*! ./sockets/socket */ 37);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let app = (0, _express2.default)();
	
	app.set('host', process.env.IP || '127.0.0.1');
	app.set('port', process.env.PORT || 3000);
	app.disable('x-powered-by');
	
	app.use(_helmet2.default.contentSecurityPolicy());
	app.use(_helmet2.default.frameguard());
	app.use(_helmet2.default.noSniff());
	app.use(_helmet2.default.xssFilter());
	app.use(_helmet2.default.hsts());
	app.use((0, _compression2.default)());
	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use((0, _cookieParser2.default)());
	app.use((0, _expressSession2.default)({
	    resave: true,
	    secret: 'mySecretCookieSalt',
	    key: 'myCookieSessionId',
	    saveUninitialized: true,
	    cookie: {
	        httpOnly: true
	    }
	}));
	
	// app.use(favicon(__dirname + '/../public/favicon.ico'));
	app.use('/static', _express2.default.static(__dirname + '/../public', {
	    maxAge: 86400000
	}));
	
	// if(process.env.NODE_ENV !== 'production'){
	//     let webpack = require('webpack');
	//     let config = require('../create-webpack.config')(true);
	//     let webpackDevMiddleware = require('webpack-dev-middleware');
	//     let webpackHotMiddleware = require('webpack-hot-middleware');
	//     let compiler = webpack(config);
	//     app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
	//     app.use(webpackHotMiddleware(compiler));
	// }
	
	app.use(_allowCrossDomain2.default);
	
	app.use((0, _csurf2.default)());
	app.use(function (req, res, next) {
	    res.locals.csrftoken = req.csrfToken();
	    next();
	});
	app.use((0, _renderReactMiddleware2.default)({
	    transformer: function (data) {
	        return _immutable2.default.fromJS(data);
	    }
	}));
	
	app.use('/', _index2.default);
	app.use('/api', _index4.default);
	
	// error handlers
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
	    console.dir(err);
	    res.status(err.status || 500);
	    if (err.status === 500) {
	        console.error(err.stack);
	        res.json({ error: 'Internal Server Error' });
	    } else if (err.status === 404) {
	        res.render('error'); //render error page
	    } else {
	        res.json({ error: err.message });
	    }
	});
	
	process.on('uncaughtException', err => {
	    console.error(err.message + '\n' + err.stack);
	});
	process.on('unhandledRejection', (reason, p) => {
	    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
	});
	process.on('rejectionHandled', (reason, p) => {
	    console.warn("rejectionHandled at: Promise ", p, " reason: ", reason);
	});
	
	let server = _http2.default.createServer(app);
	
	/* Socket.io Communication */
	let io = __webpack_require__(/*! socket.io */ 55).listen(server);
	io.sockets.on('connection', _socket2.default);
	
	server.listen(app.get('port'), app.get('host'), function () {
	    let { address, port } = server.address();
	    console.log(`${ _config2.default.serverName } server listening at http://%s:%s`, address, port);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 1 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/*!*******************************!*\
  !*** ./common/pages/Base.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shallowEqual = __webpack_require__(/*! ../utils/shallowEqual */ 31);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _events = __webpack_require__(/*! events */ 11);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const eventMatchReg = /^on[A-Z]/;
	function getEventMethodsProps(instance) {
	    let methods = Object.getOwnPropertyNames(instance).filter(prop => {
	        return eventMatchReg.test(prop) && typeof instance[prop] === 'function';
	    });
	
	    let instancePrototype = Object.getPrototypeOf(instance);
	    if (instancePrototype !== Object.prototype) {
	        methods = methods.concat(getEventMethodsProps(instancePrototype));
	    }
	
	    return methods;
	}
	
	class Base extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	
	        this.__eventNames = {};
	
	        this.__bindFunctions();
	    }
	
	    __bindFunctions() {
	        let props = getEventMethodsProps(this);
	        for (let prop of props) {
	            if (!this[prop].funcBinded) {
	                this[prop] = this[prop].bind(this);
	                this[prop].funcBinded = true;
	            }
	        }
	    }
	
	    on(eventName, fn) {
	        if (typeof fn !== 'function') throw new Error('fn should be a function');
	
	        if (!this.__eventNames[eventName]) {
	            this.__eventNames[eventName] = [fn];
	        } else {
	            this.__eventNames[eventName].push(fn);
	        }
	
	        return this.context.$eventBus.addListener(eventName, fn);
	    }
	
	    emit(eventName, ...args) {
	        return this.context.$eventBus.emit(eventName, ...args);
	    }
	
	    off(eventName, fn) {
	        let events = this.__eventNames[eventName];
	        if (events) {
	            let index = events.indexOf(fn);
	
	            if (index >= 0) {
	                this.context.$eventBus.removeListener(eventName, fn);
	
	                events.splice(index, 1);
	
	                if (!events.length) {
	                    delete this.__eventNames[eventName];
	                }
	            } else {
	                console.warn('event: ' + eventName + ' is not registered in ' + this._reactInternalInstance.getName() + ' Component');
	            }
	
	            return true;
	        } else {
	            console.warn('event: ' + eventName + ' is not registered in ' + this.constructor.name + ' Component');
	
	            return false;
	        }
	    }
	
	    /**
	     * 检验组件更新
	     * @param nextProps
	     * @param nextState
	     * @returns {*}
	     */
	    shouldComponentUpdate(nextProps, nextState) {
	        let shouldUpdate = !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState);
	
	        if (shouldUpdate && process.env.NODE_ENV !== 'production') {
	            console.log('Component: ' + this.constructor.name + ' will update');
	        }
	
	        return shouldUpdate;
	    }
	
	    componentWillUnmount() {
	        for (let eventName in this.__eventNames) {
	            if (this.__eventNames.hasOwnProperty(eventName)) {
	                for (let fn of this.__eventNames[eventName]) {
	                    this.off(eventName, fn);
	                }
	            }
	        }
	    }
	}
	exports.default = Base;
	Base.contextTypes = {
	    $eventBus: _react.PropTypes.instanceOf(_events2.default)
	};

/***/ },
/* 3 */
/*!****************************!*\
  !*** external "immutable" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 4 */
/*!********************************************!*\
  !*** external "react-immutable-proptypes" ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = require("react-immutable-proptypes");

/***/ },
/* 5 */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 6 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 7 */
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 8 */
/*!***************************************!*\
  !*** ./common/pages/async/actions.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.INVALIDATE_REDDIT = exports.SELECT_REDDIT = exports.RECEIVE_POSTS = exports.REQUEST_POSTS = undefined;
	exports.selectReddit = selectReddit;
	exports.invalidateReddit = invalidateReddit;
	exports.fetchPostsIfNeeded = fetchPostsIfNeeded;
	
	var _isomorphicFetch = __webpack_require__(/*! isomorphic-fetch */ 12);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const REQUEST_POSTS = exports.REQUEST_POSTS = 'REQUEST_POSTS';
	const RECEIVE_POSTS = exports.RECEIVE_POSTS = 'RECEIVE_POSTS';
	const SELECT_REDDIT = exports.SELECT_REDDIT = 'SELECT_REDDIT';
	const INVALIDATE_REDDIT = exports.INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
	
	function selectReddit(reddit) {
	    return {
	        type: SELECT_REDDIT,
	        reddit
	    };
	}
	
	function invalidateReddit(reddit) {
	    return {
	        type: INVALIDATE_REDDIT,
	        reddit
	    };
	}
	
	function requestPosts(reddit) {
	    return {
	        type: REQUEST_POSTS,
	        reddit
	    };
	}
	
	function receivePosts(reddit, json) {
	    return {
	        type: RECEIVE_POSTS,
	        reddit,
	        posts: _immutable2.default.fromJS(json.data.children.map(child => child.data)),
	        receivedAt: Date.now()
	    };
	}
	
	function fetchPosts(reddit) {
	    return dispatch => {
	        dispatch(requestPosts(reddit));
	        return (0, _isomorphicFetch2.default)(`https://www.reddit.com/r/${ reddit }.json`, {
	            method: 'GET',
	            timeout: 5000
	        }).then(response => response.json()).then(json => dispatch(receivePosts(reddit, json)));
	    };
	}
	
	function shouldFetchPosts(state, reddit) {
	    const posts = state.get('postsByReddit').get(reddit);
	    if (!posts) {
	        return true;
	    }
	    if (posts.get('isFetching')) {
	        return false;
	    }
	    return posts.get('didInvalidate');
	}
	
	function fetchPostsIfNeeded(reddit) {
	    return (dispatch, getState) => {
	        if (shouldFetchPosts(getState(), reddit)) {
	            return dispatch(fetchPosts(reddit));
	        }
	    };
	}

/***/ },
/* 9 */
/*!********************************************!*\
  !*** ./common/pages/index/indexActions.js ***!
  \********************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addTodo = addTodo;
	exports.completeTodo = completeTodo;
	exports.setVisibilityFilter = setVisibilityFilter;
	/*
	 * action 类型
	 */
	
	const ADD_TODO = exports.ADD_TODO = 'ADD_TODO';
	const COMPLETE_TODO = exports.COMPLETE_TODO = 'COMPLETE_TODO';
	const SET_VISIBILITY_FILTER = exports.SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
	
	/*
	 * 其它的常量
	 */
	
	const VisibilityFilters = exports.VisibilityFilters = {
	    SHOW_ALL: 'SHOW_ALL',
	    SHOW_COMPLETED: 'SHOW_COMPLETED',
	    SHOW_ACTIVE: 'SHOW_ACTIVE'
	};
	
	/*
	 * action 创建函数
	 */
	
	function addTodo(text) {
	    return { type: ADD_TODO, text };
	}
	
	function completeTodo(index) {
	    return { type: COMPLETE_TODO, index };
	}
	
	function setVisibilityFilter(filter) {
	    return { type: SET_VISIBILITY_FILTER, filter };
	}

/***/ },
/* 10 */
/*!***********************************!*\
  !*** ./server/config/config.json ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = {
		"application": {
			"version": {
				"css": "",
				"js": ""
			},
			"debugName": "test"
		},
		"serverName": "isomophic-react-redux-starter"
	};

/***/ },
/* 11 */
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 12 */
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 13 */
/*!************************************!*\
  !*** external "redux-immutablejs" ***!
  \************************************/
/***/ function(module, exports) {

	module.exports = require("redux-immutablejs");

/***/ },
/* 14 */
/*!************************!*\
  !*** ./common/App.jsx ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _events = __webpack_require__(/*! events */ 11);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let mediator = new _events2.default();
	
	class App extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    getChildContext() {
	        return {
	            $eventBus: mediator,
	            $appConfig: this.props.appConfig
	        };
	    }
	
	    componentDidMount() {}
	
	    componentDidUpdate() {}
	
	    componentWillUnmount() {}
	
	    render() {
	        return this.props.children;
	    }
	}
	App.defaultProps = {
	    appConfig: null
	};
	App.propTypes = {
	    appConfig: _react.PropTypes.object
	};
	App.childContextTypes = {
	    $eventBus: _react.PropTypes.instanceOf(_events2.default),
	    $appConfig: _react.PropTypes.object
	};
	
	exports.default = App;

/***/ },
/* 15 */
/*!********************************************!*\
  !*** ./common/components/async/Picker.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 4);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Picker extends _Base2.default {
	  constructor(props, context) {
	    super(props, context);
	  }
	
	  onChange(e) {
	    this.props.onChange(e.target.value);
	  }
	
	  render() {
	    const { value, onChange, options } = this.props;
	
	    return _react2.default.createElement(
	      'span',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        value
	      ),
	      _react2.default.createElement(
	        'select',
	        { onChange: this.onChange,
	          value: value },
	        options.map(option => _react2.default.createElement(
	          'option',
	          { value: option, key: option },
	          option
	        ))
	      )
	    );
	  }
	}
	
	exports.default = Picker;
	Picker.propTypes = {
	  options: _react.PropTypes.arrayOf(_react.PropTypes.string.isRequired).isRequired,
	  value: _react.PropTypes.string.isRequired,
	  onChange: _react.PropTypes.func.isRequired
	};

/***/ },
/* 16 */
/*!*******************************************!*\
  !*** ./common/components/async/Posts.jsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 4);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Posts extends _Base2.default {
	  render() {
	    return _react2.default.createElement(
	      'ul',
	      null,
	      this.props.posts.map((post, i) => _react2.default.createElement(
	        'li',
	        { key: i },
	        post.get('title')
	      ))
	    );
	  }
	}
	
	exports.default = Posts;
	Posts.propTypes = {
	  posts: _reactImmutableProptypes2.default.list.isRequired
	};

/***/ },
/* 17 */
/*!***************************************************!*\
  !*** ./common/components/chat/ChangeNameForm.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class ChangeNameForm extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	
	        this.state = { newName: '' };
	    }
	
	    onKey(e) {
	        this.setState({ newName: e.target.value });
	    }
	
	    onSubmit(e) {
	        e.preventDefault();
	        var newName = this.state.newName;
	        this.props.onChangeName(newName);
	        this.setState({ newName: '' });
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'change_name_form' },
	            _react2.default.createElement(
	                'h3',
	                null,
	                ' Change Name '
	            ),
	            _react2.default.createElement(
	                'form',
	                { onSubmit: this.onSubmit },
	                _react2.default.createElement('input', {
	                    onChange: this.onKey,
	                    value: this.state.newName
	                })
	            )
	        );
	    }
	}
	exports.default = ChangeNameForm;

/***/ },
/* 18 */
/*!*********************************************!*\
  !*** ./common/components/chat/Messages.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MessageForm = exports.MessageList = exports.Message = undefined;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Message extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'message' },
	            _react2.default.createElement(
	                'strong',
	                null,
	                this.props.user,
	                ' :'
	            ),
	            _react2.default.createElement(
	                'span',
	                null,
	                this.props.text
	            )
	        );
	    }
	}
	exports.Message = Message;
	Message.defaultProps = {
	    user: '',
	    text: ''
	};
	Message.propTypes = {
	    user: _react.PropTypes.string.isRequired,
	    text: _react.PropTypes.string.isRequired
	};
	
	class MessageList extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'messages' },
	            _react2.default.createElement(
	                'h2',
	                null,
	                ' Conversation: '
	            ),
	            this.props.messages.map((message, i) => {
	                return _react2.default.createElement(Message, {
	                    key: i,
	                    user: message.user,
	                    text: message.text
	                });
	            })
	        );
	    }
	}
	
	exports.MessageList = MessageList;
	class MessageForm extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	
	        this.state = { text: '' };
	    }
	
	    onSubmit(e) {
	        e.preventDefault();
	        if (!this.state.text) return;
	
	        let message = {
	            user: this.props.user,
	            text: this.state.text
	        };
	        this.props.onMessageSubmit(message);
	        this.setState({ text: '' });
	    }
	
	    onChange(e) {
	        this.setState({ text: e.target.value });
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'message_form' },
	            _react2.default.createElement(
	                'h3',
	                null,
	                'Write New Message'
	            ),
	            _react2.default.createElement(
	                'form',
	                { onSubmit: this.onSubmit },
	                _react2.default.createElement('input', {
	                    onChange: this.onChange,
	                    value: this.state.text
	                })
	            )
	        );
	    }
	}
	exports.MessageForm = MessageForm;

/***/ },
/* 19 */
/*!**********************************************!*\
  !*** ./common/components/chat/UsersList.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class UsersList extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'users' },
	            _react2.default.createElement(
	                'h3',
	                null,
	                ' Online Users '
	            ),
	            _react2.default.createElement(
	                'ul',
	                null,
	                this.props.users.map((user, i) => {
	                    return _react2.default.createElement(
	                        'li',
	                        { key: i },
	                        user
	                    );
	                })
	            )
	        );
	    }
	}
	exports.default = UsersList;

/***/ },
/* 20 */
/*!******************************************!*\
  !*** ./common/components/common/Tab.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TabPanel = exports.TabTitle = undefined;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 41);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Tabs extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	
	        this.state = {
	            selectedTab: props.defaultSelectedTab || null
	        };
	
	        this.firstTabLabel = null;
	    }
	
	    getChildContext() {
	        return {
	            onSelect: this.onSelect.bind(this),
	            selectedTab: this.state.selectedTab || this.props.defaultSelectedTab,
	            activeStyle: this.props.activeLinkStyle || defaultActiveStyle,
	            firstTabLabel: this.firstTabLabel
	        };
	    }
	
	    onSelect(tab, ...rest) {
	        if (this.state.selectedTab === tab) return;
	
	        this.setState({
	            selectedTab: tab
	        });
	
	        if (typeof this.props.onSelect === 'function') {
	            this.props.onSelect(tab, ...rest);
	        }
	    }
	
	    findFirstTabLabel(children) {
	        if (typeof children !== 'object' || this.firstTabLabel) {
	            return;
	        }
	
	        _react2.default.Children.forEach(children, child => {
	            if (child.props && child.props.label) {
	                if (this.firstTabLabel == null) {
	                    this.firstTabLabel = child.props.label;
	                    return;
	                }
	            }
	
	            this.findFirstTabLabel(child.props && child.props.children);
	        });
	    }
	
	    render() {
	        this.findFirstTabLabel(this.props.children);
	
	        return _react2.default.createElement(
	            'div',
	            { className: this.props.className, style: this.props.style },
	            this.props.children
	        );
	    }
	}
	exports.default = Tabs;
	Tabs.defaultProps = {
	    onSelect: null,
	    activeLinkStyle: null,
	    defaultSelectedTab: '',
	    className: '',
	    style: null
	};
	Tabs.propTypes = {
	    onSelect: _react.PropTypes.func,
	    activeLinkStyle: _react.PropTypes.object,
	    defaultSelectedTab: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    style: _react.PropTypes.object
	};
	Tabs.childContextTypes = {
	    onSelect: _react.PropTypes.func,
	    selectedTab: _react.PropTypes.string,
	    activeStyle: _react.PropTypes.object,
	    firstTabLabel: _react.PropTypes.string
	};
	
	const defaultActiveStyle = {
	    fontWeight: 'bold'
	};
	
	class TabTitle extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	
	        this.onSelect = this.onSelect.bind(this);
	    }
	
	    onSelect() {
	        this.context.onSelect(this.props.label);
	    }
	
	    componentDidMount() {
	        if (this.context.selectedTab === this.props.label || !this.context.selectedTab && this.context.firstTabLabel === this.props.label) {
	            this.context.onSelect(this.props.label);
	        }
	    }
	
	    render() {
	        let style = null;
	        let isActive = this.context.selectedTab === this.props.label;
	        if (isActive) {
	            style = this.context.activeStyle;
	        }
	        let clsNames = (0, _classnames2.default)(this.props.className, { active: isActive });
	
	        return _react2.default.createElement(
	            'div',
	            {
	                className: clsNames,
	                style: style,
	                onClick: this.onSelect
	            },
	            this.props.children
	        );
	    }
	}
	exports.TabTitle = TabTitle;
	TabTitle.defaultProps = {
	    label: '',
	    className: 'tab-link'
	};
	TabTitle.propTypes = {
	    label: _react.PropTypes.string.isRequired,
	    className: _react.PropTypes.string
	};
	TabTitle.contextTypes = {
	    onSelect: _react.PropTypes.func,
	    firstTabLabel: _react.PropTypes.string,
	    activeStyle: _react.PropTypes.object,
	    selectedTab: _react.PropTypes.string
	};
	
	const styles = {
	    visible: {
	        display: 'block'
	    },
	    hidden: {
	        display: 'none'
	    }
	};
	
	class TabPanel extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	
	        for (let style in styles) {
	            if (styles.hasOwnProperty(style)) {
	                Object.assign(styles[style], this.props.style);
	            }
	        }
	    }
	
	    render() {
	        let displayStyle = this.context.selectedTab === this.props.for ? styles.visible : styles.hidden;
	
	        return _react2.default.createElement(
	            'div',
	            {
	                className: this.props.className,
	                style: displayStyle },
	            this.props.children
	        );
	    }
	}
	exports.TabPanel = TabPanel;
	TabPanel.defaultProps = {
	    for: '',
	    className: 'tab-content',
	    style: null
	};
	TabPanel.propTypes = {
	    for: _react.PropTypes.string.isRequired,
	    className: _react.PropTypes.string,
	    style: _react.PropTypes.object
	};
	TabPanel.contextTypes = {
	    selectedTab: _react.PropTypes.string
	};

/***/ },
/* 21 */
/*!*********************************************!*\
  !*** ./common/components/index/AddTodo.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class AddTodo extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('input', { type: 'text', ref: 'input' }),
	            _react2.default.createElement(
	                'button',
	                { onClick: this.onClick.bind(this) },
	                'Add'
	            )
	        );
	    }
	
	    onClick(e) {
	        const node = this.refs.input;
	        const text = node.value.trim();
	        this.props.onAddClick(text);
	        node.value = '';
	    }
	}
	
	exports.default = AddTodo;
	AddTodo.propTypes = {
	    onAddClick: _react.PropTypes.func.isRequired
	};

/***/ },
/* 22 */
/*!********************************************!*\
  !*** ./common/components/index/Footer.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Footer extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    renderFilter(filter, name) {
	        if (filter === this.props.filter) {
	            return name;
	        }
	
	        return _react2.default.createElement(
	            'a',
	            { href: '#', onClick: e => {
	                    e.preventDefault();
	                    this.props.onFilterChange(filter);
	                } },
	            name
	        );
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'p',
	            null,
	            'Show:',
	            ' ',
	            this.renderFilter('SHOW_ALL', 'All'),
	            ', ',
	            this.renderFilter('SHOW_COMPLETED', 'Completed'),
	            ', ',
	            this.renderFilter('SHOW_ACTIVE', 'Active'),
	            '.'
	        );
	    }
	}
	
	exports.default = Footer;
	Footer.propTypes = {
	    onFilterChange: _react.PropTypes.func.isRequired,
	    filter: _react.PropTypes.oneOf(['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE']).isRequired
	};

/***/ },
/* 23 */
/*!******************************************!*\
  !*** ./common/components/index/Todo.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let styles = {
	    completed: {
	        textDecoration: 'line-through',
	        cursor: 'default'
	    },
	    uncompleted: {
	        textDecoration: 'none',
	        cursor: 'pointer'
	    }
	};
	
	class Todo extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    componentDidMount() {
	        this.on('test', function () {
	            console.log('test event bus');
	        });
	    }
	
	    componentWillUnmount() {
	        // unregister subscribe
	        super.componentWillUnmount();
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'li',
	            { onClick: this.props.onClick,
	                style: this.props.completed ? styles.completed : styles.uncompleted },
	            this.props.text
	        );
	    }
	}
	exports.default = Todo;
	Todo.defaultProps = {
	    onClick: function () {},
	    text: '',
	    completed: false
	};
	Todo.propTypes = {
	    onClick: _react.PropTypes.func.isRequired,
	    text: _react.PropTypes.string.isRequired,
	    completed: _react.PropTypes.bool.isRequired
	};

/***/ },
/* 24 */
/*!**********************************************!*\
  !*** ./common/components/index/TodoList.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 4);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _Todo = __webpack_require__(/*! ./Todo */ 23);
	
	var _Todo2 = _interopRequireDefault(_Todo);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class TodoList extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'ul',
	            null,
	            this.props.todos.map((todo, index) => _react2.default.createElement(_Todo2.default, { text: todo.get('text'),
	                completed: todo.get('completed'),
	                key: index,
	                onClick: () => this.props.onTodoClick(index) }))
	        );
	    }
	}
	
	exports.default = TodoList;
	TodoList.propTypes = {
	    onTodoClick: _react.PropTypes.func.isRequired,
	    todos: _reactImmutableProptypes2.default.listOf(_reactImmutableProptypes2.default.contains({
	        text: _react.PropTypes.string.isRequired,
	        completed: _react.PropTypes.bool.isRequired
	    }))
	};

/***/ },
/* 25 */
/*!*************************************!*\
  !*** ./common/pages/async/Page.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 5);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 4);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _actions = __webpack_require__(/*! ./actions */ 8);
	
	var _Picker = __webpack_require__(/*! ../../components/async/Picker.jsx */ 15);
	
	var _Picker2 = _interopRequireDefault(_Picker);
	
	var _Posts = __webpack_require__(/*! ../../components/async/Posts.jsx */ 16);
	
	var _Posts2 = _interopRequireDefault(_Posts);
	
	var _Base = __webpack_require__(/*! ../Base.jsx */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class AsyncPage extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    componentDidMount() {
	        const { dispatch, selectedReddit } = this.props;
	        dispatch((0, _actions.fetchPostsIfNeeded)(selectedReddit));
	    }
	
	    componentWillReceiveProps(nextProps) {
	        if (nextProps.selectedReddit !== this.props.selectedReddit) {
	            const { dispatch, selectedReddit } = nextProps;
	            dispatch((0, _actions.fetchPostsIfNeeded)(selectedReddit));
	        }
	    }
	
	    onHandleChange(nextReddit) {
	        this.props.dispatch((0, _actions.selectReddit)(nextReddit));
	    }
	
	    onHandleRefreshClick(e) {
	        e.preventDefault();
	
	        const { dispatch, selectedReddit } = this.props;
	        dispatch((0, _actions.invalidateReddit)(selectedReddit));
	        dispatch((0, _actions.fetchPostsIfNeeded)(selectedReddit));
	    }
	
	    render() {
	        const { selectedReddit, posts, isFetching, lastUpdated } = this.props;
	        const isEmpty = posts.size === 0;
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_Picker2.default, { value: selectedReddit,
	                onChange: this.onHandleChange,
	                options: defaultOptions }),
	            _react2.default.createElement(
	                'p',
	                null,
	                lastUpdated ? _react2.default.createElement(
	                    'span',
	                    null,
	                    'Last updated at ',
	                    new Date(lastUpdated).toLocaleTimeString('en-US', {
	                        hour12: false
	                    }),
	                    '.',
	                    ' '
	                ) : '',
	                !isFetching && _react2.default.createElement(
	                    'a',
	                    { href: '#',
	                        onClick: this.onHandleRefreshClick },
	                    'Refresh'
	                )
	            ),
	            isEmpty ? isFetching ? _react2.default.createElement(
	                'h2',
	                null,
	                'Loading...'
	            ) : _react2.default.createElement(
	                'h2',
	                null,
	                'Empty.'
	            ) : _react2.default.createElement(
	                'div',
	                { style: { opacity: isFetching ? 0.5 : 1 } },
	                _react2.default.createElement(_Posts2.default, { posts: posts })
	            )
	        );
	    }
	}
	AsyncPage.defaultProps = {
	    selectedReddit: '',
	    posts: new _immutable2.default.List(),
	    isFetching: false,
	    lastUpdated: 0
	
	};
	AsyncPage.propTypes = {
	    selectedReddit: _react.PropTypes.string.isRequired,
	    posts: _reactImmutableProptypes2.default.list.isRequired,
	    isFetching: _react.PropTypes.bool.isRequired,
	    lastUpdated: _react.PropTypes.number
	};
	
	const defaultOptions = ['reactjs', 'frontend'];
	
	function mapStateToProps(state) {
	    const selectedReddit = state.get('selectedReddit');
	    const postsByReddit = state.get('postsByReddit');
	    const data = postsByReddit.get(state.get('selectedReddit')) || new _immutable2.default.Map({
	        isFetching: true,
	        items: new _immutable2.default.List()
	    });
	    const isFetching = data.get('isFetching');
	    const lastUpdated = data.get('lastUpdated');
	    const posts = data.get('items');
	
	    return {
	        selectedReddit,
	        posts,
	        isFetching,
	        lastUpdated
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(AsyncPage);

/***/ },
/* 26 */
/*!****************************************!*\
  !*** ./common/pages/async/reducers.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reduxImmutablejs = __webpack_require__(/*! redux-immutablejs */ 13);
	
	var _actions = __webpack_require__(/*! ./actions */ 8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function selectedReddit(state = 'reactjs', action) {
	  switch (action.type) {
	    case _actions.SELECT_REDDIT:
	      return action.reddit;
	    default:
	      return state;
	  }
	} // import { combineReducers } from 'redux'
	
	
	function posts(state = new _immutable2.default.Map({
	  isFetching: false,
	  didInvalidate: false,
	  items: new _immutable2.default.List()
	}), action) {
	  switch (action.type) {
	    case _actions.INVALIDATE_REDDIT:
	      return state.set('didInvalidate', true);
	    case _actions.REQUEST_POSTS:
	      return state.merge({
	        isFetching: true,
	        didInvalidate: false
	      });
	    case _actions.RECEIVE_POSTS:
	      return state.merge({
	        isFetching: false,
	        didInvalidate: false,
	        items: action.posts,
	        lastUpdated: action.receivedAt
	      });
	    default:
	      return state;
	  }
	}
	
	function postsByReddit(state = new _immutable2.default.Map(), action) {
	  switch (action.type) {
	    case _actions.INVALIDATE_REDDIT:
	    case _actions.RECEIVE_POSTS:
	    case _actions.REQUEST_POSTS:
	      return state.set(action.reddit, posts(state[action.reddit], action));
	    default:
	      return state;
	  }
	}
	
	const rootReducer = (0, _reduxImmutablejs.combineReducers)({
	  postsByReddit,
	  selectedReddit
	});
	
	exports.default = rootReducer;

/***/ },
/* 27 */
/*!************************************!*\
  !*** ./common/pages/chat/Page.jsx ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 5);
	
	var _Base = __webpack_require__(/*! ../Base.jsx */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _UsersList = __webpack_require__(/*! ../../components/chat/UsersList */ 19);
	
	var _UsersList2 = _interopRequireDefault(_UsersList);
	
	var _Messages = __webpack_require__(/*! ../../components/chat/Messages */ 18);
	
	var _ChangeNameForm = __webpack_require__(/*! ../../components/chat/ChangeNameForm */ 17);
	
	var _ChangeNameForm2 = _interopRequireDefault(_ChangeNameForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (process.browser) {
	    var socket = io.connect();
	}
	
	class Page extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	
	        this.state = {
	            users: [],
	            messages: [],
	            text: ''
	        };
	    }
	
	    componentDidMount() {
	        socket.on('init', this.initialize.bind(this));
	        socket.on('send:message', this.messageRecieve.bind(this));
	        socket.on('user:join', this.userJoined.bind(this));
	        socket.on('user:left', this.userLeft.bind(this));
	        socket.on('change:name', this.userChangedName.bind(this));
	    }
	
	    initialize(data) {
	        let { users, name } = data;
	        this.setState({ users, user: name });
	    }
	
	    messageRecieve(message) {
	        let { messages } = this.state;
	
	        this.setState({
	            messages: [...messages, message]
	        });
	    }
	
	    userJoined(data) {
	        let { users, messages } = this.state;
	        let { name } = data;
	
	        this.setState({
	            users: [users, name],
	            messages: [...messages, {
	                user: 'APPLICATION BOT',
	                text: name + ' Joined'
	            }]
	        });
	    }
	
	    userLeft(data) {
	        let { users, messages } = this.state;
	        let { name } = data;
	        let index = users.indexOf(name);
	        users.splice(index, 1);
	
	        this.setState({
	            users: [...users],
	            messages: [...messages, {
	                user: 'APPLICATION BOT',
	                text: name + ' Left'
	            }]
	        });
	    }
	
	    userChangedName(data) {
	        let { oldName, newName } = data;
	        let { users, messages } = this.state;
	        let index = users.indexOf(oldName);
	        users.splice(index, 1, newName);
	
	        this.setState({
	            users: [...users],
	            messages: [...messages, {
	                user: 'APPLICATION BOT',
	                text: 'Change Name : ' + oldName + ' ==> ' + newName
	            }]
	        });
	    }
	
	    onMessageSubmit(message) {
	        let { messages } = this.state;
	
	        this.setState({
	            messages: [...messages, message]
	        });
	        socket.emit('send:message', message);
	    }
	
	    onChangeName(newName) {
	        let oldName = this.state.user;
	        socket.emit('change:name', { name: newName }, result => {
	            if (!result) {
	                return alert('There was an error changing your name');
	            }
	            let { users } = this.state;
	            let index = users.indexOf(oldName);
	            users.splice(index, 1, newName);
	            this.setState({
	                users: [...users],
	                user: newName
	            });
	        });
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_UsersList2.default, {
	                users: this.state.users
	            }),
	            _react2.default.createElement(_Messages.MessageList, {
	                messages: this.state.messages
	            }),
	            _react2.default.createElement(_Messages.MessageForm, {
	                onMessageSubmit: this.onMessageSubmit,
	                user: this.state.user
	            }),
	            _react2.default.createElement(_ChangeNameForm2.default, {
	                onChangeName: this.onChangeName
	            })
	        );
	    }
	}
	exports.default = Page;

/***/ },
/* 28 */
/*!**************************************!*\
  !*** ./common/pages/index/index.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 5);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _Base = __webpack_require__(/*! ../Base.jsx */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _indexActions = __webpack_require__(/*! ./indexActions */ 9);
	
	var _AddTodo = __webpack_require__(/*! ../../components/index/AddTodo */ 21);
	
	var _AddTodo2 = _interopRequireDefault(_AddTodo);
	
	var _TodoList = __webpack_require__(/*! ../../components/index/TodoList */ 24);
	
	var _TodoList2 = _interopRequireDefault(_TodoList);
	
	var _Footer = __webpack_require__(/*! ../../components/index/Footer */ 22);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _Tab = __webpack_require__(/*! ../../components/common/Tab */ 20);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Page extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    componentDidMount() {
	        console.log(this.context.$appConfig.user);
	
	        this.emit('test');
	    }
	
	    render() {
	        // Injected by connect() call:
	        const { dispatch, visibleTodos, visibilityFilter } = this.props;
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_AddTodo2.default, {
	                onAddClick: text => dispatch((0, _indexActions.addTodo)(text)) }),
	            _react2.default.createElement(_TodoList2.default, {
	                todos: visibleTodos,
	                onTodoClick: index => dispatch((0, _indexActions.completeTodo)(index)) }),
	            _react2.default.createElement(_Footer2.default, {
	                filter: visibilityFilter,
	                onFilterChange: nextFilter => dispatch((0, _indexActions.setVisibilityFilter)(nextFilter)) }),
	            _react2.default.createElement(
	                _Tab2.default,
	                { defaultSelectedTab: '1' },
	                _react2.default.createElement(
	                    _Tab.TabTitle,
	                    { label: '1' },
	                    'tab1'
	                ),
	                _react2.default.createElement(
	                    _Tab.TabTitle,
	                    { label: '2' },
	                    'tab2'
	                ),
	                _react2.default.createElement(
	                    _Tab.TabPanel,
	                    { 'for': '1' },
	                    'TabContent1'
	                ),
	                _react2.default.createElement(
	                    _Tab.TabPanel,
	                    { 'for': '2' },
	                    'TabContent2'
	                )
	            )
	        );
	    }
	}
	
	Page.propTypes = {
	    visibleTodos: _react.PropTypes.instanceOf(_immutable.List).isRequired,
	    visibilityFilter: _react.PropTypes.oneOf(['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE']).isRequired
	};
	Page.contextTypes = {
	    $appConfig: _react.PropTypes.object,
	    $eventBus: _react.PropTypes.object
	};
	
	function selectTodos(todos, filter) {
	    switch (filter) {
	        case _indexActions.VisibilityFilters.SHOW_ALL:
	            return todos;
	        case _indexActions.VisibilityFilters.SHOW_COMPLETED:
	            return todos.filter(todo => todo.get('completed'));
	        case _indexActions.VisibilityFilters.SHOW_ACTIVE:
	            return todos.filter(todo => !todo.get('completed'));
	    }
	}
	
	// Which props do we want to inject, given the global state?
	// Note: use https://github.com/faassen/reselect for better performance.
	function select(state) {
	    return {
	        visibleTodos: selectTodos(state.get('todos'), state.get('visibilityFilter')),
	        visibilityFilter: state.get('visibilityFilter')
	    };
	}
	
	// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
	exports.default = (0, _reactRedux.connect)(select)(Page);

/***/ },
/* 29 */
/*!*********************************************!*\
  !*** ./common/pages/index/indexReducers.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _reduxImmutablejs = __webpack_require__(/*! redux-immutablejs */ 13);
	
	var _indexActions = __webpack_require__(/*! ./indexActions */ 9);
	
	const { SHOW_ALL } = _indexActions.VisibilityFilters; // import { combineReducers } from 'redux'
	
	
	function visibilityFilter(state = SHOW_ALL, action) {
	    switch (action.type) {
	        case _indexActions.SET_VISIBILITY_FILTER:
	            return action.filter;
	        default:
	            return state;
	    }
	}
	
	function todos(state = new _immutable.List(), action) {
	    switch (action.type) {
	        case _indexActions.ADD_TODO:
	            return state.push(new _immutable.Map({
	                text: action.text,
	                completed: false
	            }));
	        case _indexActions.COMPLETE_TODO:
	            return state.update(action.index, function (item) {
	                return item.update('completed', true);
	            });
	        default:
	            return state;
	    }
	}
	
	const todoApp = (0, _reduxImmutablejs.combineReducers)({
	    visibilityFilter,
	    todos
	});
	
	exports.default = todoApp;

/***/ },
/* 30 */
/*!*******************************!*\
  !*** ./common/store/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = configureStore;
	
	var _redux = __webpack_require__(/*! redux */ 51);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 53);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (process.env.NODE_ENV !== 'production' && process.browser) {
	    var createLogger = __webpack_require__(/*! redux-logger */ 52);
	}
	
	const middlewareBuilder = () => {
	    let middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default);
	
	    if (process.browser && process.env.NODE_ENV !== 'production') {
	        if (!window.devToolsExtension) {
	            middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, createLogger());
	        }
	    }
	
	    let allComposeElements = [middleware];
	
	    if (process.browser && process.env.NODE_ENV !== 'production') {
	        if (window.devToolsExtension) {
	            allComposeElements.push(window.devToolsExtension());
	        }
	    }
	
	    return allComposeElements;
	};
	
	const finalCreateStore = (0, _redux.compose)(...middlewareBuilder())(_redux.createStore);
	
	function configureStore(initialState, rootReducer) {
	    const store = finalCreateStore(rootReducer, initialState);
	
	    return store;
	}

/***/ },
/* 31 */
/*!**************************************!*\
  !*** ./common/utils/shallowEqual.js ***!
  \**************************************/
/***/ function(module, exports) {

	// modified
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 *
	 */
	
	/*eslint-disable no-self-compare */
	
	'use strict';
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	        // Steps 1-5, 7-10
	        // Steps 6.b-6.e: +0 != -0
	        return x !== 0 || 1 / x === 1 / y;
	    } else {
	        if (typeof x === 'function' && typeof y === 'function') {
	            return x.toString() === y.toString();
	        }
	        // Step 6.a: NaN == NaN
	        return x !== x && y !== y;
	    }
	}
	
	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	    if (is(objA, objB)) {
	        return true;
	    }
	
	    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	        return false;
	    }
	
	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);
	
	    if (keysA.length !== keysB.length) {
	        return false;
	    }
	
	    // Test for A's keys different from B.
	    for (var i = 0; i < keysA.length; i++) {
	        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	            return false;
	        }
	    }
	
	    return true;
	}
	
	module.exports = shallowEqual;

/***/ },
/* 32 */
/*!******************************!*\
  !*** ./server/apis/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _express = __webpack_require__(/*! express */ 6);
	
	let router = new _express.Router();
	
	router.post('/ajax', function (req, res, next) {
	    if (error) {
	        next();
	    } else {
	        res.send('test');
	    }
	});
	
	exports.default = router;

/***/ },
/* 33 */
/*!*************************************!*\
  !*** ./server/controllers/async.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _isomorphicFetch = __webpack_require__(/*! isomorphic-fetch */ 12);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _reducers = __webpack_require__(/*! ../../common/pages/async/reducers */ 26);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _Page = __webpack_require__(/*! ../../common/pages/async/Page.jsx */ 25);
	
	var _Page2 = _interopRequireDefault(_Page);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = function (req, res, next) {
	    let state = {
	        postsByReddit: {},
	        selectedReddit: 'reactjs'
	    };
	
	    (0, _isomorphicFetch2.default)(`https://www.reddit.com/r/${ state.selectedReddit }.json`, {
	        method: 'GET',
	        timeout: 5000
	    }).then(response => response.json()).then(json => {
	        state.postsByReddit[state.selectedReddit] = {
	            didInvalidate: false,
	            isFetching: false,
	            lastUpdated: Date.now(),
	            items: json.data.children.map(child => child.data)
	        };
	
	        res.renderReactHTML({
	            component: _react2.default.createElement(_Page2.default, null),
	            locals: {
	                appName: 'async',
	                title: 'async page'
	            },
	            data: state,
	            rootReducer: _reducers2.default
	        });
	    }).catch(msg => {
	
	        console.log(msg);
	
	        res.renderReactHTML({
	            component: _react2.default.createElement(_Page2.default, null),
	            locals: {
	                appName: 'async',
	                title: 'async page'
	            },
	            data: state,
	            rootReducer: _reducers2.default
	        });
	    });
	};

/***/ },
/* 34 */
/*!************************************!*\
  !*** ./server/controllers/chat.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Page = __webpack_require__(/*! ../../common/pages/chat/Page */ 27);
	
	var _Page2 = _interopRequireDefault(_Page);
	
	var _fs = __webpack_require__(/*! fs */ 7);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let template = _fs2.default.readFileSync(__dirname + '/../views/chat.html', 'utf8');
	let fakeData = {};
	
	module.exports = function (req, res, next) {
	    res.renderReactHTML({
	        template,
	        component: _react2.default.createElement(_Page2.default, null),
	        locals: {
	            appName: 'chat',
	            title: 'chat page'
	        },
	        data: fakeData,
	        needTransform: false
	    });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "server\\controllers"))

/***/ },
/* 35 */
/*!*************************************!*\
  !*** ./server/controllers/index.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _indexReducers = __webpack_require__(/*! ../../common/pages/index/indexReducers */ 29);
	
	var _indexReducers2 = _interopRequireDefault(_indexReducers);
	
	var _index = __webpack_require__(/*! ../../common/pages/index */ 28);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let fakeData = {
	    visibilityFilter: 'SHOW_ALL',
	    todos: [{
	        text: 'one',
	        completed: false
	    }, {
	        text: 'two',
	        completed: true
	    }]
	};
	
	module.exports = function (req, res, next) {
	    res.renderReactHTML({
	        component: _react2.default.createElement(_index2.default, null),
	        locals: {
	            appName: 'index',
	            title: 'index page'
	        },
	        data: fakeData,
	        rootReducer: _indexReducers2.default,
	        pageConfig: {
	            user: 'test'
	        }
	    });
	};

/***/ },
/* 36 */
/*!********************************!*\
  !*** ./server/routes/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 6);
	
	var _fs = __webpack_require__(/*! fs */ 7);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _index = __webpack_require__(/*! ../controllers/index */ 35);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _async = __webpack_require__(/*! ../controllers/async */ 33);
	
	var _async2 = _interopRequireDefault(_async);
	
	var _chat = __webpack_require__(/*! ../controllers/chat */ 34);
	
	var _chat2 = _interopRequireDefault(_chat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	let router = new _express.Router();
	
	/**
	 * 首页请求
	 */
	router.get('/', _index2.default);
	router.get('/async', _async2.default);
	router.get('/chat', _chat2.default);
	
	/**
	 * 静态资源
	 */
	let content = _fs2.default.readFileSync(__dirname + '/../../client/js/utils/sw.js', 'utf8');
	
	router.get('/sw.js', (() => {
	  var _ref = _asyncToGenerator(function* (req, res) {
	    res.set('Content-Type', 'application/javascript');
	    res.send(content);
	  });
	
	  return function (_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	})());
	
	exports.default = router;
	/* WEBPACK VAR INJECTION */}.call(exports, "server\\routes"))

/***/ },
/* 37 */
/*!**********************************!*\
  !*** ./server/sockets/socket.js ***!
  \**********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (socket) {
	    let name = userNames.getGuestName();
	
	    // send the new user their name and a list of users
	    socket.emit('init', {
	        name: name,
	        users: userNames.get()
	    });
	
	    // notify other clients that a new user has joined
	    socket.broadcast.emit('user:join', {
	        name: name
	    });
	
	    // broadcast a user's message to other users
	    socket.on('send:message', function (data) {
	        socket.broadcast.emit('send:message', {
	            user: name,
	            text: data.text
	        });
	    });
	
	    // validate a user's name change, and broadcast it on success
	    socket.on('change:name', function (data, fn) {
	        if (userNames.claim(data.name)) {
	            let oldName = name;
	            userNames.free(oldName);
	
	            name = data.name;
	
	            socket.broadcast.emit('change:name', {
	                oldName: oldName,
	                newName: name
	            });
	
	            fn(true);
	        } else {
	            fn(false);
	        }
	    });
	
	    // clean up when a user leaves, and broadcast it to other users
	    socket.on('disconnect', function () {
	        socket.broadcast.emit('user:left', {
	            name: name
	        });
	        userNames.free(name);
	    });
	};
	
	// Keep track of which names are used so that there are no duplicates
	let userNames = function () {
	    let names = {};
	
	    let claim = function (name) {
	        if (!name || names[name]) {
	            return false;
	        } else {
	            names[name] = true;
	            return true;
	        }
	    };
	
	    // find the lowest unused "guest" name and claim it
	    let getGuestName = function () {
	        let name,
	            nextUserId = 1;
	
	        do {
	            name = 'Guest ' + nextUserId;
	            nextUserId += 1;
	        } while (!claim(name));
	
	        return name;
	    };
	
	    // serialize claimed names as an array
	    let get = function () {
	        let res = [];
	        for (let user in names) {
	            res.push(user);
	        }
	
	        return res;
	    };
	
	    let free = function (name) {
	        if (names[name]) {
	            delete names[name];
	        }
	    };
	
	    return {
	        claim: claim,
	        free: free,
	        get: get,
	        getGuestName: getGuestName
	    };
	}();
	
	// export function for listening to the socket
	;

/***/ },
/* 38 */
/*!******************************************!*\
  !*** ./server/utils/allowCrossDomain.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = allowCrossDomain;
	function allowCrossDomain(req, res, next) {
	    let allowedOrigins = ['http://www.test.com'];
	    let origin = req.headers.origin;
	    if (allowedOrigins.indexOf(origin) > -1) {
	        res.header('Access-Control-Allow-Origin', origin);
	    }
	    next();
	}

/***/ },
/* 39 */
/*!************************************************!*\
  !*** ./server/utils/renderReactMiddleware.jsx ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = reactRender;
	
	var _ejs = __webpack_require__(/*! ejs */ 45);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 50);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 5);
	
	var _fs = __webpack_require__(/*! fs */ 7);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _secureFilters = __webpack_require__(/*! secure-filters */ 54);
	
	var _secureFilters2 = _interopRequireDefault(_secureFilters);
	
	var _index = __webpack_require__(/*! ../../common/store/index */ 30);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _App = __webpack_require__(/*! ../../common/App.jsx */ 14);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _config = __webpack_require__(/*! ../config/config.json */ 10);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// for xss protection
	const defaultTemplate = _fs2.default.readFileSync(__dirname + '/../views/index.html', 'utf8');
	
	function getDefaultJSVersion(name) {
	    let webpackAssets = _fs2.default.readFileSync(__dirname + '/../../webpack-assets.json', 'utf8');
	
	    try {
	        webpackAssets = JSON.parse(webpackAssets);
	    } catch (ex) {
	        console.log('webpack-assets.json parsed error');
	        webpackAssets = {};
	    }
	    return webpackAssets[name];
	}
	
	function reactRender(middlewareConfig = {}) {
	    return function (req, res, next) {
	        res.renderReactHTML = function (opts = {}) {
	            let {
	                template = '',
	                component = '',
	                data = {},
	                rootReducer = () => {},
	                locals = {},
	                pageConfig = {},
	                needTransform = true
	            } = opts;
	            let transformedData = typeof middlewareConfig.transformer === 'function' && needTransform ? middlewareConfig.transformer(data) : data;
	            let store = (0, _index2.default)(transformedData, rootReducer);
	            let html = '';
	            pageConfig = Object.assign(typeof middlewareConfig.appConfig === 'object' ? middlewareConfig.appConfig : {}, pageConfig);
	
	            try {
	                html = (0, _server.renderToString)(_react2.default.createElement(
	                    _reactRedux.Provider,
	                    { store: store },
	                    _react2.default.createElement(
	                        _App2.default,
	                        { appconfig: pageConfig },
	                        component
	                    )
	                ));
	            } catch (ex) {
	                html = 'internal server error: \n' + ex.message;
	                console.error(ex.message);
	            }
	
	            let debug = req.query.debug && req.query.debug === _config2.default.application.debugName;
	            let state = data;
	            let version = _config2.default.application.version;
	            let jsVersion = '';
	            // prefer config version, useful when using CDN config
	            if (process.env.NODE_ENV === 'production') {
	                jsVersion = version && version.js;
	            } else {
	                jsVersion = getDefaultJSVersion(locals.appName || 'index');
	            }
	            template = template || middlewareConfig.defaultTemplate || defaultTemplate;
	
	            let finalLocals = Object.assign({
	                html,
	                state: _secureFilters2.default.jsObj(data),
	                appName: 'index',
	                title: '',
	                test: process.env.NODE_ENV !== 'production',
	                debug,
	                appConfig: _secureFilters2.default.jsObj(pageConfig),
	                version: {
	                    js: jsVersion,
	                    css: version && version.css
	                }
	            }, res.locals, locals);
	
	            let pageStr = _ejs2.default.render(template, finalLocals, {
	                compileDebug: false
	            });
	
	            res.status(200).send(pageStr);
	        };
	
	        next();
	    };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "server\\utils"))

/***/ },
/* 40 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 41 */
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 42 */
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 43 */
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 44 */
/*!************************!*\
  !*** external "csurf" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("csurf");

/***/ },
/* 45 */
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = require("ejs");

/***/ },
/* 46 */
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 47 */
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 48 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 49 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 50 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 51 */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 52 */
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("redux-logger");

/***/ },
/* 53 */
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 54 */
/*!*********************************!*\
  !*** external "secure-filters" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("secure-filters");

/***/ },
/* 55 */
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map