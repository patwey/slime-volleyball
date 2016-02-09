function Ball(x, y, context) {
  this.x = x;
  this.y = y;

  this.dx = 0;
  this.dy = 0;

  this.frameCount = 0;
  this.radius = 12;

  this.context = context;

  this.trajectorySlope = 0;
  this.trajectoryIntercept = 0;
}

Ball.prototype.draw = function () {
  this.context.fillStyle = "yellow";

  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
  this.context.fill();
}

Ball.prototype.move = function () {
  this.x += this.dx;
  this.y += 0 + this.dy;

  this.dy += 0.5;
  return this;
}

module.exports = Ball;
