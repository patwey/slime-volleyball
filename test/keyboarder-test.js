var assert = require('chai').assert;
var Keyboarder  = require('../lib/scripts/keyboarder');
var Slime  = require('../lib/scripts/slime');

describe("Keyboarder", function() {
  beforeEach(function () {
    this.slime = new Slime(100, 300);
    this.keyboarder = new Keyboarder(this.slime, "keyA", "keyD");
  });

  it("is true", function () {
    assert.isTrue(true);
  });
});
