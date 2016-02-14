var assert = require('chai').assert;
var Slime  = require('../lib/scripts/slime');
var Net    = require('../lib/scripts/net');

describe("Slime", function() {
  function moveSlimeAwayFromWalls(slime) {
    slime.x = slime.canvas.width / 4;
  }

  beforeEach(function() {
    var canvas = { width: 750, height: 375 };
    this.slime = new Slime(100, 375, "blue", "keyA", "keyD", "", canvas, true);
    this.net   = new Net(canvas.width, canvas.height);
  });

  it("it knows its left edge", function() {
    var expectedEdge = this.slime.x - this.slime.radius;
    assert.strictEqual(this.slime.leftEdge(), expectedEdge);
  });

  it("it knows its right edge", function() {
    var expectedEdge = this.slime.x + this.slime.radius;
    assert.strictEqual(this.slime.rightEdge(), expectedEdge);
  });

  context("it is a slime on the left side", function() {
    function moveSlimeToLeftWall(slime) {
      slime.x = 0 + slime.radius;
    }

    function moveSlimeToLeftCenter(slime) {
      slime.x = slime.canvas / 4;
    }

    function moveSLimeToTouchLeftSideOfNet(slime, net) {
      slime.x = net.x - slime.radius;
    }

    beforeEach(function () {
      var canvas = { width: 750, height: 375 };
      this.leftSlime = new Slime(100, 375, "blue", "keyA", "keyD", "", canvas, true)
    })

    it("knows if its touching the left wall", function() {
      moveSlimeToLeftCenter(this.leftSlime);

      assert.isFalse(this.leftSlime.isTouchingLeftWall());

      moveSlimeToLeftWall(this.leftSlime);

      assert.isTrue(this.leftSlime.isTouchingLeftWall());
    });

    it("knows if it's touching the left side of the net", function() {
      moveSlimeToLeftCenter(this.leftSlime);

      assert.isFalse(this.leftSlime.isTouchingLeftSideOfNet());

      moveSLimeToTouchLeftSideOfNet(this.leftSlime, this.net);

      assert.isTrue(this.leftSlime.isTouchingLeftSideOfNet());
    });
  });

  context("it is a slime on the right side", function() {
    function moveSlimeToRightWall(slime) {
      slime.x = slime.canvas.width - slime.radius;
    }

    function moveSlimeToRightCenter(slime) {
      slime.x = slime.canvas.width - (slime.canvas.width / 4);
    }

    function moveSlimeToTouchRightSideOfNet(slime, net) {
      slime.x = net.x + net.width + slime.radius;
    }

    beforeEach(function () {
      var canvas = { width: 750, height: 375 };
      this.rightSlime = new Slime(600, 375, "blue", "keyA", "keyD", "", canvas, false)
    })

    it("knows if its touching the right wall", function() {
      moveSlimeToRightCenter(this.rightSlime)

      assert.isFalse(this.rightSlime.isTouchingRightWall());

      moveSlimeToRightWall(this.rightSlime);

      assert.isTrue(this.rightSlime.isTouchingRightWall());
    });

    it("knows if it's touching the right side of the net", function() {
      moveSlimeToRightCenter(this.rightSlime);

      assert.isFalse(this.rightSlime.isTouchingRightSideOfNet());

      moveSlimeToTouchRightSideOfNet(this.rightSlime, this.net);

      assert.isTrue(this.rightSlime.isTouchingRightSideOfNet());
    });
  });

  context("it can move", function() {
    it("moves left when left key pressed", function() {
      moveSlimeAwayFromWalls(this.slime);

      var oldX = this.slime.x;
      this.slime.move();

      assert.strictEqual(this.slime.x, oldX);

      this.slime.keyboarder.isLeftKeyPressed = true;
      this.slime.move();

      assert.strictEqual(this.slime.x, oldX - this.slime.speed);
    });

    it("moves right when right key pressed", function() {
      var oldX = this.slime.x;
      this.slime.move();

      assert.strictEqual(this.slime.x, oldX);

      this.slime.keyboarder.isRightKeyPressed = true;
      this.slime.move();

      assert.strictEqual(this.slime.x, oldX + this.slime.speed);
    });
  });
});
