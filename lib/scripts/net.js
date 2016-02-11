function Net(canvasWidth, canvasHeight) {
  this.width  = 4;
  this.height = 40;

  this.x = (canvasWidth / 2) - this.width;
  this.y = canvasHeight - this.height;
}

Net.prototype = {
  draw: function(context) {
    context.fillStyle = "white";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

module.exports = Net;
