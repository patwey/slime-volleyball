var assert = require('chai').assert;
var NetCollisionDetector  = require('../lib/scripts/net-collision-detector');
var Net  = require('../lib/scripts/net');
var Ball  = require('../lib/scripts/ball');

describe("Net Collision Detector", function(){
  context("the ball is touching the net", function (){
    beforeEach(function(){
      var canvas = { width: 750, height: 375, addEventListener: function(){} };

      this.net = new Net(canvas.width, canvas.height);
      this.ball = new Ball(0, 0, canvas);
      this.netCollisionDetector = new NetCollisionDetector(this.net, this.ball);
    });

    function moveBallToNotTouchNet(ball) {
      ball.x = 0;
    }

    function moveBallToTouchLeftSideOfNet(net, ball) {
      ball.y = net.y + (net.height / 2);
      ball.x = net.x - ball.radius;
    }

    function moveBallToTouchRightSideOfNet(net, ball) {
      ball.y = net.y + (net.height / 2);
      ball.x = net.x + ball.radius + net.width;
    }

    it("knows if the ball is touching the side of the net", function (){
      moveBallToNotTouchNet(this.net, this.ball);

      assert.isFalse(this.netCollisionDetector.isBallTouchingSideOfNet());

      moveBallToTouchLeftSideOfNet(this.net, this.ball);

      assert.isTrue(this.netCollisionDetector.isBallTouchingSideOfNet());

      moveBallToTouchRightSideOfNet(this.net, this.ball);

      assert.isTrue(this.netCollisionDetector.isBallTouchingSideOfNet());
    });

    it("knows if the ball is touching the top of the net", function() {

    });
  })
})
