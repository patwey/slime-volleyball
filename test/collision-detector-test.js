var assert            = require('chai').assert;
var Slime             = require('../lib/slime');
var Ball              = require('../lib/ball');
var CollisionDetector = require('../lib/collision-detector');

describe('CollisionDetector', function() {
  function moveBallToTouchSlime(ball, slime) {
    ball.y = slime.y - (slime.radius + ball.radius);
  };

  it('knows if collision has occured', function () {
    // Create slime and ball that aren't touching
    var slime = new Slime(100, 300);
    var ball  = new Ball(100, 70);
    var collisionDetector = new CollisionDetector(slime, ball);

    assert.isFalse(collisionDetector.isBallTouchingSlime());

    moveBallToTouchSlime(ball, slime);

    assert.isTrue(collisionDetector.isBallTouchingSlime());

    // Set ball to overlap with slime
    ball.y += 10;

    assert.isTrue(collisionDetector.isBallTouchingSlime());
  });

  it('knows the distance between the ball and slime', function() {
    var slime = new Slime(100, 300);
    var ball  = new Ball(100);
    var collisionDetector = new CollisionDetector(slime, ball);

    moveBallToTouchSlime(ball, slime);
    var expectedDistance = (ball.radius + slime.radius);
    var actualDistance = collisionDetector.distanceBetweenBallAndSlime();

    assert.strictEqual(actualDistance, expectedDistance);
  });

  it('knows the point at which the ball and slime have collided', function() {
    var slime = new Slime(100, 300);
    var ball  = new Ball(100);
    var collisionDetector = new CollisionDetector(slime, ball);

    moveBallToTouchSlime(ball, slime);
    var expectedContactPoint = { x: 100, y: 260 };
    var actualContactPoint = collisionDetector.contactPoint();
    
    assert.strictEqual(actualContactPoint, expectedContactPoint);
  });
});
