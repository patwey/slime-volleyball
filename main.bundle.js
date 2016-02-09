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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Game = __webpack_require__(1);
	__webpack_require__(5);

	var game = new Game();
	game.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Slime = __webpack_require__(2);
	var Ball = __webpack_require__(3);
	var CollisionDetector = __webpack_require__(4);

	function Game() {};

	Game.prototype.start = function () {
	  var canvas = document.getElementById("game");
	  var context = canvas.getContext("2d");

	  var slimePat = new Slime(150, 375, "deeppink", "KeyA", "KeyD", context, canvas);
	  var ball = new Ball(slimePat.x, 250, context);
	  var collisionDetector = new CollisionDetector(slimePat, ball, context);

	  requestAnimationFrame(function gameLoop() {
	    context.clearRect(0, 0, canvas.width, canvas.height);

	    slimePat.move().draw();
	    ball.move().draw();
	    collisionDetector.detectCollision();

	    requestAnimationFrame(gameLoop);
	  });
	};

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function Slime(x, y, color, moveLeftKeyCode, moveRightKeyCode, context, canvas) {
	  this.x = x;
	  this.y = y;
	  this.radius = 40;

	  this.color = color;

	  this.moveLeftKeyCode = moveLeftKeyCode;
	  this.moveRightKeyCode = moveRightKeyCode;

	  this.isMoveLeftKeyPressed = false;
	  this.isMoveRightKeyPressed = false;

	  this.context = context;
	  this.canvas = canvas;

	  createEventListener(this);
	}

	function createEventListener(slime) {
	  window.addEventListener("keydown", onKeyDown.bind(slime), false);
	  window.addEventListener("keyup", onKeyUp.bind(slime), false);
	}

	function onKeyDown(e) {
	  var keyPressed = e.code;

	  switch (keyPressed) {
	    case this.moveLeftKeyCode:
	      this.isMoveLeftKeyPressed = true;
	      break;
	    case this.moveRightKeyCode:
	      this.isMoveRightKeyPressed = true;
	      break;
	  }
	}

	function onKeyUp(e) {
	  var keyReleased = e.code;

	  switch (keyReleased) {
	    case this.moveLeftKeyCode:
	      this.isMoveLeftKeyPressed = false;
	      break;
	    case this.moveRightKeyCode:
	      this.isMoveRightKeyPressed = false;
	      break;
	  }
	}

	Slime.prototype.drawBody = function () {
	  this.context.fillStyle = this.color;

	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, 0, Math.PI, true);
	  this.context.fill();
	};

	Slime.prototype.drawPupil = function () {
	  this.context.fillStyle = "black";

	  this.context.beginPath();
	  this.context.arc(this.x + 22, this.y - 20, 4, 0, Math.PI * 2, true);
	  this.context.fill();
	};

	Slime.prototype.drawEye = function () {
	  this.context.fillStyle = "white";

	  this.context.beginPath();
	  this.context.arc(this.x + 18, this.y - 20, 9, 0, Math.PI * 2, true);
	  this.context.fill();

	  this.drawPupil();
	};

	Slime.prototype.draw = function () {
	  this.drawBody();
	  this.drawEye();
	};

	Slime.prototype.move = function () {
	  var speed = 5;

	  if (this.isMoveRightKeyPressed && !this.isOnRightBorder(speed)) {
	    this.x += speed;
	  } else if (this.isMoveLeftKeyPressed && !this.isOnLeftBorder(speed)) {
	    this.x -= speed;
	  }

	  return this;
	};

	Slime.prototype.isOnRightBorder = function (speed) {
	  return this.rightEdge() + speed - 1 >= this.canvas.width;
	};

	Slime.prototype.isOnLeftBorder = function (speed) {
	  return this.leftEdge() - speed + 1 <= 0;
	};

	Slime.prototype.leftEdge = function () {
	  return this.x - this.radius;
	};

	Slime.prototype.rightEdge = function () {
	  return this.x + this.radius;
	};

	module.exports = Slime;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function Ball(x, y, context) {
	  this.x = x;
	  this.y = y;

	  this.dx = 0;
	  this.dy = 3;

	  this.frameCount = 0;
	  this.radius = 12;

	  this.context = context;
	}

	Ball.prototype.draw = function () {
	  this.context.fillStyle = "yellow";

	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	  this.context.fill();
	};

	Ball.prototype.move = function () {
	  if (this.frameCount == 30) {
	    this.dy = -this.dy;
	  }
	  this.x += this.dx;
	  this.y += this.dy;

	  this.frameCount += 1;

	  return this;
	};

	module.exports = Ball;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function CollisionDetector(slime, ball, context) {
	  this.slime = slime;
	  this.ball = ball;

	  this.context = context;
	}

	CollisionDetector.prototype.isBallTouchingSlime = function () {
	  var distance = this.distanceBetweenBallAndSlime();

	  if (distance <= this.slime.radius + this.ball.radius) {
	    return true;
	  } else {
	    return false;
	  }
	};

	CollisionDetector.prototype.distanceBetweenBallAndSlime = function () {
	  var squareOfDifferenceInX = Math.pow(this.slime.x - this.ball.x, 2);
	  var squareOfDifferenceInY = Math.pow(this.slime.y - this.ball.y, 2);

	  return Math.sqrt(squareOfDifferenceInX + squareOfDifferenceInY);
	};

	CollisionDetector.prototype.contactPoint = function () {};

	module.exports = CollisionDetector;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./canvas.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./canvas.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "#game-div {\n  background-color: blue;\n  width: 750px;\n  height: 375px;\n  margin: auto;\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);