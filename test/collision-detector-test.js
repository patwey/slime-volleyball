var assert            = require('chai').assert;
var Slime             = require('../lib/slime');
var Ball              = require('../lib/ball');
var CollisionDetector = require('../lib/collision-detector');

describe('CollisionDetector', function() {
  function moveBallToTouchTopOfSlime(ball, slime) {
    ball.y = slime.y - (slime.radius + ball.radius);
  };

  it('knows if collision has occured', function () {
    // Create slime and ball that aren't touching
    var slime             = new Slime(100, 300);
    var ball              = new Ball(100, 70);
    var collisionDetector = new CollisionDetector(slime, ball);

    assert.isFalse(collisionDetector.isBallTouchingSlime());

    moveBallToTouchTopOfSlime(ball, slime);

    assert.isTrue(collisionDetector.isBallTouchingSlime());

    // Set ball to overlap with slime
    ball.y += 10;

    assert.isTrue(collisionDetector.isBallTouchingSlime());
  });

  it('knows the distance between the ball and slime', function() {
    var slime             = new Slime(100, 300);
    var ball              = new Ball(100);
    var collisionDetector = new CollisionDetector(slime, ball);

    moveBallToTouchTopOfSlime(ball, slime);
    var expectedDistance = (ball.radius + slime.radius);
    var actualDistance = collisionDetector.distanceBetweenBallAndSlime();

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
      var slime             = new Slime(100, 300);
      var ball              = new Ball(100, 100);
      var collisionDetector = new CollisionDetector(slime, ball);

      moveBallToTouchTopOfSlime(ball, slime);
      collisionDetector.detectCollision();

      var expectedXCoordinate = slime.x;
      var actualXCoordinate  = ball.x;

      assert.strictEqual(actualXCoordinate, expectedXCoordinate);

      var oldY = ball.y;

      ball.move();

      var expectedXCoordinate = slime.x;
      var actualXCoordinate  = ball.x;

      assert.strictEqual(actualXCoordinate, expectedXCoordinate);
      assert.strictEqual((ball.y - oldY), ball.velocity - ball.dy)
    });
  });

  context('ball hits the side of slime', function() {
    it('knows the point at which the ball and slime have collided', function() {
      var slime             = new Slime(150, 375);
      var ball              = new Ball(170, 328);
      var collisionDetector = new CollisionDetector(slime, ball);

      var expectedContactPoint = 165.6622065638907;
      var actualContactPoint   = collisionDetector.contactPointXValue();

      assert.strictEqual(actualContactPoint, expectedContactPoint);
    });

    it("it moves up and to the right when it hits the right side of the slime", function () {
      var slime             = new Slime(150, 375);
      var ball              = new Ball(170, 328);
      var collisionDetector = new CollisionDetector(slime, ball);

      collisionDetector.detectCollision();

      var oldY = ball.y;
      var oldX = ball.x;

      ball.move();

      assert.isAbove(ball.x, oldX);
      assert.isBelow(ball.y, oldY);
    });

    it("it moves up and to the left when it hits the left side of the slime", function () {
      var slime             = new Slime(150, 375);
      var ball              = new Ball(130, 328);
      var collisionDetector = new CollisionDetector(slime, ball);

      collisionDetector.detectCollision();

      var oldY = ball.y;
      var oldX = ball.x;

      ball.move();

      assert.isBelow(ball.x, oldX);
      assert.isBelow(ball.y, oldY);
    });
  });
});
