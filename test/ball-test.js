var assert = require('chai').assert;
var Ball   = require('../lib/ball');

describe("Ball", function() {
  it("has a radius of 12", function() {
    var ball = new Ball(0, 0);

    assert.equal(ball.radius, 12);
  });
});
