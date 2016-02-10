function Ball(x, y, context) {
  this.x = x;
  this.y = y;

  this.velocity = 0;
  this.dx = 0;
  this.dy = 0.5;

  this.frameCount = 0;
  this.radius = 12;

  this.context = context;

  this.trajectorySlope = 0;
  this.trajectoryIntercept = 0;
}

Ball.prototype = {
  draw: function () {
    this.context.fillStyle = "yellow";

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
    this.context.fill();
  },

  move: function () {
    this.x += this.dx;
    this.y += 0 + this.velocity;
    
    this.velocity += this.dy;
    return this;
  },

  trajectory: function(m, b) {

  },

  updateVelocity: function(velocity) {
    this.velocity = velocity;
  }
};

module.exports = Ball;
