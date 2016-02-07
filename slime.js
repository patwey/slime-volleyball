$(document).ready(function () {
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");

  function Slime(x, y, color, moveLeftKeyCode, moveRightKeyCode) {
    this.x = x;
    this.y = y;
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
    context.arc(this.x, this.y, 40, 0, Math.PI, true);
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
    if (this.isMoveRightKeyPressed) {
      this.x++;
    } else if (this.isMoveLeftKeyPressed) {
      this.x--;
    }

    return this;
  }

  var slimePat = new Slime(375, 375, "pink", "KeyA", "KeyD")

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    slimePat.move().draw();

    requestAnimationFrame(gameLoop);
  });

});
