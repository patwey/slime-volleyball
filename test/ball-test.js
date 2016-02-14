var assert = require('chai').assert;
var Ball   = require('../lib/scripts/ball');

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

  context("it hits a slime", function() {
    var ballSlimeCollisionEvent      = new Event("ballSlimeCollision");
    var ballSlimeLeftCollisionEvent  = new Event("ballSlimeLeftCollision");
    var ballSlimeRightCollisionEvent = new Event("ballSlimeRightCollision");

    xit("updates its trajectory correctly when it hits the left side of a slime", function (done) {
      document.dispatchEvent(ballSlimeCollisionEvent);
      document.dispatchEvent(ballSlimeLeftCollisionEvent);

      setTimeout(function() {}, 1000);

      assert.strictEqual(this.ball.trajectorySlope, -200);
      assert.strictEqual(this.ball.dx, -10);
      assert.strictEqual(this.ball.velocity, -10);
      done();
    });

    xit("updates its trajectory correctly when it hits the right side of a slime", function (done) {
      document.dispatchEvent(ballSlimeCollisionEvent);
      document.dispatchEvent(ballSlimeRightCollisionEvent);

      setTimeout(function() {}.bind(this), 1000);

      assert.strictEqual(this.ball.trajectorySlope, 200);
      assert.strictEqual(this.ball.dx, -10);
      assert.strictEqual(this.ball.velocity, -10);
      done();
    });
  })
});
