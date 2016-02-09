var Slime = require('./slime')
var Ball = require('./ball')
var CollisionDetector = require('./collision-detector')

function Game(){};

Game.prototype.start = function() {
  var canvas = document.getElementById("game");
  var context = canvas.getContext("2d");

  var slimePat = new Slime(150, 375, "deeppink", "KeyA", "KeyD", context, canvas);
  var ball = new Ball(slimePat.x, 250, context);
  var collisionDetector = new CollisionDetector(slimePat, ball, context);

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    slimePat.move().draw();
    ball.move().draw();
    
    if (collisionDetector.isBallTouchingSlime()) {
      ball.dy = -10;
    }

    requestAnimationFrame(gameLoop);
  });
};

module.exports = Game;
