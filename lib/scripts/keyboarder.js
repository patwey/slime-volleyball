function Keyboarder (slime, leftKeyCode, rightKeyCode, jumpKeyCode) {
  this.leftKeyCode  = leftKeyCode;
  this.rightKeyCode = rightKeyCode;
  this.jumpKeyCode  = jumpKeyCode;

  this.isLeftKeyPressed  = false;
  this.isRightKeyPressed = false;
  this.isJumpKeyPressed  = false;

  createKeyEventListeners(this);
}

function createKeyEventListeners (keyboarder) {
  window.addEventListener("keydown", onKeyDown.bind(keyboarder), false);
  window.addEventListener("keyup", onKeyUp.bind(keyboarder), false);
}

function onKeyDown (e) {
  var keyPressed = e.code;

  switch (keyPressed) {
    case this.leftKeyCode:
      this.isLeftKeyPressed = true;
      break;
    case this.rightKeyCode:
      this.isRightKeyPressed = true;
      break;
    case this.jumpKeyCode:
      this.isJumpKeyPressed = true;
      break;
  }
}

function onKeyUp (e) {
  var keyReleased = e.code;

  switch (keyReleased) {
    case this.leftKeyCode:
      this.isLeftKeyPressed = false;
      break;
    case this.rightKeyCode:
      this.isRightKeyPressed = false;
      break;
    case this.jumpKeyCode:
      this.isJumpKeyPressed = false;
      break;
  }
}

module.exports = Keyboarder;
