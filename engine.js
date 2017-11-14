/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Engine namespace
	window.Engine = {
	    Math: {},
	    Actors: {},
	    Components: {}
	};

	// Init
	document.addEventListener('DOMContentLoaded', function () {
	    Engine.Core.init();
	}, false);

	// Load modules
	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);

	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);

	__webpack_require__(13);
	__webpack_require__(14);

	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The core game class
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Core = function () {
	    function Core() {
	        _classCallCheck(this, Core);
	    }

	    _createClass(Core, null, [{
	        key: 'init',

	        /**
	         * Init
	         */
	        value: function init() {
	            var _this = this;

	            // Fullscreen invisible button
	            var fsBtn = document.createElement('button');
	            fsBtn.style.position = 'fixed';
	            fsBtn.style.top = '0%';
	            fsBtn.style.left = '0%';
	            fsBtn.style.width = '100%';
	            fsBtn.style.height = '100%';
	            fsBtn.innerHTML = 'PLAY';

	            document.body.appendChild(fsBtn);

	            fsBtn.addEventListener('click', function (e) {
	                // Remove the fullscreen button
	                document.body.removeChild(fsBtn);

	                // Set fullscreen
	                Engine.Graphics.setFullscreen(true).then(function () {
	                    // Init submodules
	                    Engine.Time.init();
	                    Engine.UI.init();
	                    Engine.Graphics.init();
	                    Engine.Input.init();
	                    Engine.Stage.init();

	                    // Init everything else
	                    _this.trigger('init');
	                });
	            });
	        }

	        /**
	         * Register event
	         *
	         * @param {String} type
	         * @param {Function} callback
	         */

	    }, {
	        key: 'on',
	        value: function on(type, callback) {
	            if (!this.events) {
	                this.events = {};
	            }
	            if (!Array.isArray(this.events[type])) {
	                this.events[type] = [];
	            }

	            this.events[type].push(callback);
	        }

	        /**
	         * Trigger event
	         *
	         * @param {String} type
	         */

	    }, {
	        key: 'trigger',
	        value: function trigger(type) {
	            if (!this.events) {
	                this.events = {};
	            }
	            if (!Array.isArray(this.events[type])) {
	                return;
	            }

	            for (var i in this.events[type]) {
	                this.events[type][i]();
	            }
	        }

	        /**
	         * Loads a script
	         *
	         * @param {String} path
	         */

	    }, {
	        key: 'load',
	        value: function load(path) {
	            if (typeof path !== 'string') {
	                Engine.Debug.error('Parameter "path" must be of type "string"');
	            }

	            // Append .js if not present
	            if (path.indexOf('.js') < 0) {
	                path += '.js';
	            }

	            // Append root dir
	            path = './src/Game/' + path;

	            var script = document.createElement('script');
	            script.src = path;

	            document.head.appendChild(script);
	        }
	    }]);

	    return Core;
	}();

	Engine.Core = Core;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A debugging helper class
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Debug = function () {
	    function Debug() {
	        _classCallCheck(this, Debug);
	    }

	    _createClass(Debug, null, [{
	        key: 'log',

	        /**
	         * Logs a message
	         *
	         * @param {String|Array} messages
	         */
	        value: function log() {
	            for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
	                messages[_key] = arguments[_key];
	            }

	            console.log(messages, arguments.callee.caller.toString());
	        }

	        /**
	         * Throws an error
	         *
	         * @param {Error|String} error
	         */

	    }, {
	        key: 'error',
	        value: function error(_error) {
	            if (typeof _error === 'string') {
	                _error = new Error(_error);
	            }

	            if (_error instanceof Error === false) {
	                throw new TypeError('The paramater "error" must either be of type "string" or "error"');
	            }

	            throw _error;
	        }
	    }]);

	    return Debug;
	}();

	Engine.Debug = Debug;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The base class for everything
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Entity = function () {
	  /**
	   * Constructor
	   */
	  function Entity(config) {
	    _classCallCheck(this, Entity);

	    this.defaults();

	    if (!config) {
	      return;
	    }

	    for (var k in config) {
	      this[k] = config[k];
	    }
	  }

	  /**
	   * Defaults
	   */


	  _createClass(Entity, [{
	    key: 'defaults',
	    value: function defaults() {}

	    /**
	     * Creates a clone of this Entity
	     *
	     * @returns {Entity} Clone
	     */

	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new this.constructor(Object.assign({}, this));
	    }
	  }]);

	  return Entity;
	}();

	Engine.Entity = Entity;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The graphics subsystem
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Graphics = function () {
	    function Graphics() {
	        _classCallCheck(this, Graphics);
	    }

	    _createClass(Graphics, null, [{
	        key: 'init',

	        /**
	         * Init
	         */
	        value: function init() {
	            var _this = this;

	            // Init canvas and context
	            this.canvas = document.createElement('canvas');
	            this.ctx = this.canvas.getContext('2d');

	            // Init colours
	            this.backgroundColor = new Engine.Math.Color(0.7, 0.7, 0.7);
	            this.frameColor = new Engine.Math.Color(0.3, 0.3, 0.3);

	            // Set canvas styling
	            this.canvas.style.display = 'block';

	            // Append to body
	            document.body.appendChild(this.canvas);

	            // Set html styling
	            document.documentElement.style.overflow = 'hidden';

	            // Set body styling
	            document.body.style.overflow = 'hidden';
	            document.body.style.width = '100vw';
	            document.body.style.height = '100vh';
	            document.body.style.margin = 0;
	            document.body.style.display = 'flex';
	            document.body.style.alignItems = 'center';
	            document.body.style.justifyContent = 'center';
	            document.body.userSelect = 'none';
	            document.body.style.backgroundColor = this.frameColor.toHex();

	            // Update screen dimensions
	            this.updateScreenDimensions();

	            // Kick off the first draw call
	            window.requestAnimationFrame(function () {
	                _this.draw();
	            });
	        }

	        /**
	         * Sets the background colour
	         *
	         * @param {Color} color
	         */

	    }, {
	        key: 'setBackgroundColor',
	        value: function setBackgroundColor(color) {
	            this.backgroundColor = color;
	        }

	        /**
	         * Updates the screen dimensions
	         */

	    }, {
	        key: 'updateScreenDimensions',
	        value: function updateScreenDimensions() {
	            var width = window.innerWidth;
	            var height = window.innerHeight;

	            this.screenWidth = width;
	            this.screenHeight = height;

	            this.screenWidth = width;
	            this.screenHeight = height;

	            this.canvas.width = this.screenWidth;
	            this.canvas.height = this.screenHeight;

	            Engine.UI.updateScreenDimensions();
	        }

	        /**
	         * Set full screen
	         *
	         * @param {Boolean} isFullscreen
	         *
	         * @returns {Promise} Completed
	         */

	    }, {
	        key: 'setFullscreen',
	        value: function setFullscreen(isFullscreen) {
	            return new Promise(function (resolve, reject) {
	                // Assume standards compatible API is available
	                var changeName = 'fullscreenchange';
	                var requestName = 'requestFullScreen';
	                var exitName = 'exitFullScreen';

	                // Change event
	                var onChange = function onChange() {
	                    document.removeEventListener(changeName, onChange);

	                    window.requestAnimationFrame(function () {
	                        resolve();
	                    });
	                };

	                // Webkit
	                if (typeof document.documentElement.webkitRequestFullscreen === 'function') {
	                    changeName = 'webkitfullscreenchange';
	                    requestName = 'webkitRequestFullScreen';
	                    exitName = 'webkitExitFullScreen';

	                    // Mozilla
	                } else if (typeof document.documentElement.mozFullscreen === 'function') {
	                    changeName = 'mozfullscreenchange';
	                    requestName = 'mozRequestFullScreen';
	                    exitName = 'mozExitFullScreen';

	                    // MS
	                } else if (typeof document.documentElement.msFullscreen === 'function') {
	                    changeName = 'MSFullscreenChange';
	                    requestName = 'msRequestFullScreen';
	                    exitName = 'msExitFullScreen';
	                }

	                // Toggle on/off
	                if (isFullscreen) {
	                    document.documentElement[requestName]();
	                } else {
	                    document[exitName]();
	                }

	                // Set change event
	                document.documentElement.addEventListener(changeName, onChange);
	            });
	        }

	        /**
	         * The draw loop
	         */

	    }, {
	        key: 'draw',
	        value: function draw() {
	            var _this2 = this;

	            // First check if the screen dimensions are correct
	            if (this.screenWidth !== window.innerWidth || this.screenHeight !== window.innerHeight) {
	                this.updateScreenDimensions();
	            }

	            this.ctx.fillStyle = this.backgroundColor.toHex();
	            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	            for (var i in Engine.Stage.actors) {
	                if (!Engine.Stage.actors[i].canDraw) {
	                    continue;
	                }

	                var transform = Engine.Stage.actors[i].getGlobalTransform();

	                this.translate(transform.position.x, transform.position.y);
	                this.scale(transform.scale.x, transform.scale.y);
	                this.rotate(transform.rotate);

	                Engine.Stage.actors[i].draw();

	                this.rotate(-transform.rotate);
	                this.scale(Math.pow(transform.scale.x, -1), Math.pow(transform.scale.y, -1));
	                this.translate(-transform.position.x, -transform.position.y);
	            }

	            window.requestAnimationFrame(function () {
	                _this2.draw();
	            });
	        }

	        /**
	         * Translate
	         *
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: 'translate',
	        value: function translate(x, y) {
	            this.ctx.translate(x, y);
	        }

	        /**
	         * Rotate
	         *
	         * @param {Number} degrees
	         */

	    }, {
	        key: 'rotate',
	        value: function rotate(degrees) {
	            this.ctx.rotate(degrees * Math.PI / 180);
	        }

	        /**
	         * Scale
	         *
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: 'scale',
	        value: function scale(x, y) {
	            this.ctx.scale(x, y);
	        }

	        /**
	         * Pushes the draw state
	         */

	    }, {
	        key: 'push',
	        value: function push() {
	            this.ctx.save();
	        }

	        /**
	         * Pops the draw state
	         */

	    }, {
	        key: 'pop',
	        value: function pop() {
	            this.ctx.restore();
	        }

	        /**
	         * Draws text
	         *
	         * @param {Number} x
	         * @param {Number} y
	         * @param {String} text
	         * @param {String} xAlign
	         * @param {String} yAlign
	         * @param {Number} size
	         * @param {String} font
	         * @param {Number} strokeWidth
	         * @param {Color} strokeColor
	         * @param {Color} fillColor
	         */

	    }, {
	        key: 'drawText',
	        value: function drawText(x, y, text, xAlign, yAlign, size, font, strokeWidth, strokeColor, fillColor) {
	            this.ctx.font = size + 'px ' + font;

	            this.ctx.textAlign = xAlign;
	            this.ctx.textBaseline = yAlign;

	            if (strokeColor && strokeWidth > 0) {
	                this.ctx.strokeStyle = strokeColor.toRGB();
	                this.ctx.strokeText(text, x, y);
	            }

	            if (fillColor) {
	                this.ctx.fillStyle = fillColor.toRGB();
	                this.ctx.fillText(text, x, y);
	            }
	        }

	        /**
	         * Draws a circle
	         *
	         * @param {Number} x
	         * @param {Number} y
	         * @param {Number} radius
	         * @param {Number} strokeWidth
	         * @param {Color} strokeColor
	         * @param {Color} fillColor
	         */

	    }, {
	        key: 'drawCircle',
	        value: function drawCircle(x, y, radius, strokeWidth, strokeColor, fillColor) {
	            this.ctx.beginPath();
	            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
	            this.ctx.lineWidth = strokeWidth;

	            if (fillColor) {
	                this.ctx.fillStyle = fillColor.toRGB();
	                this.ctx.fill();
	            }

	            if (strokeColor && strokeWidth > 0) {
	                this.ctx.strokeStyle = strokeColor.toRGB();
	                this.ctx.stroke();
	            }
	        }

	        /**
	         * Draw a rectangle
	         *
	         * @param {Number} x
	         * @param {Number} y
	         * @param {Number} width
	         * @param {Number} height
	         * @param {Number} strokeWidth
	         * @param {Color} strokeColor
	         * @param {Color} fillColor
	         */

	    }, {
	        key: 'drawRectangle',
	        value: function drawRectangle(x, y, width, height, strokeWidth, strokeColor, fillColor) {
	            this.ctx.beginPath();
	            this.ctx.rect(x, y, width, height);
	            this.ctx.lineWidth = strokeWidth;

	            if (fillColor) {
	                this.ctx.fillStyle = fillColor.toRGB();
	                this.ctx.fill();
	            }

	            if (strokeColor && strokeWidth > 0) {
	                this.ctx.strokeStyle = strokeColor.toRGB();
	                this.ctx.stroke();
	            }
	        }

	        /**
	         * Draw a line
	         *
	         * @param {Number} fromX
	         * @param {Number} fromY
	         * @param {Number} toX
	         * @param {Number} toY
	         * @param {Number} strokeWidth
	         * @param {Color} strokeColor
	         */

	    }, {
	        key: 'drawLine',
	        value: function drawLine(fromX, fromY, toX, toY, strokeWidth, strokeColor) {
	            this.ctx.beginPath();
	            this.ctx.moveTo(fromX, fromY);
	            this.ctx.lineTo(toX, toY);
	            this.ctx.lineWidth = strokeWidth;
	            this.ctx.strokeStyle = strokeColor ? strokeColor.toRGB() : 'rgba(0,0,0,1)';
	            this.ctx.stroke();
	        }
	    }]);

	    return Graphics;
	}();

	Engine.Graphics = Graphics;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The input subsystem
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Input = function () {
	    function Input() {
	        _classCallCheck(this, Input);
	    }

	    _createClass(Input, null, [{
	        key: 'init',

	        /**
	         * Init
	         */
	        value: function init() {
	            var _this = this;

	            // Events dictionary
	            this.events = {
	                keydown: {},
	                keyup: {}
	            };

	            // Init listeners
	            document.addEventListener('keydown', function (e) {
	                _this.onKeyDown(e);
	            });
	            document.addEventListener('keyup', function (e) {
	                _this.onKeyUp(e);
	            });
	            document.addEventListener('mousedown', function (e) {
	                _this.onPointerDown(e);
	            });
	            document.addEventListener('mouseup', function (e) {
	                _this.onPointerUp(e);
	            });
	            document.addEventListener('mousecancel', function (e) {
	                _this.onPointerUp(e);
	            });
	            document.addEventListener('mousemove', function (e) {
	                _this.onPointerMove(e);
	            });
	            document.addEventListener('touchstart', function (e) {
	                _this.onPointerDown(e);
	            });
	            document.addEventListener('touchend', function (e) {
	                _this.onPointerUp(e);
	            });
	            document.addEventListener('touchcancel', function (e) {
	                _this.onPointerUp(e);
	            });
	            document.addEventListener('touchmove', function (e) {
	                _this.onPointerMove(e);
	            });

	            // Cached values
	            this.previousPointerPosition = new Engine.Math.Vector2(0, 0);
	            this.pointerDelta = new Engine.Math.Vector2(0, 0);

	            // Buttons
	            this.BUTTON = {
	                LEFT_MOUSE: 1,
	                MIDDLE_MOUSE: 2,
	                RIGHT_MOUSE: 3
	            };

	            // Keys
	            this.KEY = {
	                SPACE: 32,
	                BACKSPACE: 8,
	                TAB: 9,
	                ENTER: 13,
	                SHIFT: 16,
	                CTRL: 17,
	                ALT: 18,
	                PAUSE_BREAK: 19,
	                CAPS_LOCK: 20,
	                ESCAPE: 27,
	                PAGE_UP: 33,
	                PAGE_DOWN: 34,
	                END: 35,
	                HOME: 36,
	                LEFT_ARROW: 37,
	                UP_ARROW: 38,
	                RIGHT_ARROW: 39,
	                DOWN_ARROW: 40,
	                INSERT: 45,
	                DELETE: 46,
	                0: 48,
	                1: 49,
	                2: 50,
	                3: 51,
	                4: 52,
	                5: 53,
	                6: 54,
	                7: 55,
	                8: 56,
	                9: 57,
	                A: 65,
	                B: 66,
	                C: 67,
	                D: 68,
	                E: 69,
	                F: 70,
	                G: 71,
	                H: 72,
	                I: 73,
	                J: 74,
	                K: 75,
	                L: 76,
	                M: 77,
	                N: 78,
	                O: 79,
	                P: 80,
	                Q: 81,
	                R: 82,
	                S: 83,
	                T: 84,
	                U: 85,
	                V: 86,
	                W: 87,
	                X: 88,
	                Y: 89,
	                Z: 90,
	                LEFT_SUPER_KEY: 91,
	                RIGHT_SUPER_KEY: 92,
	                SELECT_KEY: 93,
	                NUMPAD_0: 96,
	                NUMPAD_1: 97,
	                NUMPAD_2: 98,
	                NUMPAD_3: 99,
	                NUMPAD_4: 100,
	                NUMPAD_5: 101,
	                NUMPAD_6: 102,
	                NUMPAD_7: 103,
	                NUMPAD_8: 104,
	                NUMPAD_9: 105,
	                MULTIPLY: 106,
	                ADD: 107,
	                SUBTRACT: 109,
	                DECIMAL_POINT: 110,
	                DIVIDE: 111,
	                F1: 112,
	                F2: 113,
	                F3: 114,
	                F4: 115,
	                F5: 116,
	                F6: 117,
	                F7: 118,
	                F8: 119,
	                F9: 120,
	                F10: 121,
	                F11: 122,
	                F12: 123,
	                NUM_LOCK: 144,
	                SCROLL_LOCK: 145,
	                SEMI_COLON: 186,
	                EQUAL_SIGN: 187,
	                COMMA: 188,
	                DASH: 189,
	                PERIOD: 190,
	                FORWARD_SLASH: 191,
	                GRAVE_ACCENT: 192,
	                OPEN_BRACKET: 219,
	                BACK_SLASH: 220,
	                CLOSE_BRAKET: 221,
	                SINGLE_QUOTE: 222
	            };
	        }

	        /**
	         * Triggers an input event
	         *
	         * @param {String} action
	         * @param {Number} key
	         * @param {InputEvent} event
	         */

	    }, {
	        key: 'trigger',
	        value: function trigger(action, key, event) {
	            if (!this.events[action]) {
	                return;
	            }
	            if (!this.events[action][key]) {
	                return;
	            }

	            for (var i in this.events[action][key]) {
	                if (typeof this.events[action][key][i] !== 'function') {
	                    continue;
	                }

	                this.events[action][key][i](event);
	            }
	        }

	        /**
	         * Binds an input event
	         *
	         * @param {String} action
	         * @param {Number|String|Array} keys
	         * @param {Function} callback
	         */

	    }, {
	        key: 'on',
	        value: function on(action, keys, callback) {
	            if (!this.events[action]) {
	                this.events[action] = {};
	            }

	            if (!Array.isArray(keys)) {
	                keys = [keys];
	            }

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    if (!this.events[action][key]) {
	                        this.events[action][key] = [];
	                    }

	                    this.events[action][key].push(callback);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }

	        /**
	         * Handles key down event
	         *
	         * @param {InputEvent} e
	         */

	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(e) {
	            e.preventDefault();

	            this.trigger('keydown', e.which, e);
	        }

	        /**
	         * Handles key up event
	         *
	         * @param {InputEvent} e
	         */

	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(e) {
	            e.preventDefault();

	            this.trigger('keyup', e.which, e);
	        }

	        /**
	         * Handles pointer move
	         *
	         * @param {InputEvent} e
	         */

	    }, {
	        key: 'onPointerMove',
	        value: function onPointerMove(e) {
	            var x = 0;
	            var y = 0;

	            // Touch input
	            if (e.changedTouches && e.changedTouches.length > 0) {
	                x = e.changedTouches[0].pageX;
	                y = e.changedTouches[0].pageY;

	                // Mouse input
	            } else if (typeof e.pageX === 'number') {
	                x = e.pageX;
	                y = e.pageY;

	                // Neither?
	            } else {
	                return;
	            }

	            // Ignore the very first frame, as the delta would be inaccurate
	            if (this.previousPointerPosition.x !== 0 && this.previousPointerPosition.y !== 0) {
	                this.pointerDelta.x = x - this.previousPointerPosition.x;
	                this.pointerDelta.y = y - this.previousPointerPosition.y;
	            }

	            this.previousPointerPosition.x = x;
	            this.previousPointerPosition.y = y;

	            this.trigger('pointermove', e.which, e);
	        }

	        /**
	         * Handles pointer down event
	         *
	         * @param {InputEvent} e
	         */

	    }, {
	        key: 'onPointerDown',
	        value: function onPointerDown(e) {
	            var pointerPos = new Engine.Math.Vector2(e.pageX, e.pageY);

	            if (e.changedTouches && e.changedTouches.length > 0) {
	                pointerPos.x = e.changedTouches[0].pageX;
	                pointerPos.y = e.changedTouches[0].pageY;
	            }

	            // Update previous pointer position
	            this.previousPointerPosition.x = pointerPos.x;
	            this.previousPointerPosition.y = pointerPos.y;

	            this.trigger('pointerdown', e.which, e);

	            // Look for colliders to trigger clicks on
	            var actors = Engine.Stage.getActors();

	            for (var i in actors) {
	                if (!actors[i].collider) {
	                    continue;
	                }

	                if (actors[i].collider.getBounds().contains(pointerPos.x, pointerPos.y)) {
	                    actors[i].trigger('pointerdown');
	                }
	            }
	        }

	        /**
	         * Handles pointer up event
	         *
	         * @param {InputEvent} e
	         */

	    }, {
	        key: 'onPointerUp',
	        value: function onPointerUp(e) {
	            var pointerPos = new Engine.Math.Vector2(e.pageX, e.pageY);

	            if (e.changedTouches && e.changedTouches.length > 0) {
	                pointerPos.x = e.changedTouches[0].pageX;
	                pointerPos.y = e.changedTouches[0].pageY;
	            }

	            // Clear delta
	            this.pointerDelta.x = 0;
	            this.pointerDelta.y = 0;

	            this.trigger('pointerup', e.which, e);

	            // Look for colliders to trigger clicks on
	            var actors = Engine.Stage.getActors();

	            for (var i in actors) {
	                if (actors[i].collider && actors[i].collider.getBounds().contains(pointerPos.x, pointerPos.y)) {
	                    actors[i].trigger('pointerup');
	                }
	            }
	        }
	    }]);

	    return Input;
	}();

	Engine.Input = Input;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Engine.Settings = {};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The stage subsystem
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Stage = function () {
	    function Stage() {
	        _classCallCheck(this, Stage);
	    }

	    _createClass(Stage, null, [{
	        key: 'init',

	        /**
	         * Init
	         */
	        value: function init() {
	            this.actors = [];
	        }

	        /**
	         * Adds an actor
	         *
	         * @param {Actor} actor
	         */

	    }, {
	        key: 'addActor',
	        value: function addActor(actor) {
	            if (actor instanceof Engine.Actors.Actor === false) {
	                throw new TypeError('Not an Actor', actor);
	            }

	            this.actors.push(actor);
	        }

	        /**
	         * Gets an actor
	         *
	         * @param {Actor} type
	         */

	    }, {
	        key: 'getActor',
	        value: function getActor(type) {
	            for (var i in this.actors) {
	                if (this.actors[i] instanceof type) {
	                    return this.actors[i];
	                }
	            }

	            return null;
	        }

	        /**
	         * Removes an actor
	         *
	         * @param {Actor} actor
	         */

	    }, {
	        key: 'removeActor',
	        value: function removeActor(actor) {
	            for (var i = this.actors.length - 1; i > 0; i--) {
	                if (this.actors[i] === actor) {
	                    // Update parent Actor
	                    if (this.actors[i].parent) {
	                        var childIndex = this.actors[i].parent.children.indexOf(this.actors[i]);

	                        this.actors[i].parent.children.splice(childIndex, 1);
	                    }

	                    this.actors.splice(i, 1);
	                }
	            }
	        }

	        /**
	         * Gets a list of actors
	         *
	         * @param {Actor} type
	         */

	    }, {
	        key: 'getActors',
	        value: function getActors(type) {
	            var actors = [];

	            for (var i in this.actors) {
	                if (!type || this.actors[i] instanceof type) {
	                    actors.push(this.actors[i]);
	                }
	            }

	            return actors;
	        }
	    }]);

	    return Stage;
	}();

	Engine.Stage = Stage;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The time subsystem
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Time = function () {
	    function Time() {
	        _classCallCheck(this, Time);
	    }

	    _createClass(Time, null, [{
	        key: 'init',

	        /**
	         * Init
	         */
	        value: function init() {
	            this.deltaTime = 0;
	            this.startTime = Date.now();
	            this.lastTimeStamp = 0;

	            // Kick off the first time update
	            this.update(0);
	        }

	        /**
	         * The update loop
	         */

	    }, {
	        key: 'update',
	        value: function update(timestamp) {
	            var _this = this;

	            this.deltaTime = (timestamp - this.lastTimeStamp) * 0.001;
	            this.lastTimeStamp = timestamp;

	            for (var i in Engine.Stage.actors) {
	                if (!Engine.Stage.actors[i].canUpdate) {
	                    continue;
	                }

	                Engine.Stage.actors[i].update();
	            }

	            window.requestAnimationFrame(function (timestamp) {
	                _this.update(timestamp);
	            });
	        }
	    }]);

	    return Time;
	}();

	Engine.Time = Time;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The UI subsystem
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UI = function () {
	    function UI() {
	        _classCallCheck(this, UI);
	    }

	    _createClass(UI, null, [{
	        key: 'init',

	        /**
	         * Init
	         */
	        value: function init() {
	            this.div = document.createElement('div');

	            this.div.style.position = 'absolute';
	            this.div.style.top = '50%';
	            this.div.style.left = '50%';
	            this.div.style.transform = 'translate(-50%, -50%)';
	            this.div.style.width = Engine.Graphics.screenWidth + 'px';
	            this.div.style.height = Engine.Graphics.screenHeight + 'px';
	            this.div.style.pointerEvents = 'none';

	            document.body.appendChild(this.div);
	        }

	        /**
	         * Updates the screen dimensions
	         */

	    }, {
	        key: 'updateScreenDimensions',
	        value: function updateScreenDimensions() {
	            this.div.style.width = Engine.Graphics.screenWidth + 'px';
	            this.div.style.height = Engine.Graphics.screenHeight + 'px';
	        }

	        /**
	         * Adds a widget
	         *
	         * @param {Widget} widget
	         */

	    }, {
	        key: 'addWidget',
	        value: function addWidget(widget) {
	            widget.element.style.pointerEvents = 'all';

	            this.div.appendChild(widget.element);
	        }
	    }]);

	    return UI;
	}();

	/**
	 * A button
	 */


	UI.Button = function (_Engine$Entity) {
	    _inherits(Button, _Engine$Entity);

	    _createClass(Button, [{
	        key: 'width',

	        // Getters
	        get: function get() {
	            return parseInt(this.element.style.width);
	        },


	        // Setters
	        set: function set(value) {
	            this.element.style.width = value + 'px';
	        }
	    }, {
	        key: 'height',
	        get: function get() {
	            return parseInt(this.element.style.height);
	        },
	        set: function set(value) {
	            this.element.style.height = value + 'px';
	        }
	    }, {
	        key: 'x',
	        get: function get() {
	            return parseInt(this.element.style.left);
	        },
	        set: function set(value) {
	            this.element.style.left = value + 'px';
	        }
	    }, {
	        key: 'y',
	        get: function get() {
	            return parseInt(this.element.style.top);
	        },
	        set: function set(value) {
	            this.element.style.top = value + 'px';
	        }
	    }, {
	        key: 'text',
	        get: function get() {
	            return this.element.innerHTML;
	        },
	        set: function set(value) {
	            this.element.innerHTML = value;
	        }
	    }, {
	        key: 'size',
	        get: function get() {
	            return parseInt(this.element.style.fontSize);
	        },
	        set: function set(value) {
	            this.element.style.fontSize = value + 'px';
	        }
	    }, {
	        key: 'font',
	        get: function get() {
	            return parseInt(this.element.style.fontFamily);
	        },
	        set: function set(value) {
	            this.element.style.fontFamily = value;
	        }

	        /**
	         * Constructor
	         */

	    }]);

	    function Button(config) {
	        _classCallCheck(this, Button);

	        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, config));

	        Engine.UI.addWidget(_this);
	        return _this;
	    }

	    /**
	     * Defaults
	     */


	    _createClass(Button, [{
	        key: 'defaults',
	        value: function defaults() {
	            var _this2 = this;

	            this.element = document.createElement('button');
	            this.element.style.display = 'block';
	            this.element.style.position = 'absolute';;
	            this.element.style.transform = 'translate(-50%, -50%)';
	            this.element.style.userSelect = 'none';

	            this.element.addEventListener('click', function (e) {
	                e.preventDefault();

	                _this2.onClick();
	            });

	            this.x = 0;
	            this.y = 0;
	            this.width = 200;
	            this.height = 40;
	            this.text = 'My button';
	            this.font = 'Arial';
	            this.size = 10;
	        }

	        /**
	         * Sets focus of this button
	         */

	    }, {
	        key: 'setFocus',
	        value: function setFocus(isFocused) {
	            if (isFocused) {
	                this.element.focus();
	            } else {
	                this.element.blur();
	            }
	        }

	        /**
	         * Event: Click
	         */

	    }, {
	        key: 'onClick',
	        value: function onClick() {}
	    }]);

	    return Button;
	}(Engine.Entity);

	Engine.UI = UI;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A class for performing color operations
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Color = function () {
	    _createClass(Color, null, [{
	        key: 'RULE',

	        // Enum: Rule
	        get: function get() {
	            return {
	                NONE: 0,
	                NO_GREYSCALE: 1
	            };
	        }

	        /**
	         * Constructor
	         */

	    }]);

	    function Color(r, g, b, a) {
	        _classCallCheck(this, Color);

	        this.r = r || 0;
	        this.g = g || 0;
	        this.b = b || 0;
	        this.a = a || 1;

	        if (this.r > 1) {
	            this.r = 1;
	        };
	        if (this.g > 1) {
	            this.g = 1;
	        };
	        if (this.b > 1) {
	            this.b = 1;
	        };
	        if (this.a > 1) {
	            this.a = 1;
	        };

	        if (this.r < 0) {
	            this.r = 0;
	        };
	        if (this.g < 0) {
	            this.g = 0;
	        };
	        if (this.b < 0) {
	            this.b = 0;
	        };
	        if (this.a < 0) {
	            this.a = 0;
	        };
	    }

	    /**
	     * Returns negative colour
	     *
	     * @returns {Color} Negative
	     */


	    _createClass(Color, [{
	        key: 'getNegative',
	        value: function getNegative() {
	            return new Color(1 - this.r, 1 - this.g, 1 - this.b, this.a);
	        }

	        /**
	         * Returns true if this colour equals the other
	         *
	         * @param {Color} color
	         *
	         * @returns {Boolean} Is equal
	         */

	    }, {
	        key: 'equals',
	        value: function equals(color) {
	            return this.compare(color) === 0;
	        }

	        /**
	         * Compares to another colour
	         *
	         * @param {Color} color
	         *
	         * @returns {Number} Difference
	         */

	    }, {
	        key: 'compare',
	        value: function compare(color) {
	            var diff = 0;

	            diff += Math.abs(this.r - color.r);
	            diff += Math.abs(this.g - color.g);
	            diff += Math.abs(this.b - color.b);
	            diff += Math.abs(this.a - color.a);

	            return diff;
	        }

	        /**
	         * Adds one color to another
	         *
	         * @param {Color} a
	         * @param {Color} b
	         *
	         * @returns {Color} Result
	         */

	    }, {
	        key: 'isGreyscale',


	        /**
	         * Gets whether this colour is greyscale
	         *
	         * @returns {Boolean} Is greyscale
	         */
	        value: function isGreyscale() {
	            return this.r === this.g && this.g === this.b;
	        }

	        /**
	         * Gets a hex value
	         *
	         * @returns {String} Hex
	         */

	    }, {
	        key: 'toHex',
	        value: function toHex() {
	            function componentToHex(c) {
	                var hex = Math.round(c * 255).toString(16);
	                return hex.length === 1 ? '0' + hex : hex;
	            }

	            return '#' + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
	        }

	        /**
	         * Gets an RGB value
	         *
	         * @returns {String} RGB
	         */

	    }, {
	        key: 'toRGB',
	        value: function toRGB() {
	            return 'rgba(' + Math.round(this.r * 255) + ',' + Math.round(this.g * 255) + ',' + Math.round(this.b * 255) + ',' + this.a + ')';
	        }
	    }], [{
	        key: 'add',
	        value: function add(a, b) {
	            return new Color(a.r + b.r, a.g + b.g, a.b + b.b, a.a, b.a);
	        }

	        /**
	         * Gets a random color
	         *
	         * @param {Number} divisableBy
	         *
	         * @returns {Color} Color
	         */

	    }, {
	        key: 'getRandom',
	        value: function getRandom() {
	            var divisableBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	            var rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Color.RULE.NONE;

	            var dec = 1 / divisableBy;
	            var generate = function generate() {
	                return new Color(parseFloat((Math.round(Math.random() * dec) / dec).toFixed(1)), parseFloat((Math.round(Math.random() * dec) / dec).toFixed(1)), parseFloat((Math.round(Math.random() * dec) / dec).toFixed(1)), 1);
	            };

	            var color = generate();

	            // Rule: No greys
	            while (rule === Color.RULE.NO_GREYSCALE && color.isGreyscale()) {
	                color = generate();
	            }

	            return color;
	        }
	    }]);

	    return Color;
	}();

	Engine.Math.Color = Color;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A rectangle
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Rect = function () {
	  _createClass(Rect, [{
	    key: 'xMin',

	    // Getters
	    get: function get() {
	      return this.x;
	    }
	  }, {
	    key: 'yMin',
	    get: function get() {
	      return this.y;
	    }
	  }, {
	    key: 'xMax',
	    get: function get() {
	      return this.x + this.width;
	    }
	  }, {
	    key: 'yMax',
	    get: function get() {
	      return this.y + this.height;
	    }

	    /**
	     * Constructor
	     *
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} width
	     * @param {Number} height
	     */

	  }]);

	  function Rect(x, y, width, height) {
	    _classCallCheck(this, Rect);

	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	  }

	  /**
	   * Check whether a point is inside this rect
	   *
	   * @param {Number} x
	   * @param {Number} y
	   *
	   * @returns {Boolean} Is inside
	   */


	  _createClass(Rect, [{
	    key: 'contains',
	    value: function contains(x, y) {
	      return x >= this.xMin && x <= this.xMax && y >= this.yMin && y <= this.yMax;
	    }
	  }]);

	  return Rect;
	}();

	Engine.Math.Rect = Rect;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A vector class for 2 dimensional calculations
	 */

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vector2 =
	/**
	 * Constructor
	 */
	function Vector2(x, y) {
	  _classCallCheck(this, Vector2);

	  this.x = x || 0;
	  this.y = y || 0;
	};

	Engine.Math.Vector2 = Vector2;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The base actor class
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Actor = function (_Engine$Entity) {
	    _inherits(Actor, _Engine$Entity);

	    /**
	     * Constructor
	     */
	    function Actor(config) {
	        _classCallCheck(this, Actor);

	        // Add to stage
	        var _this = _possibleConstructorReturn(this, (Actor.__proto__ || Object.getPrototypeOf(Actor)).call(this, config));
	        // Apply config


	        Engine.Stage.addActor(_this);
	        return _this;
	    }

	    /**
	     * Defaults
	     */


	    _createClass(Actor, [{
	        key: 'defaults',
	        value: function defaults() {
	            this.canUpdate = true;
	            this.canDraw = true;
	            this.components = [];
	            this.events = {};
	            this.children = [];
	            this.parent = null;

	            this.addComponent(Engine.Components.Transform);
	        }

	        /**
	         * Adds an event handler
	         *
	         * @param {String} event
	         * @param {Function} handler
	         */

	    }, {
	        key: 'on',
	        value: function on(event, handler) {
	            if (!this.events[event]) {
	                this.events[event] = [];
	            }

	            this.events[event].push(handler);
	        }

	        /**
	         * Triggers an event
	         *
	         * @param {String} event
	         */

	    }, {
	        key: 'trigger',
	        value: function trigger(event) {
	            if (!this.events[event]) {
	                return;
	            }

	            for (var i in this.events[event]) {
	                this.events[event][i]();
	            }
	        }

	        /**
	         * Gets the global transform
	         *
	         * @returns {Transform} Global transform
	         */

	    }, {
	        key: 'getGlobalTransform',
	        value: function getGlobalTransform() {
	            var result = this.transform.clone();
	            var parent = this.parent;

	            while (parent) {
	                result = Engine.Components.Transform.add(result, parent.transform);

	                parent = parent.parent;
	            }

	            return result;
	        }

	        /**
	         * Adds a child
	         *
	         * @param {Actor} actor
	         */

	    }, {
	        key: 'addChild',
	        value: function addChild(actor) {
	            if (!actor || actor instanceof Actor === false) {
	                return;
	            }

	            actor.parent = this;

	            this.children.push(actor);
	        }

	        /**
	         * Adds a components
	         *
	         * @param {Component|String} component
	         * @param {Object} config
	         *
	         * @returns {Component} Component
	         */

	    }, {
	        key: 'addComponent',
	        value: function addComponent(component, config) {
	            if (typeof component === 'function') {
	                component = new component(config);
	            }

	            if (typeof component === 'string') {
	                component = new Engine.Components[component](config);
	            }

	            if (component instanceof Engine.Components.Component === false) {
	                throw new TypeError('Not a component', component);
	            }

	            // Assign component name as shortcut..
	            var name = component.constructor.name;

	            name = name.substring(0, 1).toLowerCase() + name.substring(1);

	            // ...but only if it hasn't been already
	            if (!this[name]) {
	                this[name] = component;
	            }

	            component.actor = this;

	            this.components.push(component);

	            return component;
	        }

	        /**
	         * Gets a component
	         *
	         * @param {Component|String} type
	         *
	         * @returns {Component} Component
	         */

	    }, {
	        key: 'getComponent',
	        value: function getComponent(type) {
	            if (typeof type === 'string') {
	                type = Engine.Components[type];
	            }

	            for (var i in this.components) {
	                if (this.components[i] instanceof type) {
	                    return this.components[i];
	                }
	            }
	        }

	        /**
	         * Gets a list of components
	         *
	         * @param {Component} type
	         *
	         * @returns {Array} Components
	         */

	    }, {
	        key: 'getComponents',
	        value: function getComponents(type) {
	            var result = [];

	            for (var i in this.components) {
	                if (typeof type === 'undefined' || this.components[i] instanceof type) {
	                    result.add(this.components[i]);
	                }
	            }

	            return result;
	        }

	        /**
	         * Draw
	         */

	    }, {
	        key: 'draw',
	        value: function draw() {
	            for (var i in this.components) {
	                if (!this.components[i].canDraw) {
	                    continue;
	                }

	                Engine.Graphics.translate(this.components[i].offset.x, this.components[i].offset.y);

	                this.components[i].draw();

	                Engine.Graphics.translate(-this.components[i].offset.x, -this.components[i].offset.y);
	            }

	            // Debug
	            if (Engine.Settings.useDebug === true) {
	                Engine.Graphics.drawCircle(this.transform.position.x, this.transform.position.y, 10, 0, null, '#ff0000');
	            }
	        }

	        /**
	         * Destroys this actor
	         */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            Engine.Stage.removeActor(this);
	        }

	        /**
	         * Update
	         */

	    }, {
	        key: 'update',
	        value: function update() {
	            for (var i in this.components) {
	                if (!this.components[i].canUpdate) {
	                    continue;
	                }

	                this.components[i].update();
	            }
	        }
	    }]);

	    return Actor;
	}(Engine.Entity);

	Engine.Actors.Actor = Actor;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A pawn is an actor that can move
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Pawn = function (_Engine$Actors$Actor) {
	  _inherits(Pawn, _Engine$Actors$Actor);

	  function Pawn() {
	    _classCallCheck(this, Pawn);

	    return _possibleConstructorReturn(this, (Pawn.__proto__ || Object.getPrototypeOf(Pawn)).apply(this, arguments));
	  }

	  _createClass(Pawn, [{
	    key: 'defaults',

	    /**
	     * Defaults
	     */
	    value: function defaults() {
	      _get(Pawn.prototype.__proto__ || Object.getPrototypeOf(Pawn.prototype), 'defaults', this).call(this);

	      this.movementSpeed = 10;
	    }

	    /**
	     * Moves this pawn
	     *
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: 'move',
	    value: function move(x, y) {
	      this.transform.position.x += x * Engine.Time.deltaTime * this.movementSpeed;
	      this.transform.position.y += y * Engine.Time.deltaTime * this.movementSpeed;
	    }
	  }]);

	  return Pawn;
	}(Engine.Actors.Actor);

	Engine.Actors.Pawn = Pawn;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A component
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = function (_Engine$Entity) {
	  _inherits(Component, _Engine$Entity);

	  /**
	   * Constructor
	   */
	  function Component(config) {
	    _classCallCheck(this, Component);

	    return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, config));
	  }

	  /**
	   * Defaults
	   */


	  _createClass(Component, [{
	    key: 'defaults',
	    value: function defaults() {
	      this.canUpdate = true;
	      this.canDraw = true;
	      this.isActive = true;
	      this.offset = { x: 0, y: 0 };
	    }

	    /**
	     * Toggle
	     *
	     * @param {Boolean} isActive
	     */

	  }, {
	    key: 'toggle',
	    value: function toggle(isActive) {
	      this.isActive = isActive;
	    }

	    /**
	     * Update
	     */

	  }, {
	    key: 'update',
	    value: function update() {}

	    /**
	     * Draw
	     */

	  }, {
	    key: 'draw',
	    value: function draw() {}
	  }]);

	  return Component;
	}(Engine.Entity);

	Engine.Components.Component = Component;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A component for detecting collisions
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Collider = function (_Engine$Components$Co) {
	    _inherits(Collider, _Engine$Components$Co);

	    /**
	     * Constructor
	     */
	    function Collider(config) {
	        _classCallCheck(this, Collider);

	        return _possibleConstructorReturn(this, (Collider.__proto__ || Object.getPrototypeOf(Collider)).call(this, config));
	    }

	    /**
	     * Defaults
	     */


	    _createClass(Collider, [{
	        key: 'defaults',
	        value: function defaults() {
	            _get(Collider.prototype.__proto__ || Object.getPrototypeOf(Collider.prototype), 'defaults', this).call(this);

	            this.width = 100;
	            this.height = 100;
	        }

	        /**
	         * Gets bounding rect
	         */

	    }, {
	        key: 'getBounds',
	        value: function getBounds() {
	            var transform = this.actor.getGlobalTransform();

	            return new Engine.Math.Rect(transform.position.x - this.offset.x * this.width * transform.scale.x, transform.position.y - this.offset.y * this.width * transform.scale.y, this.width * transform.scale.x, this.height * transform.scale.y);
	        }
	    }]);

	    return Collider;
	}(Engine.Components.Component);

	Engine.Components.Collider = Collider;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A component for drawing simple geometry
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GeometryRenderer = function (_Engine$Components$Co) {
	    _inherits(GeometryRenderer, _Engine$Components$Co);

	    /**
	     * Constructor
	     */
	    function GeometryRenderer(config) {
	        _classCallCheck(this, GeometryRenderer);

	        return _possibleConstructorReturn(this, (GeometryRenderer.__proto__ || Object.getPrototypeOf(GeometryRenderer)).call(this, config));
	    }

	    /**
	     * Defaults
	     */


	    _createClass(GeometryRenderer, [{
	        key: 'defaults',
	        value: function defaults() {
	            _get(GeometryRenderer.prototype.__proto__ || Object.getPrototypeOf(GeometryRenderer.prototype), 'defaults', this).call(this);

	            this.radius = 10;
	            this.fillColor = new Engine.Math.Color(1, 1, 1);
	            this.type = 'circle';
	            this.pivot = { x: 0.5, y: 0.5 };
	        }

	        /**
	         * Draw
	         */

	    }, {
	        key: 'draw',
	        value: function draw() {
	            switch (this.type) {
	                case 'circle':
	                    Engine.Graphics.drawCircle(this.radius - this.pivot.x * (this.radius * 2), this.radius - this.pivot.y * (this.radius * 2), this.radius, this.strokeWidth, this.strokeColor, this.fillColor);

	                case 'rectangle':
	                    Engine.Graphics.drawRectangle(-this.pivot.x * this.width, -this.pivot.y * this.height, this.width, this.height, this.strokeWidth, this.strokeColor, this.fillColor);

	                case 'line':
	                    if (!this.points) {
	                        this.points = [];
	                    }

	                    for (var i = 0; i < this.points.length - 1; i++) {
	                        Engine.Graphics.drawLine(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y, this.strokeWidth, this.strokeColor);
	                    }
	                    break;
	            }
	        }
	    }]);

	    return GeometryRenderer;
	}(Engine.Components.Component);

	Engine.Components.GeometryRenderer = GeometryRenderer;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A component for drawing sprites
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SpriteRenderer = function (_Engine$Components$Co) {
	  _inherits(SpriteRenderer, _Engine$Components$Co);

	  /**
	   * Constructor
	   */
	  function SpriteRenderer(config) {
	    _classCallCheck(this, SpriteRenderer);

	    return _possibleConstructorReturn(this, (SpriteRenderer.__proto__ || Object.getPrototypeOf(SpriteRenderer)).call(this, config));
	  }

	  /**
	   * Defaults
	   */


	  _createClass(SpriteRenderer, [{
	    key: 'defaults',
	    value: function defaults() {
	      _get(SpriteRenderer.prototype.__proto__ || Object.getPrototypeOf(SpriteRenderer.prototype), 'defaults', this).call(this);

	      this.texture = null;
	      this.sprites = [];
	    }

	    /**
	     * Draw
	     */

	  }, {
	    key: 'draw',
	    value: function draw() {
	      if (!this.texture) {
	        return;
	      }
	    }
	  }]);

	  return SpriteRenderer;
	}(Engine.Components.Component);

	Engine.Components.SpriteRenderer = SpriteRenderer;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A component for drawing sprites
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TextRenderer = function (_Engine$Components$Co) {
	  _inherits(TextRenderer, _Engine$Components$Co);

	  /**
	   * Constructor
	   */
	  function TextRenderer(config) {
	    _classCallCheck(this, TextRenderer);

	    return _possibleConstructorReturn(this, (TextRenderer.__proto__ || Object.getPrototypeOf(TextRenderer)).call(this, config));
	  }

	  /**
	   * Defaults
	   */


	  _createClass(TextRenderer, [{
	    key: 'defaults',
	    value: function defaults() {
	      _get(TextRenderer.prototype.__proto__ || Object.getPrototypeOf(TextRenderer.prototype), 'defaults', this).call(this);

	      this.size = 10;
	      this.font = 'Arial';
	      this.text = '';
	      this.xAlign = 'center';
	      this.yAlign = 'middle';
	      this.strokeColor = null;
	      this.strokeWidth = 0;
	      this.fillColor = new Engine.Math.Color(0, 0, 0);
	    }

	    /**
	     * Draw
	     */

	  }, {
	    key: 'draw',
	    value: function draw() {
	      if (!this.text) {
	        return;
	      }

	      Engine.Graphics.drawText(this.offset.x, this.offset.y, this.text, this.xAlign, this.yAlign, this.size, this.font, this.strokeWidth, this.strokeColor, this.fillColor);
	    }
	  }]);

	  return TextRenderer;
	}(Engine.Components.Component);

	Engine.Components.TextRenderer = TextRenderer;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A transform component
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Transform = function (_Engine$Components$Co) {
	    _inherits(Transform, _Engine$Components$Co);

	    function Transform() {
	        _classCallCheck(this, Transform);

	        return _possibleConstructorReturn(this, (Transform.__proto__ || Object.getPrototypeOf(Transform)).apply(this, arguments));
	    }

	    _createClass(Transform, [{
	        key: 'defaults',

	        /**
	         * Defaults
	         */
	        value: function defaults() {
	            this.position = new Engine.Math.Vector2(0, 0);
	            this.scale = new Engine.Math.Vector2(1, 1);
	            this.rotation = 0;
	        }

	        /**
	         * Translates this transform
	         *
	         * @param {Number} x
	         * @param {Number} y
	         */

	    }, {
	        key: 'translate',
	        value: function translate(x, y) {
	            this.position.x += x;
	            this.position.y += y;
	        }

	        /**
	         * Subtracts one Transform from another
	         *
	         * @param {Transform} a
	         * @param {Transform} b
	         *
	         * @returns {Transform} Result
	         */

	    }], [{
	        key: 'subtract',
	        value: function subtract(a, b) {
	            var result = new Transform();

	            result.position.x = a.position.x - b.position.x;
	            result.position.y = a.position.y - b.position.y;

	            result.scale.x = a.scale.x / b.scale.x;
	            result.scale.y = a.scale.y / b.scale.y;

	            result.rotation = a.rotation - b.rotation;

	            return result;
	        }

	        /**
	         * Adds one Transform to another
	         *
	         * @param {Transform} a
	         * @param {Transform} b
	         *
	         * @returns {Transform} Result
	         */

	    }, {
	        key: 'add',
	        value: function add(a, b) {
	            var result = new Transform();

	            result.position.x = a.position.x + b.position.x;
	            result.position.y = a.position.y + b.position.y;

	            result.scale.x = a.scale.x * b.scale.x;
	            result.scale.y = a.scale.y * b.scale.y;

	            result.rotation = a.rotation + b.rotation;

	            return result;
	        }
	    }]);

	    return Transform;
	}(Engine.Components.Component);

	Engine.Components.Transform = Transform;

/***/ })
/******/ ]);