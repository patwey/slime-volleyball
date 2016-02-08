$(document).ready(function () {
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");

  // For testing
  canvas2 = document.getElementById("test");
  context2 = canvas2.getContext("2d");

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
      this.x += speed;
    } else if (this.isMoveLeftKeyPressed && !this.isOnLeftBorder(speed)) {
      this.x -= speed;
    }

    return this;
  }

  Slime.prototype.isOnRightBorder = function (speed) {
    return ((this.rightEdge() + speed - 1) >= canvas.width);
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

  // Ball
  function Ball(x, y) {
    this.x = x;
    this.y = y;

    this.dx = 0;
    this.dy = 3;

    this.frameCount = 0;
    this.radius = 12;
  }

  Ball.prototype.draw = function () {
    context.fillStyle = "yellow";

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
    context.fill();
  }

  Ball.prototype.move = function () {
    if (this.frameCount == 30) {
      this.dy = -(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;

    this.frameCount += 1;

    return this;
  }

  // Collision Detector
  function CollisionDetector(slime, ball) {
    this.slime = slime;
    this.ball = ball;
  }

  CollisionDetector.prototype.detectCollision = function() {
    // The whole slime
    var x = this.slime.leftEdge() - 1;
    var y = this.slime.y - this.slime.radius + 2;
    var width = (this.slime.radius * 2) + 2;
    var height = this.slime.radius;

    // Take snapshot of whole slime
    var imgData = context.getImageData(x, y, width, height);

    context2.putImageData(imgData, 20, 20); // for testing

    if (this.slime.isTouchingBall(imgData, width, height)) {
      this.ball.dy = -3;
      this.ball.frameCount = 0;
    }
  }

  // Setup
  var slimePat = new Slime(150, 375, "pink", "KeyA", "KeyD");
  var ball = new Ball(slimePat.x, 250);
  var collisionDetector = new CollisionDetector(slimePat, ball);

  // Game Loop
  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    slimePat.move().draw();
    ball.move().draw();
    collisionDetector.detectCollision();

    requestAnimationFrame(gameLoop);
  });

});
