function Scoreboard() {
  this.leftSlimeScore = 0;
  this.rightSlimeScore = 0;
}

Scoreboard.prototype = {
  increaseLeftSlimeScore: function () {
    this.leftSlimeScore++;
  },

  increaseRightSlimeScore: function () {
    this.rightSlimeScore++;
  },

  draw: function(context) {
    context.fillText(this.leftSlimeScore + " - " + this.rightSlimeScore, context.canvas.width/2 - 10, 20);
  }
}

module.exports = Scoreboard;
