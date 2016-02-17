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

  this.createEventListeners();

  this.hitLeftSideOfFloor = new Event("ballHitLeftSideOfFloor");
  this.hitRightSideOfFloor = new Event("ballHitRightSideOfFloor");
}

Ball.prototype = {
  createEventListeners: function () {
    this.canvas.addEventListener("ballSlimeCollision", function(e) { this.redirect(e.side, e.contactPoint, e.slimeForce); }.bind(this), false);
    this.canvas.addEventListener("ballNetSideCollision", function(e) { this.reverseDirection(); }.bind(this), false);
    this.canvas.addEventListener("ballNetTopCollision", function(e) { this.resetVelocity(); }.bind(this), false);
  },

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
    if (this.dx === 0) { this.updateTrajectoryIntercept(this.y); }
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

  updateTrajectoryIntercept: function(trajectoryIntercept) {
    this.trajectoryIntercept = trajectoryIntercept;
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
    if (this.isTouchingFloor()) {
      this.emitFloorContactEvent();
      this.stopBall();
    }
  },

  stopBall: function() {
    this.dx       = 0;
    this.dy       = 0;
    this.velocity = 0;
  },

  isTouchingFloor: function() {
    return (this.y + this.radius >= this.canvas.height);
  },

  emitFloorContactEvent: function () {
    if (this.isOnLeftSide()) {
      this.canvas.dispatchEvent(this.hitLeftSideOfFloor);
    } else if (this.isOnRightSide()) {
      this.canvas.dispatchEvent(this.hitRightSideOfFloor);
    }
    this.nullifyEvents();
  },

  nullifyEvents: function () {
    var event = new Event("null");
    this.hitLeftSideOfFloor  = event;
    this.hitRightSideOfFloor = event;
  },

  isOnLeftSide: function () {
    return (this.x < this.canvas.width / 2);
  },

  isOnRightSide: function () {
    return (this.x > this.canvas.width / 2);
  },

  redirect: function (side, contactPoint, slimeForce) {
    this.resetVelocity();
    if (side === "left") { this.redirectLeft(contactPoint, slimeForce); }
    else if (side === "right") {this.redirectRight(contactPoint, slimeForce); }
  },

  redirectRight: function (contactPoint, slimeForce) {
    this.updateDx(8 + (-slimeForce * 0.15));
    this.updateTrajectorySlope(-200);
    this.updateTrajectoryIntercept(200 + (12 * contactPoint));
  },

  redirectLeft: function (contactPoint, slimeForce) {
    this.updateDx(-8 + (slimeForce * 0.15));
    this.updateTrajectorySlope(200);
    this.updateTrajectoryIntercept(300 + (12 * contactPoint));
  },

  resetVelocity: function () {
    this.updateVelocity(-10);
  },

  rightEdge: function () {
    return (this.x + this.radius);
  },

  leftEdge: function () {
    return (this.x - this.radius);
  },

  bottomEdge: function () {
    return (this.y + this.radius);
  }
};

module.exports = Ball;
