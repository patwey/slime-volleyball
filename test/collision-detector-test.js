var assert            = require('chai').assert;
var Slime             = require('../lib/slime');
var Ball              = require('../lib/ball');
var CollisionDetector = require('../lib/collision-detector');

describe('CollisionDetector', function() {
  before(function() {
    // Create slime and ball that aren't touching
    var slime = new Slime(100, 300);
    var ball  = new Ball(100, 70);
    var collisionDetector = new CollisionDetector(slime, ball);
  });

  it('knows if collision has occured', function () {
    assert.isFalse(collisionDetector.isBallTouchingSlime());

    // Set ball y to touch edge of slime
    ball.y = slime.y - (slime.radius + ball.radius);

    assert.isTrue(collisionDetector.isBallTouchingSlime());

    // Set ball to overlap with slime
    ball.y += 10;

    assert.isTrue(collisionDetector.isBallTouchingSlime());
  });
});
