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
  this.context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
  this.context.fill();
}

Ball.prototype.move = function () {
  if (this.frameCount == 30) {
    this.dy = -(this.dy);
  }
  this.x += this.dx;
  this.y += this.dy;

  this.frameCount += 1;

  return this;
}

module.exports = Ball;
