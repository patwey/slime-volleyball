function CollisionDetector(slime, ball, context) {
  this.slime = slime;
  this.ball = ball;

  this.context = context;
}

CollisionDetector.prototype.isBallTouchingSlime = function () {
  var distance = this.distanceBetweenBallAndSlime();

  if (distance <= (this.slime.radius + this.ball.radius)) {
    return true;
  } else {
    return false;
  }
}

CollisionDetector.prototype.distanceBetweenBallAndSlime = function () {
  var squareOfDifferenceInX = Math.pow((this.slime.x - this.ball.x), 2);
  var squareOfDifferenceInY = Math.pow((this.slime.y - this.ball.y), 2);

  return Math.sqrt(squareOfDifferenceInX + squareOfDifferenceInY);
}

CollisionDetector.prototype.contactPoint = function () {
  
}

module.exports = CollisionDetector;
