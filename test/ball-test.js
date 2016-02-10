var assert = require('chai').assert;
var Ball   = require('../lib/ball');

describe("Ball", function() {
  beforeEach(function() {
    this.canvas = { width: 750, height: 375 };
    this.ball = new Ball(0, 0, this.canvas);
    this.ball.dx = 10;
  });

  function moveBallToTouchRightWall(ball) {
    ball.x = (ball.canvas.width - ball.radius);
  };

  function moveBallToTouchLeftWall(ball) {
    ball.x = (0 + ball.radius);
  };

  it("has a radius of 12", function() {
    assert.equal(this.ball.radius, 12);
  });

  context("it hits a wall", function() {
    it("knows if it hits a wall", function() {
      moveBallToTouchRightWall(this.ball);

      assert.isTrue(this.ball.isTouchingWall());

      moveBallToTouchLeftWall(this.ball);

      assert.isTrue(this.ball.isTouchingWall());
    });

    it("reverses horizontal direction", function() {
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
});
