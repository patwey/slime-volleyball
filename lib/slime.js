function Slime(x, y, color, moveLeftKeyCode, moveRightKeyCode, context, canvas) {
  this.x = x;
  this.y = y;
  this.radius = 40;

  this.color = color;

  this.moveLeftKeyCode = moveLeftKeyCode;
  this.moveRightKeyCode = moveRightKeyCode;

  this.isMoveLeftKeyPressed = false;
  this.isMoveRightKeyPressed = false;

  this.context = context;
  this.canvas = canvas;

  createEventListener(this);
}

function createEventListener(slime) {
  window.addEventListener("keydown", onKeyDown.bind(slime), false);
  window.addEventListener("keyup", onKeyUp.bind(slime), false);
}

function onKeyDown(e) {
  var keyPressed = e.code;

  switch (keyPressed) {
    case this.moveLeftKeyCode:
      this.isMoveLeftKeyPressed = true;
      break;
    case this.moveRightKeyCode:
      this.isMoveRightKeyPressed = true;
      break;
  }
}

function onKeyUp(e) {
  var keyReleased = e.code;

  switch (keyReleased) {
    case this.moveLeftKeyCode:
      this.isMoveLeftKeyPressed = false;
      break;
    case this.moveRightKeyCode:
      this.isMoveRightKeyPressed = false;
      break;
  }
}

Slime.prototype.drawBody = function () {
  this.context.fillStyle = this.color;

  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, Math.PI, true);
  this.context.fill();
}

Slime.prototype.drawPupil = function () {
  this.context.fillStyle = "black";

  this.context.beginPath();
  this.context.arc((this.x + 22), (this.y - 20), 4, 0, (Math.PI * 2), true);
  this.context.fill();
}

Slime.prototype.drawEye = function () {
  this.context.fillStyle = "white"

  this.context.beginPath();
  this.context.arc((this.x + 18), (this.y - 20), 9, 0, (Math.PI * 2), true);
  this.context.fill();

  this.drawPupil();
}

Slime.prototype.draw = function () {
  this.drawBody();
  this.drawEye();
}

Slime.prototype.move = function () {
  var speed = 5;

  if (this.isMoveRightKeyPressed && !this.isOnRightBorder(speed)) {
    this.x += speed;
  } else if (this.isMoveLeftKeyPressed && !this.isOnLeftBorder(speed)) {
    this.x -= speed;
  }

  return this;
}

Slime.prototype.isOnRightBorder = function (speed) {
  return ((this.rightEdge() + speed - 1) >= this.canvas.width);
}

Slime.prototype.isOnLeftBorder = function (speed) {
  return ((this.leftEdge() - speed + 1) <= 0);
}

Slime.prototype.leftEdge = function () {
  return (this.x - this.radius);
}

Slime.prototype.rightEdge = function () {
  return (this.x + this.radius);
}

Slime.prototype.isTouchingBall = function (imgData, imgWidth, imgHeight) {
  var imgArea = (imgWidth * imgHeight);
  var isTouching = false;

  // 4 elements in imgArea represent RGBA of one pixel
  for (var i = 0; i < imgArea * 4; i += 4) {
    if (isYellow(imgData.data[i], imgData.data[i+1], imgData.data[i+2])) {
      isTouching = true;
      break;
    }
  }

  return isTouching;
}

function isYellow(r, g, b) {
  return (r === 255 && g === 255 && b === 0);
}

module.exports = Slime;
