var Slime = require('./slime');
var Ball = require('./ball');
var Net = require('./net');
var CollisionDetector = require('./collision-detector');
var netCollisionDetector = require('./net-collision-detector');
var Scoreboard = require('./scoreboard');

function Game(){
  this.setCanvasAndContext();

  this.resetPoint("left");
  this.scoreboard = new Scoreboard(this.canvas);

  this.canvas.addEventListener("ballHitLeftSideOfFloor", function(e) { this.setUpNewPoint("left"); }.bind(this), false);
  this.canvas.addEventListener("ballHitRightSideOfFloor", function(e) { this.setUpNewPoint("right"); }.bind(this), false);
  this.canvas.addEventListener("rightSlimeWins", function(e) { this.endGameWithWinner("right"); }.bind(this), false);
  this.canvas.addEventListener("leftSlimeWins", function(e) { this.endGameWithWinner("left"); }.bind(this), false);
};

Game.prototype = {
  start: function () {
    requestAnimationFrame(function gameLoop() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.move();
      this.draw();
      this.detectCollisions();

      if (this.gameOver) {
        this.endGame();
      } else {
        requestAnimationFrame(gameLoop.bind(this));
      }
    }.bind(this));
  },

  setCanvasAndContext: function () {
    this.canvas = document.getElementById("game");
    this.context = this.canvas.getContext("2d");
  },

  draw: function () {
    this.slimes.forEach(function(slime) {
      slime.draw();
    })

    this.ball.draw(this.context);
    this.net.draw(this.context);
    this.scoreboard.draw(this.context);
  },

  move: function () {
    this.slimes.forEach(function(slime) { slime.move(); })

    this.ball.move();
  },

  detectCollisions: function () {
    this.collisionDetectors.forEach(function(detector) {
      detector.detectCollision(this.canvas);
    }.bind(this))
  },

  createSlimes: function () {
    var slimes = [];

    slimes.push(new Slime(150, 375, "deeppink", "KeyA", "KeyD", this.context, this.canvas, true));
    slimes.push(new Slime(600, 375, "dodgerblue", "ArrowLeft", "ArrowRight", this.context, this.canvas, false));

    return slimes;
  },

  createCollisionDetectors: function () {
    var collisionDetectors = this.slimes.map(function(slime) {
      return new CollisionDetector(slime, this.ball);
    }.bind(this))

    collisionDetectors.push(new netCollisionDetector(this.net, this.ball));
    return collisionDetectors;
  },

  setUpNewPoint: function (side) {
    setTimeout(function() {
      this.resetPoint(side);
    }.bind(this), 1000);
  },

  resetPoint: function (side) {
    this.slimes = this.createSlimes(this.context, this.canvas);

    if (side == "left") { var ballX = this.slimes[1].x }
    else if (side == "right") { var ballX = this.slimes[0].x }

    this.ball = new Ball(ballX, 250, this.canvas);
    this.net  = new Net(this.canvas.width, this.canvas.height);
    this.collisionDetectors = this.createCollisionDetectors();
  },

  endGameWithWinner: function (side) {
    this.gameOver = true;

    if (side == "right") {
      this.winner = "Player 2";
    } else if (side == "left") {
      this.winner = "Player 1";
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
    // draw screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = "48px sans-serif";
    this.context.textAlign = "center";
    this.context.fillStyle = "lightgrey"
    this.context.fillText(this.winner + " wins!", this.canvas.width/2 , this.canvas.height / 2);

    // create event listner
      // - reset score and point on space being clicked
      // - remove itself (it is an event listener)
  }
}

module.exports = Game;
