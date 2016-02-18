function Net(canvasWidth, canvasHeight) {
  this.width  = 8;
  this.height = 45;

  this.x = (canvasWidth / 2) - (this.width / 2);
  this.y = canvasHeight - this.height;
}

Net.prototype = {
  draw: function(context) {
    context.fillStyle = "lightgrey";
    context.fillRect(this.x, this.y, this.width, this.height);
  },

  rightEdge: function() {
    return (this.x + this.width);
  },

  lefttEdge: function() {
    return this.x;
  }
};

module.exports = Net;
