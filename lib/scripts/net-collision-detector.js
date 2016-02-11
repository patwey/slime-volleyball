function NetCollisionDetector(net, ball) {
  this.net = net;
  this.ball = ball;
}

NetCollisionDetector.prototype = {
  isBallTouchingSideOfNet: function() {
    return (this.isBallOnRightSideOfNet() || this.isBallOnLeftSideOfNet());
  },

  isBallOnRightSideOfNet: function() {
    return this.isBallBelowNet() && (this.ball.x - this.ball.radius === this.net.x + this.net.width)
  },

  isBallOnLeftSideOfNet: function() {
    return this.isBallBelowNet() && (this.ball.x + this.ball.radius === this.net.x)
  },

  isBallBelowNet: function() {
    return (this.ball.y > this.net.y);
  }
}

module.exports = NetCollisionDetector;
