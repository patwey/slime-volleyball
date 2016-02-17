function Scoreboard(canvas) {
  this.leftSlimeScore = 0;
  this.rightSlimeScore = 0;
  this.canvas = canvas;

  this.rightSlimeWinsEvent = new Event("rightSlimeWins");
  this.leftSlimeWinsEvent  = new Event("leftSlimeWins");

  this.createEventListeners();
}

Scoreboard.prototype = {
  createEventListeners: function () {
    this.canvas.addEventListener("ballHitLeftSideOfFloor", function(e) { this.increaseRightSlimeScore(e); }.bind(this), false);
    this.canvas.addEventListener("ballHitRightSideOfFloor", function(e) { this.increaseLeftSlimeScore(e); }.bind(this), false);
  },

  increaseLeftSlimeScore: function () {
    this.leftSlimeScore++;
    this.emitGameOverEventIfWinner(this.leftSlimeScore, this.leftSlimeWinsEvent);
  },

  increaseRightSlimeScore: function () {
    this.rightSlimeScore++;
    this.emitGameOverEventIfWinner(this.rightSlimeScore, this.rightSlimeWinsEvent);
  },

  emitGameOverEventIfWinner: function (score, event) {
    if (this.isWinner(score)) { this.emitGameOverEvent(event); }
  },

  isWinner: function (score) {
    return score == 7;
  },

  emitGameOverEvent: function (event) {
    this.canvas.dispatchEvent(event);
  },

  draw: function (context) {
    context.font = "18px sans-serif";
    context.textAlign = "center";
    context.fillStyle = "lightgrey";
    context.fillText(this.leftSlimeScore + " - " + this.rightSlimeScore, context.canvas.width/2, 30);
  }
};

module.exports = Scoreboard;
