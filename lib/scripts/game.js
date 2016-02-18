var Slime = require('./slime');
var Ball = require('./ball');
var Net = require('./net');
var CollisionDetector = require('./collision-detector');
var netCollisionDetector = require('./net-collision-detector');
var Scoreboard = require('./scoreboard');

function Game (){
  this.setCanvasAndContext();
  this.setUpNewGame();
}

Game.prototype = {
  start: function () {
    requestAnimationFrame(function gameLoop() {
      this.clearScreen();
      this.move().draw().detectCollisions();

      if (this.gameOver) {
        this.endGame();
      } else {
        requestAnimationFrame(gameLoop.bind(this));
      }
    }.bind(this));
  },

  addEventListeners: function () {
    this.canvas.addEventListener("ballHitLeftSideOfFloor", function (e) { this.setUpNewPoint("left"); }.bind(this), false);
    this.canvas.addEventListener("ballHitRightSideOfFloor", function (e) { this.setUpNewPoint("right"); }.bind(this), false);
    this.canvas.addEventListener("rightSlimeWins", function (e) { this.endGameWithWinner("right"); }.bind(this), false);
    this.canvas.addEventListener("leftSlimeWins", function (e) { this.endGameWithWinner("left"); }.bind(this), false);
  },

  setCanvasAndContext: function () {
    this.canvas = document.getElementById("game");
    this.context = this.canvas.getContext("2d");
  },

  draw: function () {
    this.slimes.forEach(function (slime) {
      slime.draw();
    });

    this.ball.draw(this.context);
    this.net.draw(this.context);
    this.scoreboard.draw(this.context);

    return this;
  },

  move: function () {
    this.slimes.forEach(function (slime) { slime.move(); });
    this.ball.move();

    return this;
  },

  detectCollisions: function () {
    this.collisionDetectors.forEach(function (detector) {
      detector.detectCollision(this.canvas);
    }.bind(this));
  },

  createSlimes: function () {
    var slimes = [];

    slimes.push(new Slime(150, 375, "deeppink", 65, 68, 87, this.context, this.canvas, true));
    slimes.push(new Slime(600, 375, "dodgerblue", 37, 39, 38, this.context, this.canvas, false));

    return slimes;
  },

  createCollisionDetectors: function () {
    var collisionDetectors = this.slimes.map(function (slime) {
      return new CollisionDetector(slime, this.ball);
    }.bind(this));

    collisionDetectors.push(new netCollisionDetector(this.net, this.ball));

    return collisionDetectors;
  },

  setUpNewPoint: function (side) {
    setTimeout(function () { this.resetPoint(side); }.bind(this), 1000);
  },

  resetPoint: function (side) {
    this.slimes = this.createSlimes(this.context, this.canvas);
    var ballX = this.getBallStartPoint(side);

    this.ball = new Ball(ballX, 250, this.canvas);
    this.collisionDetectors = this.createCollisionDetectors();
  },

  getBallStartPoint: function (side) {
    if (side == "left") {
      return this.slimes[1].x;
    } else {
      return this.slimes[0].x;
    }
  },

  setUpNewGame: function () {
    this.gameOver = false;
    this.slimes = this.createSlimes(this.context, this.canvas);

    this.ball = new Ball(this.slimes[0].x, 250, this.canvas);
    this.net  = new Net(this.canvas.width, this.canvas.height);
    this.scoreboard = new Scoreboard(this.canvas);
    this.collisionDetectors = this.createCollisionDetectors();

    this.addEventListeners();
  },

  endGameWithWinner: function (side) {
    this.gameOver = true;

    if (side == "right") {
      this.winner = "SlimeTorie";
    } else {
      this.winner = "SlimePat";
    }
  },

  endGame: function () {
    this.removeAllEventListeners();
    this.drawGameOverScreen();
  },

  removeAllEventListeners: function () {
    var oldCanvas = document.getElementById("game");
    var newCanvas = oldCanvas.cloneNode(true);

    oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);

    this.setCanvasAndContext();
  },

  drawGameOverScreen: function () {
    this.clearScreen().setMessageFont();
    this.context.fillText(this.winner + " wins!", this.canvas.width/2 , this.canvas.height / 2);

    this.setSubtextFont();
    this.context.fillText("Press space to play again", this.canvas.width/2 , this.canvas.height / 2 + 40);

    this.addListenerForStartKey();
  },

  addListenerForStartKey: function () {
    this.newGameHandler = function (e) { this.startGame(e); }.bind(this);
    window.addEventListener("keydown", this.newGameHandler, false);
  },

  startGame: function (e) {
    if (e.keyCode === 32) {
      e.view.removeEventListener("keydown", this.newGameHandler, false);
      this.setUpNewGame();
      this.start();
    }
  },

  setMessageFont: function () {
    this.context.font = "48px sans-serif";
    this.context.textAlign = "center";
    this.context.fillStyle = "lightgrey";
  },

  setSubtextFont: function () {
    this.context.font = "18px sans-serif";
  },

  clearScreen: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  },

  askUserToStartGame: function () {
    this.clearScreen().setMessageFont();
    this.context.fillText("Press space to start!", this.canvas.width/2 , this.canvas.height / 2 + 10);
    this.addListenerForStartKey();
  }
};

module.exports = Game;
