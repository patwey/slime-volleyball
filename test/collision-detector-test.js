var assert            = require('chai').assert;
var Slime             = require('../lib/slime');
var Ball              = require('../lib/ball');
var CollisionDetector = require('../lib/collision-detector');

describe('CollisionDetector', function() {
  beforeEach(function() {
    // Create slime and ball that aren't touching
    this.canvas = { width: 750, height: 375 };
    this.ball = new Ball(100, 70, this.canvas);

    this.slime = new Slime(100, 300);
    this.collisionDetector = new CollisionDetector(this.slime, this.ball);
  });

  function moveBallToTouchTopOfSlime(ball, slime) {
    ball.y = slime.y - (slime.radius + ball.radius);
  };

  function separateBallAndSlime(ball, slime){
    ball.x = 100;
    ball.y = 100;
    slime.x = 100;
    slime.y = 300;
  };

  it('knows if collision has occured', function () {
    separateBallAndSlime(this.ball, this.slime);

    assert.isFalse(this.collisionDetector.isBallTouchingSlime());

    moveBallToTouchTopOfSlime(this.ball, this.slime);

    assert.isTrue(this.collisionDetector.isBallTouchingSlime());

    // Set ball to overlap with slime
    this.ball.y = 270;

    assert.isTrue(this.collisionDetector.isBallTouchingSlime());
  });

  it('knows the distance between the ball and slime', function() {
    this.slime.x = 100; this.slime.y = 300;

    moveBallToTouchTopOfSlime(this.ball, this.slime);
    var expectedDistance = (this.ball.radius + this.slime.radius);
    var actualDistance = this.collisionDetector.distanceBetweenBallAndSlime();

    assert.strictEqual(actualDistance, expectedDistance);
  });

  context('ball hits directly on top of slime', function () {
    it('knows the point at which the ball and slime have collided', function() {
      var slime             = new Slime(100, 300);
      var ball              = new Ball(100);
      var collisionDetector = new CollisionDetector(slime, ball);

      moveBallToTouchTopOfSlime(ball, slime);
      var expectedContactPoint = 100;
      var actualContactPoint   = collisionDetector.contactPointXValue();

      assert.strictEqual(actualContactPoint, expectedContactPoint);
    });

    it("it updates the ball's trajectory correctly", function () {
      moveBallToTouchTopOfSlime(this.ball, this.slime);
      this.collisionDetector.detectCollision();

      var expectedXCoordinate = this.slime.x;
      var actualXCoordinate  = this.ball.x;

      assert.strictEqual(actualXCoordinate, expectedXCoordinate);

      var oldY = this.ball.y;

      this.ball.move();

      var expectedXCoordinate = this.slime.x;
      var actualXCoordinate  = this.ball.x;

      assert.strictEqual(actualXCoordinate, expectedXCoordinate);
      assert.strictEqual((this.ball.y - oldY), this.ball.velocity - this.ball.dy)
    });
  });

  context('ball hits the side of slime', function() {
    function moveBallToTouchRightSideOfSlime(ball, slime) {
      ball.x = 170; ball.y = 328;
      slime.x = 150, slime.y = 375;
    }

    function moveBallToTouchLeftSideOfSlime(ball, slime) {
      ball.x = 130; ball.y = 328;
      slime.x = 150, slime.y = 375;
    }

    it('knows the point at which the ball and slime have collided', function() {
      moveBallToTouchRightSideOfSlime(this.ball, this.slime);

      var expectedContactPoint = 165.6622065638907;
      var actualContactPoint   = this.collisionDetector.contactPointXValue();

      assert.strictEqual(actualContactPoint, expectedContactPoint);
    });

    it("it moves up and to the right when it hits the right side of the slime", function () {
      moveBallToTouchRightSideOfSlime(this.ball, this.slime);

      this.collisionDetector.detectCollision();

      var oldY = this.ball.y;
      var oldX = this.ball.x;

      this.ball.move();

      assert.isAbove(this.ball.x, oldX);
      assert.isBelow(this.ball.y, oldY);
    });

    it("it moves up and to the left when it hits the left side of the slime", function () {
      moveBallToTouchLeftSideOfSlime(this.ball, this.slime);

      this.collisionDetector.detectCollision();

      var oldY = this.ball.y;
      var oldX = this.ball.x;

      this.ball.move();

      assert.isBelow(this.ball.x, oldX);
      assert.isBelow(this.ball.y, oldY);
    });
  });
});
