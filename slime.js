$(document).ready(function () {
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");

  function Slime(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
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

  var slimePat = new Slime(375, 375, "pink")

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    slimePat.draw();

    requestAnimationFrame(gameLoop);
  });

});
