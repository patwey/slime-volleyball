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
	__webpack_require__(9);

	var game = new Game();
	game.askUserToStartGame();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Slime = __webpack_require__(2);
	var Ball = __webpack_require__(4);
	var Net = __webpack_require__(5);
	var CollisionDetector = __webpack_require__(6);
	var netCollisionDetector = __webpack_require__(7);
	var Scoreboard = __webpack_require__(8);

	function Game() {
	  this.setCanvasAndContext();
	  this.setUpNewGame();
	}

	Game.prototype = {
	  start: function start() {
	    requestAnimationFrame((function gameLoop() {
	      this.clearScreen();
	      this.move().draw().detectCollisions();

	      if (this.gameOver) {
	        this.endGame();
	      } else {
	        requestAnimationFrame(gameLoop.bind(this));
	      }
	    }).bind(this));
	  },

	  addEventListeners: function addEventListeners() {
	    this.canvas.addEventListener("ballHitLeftSideOfFloor", (function (e) {
	      this.setUpNewPoint("left");
	    }).bind(this), false);
	    this.canvas.addEventListener("ballHitRightSideOfFloor", (function (e) {
	      this.setUpNewPoint("right");
	    }).bind(this), false);
	    this.canvas.addEventListener("rightSlimeWins", (function (e) {
	      this.endGameWithWinner("right");
	    }).bind(this), false);
	    this.canvas.addEventListener("leftSlimeWins", (function (e) {
	      this.endGameWithWinner("left");
	    }).bind(this), false);
	  },

	  setCanvasAndContext: function setCanvasAndContext() {
	    this.canvas = document.getElementById("game");
	    this.context = this.canvas.getContext("2d");
	  },

	  draw: function draw() {
	    this.slimes.forEach(function (slime) {
	      slime.draw();
	    });

	    this.ball.draw(this.context);
	    this.net.draw(this.context);
	    this.scoreboard.draw(this.context);

	    return this;
	  },

	  move: function move() {
	    this.slimes.forEach(function (slime) {
	      slime.move();
	    });
	    this.ball.move();

	    return this;
	  },

	  detectCollisions: function detectCollisions() {
	    this.collisionDetectors.forEach((function (detector) {
	      detector.detectCollision(this.canvas);
	    }).bind(this));
	  },

	  createSlimes: function createSlimes() {
	    var slimes = [];

	    slimes.push(new Slime(150, 375, "deeppink", "KeyA", "KeyD", "KeyW", this.context, this.canvas, true));
	    slimes.push(new Slime(600, 375, "dodgerblue", "ArrowLeft", "ArrowRight", "ArrowUp", this.context, this.canvas, false));

	    return slimes;
	  },

	  createCollisionDetectors: function createCollisionDetectors() {
	    var collisionDetectors = this.slimes.map((function (slime) {
	      return new CollisionDetector(slime, this.ball);
	    }).bind(this));

	    collisionDetectors.push(new netCollisionDetector(this.net, this.ball));
	    return collisionDetectors;
	  },

	  setUpNewPoint: function setUpNewPoint(side) {
	    setTimeout((function () {
	      this.resetPoint(side);
	    }).bind(this), 1000);
	  },

	  resetPoint: function resetPoint(side) {
	    this.slimes = this.createSlimes(this.context, this.canvas);
	    var ballX = 0;

	    if (side == "left") {
	      ballX = this.slimes[1].x;
	    } else if (side == "right") {
	      ballX = this.slimes[0].x;
	    }

	    this.ball = new Ball(ballX, 250, this.canvas);
	    this.collisionDetectors = this.createCollisionDetectors();
	  },

	  setUpNewGame: function setUpNewGame() {
	    this.gameOver = false;
	    this.slimes = this.createSlimes(this.context, this.canvas);

	    this.ball = new Ball(this.slimes[0].x, 250, this.canvas);
	    this.net = new Net(this.canvas.width, this.canvas.height);
	    this.scoreboard = new Scoreboard(this.canvas);
	    this.collisionDetectors = this.createCollisionDetectors();

	    this.addEventListeners();
	  },

	  endGameWithWinner: function endGameWithWinner(side) {
	    this.gameOver = true;

	    if (side == "right") {
	      this.winner = "SlimeTorie";
	    } else if (side == "left") {
	      this.winner = "SlimePat";
	    }
	  },

	  endGame: function endGame() {
	    this.removeAllEventListeners();
	    this.drawGameOverScreen();
	  },

	  removeAllEventListeners: function removeAllEventListeners() {
	    var oldCanvas = document.getElementById("game");
	    var newCanvas = oldCanvas.cloneNode(true);

	    oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);

	    this.setCanvasAndContext();
	  },

	  drawGameOverScreen: function drawGameOverScreen() {
	    this.clearScreen().setMessageFont();
	    this.context.fillText(this.winner + " wins!", this.canvas.width / 2, this.canvas.height / 2);

	    this.context.font = "18px sans-serif";
	    this.context.fillText("Press space to play again", this.canvas.width / 2, this.canvas.height / 2 + 40);

	    this.addListenerForStartKey();
	  },

	  addListenerForStartKey: function addListenerForStartKey() {
	    this.newGameHandler = (function (e) {
	      this.startGame(e);
	    }).bind(this);
	    window.addEventListener("keydown", this.newGameHandler, false);
	  },

	  startGame: function startGame(e) {
	    if (e.code === "Space") {
	      e.view.removeEventListener("keydown", this.newGameHandler, false);
	      this.setUpNewGame();
	      this.start();
	    }
	  },

	  setMessageFont: function setMessageFont() {
	    this.context.font = "48px sans-serif";
	    this.context.textAlign = "center";
	    this.context.fillStyle = "lightgrey";
	  },

	  clearScreen: function clearScreen() {
	    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    return this;
	  },

	  askUserToStartGame: function askUserToStartGame() {
	    this.clearScreen().setMessageFont();
	    this.context.fillText("Press space to start!", this.canvas.width / 2, this.canvas.height / 2 + 10);
	    this.addListenerForStartKey();
	  }
	};

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Keyboarder = __webpack_require__(3);

	function Slime(x, y, color, moveLeftKeyCode, moveRightKeyCode, jumpKeyCode, context, canvas, isOnLeftSide) {
	  this.x = x;
	  this.y = y;

	  this.dy = 0;
	  this.isJumping = false;
	  this.initialJumpForce = -10;

	  this.radius = 40;

	  this.color = color;

	  this.moveLeftKeyCode = moveLeftKeyCode;
	  this.moveRightKeyCode = moveRightKeyCode;
	  this.jumpKeyCode = jumpKeyCode;

	  this.context = context;
	  this.canvas = canvas;

	  this.isOnLeftSide = isOnLeftSide;

	  this.speed = 7;
	  this.keyboarder = new Keyboarder(this, moveLeftKeyCode, moveRightKeyCode, jumpKeyCode);
	}

	Slime.prototype = {
	  draw: function draw() {
	    this.drawBody();
	    if (this.isOnLeftSide) {
	      this.drawLeftEye();
	    } else if (!this.isOnLeftSide) {
	      this.drawRightEye();
	    }
	  },

	  drawBody: function drawBody() {
	    this.context.fillStyle = this.color;

	    this.context.beginPath();
	    this.context.arc(this.x, this.y, this.radius, 0, Math.PI, true);
	    this.context.fill();
	  },

	  drawLeftEye: function drawLeftEye() {
	    this.context.fillStyle = "white";

	    this.context.beginPath();
	    this.context.arc(this.x + 18, this.y - 20, 9, 0, Math.PI * 2, true);
	    this.context.fill();

	    this.drawLeftPupil();
	  },

	  drawRightEye: function drawRightEye() {
	    this.context.fillStyle = "white";

	    this.context.beginPath();
	    this.context.arc(this.x - 18, this.y - 20, 9, 0, Math.PI * 2, true);
	    this.context.fill();

	    this.drawRightPupil();
	  },

	  drawLeftPupil: function drawLeftPupil() {
	    this.context.fillStyle = "black";

	    this.context.beginPath();
	    this.context.arc(this.x + 22, this.y - 20, 4, 0, Math.PI * 2, true);
	    this.context.fill();
	  },

	  drawRightPupil: function drawRightPupil() {
	    this.context.fillStyle = "black";

	    this.context.beginPath();
	    this.context.arc(this.x - 22, this.y - 20, 4, 0, Math.PI * 2, true);
	    this.context.fill();
	  },

	  move: function move() {
	    if (this.shouldMoveRight()) {
	      this.x += this.speed;
	    } else if (this.shouldMoveLeft()) {
	      this.x -= this.speed;
	    }

	    if (this.shouldJump()) {
	      this.jump();
	    }
	    if (this.isJumping) {
	      this.continueJump();
	    }

	    return this;
	  },

	  shouldMoveRight: function shouldMoveRight() {
	    return this.keyboarder.isRightKeyPressed && !this.isTouchingRightWall() && !this.isTouchingLeftSideOfNet();
	  },

	  shouldMoveLeft: function shouldMoveLeft() {
	    return this.keyboarder.isLeftKeyPressed && !this.isTouchingLeftWall() && !this.isTouchingRightSideOfNet();
	  },

	  shouldJump: function shouldJump() {
	    return !this.isJumping && this.keyboarder.isJumpKeyPressed;
	  },

	  jump: function jump() {
	    this.isJumping = true;
	    this.dy = this.initialJumpForce;
	  },

	  continueJump: function continueJump() {
	    if (this.y + this.dy <= 375) {
	      this.y += this.dy;
	      this.dy += 0.55;
	    } else {
	      this.isJumping = false;
	      this.y = 375;
	    }
	  },

	  isTouchingRightWall: function isTouchingRightWall() {
	    return this.rightEdge() + this.speed - 1 >= this.canvas.width;
	  },

	  isTouchingLeftWall: function isTouchingLeftWall() {
	    return this.leftEdge() - this.speed + 1 <= 0;
	  },

	  leftEdge: function leftEdge() {
	    return this.x - this.radius;
	  },

	  rightEdge: function rightEdge() {
	    return this.x + this.radius;
	  },

	  isTouchingLeftSideOfNet: function isTouchingLeftSideOfNet() {
	    return this.isOnLeftSide && this.rightEdge() + this.speed >= this.canvas.width / 2 - 4;
	  },

	  isTouchingRightSideOfNet: function isTouchingRightSideOfNet() {
	    return !this.isOnLeftSide && this.leftEdge() - this.speed <= this.canvas.width / 2 + 4;
	  }
	};

	module.exports = Slime;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function Keyboarder(slime, leftKeyCode, rightKeyCode, jumpKeyCode) {
	  this.leftKeyCode = leftKeyCode;
	  this.rightKeyCode = rightKeyCode;
	  this.jumpKeyCode = jumpKeyCode;

	  this.isLeftKeyPressed = false;
	  this.isRightKeyPressed = false;
	  this.isJumpKeyPressed = false;

	  createKeyEventListeners(this);
	}

	function createKeyEventListeners(keyboarder) {
	  window.addEventListener("keydown", onKeyDown.bind(keyboarder), false);
	  window.addEventListener("keyup", onKeyUp.bind(keyboarder), false);
	}

	function onKeyDown(e) {
	  var keyPressed = e.code;

	  switch (keyPressed) {
	    case this.leftKeyCode:
	      this.isLeftKeyPressed = true;
	      break;
	    case this.rightKeyCode:
	      this.isRightKeyPressed = true;
	      break;
	    case this.jumpKeyCode:
	      this.isJumpKeyPressed = true;
	      break;
	  }
	}

	function onKeyUp(e) {
	  var keyReleased = e.code;

	  switch (keyReleased) {
	    case this.leftKeyCode:
	      this.isLeftKeyPressed = false;
	      break;
	    case this.rightKeyCode:
	      this.isRightKeyPressed = false;
	      break;
	    case this.jumpKeyCode:
	      this.isJumpKeyPressed = false;
	      break;
	  }
	}

	module.exports = Keyboarder;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function Ball(x, y, canvas) {
	  this.x = x;
	  this.y = y;

	  this.velocity = 0;
	  this.dx = 0;
	  this.dy = 0.5;

	  this.frameCount = 0;
	  this.radius = 12;

	  this.canvas = canvas;

	  this.trajectorySlope = 1;
	  this.trajectoryIntercept = y;

	  this.createEventListeners();

	  this.hitLeftSideOfFloor = new Event("ballHitLeftSideOfFloor");
	  this.hitRightSideOfFloor = new Event("ballHitRightSideOfFloor");
	}

	Ball.prototype = {
	  createEventListeners: function createEventListeners() {
	    this.canvas.addEventListener("ballSlimeCollision", (function (e) {
	      this.redirect(e.side, e.contactPoint, e.slimeForce);
	    }).bind(this), false);
	    this.canvas.addEventListener("ballNetSideCollision", (function (e) {
	      this.reverseDirection();
	    }).bind(this), false);
	    this.canvas.addEventListener("ballNetTopCollision", (function (e) {
	      this.resetVelocity();
	    }).bind(this), false);
	  },

	  draw: function draw(context) {
	    context.fillStyle = "yellow";

	    context.beginPath();
	    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	    context.fill();
	  },

	  move: function move() {
	    this.stopIfOnFloor();
	    this.setTrajectoryInterceptToY();
	    this.x += this.dx;
	    this.y += this.trajectory(this.trajectorySlope, this.trajectoryIntercept) + this.velocity;

	    this.velocity += this.dy;
	    this.changeDirectionIfOnWall();
	    return this;
	  },

	  trajectory: function trajectory(m, b) {
	    return (this.y - b) / m;
	  },

	  setTrajectoryInterceptToY: function setTrajectoryInterceptToY() {
	    if (this.dx === 0) {
	      this.updateTrajectoryIntercept(this.y);
	    }
	  },

	  updateVelocity: function updateVelocity(velocity) {
	    this.velocity = velocity;
	  },

	  updateDx: function updateDx(dx) {
	    this.dx = dx;
	  },

	  updateTrajectorySlope: function updateTrajectorySlope(trajectorySlope) {
	    this.trajectorySlope = trajectorySlope;
	  },

	  updateTrajectoryIntercept: function updateTrajectoryIntercept(trajectoryIntercept) {
	    this.trajectoryIntercept = trajectoryIntercept;
	  },

	  changeDirectionIfOnWall: function changeDirectionIfOnWall() {
	    if (this.isTouchingWall()) {
	      this.reverseDirection();
	    }
	  },

	  reverseDirection: function reverseDirection() {
	    this.updateDx(-this.dx);
	  },

	  isTouchingWall: function isTouchingWall() {
	    return this.isTouchingLeftWall() || this.isTouchingRightWall();
	  },

	  isTouchingLeftWall: function isTouchingLeftWall() {
	    return this.leftEdge() + this.dx <= 0;
	  },

	  isTouchingRightWall: function isTouchingRightWall() {
	    return this.rightEdge() + this.dx >= this.canvas.width;
	  },

	  stopIfOnFloor: function stopIfOnFloor() {
	    if (this.isTouchingFloor()) {
	      this.emitFloorContactEvent();
	      this.stopBall();
	    }
	  },

	  stopBall: function stopBall() {
	    this.dx = 0;
	    this.dy = 0;
	    this.velocity = 0;
	  },

	  isTouchingFloor: function isTouchingFloor() {
	    return this.bottomEdge() >= this.canvas.height;
	  },

	  emitFloorContactEvent: function emitFloorContactEvent() {
	    if (this.isOnLeftSide()) {
	      this.canvas.dispatchEvent(this.hitLeftSideOfFloor);
	    } else if (this.isOnRightSide()) {
	      this.canvas.dispatchEvent(this.hitRightSideOfFloor);
	    }
	    this.nullifyEvents();
	  },

	  nullifyEvents: function nullifyEvents() {
	    var event = new Event("null");
	    this.hitLeftSideOfFloor = event;
	    this.hitRightSideOfFloor = event;
	  },

	  isOnLeftSide: function isOnLeftSide() {
	    return this.x < this.canvas.width / 2;
	  },

	  isOnRightSide: function isOnRightSide() {
	    return this.x > this.canvas.width / 2;
	  },

	  redirect: function redirect(side, contactPoint, slimeForce) {
	    this.resetVelocity();
	    if (side === "left") {
	      this.redirectLeft(contactPoint, slimeForce);
	    } else if (side === "right") {
	      this.redirectRight(contactPoint, slimeForce);
	    }
	  },

	  redirectRight: function redirectRight(contactPoint, slimeForce) {
	    this.updateDx(8 + -slimeForce * 0.15);
	    this.updateTrajectorySlope(-200);
	    this.updateTrajectoryIntercept(200 + 12 * contactPoint);
	  },

	  redirectLeft: function redirectLeft(contactPoint, slimeForce) {
	    this.updateDx(-8 + slimeForce * 0.15);
	    this.updateTrajectorySlope(200);
	    this.updateTrajectoryIntercept(300 + 12 * contactPoint);
	  },

	  resetVelocity: function resetVelocity() {
	    this.updateVelocity(-10);
	  },

	  rightEdge: function rightEdge() {
	    return this.x + this.radius;
	  },

	  leftEdge: function leftEdge() {
	    return this.x - this.radius;
	  },

	  bottomEdge: function bottomEdge() {
	    return this.y + this.radius;
	  }
	};

	module.exports = Ball;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	function Net(canvasWidth, canvasHeight) {
	  this.width = 8;
	  this.height = 45;

	  this.x = canvasWidth / 2 - this.width / 2;
	  this.y = canvasHeight - this.height;
	}

	Net.prototype = {
	  draw: function draw(context) {
	    context.fillStyle = "lightgrey";
	    context.fillRect(this.x, this.y, this.width, this.height);
	  },

	  rightEdge: function rightEdge() {
	    return this.x + this.width;
	  },

	  lefttEdge: function lefttEdge() {
	    return this.x;
	  }
	};

	module.exports = Net;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	function CollisionDetector(slime, ball) {
	  this.slime = slime;
	  this.ball = ball;
	  this.ballSlimeCollisionEvent = new Event("ballSlimeCollision");
	}

	CollisionDetector.prototype = {
	  detectCollision: function detectCollision(canvas) {
	    if (this.isBallTouchingSlime()) {
	      this.emitBallEvent(canvas);
	    }
	  },

	  emitBallEvent: function emitBallEvent(canvas) {
	    if (this.isBallTouchingRightSideOfSlime()) {
	      this.ballSlimeCollisionEvent.side = "right";
	    } else if (this.isBallTouchingLeftSideOfSlime()) {
	      this.ballSlimeCollisionEvent.side = "left";
	    }

	    this.ballSlimeCollisionEvent.contactPoint = this.contactPointXValue() - this.slime.x;
	    this.ballSlimeCollisionEvent.slimeForce = this.slime.dy;
	    canvas.dispatchEvent(this.ballSlimeCollisionEvent);
	  },

	  isBallTouchingRightSideOfSlime: function isBallTouchingRightSideOfSlime() {
	    return this.contactPointXValue() > this.slime.x;
	  },

	  isBallTouchingLeftSideOfSlime: function isBallTouchingLeftSideOfSlime() {
	    return this.contactPointXValue() < this.slime.x;
	  },

	  isBallTouchingSlime: function isBallTouchingSlime() {
	    var distance = this.distanceBetweenBallAndSlime();

	    if (distance <= this.slime.radius + this.ball.radius) {
	      return true;
	    } else {
	      return false;
	    }
	  },

	  distanceBetweenBallAndSlime: function distanceBetweenBallAndSlime() {
	    var squareOfDifferenceInX = Math.pow(this.slime.x - this.ball.x, 2);
	    var squareOfDifferenceInY = Math.pow(this.slime.y - this.ball.y, 2);

	    return Math.sqrt(squareOfDifferenceInX + squareOfDifferenceInY);
	  },

	  contactPointXValue: function contactPointXValue() {
	    if (this.slime.x == this.ball.x) {
	      return this.slime.x;
	    } else {
	      var slope = this.slopeOfLineBetweenBallAndSlime();
	      var intercept = this.interceptOfLineBetweenBallAndSlime(slope);

	      return this.solveForContactPointXValue(intercept, slope);
	    }
	  },

	  slopeOfLineBetweenBallAndSlime: function slopeOfLineBetweenBallAndSlime() {
	    return (this.slime.y - this.ball.y) / (this.slime.x - this.ball.x);
	  },

	  interceptOfLineBetweenBallAndSlime: function interceptOfLineBetweenBallAndSlime(slope) {
	    return this.ball.y - slope * this.ball.x;
	  },

	  solveForContactPointXValue: function solveForContactPointXValue(intercept, m) {
	    return this.slime.x + this.slime.radius * ((this.ball.x - this.slime.x) / this.distanceBetweenBallAndSlime());
	  }
	};

	module.exports = CollisionDetector;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	function NetCollisionDetector(net, ball) {
	  this.net = net;
	  this.ball = ball;
	  this.isTouchingSideOfNetEvent = new Event("ballNetSideCollision");
	  this.isTouchingTopOfNetEvent = new Event("ballNetTopCollision");
	}

	NetCollisionDetector.prototype = {
	  detectCollision: function detectCollision(canvas) {
	    if (this.isBallTouchingNet()) {
	      this.emitBallEvent(canvas);
	    }
	  },

	  isBallTouchingNet: function isBallTouchingNet() {
	    return this.isBallTouchingTopOfNet() || this.isBallTouchingSideOfNet();
	  },

	  emitBallEvent: function emitBallEvent(canvas) {
	    if (this.isBallTouchingSideOfNet()) {
	      canvas.dispatchEvent(this.isTouchingSideOfNetEvent);
	    } else if (this.isBallTouchingTopOfNet()) {
	      canvas.dispatchEvent(this.isTouchingTopOfNetEvent);
	    }
	  },

	  isBallTouchingTopOfNet: function isBallTouchingTopOfNet() {
	    return this.isBallXWithinNetWidth() && this.isBallYDirectlyAboveNetHeight();
	  },

	  isBallXWithinNetWidth: function isBallXWithinNetWidth() {
	    return this.ball.x >= this.net.x - Math.abs(this.ball.dx) && this.ball.x <= this.net.x + this.net.width + Math.abs(this.ball.dx);
	  },

	  isBallYDirectlyAboveNetHeight: function isBallYDirectlyAboveNetHeight() {
	    return this.ball.bottomEdge() >= this.net.y - this.ball.dx && this.ball.bottomEdge() <= this.net.y + this.ball.dx;
	  },

	  isBallTouchingSideOfNet: function isBallTouchingSideOfNet() {
	    return this.isBallOnRightSideOfNet() || this.isBallOnLeftSideOfNet();
	  },

	  isBallOnRightSideOfNet: function isBallOnRightSideOfNet() {
	    return this.ball.leftEdge() >= this.net.rightEdge() + this.ball.dx && this.ball.leftEdge() <= this.net.rightEdge() - this.ball.dx && this.isBallBelowNet();
	  },

	  isBallOnLeftSideOfNet: function isBallOnLeftSideOfNet() {
	    return this.ball.rightEdge() <= this.net.x + this.ball.dx && this.ball.rightEdge() >= this.net.x - this.ball.dx && this.isBallBelowNet();
	  },

	  isBallBelowNet: function isBallBelowNet() {
	    return this.ball.bottomEdge() > this.net.y;
	  }
	};

	module.exports = NetCollisionDetector;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	function Scoreboard(canvas) {
	  this.leftSlimeScore = 0;
	  this.rightSlimeScore = 0;
	  this.canvas = canvas;

	  this.rightSlimeWinsEvent = new Event("rightSlimeWins");
	  this.leftSlimeWinsEvent = new Event("leftSlimeWins");

	  this.createEventListeners();
	}

	Scoreboard.prototype = {
	  createEventListeners: function createEventListeners() {
	    this.canvas.addEventListener("ballHitLeftSideOfFloor", (function (e) {
	      this.increaseRightSlimeScore(e);
	    }).bind(this), false);
	    this.canvas.addEventListener("ballHitRightSideOfFloor", (function (e) {
	      this.increaseLeftSlimeScore(e);
	    }).bind(this), false);
	  },

	  increaseLeftSlimeScore: function increaseLeftSlimeScore() {
	    this.leftSlimeScore++;
	    this.emitGameOverEventIfWinner(this.leftSlimeScore, this.leftSlimeWinsEvent);
	  },

	  increaseRightSlimeScore: function increaseRightSlimeScore() {
	    this.rightSlimeScore++;
	    this.emitGameOverEventIfWinner(this.rightSlimeScore, this.rightSlimeWinsEvent);
	  },

	  emitGameOverEventIfWinner: function emitGameOverEventIfWinner(score, event) {
	    if (this.isWinner(score)) {
	      this.emitGameOverEvent(event);
	    }
	  },

	  isWinner: function isWinner(score) {
	    return score == 7;
	  },

	  emitGameOverEvent: function emitGameOverEvent(event) {
	    this.canvas.dispatchEvent(event);
	  },

	  draw: function draw(context) {
	    context.font = "18px sans-serif";
	    context.textAlign = "center";
	    context.fillStyle = "lightgrey";
	    context.fillText(this.leftSlimeScore + " - " + this.rightSlimeScore, context.canvas.width / 2, 30);
	  }
	};

	module.exports = Scoreboard;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./canvas.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./canvas.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, "#game-div {\n  background-color: blue;\n  width: 750px;\n  height: 375px;\n  margin: auto;\n}\n\n.key {\n  border-radius: 5px;\n  padding: 3px;\n  padding-left: 11px;\n  padding-right: 11px;\n}\n\n.pat-key {\n  background-color: deeppink;\n  color: white;\n  border: 1px solid deeppink;\n}\n\n.torie-key {\n  background-color: dodgerblue;\n  color: white;\n  border: 1px solid dodgerblue;\n}\n\n.pat {\n  color: deeppink;\n}\n\n.torie {\n  color: dodgerblue;\n}\n\n.slime {\n  color: darkslategrey;\n}\n", ""]);

	// exports


/***/ },
/* 11 */
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
/* 12 */
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