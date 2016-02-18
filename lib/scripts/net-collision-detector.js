function NetCollisionDetector(net, ball) {
  this.net = net;
  this.ball = ball;
  this.isTouchingSideOfNetEvent = new Event("ballNetSideCollision");
  this.isTouchingTopOfNetEvent = new Event("ballNetTopCollision");
}

NetCollisionDetector.prototype = {
  detectCollision: function (canvas) {
    if (this.isBallTouchingNet()) { this.emitBallEvent(canvas); }
  },

  isBallTouchingNet: function () {
    return (this.isBallTouchingTopOfNet() || this.isBallTouchingSideOfNet());
  },

  emitBallEvent: function (canvas) {
    if (this.isBallTouchingSideOfNet()) {
      canvas.dispatchEvent(this.isTouchingSideOfNetEvent);
    } else if (this.isBallTouchingTopOfNet()) {
      canvas.dispatchEvent(this.isTouchingTopOfNetEvent);
    }
  },

  isBallTouchingTopOfNet: function () {
    return (this.isBallXWithinNetWidth() && this.isBallYDirectlyAboveNetHeight());
  },

  isBallXWithinNetWidth: function () {
    return (this.ball.x >= this.net.x - this.ball.dx &&
            this.ball.x <= this.net.x + this.net.width + this.ball.dx);
  },

  isBallYDirectlyAboveNetHeight: function () {
    return (this.ball.bottomEdge() >= this.net.y - this.ball.dx &&
            this.ball.bottomEdge() <= this.net.y + this.ball.dx);
  },

  isBallTouchingSideOfNet: function () {
    return (this.isBallOnRightSideOfNet() || this.isBallOnLeftSideOfNet());
  },

  isBallOnRightSideOfNet: function () {
    return (this.ball.leftEdge() >= this.net.rightEdge() + this.ball.dx &&
            this.ball.leftEdge() <= this.net.rightEdge() - this.ball.dx &&
            this.isBallBelowNet());
  },

  isBallOnLeftSideOfNet: function () {
    return (this.ball.rightEdge() <= this.net.x + this.ball.dx &&
            this.ball.rightEdge() >= this.net.x - this.ball.dx &&
            this.isBallBelowNet());
  },

  isBallBelowNet: function () {
    return (this.ball.bottomEdge() > this.net.y);
  }
};

module.exports = NetCollisionDetector;
