function Ball(x, y, context) {
  this.x = x;
  this.y = y;

  this.velocity = 0;
  this.dx = 0;
  this.dy = 0.5;

  this.frameCount = 0;
  this.radius = 12;

  this.context = context;

  this.trajectorySlope = 1;
  this.trajectoryIntercept = y;
}

Ball.prototype = {
  draw: function () {
    this.context.fillStyle = "yellow";

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
    this.context.fill();
  },

  move: function () {
    this.setTrajectoryInterceptToY();
    this.x += this.dx;
    this.y += this.trajectory(this.trajectorySlope, this.trajectoryIntercept) + this.velocity;

    this.velocity += this.dy;

    return this;
  },

  trajectory: function(m, b) {
    return ((this.y - b) / m);
  },

  setTrajectoryInterceptToY: function() {
    if (this.dx === 0) { this.trajectoryIntercept = this.y; }
  },

  updateVelocity: function(velocity) {
    this.velocity = velocity;
  },

  updateDx: function(dx) {
    this.dx = dx;
  },

  updateTrajectorySlope: function(trajectorySlope) {
    this.trajectorySlope = trajectorySlope;
  }
};

module.exports = Ball;
