var assert = require('chai').assert;
var NetCollisionDetector  = require('../lib/scripts/net-collision-detector');
var Net  = require('../lib/scripts/net');
var Ball  = require('../lib/scripts/ball');

describe("Net Collision Detector", function(){
  context("the ball is touching the net", function (){
    beforeEach(function(){
      this.canvas = { width: 750, height: 375, addEventListener: function(){} };

      this.net = new Net(this.canvas.width, this.canvas.height);
      this.ball = new Ball(0, 0, this.canvas);
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

    function moveBallToTouchTopOfNet(net, ball){
      ball.x = net.x + 1;
      ball.y = net.y - ball.radius;
    }

    it("knows if the ball is not touching the side of the net", function (){
      moveBallToNotTouchNet(this.net, this.ball);

      assert.isFalse(this.netCollisionDetector.isBallTouchingSideOfNet());
    });

    it("knows if the ball is touching the right side of the net", function (){
      moveBallToTouchRightSideOfNet(this.net, this.ball);

      assert.isTrue(this.netCollisionDetector.isBallTouchingSideOfNet());
    });

    it("knows if the ball is touching the left side of the net", function (){
      moveBallToTouchLeftSideOfNet(this.net, this.ball);

      assert.isTrue(this.netCollisionDetector.isBallTouchingSideOfNet());
    });

    it("knows if the ball is touching the top of the net", function() {
      moveBallToNotTouchNet(this.net, this.ball);

      assert.isFalse(this.netCollisionDetector.isBallTouchingTopOfNet());

      moveBallToTouchTopOfNet(this.net, this.ball);

      assert.isTrue(this.netCollisionDetector.isBallTouchingTopOfNet());
    });
  });
});
