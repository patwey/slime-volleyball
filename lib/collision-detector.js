function CollisionDetector(slime, ball, context) {
  this.slime = slime;
  this.ball = ball;

  this.context = context;
}

CollisionDetector.prototype.detectCollision = function() {
  // The whole slime
  var x = this.slime.leftEdge() - 1;
  var y = this.slime.y - this.slime.radius + 2;
  var width = (this.slime.radius * 2) + 2;
  var height = this.slime.radius;

  // Take snapshot of whole slime
  var imgData = this.context.getImageData(x, y, width, height);

  if (this.slime.isTouchingBall(imgData, width, height)) {
    this.ball.dy = -3;
    this.ball.frameCount = 0;
  }
}

module.exports = CollisionDetector;
