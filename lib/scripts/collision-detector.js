function CollisionDetector(slime, ball) {
  this.slime = slime;
  this.ball = ball;
  this.ballSlimeCollisionEvent      = new Event("ballSlimeCollision");
  this.ballSlimeLeftCollisionEvent  = new Event("ballSlimeLeftCollision");
  this.ballSlimeRightCollisionEvent = new Event("ballSlimeRightCollision");
}

CollisionDetector.prototype = {
  detectCollision: function (canvas) {
    if (this.isBallTouchingSlime()) { this.emitBallEvent(canvas); }
  },

  emitBallEvent: function (canvas) {
    canvas.dispatchEvent(this.ballSlimeCollisionEvent);

    if (this.isBallTouchingRightSideOfSlime()) {
      canvas.dispatchEvent(this.ballSlimeRightCollisionEvent);
    } else if (this.isBallTouchingLeftSideOfSlime()) {
      canvas.dispatchEvent(this.ballSlimeLeftCollisionEvent);
    }
  },

  isBallTouchingRightSideOfSlime: function () {
    return this.contactPointXValue() > this.slime.x;
  },

  isBallTouchingLeftSideOfSlime: function () {
    return this.contactPointXValue() < this.slime.x;
  },

  isBallTouchingSlime: function () {
    var distance = this.distanceBetweenBallAndSlime();

    if (distance <= (this.slime.radius + this.ball.radius)) {
      return true;
    } else {
      return false;
    }
  },

  distanceBetweenBallAndSlime: function () {
    var squareOfDifferenceInX = Math.pow((this.slime.x - this.ball.x), 2);
    var squareOfDifferenceInY = Math.pow((this.slime.y - this.ball.y), 2);

    return Math.sqrt(squareOfDifferenceInX + squareOfDifferenceInY);
  },

  contactPointXValue: function () {
    if (this.slime.x == this.ball.x) {
      return this.slime.x;
    } else {
      var slope = this.slopeOfLineBetweenBallAndSlime();
      var intercept = this.interceptOfLineBetweenBallAndSlime(slope);

      return this.solveForContactPointXValue(intercept, slope);
    }
  },

  slopeOfLineBetweenBallAndSlime: function () {
    return ((this.slime.y - this.ball.y) / (this.slime.x - this.ball.x));
  },

  interceptOfLineBetweenBallAndSlime: function (slope) {
    return (this.ball.y - (slope * this.ball.x));
  },

  solveForContactPointXValue: function (intercept, m) {
    return this.slime.x + this.slime.radius * ((this.ball.x - this.slime.x) / this.distanceBetweenBallAndSlime());
  }
}

module.exports = CollisionDetector;
