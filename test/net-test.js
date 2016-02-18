var assert = require('chai').assert;
var sinon = require('sinon/pkg/sinon');
var Net    = require('../lib/scripts/net');

describe("Net", function() {
  it("can draw itself", function() {
    var context = { fillRect: function(){} };

    var spy = sinon.spy(context, "fillRect");
    var net = new Net(750, 375);

    net.draw(context);

    assert(spy.called);
  });
});
