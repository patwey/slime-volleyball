function NetCollisionDetector(net, ball) {
  this.net = net;
  this.ball = ball;
  this.isTouchingSideOfNetEvent = new Event("ballNetSideCollision");
}

NetCollisionDetector.prototype = {
  detectCollision: function (canvas) {
    if (this.isBallTouchingSideOfNet()) { this.emitBallEvent(canvas); }
  },

  emitBallEvent: function (canvas) {
    canvas.dispatchEvent(this.isTouchingSideOfNetEvent);
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
    return (this.ball.y > this.net.y);
  }
}

module.exports = NetCollisionDetector;
