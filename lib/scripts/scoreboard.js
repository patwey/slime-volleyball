function Scoreboard(canvas) {
  this.leftSlimeScore = 0;
  this.rightSlimeScore = 0;
  this.canvas = canvas;

  this.createEventListeners(canvas);
}

Scoreboard.prototype = {
  createEventListeners: function (canvas) {
    canvas.addEventListener("ballHitLeftSideOfFloor", function(e) { this.increaseRightSlimeScore(e); }.bind(this), false);
    canvas.addEventListener("ballHitRightSideOfFloor", function(e) { this.increaseLeftSlimeScore(e); }.bind(this), false);
  },

  increaseLeftSlimeScore: function () {
    this.leftSlimeScore++;
  },

  increaseRightSlimeScore: function () {
    this.rightSlimeScore++;
  },

  draw: function (context) {
    context.fillText(this.leftSlimeScore + " - " + this.rightSlimeScore, context.canvas.width/2 - 10, 20);
  }
}

module.exports = Scoreboard;
