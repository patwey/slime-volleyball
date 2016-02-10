function CollisionDetector(slime, ball, context) {
  this.slime = slime;
  this.ball = ball;

  this.context = context;
}

CollisionDetector.prototype.detectCollision = function () {
  if (this.isBallTouchingSlime()) {
    this.ball.updateVelocity(-10);
  }
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

CollisionDetector.prototype.contactPointXValue = function () {
  if (this.slime.x == this.ball.x) {
    return this.slime.x;
  } else {
    var slope = this.slopeOfLineBetweenBallAndSlime();
    var intercept = this.interceptOfLineBetweenBallAndSlime(slope);

    return this.solveForContactPointXValue(intercept, slope);
  }
}

CollisionDetector.prototype.slopeOfLineBetweenBallAndSlime = function () {
  return ((this.slime.y - this.ball.y) / (this.slime.x - this.ball.x));
}

CollisionDetector.prototype.interceptOfLineBetweenBallAndSlime = function (slope) {
  return (this.ball.y - (slope * this.ball.x));
}

CollisionDetector.prototype.solveForContactPointXValue = function (intercept, m) {
  return this.slime.x + this.slime.radius * ((this.ball.x - this.slime.x) / this.distanceBetweenBallAndSlime());
}

module.exports = CollisionDetector;
