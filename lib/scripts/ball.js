function Ball(x, y, canvas) {
  this.x = x;
  this.y = y;

  this.velocity = 0;
  this.dx = 0;
  this.dy = 0.5;

  this.frameCount = 0;
  this.radius = 12;

  this.canvas = canvas;

  this.trajectorySlope = 1;
  this.trajectoryIntercept = y;

  canvas.addEventListener("ballSlimeCollision", function(e) { this.resetVelocity(); }.bind(this), false);
  canvas.addEventListener("ballSlimeLeftCollision", function(e) { this.redirectLeft(); }.bind(this), false);
  canvas.addEventListener("ballSlimeRightCollision", function(e) { this.redirectRight(); }.bind(this), false);
  canvas.addEventListener("ballNetSideCollision", function(e) { this.reverseDirection(); }.bind(this), false);
}

Ball.prototype = {
  draw: function (context) {
    context.fillStyle = "yellow";

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
    context.fill();
  },

  move: function () {
    this.stopIfOnFloor();
    this.setTrajectoryInterceptToY();
    this.x += this.dx;
    this.y += this.trajectory(this.trajectorySlope, this.trajectoryIntercept) + this.velocity;

    this.velocity += this.dy;
    this.changeDirectionIfOnWall();
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
  },

  changeDirectionIfOnWall: function() {
    if (this.isTouchingWall()) { this.reverseDirection(); }
  },

  reverseDirection: function() {
    this.dx = -this.dx;
  },

  isTouchingWall: function() {
    return (this.isTouchingLeftWall() || this.isTouchingRightWall());
  },

  isTouchingLeftWall: function() {
    return (this.x - this.radius <= 0);
  },

  isTouchingRightWall: function() {
    return (this.x + this.radius >= this.canvas.width);
  },

  stopIfOnFloor: function() {
    if (this.isTouchingFloor()) { this.stopBall(); }
  },

  stopBall: function() {
    this.dx       = 0;
    this.dy       = 0;
    this.velocity = 0;
  },

  isTouchingFloor: function() {
    return (this.y + this.radius >= this.canvas.height);
  },

  redirectRight: function () {
    this.updateDx(8);
    this.updateTrajectorySlope(-200);
  },

  redirectLeft: function () {
    this.updateDx(-8);
    this.updateTrajectorySlope(200);
  },

  resetVelocity: function () {
    this.updateVelocity(-10);
  },

  rightEdge: function () {
    return (this.x + this.radius);
  },

  leftEdge: function () {
    return (this.x - this.radius);
  }
};

module.exports = Ball;
