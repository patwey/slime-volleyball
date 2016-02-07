$(document).ready(function () {
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");

  // Slime
  function Slime(x, y, color, moveLeftKeyCode, moveRightKeyCode) {
    this.x = x;
    this.y = y;
    this.radius = 40;

    this.color = color;

    this.moveLeftKeyCode = moveLeftKeyCode;
    this.moveRightKeyCode = moveRightKeyCode;

    this.isMoveLeftKeyPressed = false;
    this.isMoveRightKeyPressed = false;

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
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI, true);
    context.fill();
  }

  Slime.prototype.drawPupil = function () {
    context.fillStyle = "black";

    context.beginPath();
    context.arc((this.x + 22), (this.y - 20), 4, 0, (Math.PI * 2), true);
    context.fill();
  }

  Slime.prototype.drawEye = function () {
    context.fillStyle = "white"

    context.beginPath();
    context.arc((this.x + 18), (this.y - 20), 9, 0, (Math.PI * 2), true);
    context.fill();

    this.drawPupil();
  }

  Slime.prototype.draw = function () {
    this.drawBody();
    this.drawEye();
  }

  Slime.prototype.move = function () {
    var speed = 5;

    if (this.isMoveRightKeyPressed && !this.isOnRightBorder(speed)) {
      this.x+= speed;
    } else if (this.isMoveLeftKeyPressed && !this.isOnLeftBorder(speed)) {
      this.x-= speed;
    }

    return this;
  }

  Slime.prototype.isOnRightBorder = function (speed) {
    return ((this.rightEdge() + speed) >= canvas.width);
  }

  Slime.prototype.isOnLeftBorder = function (speed) {
    return ((this.leftEdge() - speed) <= 0);
  }

  Slime.prototype.leftEdge = function () {
    return (this.x - this.radius + 1);
  }

  Slime.prototype.rightEdge = function () {
    return (this.x + this.radius - 1);
  }

  // Ball

  function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 12;
  }

  Ball.prototype.draw = function () {
    context.fillStyle = "yellow";

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
    context.fill();
  }

  // Setup

  var slimePat = new Slime(60, 375, "pink", "KeyA", "KeyD");
  var ball = new Ball(50, 50);

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    slimePat.move().draw();
    ball.draw();

    requestAnimationFrame(gameLoop);
  });

});
