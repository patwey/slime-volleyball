var Keyboarder = require('./keyboarder');

function Slime(x, y, color, moveLeftKeyCode, moveRightKeyCode, context, canvas) {
  this.x = x;
  this.y = y;
  this.radius = 40;

  this.color = color;

  this.moveLeftKeyCode = moveLeftKeyCode;
  this.moveRightKeyCode = moveRightKeyCode;

  this.context = context;
  this.canvas = canvas;

  this.speed = 7;
  this.keyboarder = new Keyboarder(this, moveLeftKeyCode, moveRightKeyCode);
}

Slime.prototype = {
  draw: function () {
    this.drawBody();
    this.drawEye();
  },

  drawBody: function () {
    this.context.fillStyle = this.color;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI, true);
    this.context.fill();
  },

  drawEye: function () {
    this.context.fillStyle = "white"

    this.context.beginPath();
    this.context.arc((this.x + 18), (this.y - 20), 9, 0, (Math.PI * 2), true);
    this.context.fill();

    this.drawPupil();
  },

  drawPupil: function () {
    this.context.fillStyle = "black";

    this.context.beginPath();
    this.context.arc((this.x + 22), (this.y - 20), 4, 0, (Math.PI * 2), true);
    this.context.fill();
  },

  move: function () {
    if (this.shouldMoveRight()) {
      this.x += this.speed;
    } else if (this.shouldMoveLeft()) {
      this.x -= this.speed;
    }

    return this;
  },

  shouldMoveRight: function () {
    return (this.keyboarder.isRightKeyPressed && !this.isTouchingRightWall());
  },

  shouldMoveLeft: function () {
    return (this.keyboarder.isLeftKeyPressed && !this.isTouchingLeftWall());
  },

  isTouchingRightWall: function () {
    return ((this.rightEdge() + this.speed - 1) >= this.canvas.width);
  },

  isTouchingLeftWall: function () {
    return ((this.leftEdge() - this.speed + 1) <= 0);
  },

  leftEdge: function () {
    return (this.x - this.radius);
  },

  rightEdge: function () {
    return (this.x + this.radius);
  }
};

module.exports = Slime;
