var assert = require('chai').assert;
var Slime  = require('../lib/slime');

describe("Slime", function() {
  beforeEach(function() {
    var canvas = { width: 750, height: 375 };
    this.slime = new Slime(100, 300, "blue", "keyA", "keyD", "", canvas);
  });

  it("it knows its left edge", function() {
    var expectedEdge = this.slime.x - this.slime.radius
    assert.strictEqual(this.slime.leftEdge(), expectedEdge);
  });

  it("it knows its right edge", function() {
    var expectedEdge = this.slime.x + this.slime.radius
    assert.strictEqual(this.slime.rightEdge(), expectedEdge);
  });

  context("it knows if its touching the wall", function() {
    function moveSlimeToLeftWall(slime) {
      slime.x = 0 + slime.radius;
    }

    function moveSlimeToRightWall(slime) {
      slime.x = slime.canvas.width - slime.radius;
    }

    function moveSlimeAwayFromWalls(slime) {
      slime.x = slime.canvas / 2;
    }

    it("it knows if its touching the left wall", function() {
      moveSlimeAwayFromWalls(this.slime);

      assert.isFalse(this.slime.isTouchingLeftWall());

      moveSlimeToLeftWall(this.slime);

      assert.isTrue(this.slime.isTouchingLeftWall());
    });

    it("it knows if its touching the right wall", function() {
      moveSlimeAwayFromWalls(this.slime);

      assert.isFalse(this.slime.isTouchingRightWall());

      moveSlimeToRightWall(this.slime);

      assert.isTrue(this.slime.isTouchingRightWall());
    });
  });
});
