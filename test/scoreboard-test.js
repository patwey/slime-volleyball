var assert = require('chai').assert;
var Scoreboard  = require('../lib/scripts/scoreboard');

describe("Scoreboard", function () {
  beforeEach(function () {
    var canvas = { width: 750, height: 375, addEventListener: function () {}, dispatchEvent: function () {} };
    this.scoreboard = new Scoreboard(canvas);
  });

  it("updates left slime's score", function () {
    var oldScore = this.scoreboard.leftSlimeScore;

    this.scoreboard.increaseLeftSlimeScore();

    assert.strictEqual(this.scoreboard.leftSlimeScore, oldScore + 1);
  });

  it("updates right slime's score", function () {
    var oldScore = this.scoreboard.rightSlimeScore;

    this.scoreboard.increaseRightSlimeScore();

    assert.strictEqual(this.scoreboard.rightSlimeScore, oldScore + 1);
  });

  it("knows if there is a winner", function () {
    this.scoreboard.rightSlimeScore = 6;

    assert.isFalse(this.scoreboard.isWinner(this.scoreboard.rightSlimeScore));

    this.scoreboard.increaseRightSlimeScore();

    assert.isTrue(this.scoreboard.isWinner(this.scoreboard.rightSlimeScore));
  });
});
