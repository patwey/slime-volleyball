function CollisionDetector (slime, ball) {
  this.slime = slime;
  this.ball = ball;
  this.ballSlimeCollisionEvent = new Event("ballSlimeCollision");
}

CollisionDetector.prototype = {
  detectCollision: function (canvas) {
    if (this.isBallTouchingSlime()) { this.emitBallEvent(canvas); }
  },

  emitBallEvent: function (canvas) {
    if (this.isBallTouchingRightSideOfSlime()) {
      this.ballSlimeCollisionEvent.side = "right";
    } else if (this.isBallTouchingLeftSideOfSlime()) {
      this.ballSlimeCollisionEvent.side = "left";
    }

    this.setCollisionEventData();
    canvas.dispatchEvent(this.ballSlimeCollisionEvent);
  },

  setCollisionEventData: function () {
    this.ballSlimeCollisionEvent.contactPoint = (this.contactPointXValue() - this.slime.x);
    this.ballSlimeCollisionEvent.slimeForce = (this.slime.dy);
  },

  isBallTouchingRightSideOfSlime: function () {
    return this.contactPointXValue() > this.slime.x;
  },

  isBallTouchingLeftSideOfSlime: function () {
    return this.contactPointXValue() < this.slime.x;
  },

  isBallTouchingSlime: function () {
    return this.distanceBetweenBallAndSlime() <= (this.slime.radius + this.ball.radius);
  },

  distanceBetweenBallAndSlime: function () {
    var squareOfDifferenceInX = Math.pow((this.slime.x - this.ball.x), 2);
    var squareOfDifferenceInY = Math.pow((this.slime.y - this.ball.y), 2);

    return Math.sqrt(squareOfDifferenceInX + squareOfDifferenceInY);
  },

  contactPointXValue: function () {
    if (this.isBallDirectlyOverSlime()) {
      return this.slime.x;
    } else {
      var slope = this.slopeOfLineBetweenBallAndSlime();
      var intercept = this.interceptOfLineBetweenBallAndSlime(slope);

      return this.solveForContactPointXValue(intercept, slope);
    }
  },

  isBallDirectlyOverSlime: function () {
    return this.slime.x === this.ball.x;
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
};

module.exports = CollisionDetector;
