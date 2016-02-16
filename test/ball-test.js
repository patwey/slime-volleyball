var assert = require('chai').assert;
var Ball   = require('../lib/scripts/ball');
var sinon = require('sinon/pkg/sinon');

describe("Ball", function() {
  beforeEach(function() {
    this.canvas = { width: 750, height: 375, addEventListener: function(){}, dispatchEvent: function(){} };
    this.ball = new Ball(0, 0, this.canvas);
    this.ball.dx = 10;
  });

  function moveBallToTouchRightWall(ball) {
    ball.x = (ball.canvas.width - ball.radius);
  };

  function moveBallToTouchLeftWall(ball) {
    ball.x = (0 + ball.radius);
  };

  function moveBallToCenterOfCanvas(ball) {
    ball.x = (ball.canvas.width / 2);
    ball.y = (ball.canvas.height / 2);
  }

  it("has a radius of 12", function() {
    assert.equal(this.ball.radius, 12);
  });

  context("it hits a wall", function() {
    it("knows if it hits a wall", function() {
      moveBallToTouchRightWall(this.ball);

      assert.isTrue(this.ball.isTouchingWall());

      moveBallToTouchLeftWall(this.ball);

      assert.isTrue(this.ball.isTouchingWall());

      moveBallToCenterOfCanvas(this.ball);

      assert.isFalse(this.ball.isTouchingWall());
    });

    it("reverses horizontal direction when it hits a wall", function() {
      var oldDx = this.ball.dx;

      moveBallToTouchRightWall(this.ball);
      this.ball.move();

      assert.strictEqual(this.ball.dx, -oldDx);

      oldDx = this.ball.dx;

      moveBallToTouchLeftWall(this.ball);
      this.ball.move();

      assert.strictEqual(this.ball.dx, -oldDx);
    })
  });

  context("it hits the floor", function() {
    function moveBallToTouchFloor(ball) {
      ball.y = (ball.canvas.height - ball.radius);
    }

    it("knows if it hits the floor", function() {
      moveBallToCenterOfCanvas(this.ball);

      assert.isFalse(this.ball.isTouchingFloor());

      moveBallToTouchFloor(this.ball);

      assert.isTrue(this.ball.isTouchingFloor());
    });

    it("stops moving when it hits the floor", function() {
      moveBallToTouchFloor(this.ball);
      this.ball.move();

      var oldX = this.ball.x;
      var oldY = this.ball.y;

      this.ball.move();

      assert.strictEqual(this.ball.x, oldX);
      assert.strictEqual(this.ball.y, oldY);
    });
  });

  it("can draw itself", function() {
    var canvas = { addEventListener: function(){} };
    var context = { fill: function(){}, beginPath: function(){}, arc: function(){} }

    var spy = sinon.spy(context, "fill");

    var ball = new Ball(100, 100, canvas);

    ball.draw(context);

    assert(spy.calledOnce);
  });
});
