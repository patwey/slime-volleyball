var Slime = require('./slime')
var Ball = require('./ball')
var Net = require('./net')
var CollisionDetector = require('./collision-detector')

function Game(){};

Game.prototype = {
  start: function() {
    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");

    var slimes = createSlimes(context, canvas);
    var ball = new Ball(slimes[0].x, 250, canvas);
    var net  = new Net(canvas.width, canvas.height);
    var collisionDetectors = createCollisionDetectors(slimes, ball);

    requestAnimationFrame(function gameLoop() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      move(slimes, ball);
      draw(slimes, ball, net, context);
      detectCollisions(collisionDetectors);

      requestAnimationFrame(gameLoop);
    });
  }
}

function draw(slimes, ball, net, context) {
  slimes.forEach(function(slime) {
    slime.draw();
  })

  ball.draw(context);
  net.draw(context);
}

function move(slimes, ball) {
  slimes.forEach(function(slime) {
    slime.move();
  })

  ball.move();
}

function detectCollisions(collisionDetectors) {
  collisionDetectors.forEach(function(detector) {
    detector.detectCollision();
  })
}

function createSlimes(context, canvas) {
  var slimes = [];

  slimes.push(new Slime(150, 375, "deeppink", "KeyA", "KeyD", context, canvas));
  slimes.push(new Slime(600, 375, "dodgerblue", "ArrowLeft", "ArrowRight", context, canvas));

  return slimes;
}

function createCollisionDetectors(slimes, ball) {
  return slimes.map(function(slime) {
    return new CollisionDetector(slime, ball);
  })
}

module.exports = Game;
