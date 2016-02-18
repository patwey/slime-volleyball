function Scoreboard (canvas) {
  this.leftSlimeScore = 0;
  this.rightSlimeScore = 0;
  this.winningScore = 7;

  this.canvas = canvas;

  this.createEvents();
  this.createEventListeners();
}

Scoreboard.prototype = {
  createEvents: function () {
    this.rightSlimeWinsEvent = new Event("rightSlimeWins");
    this.leftSlimeWinsEvent  = new Event("leftSlimeWins");
  },

  createEventListeners: function () {
    this.canvas.addEventListener("ballHitLeftSideOfFloor", function (e) { this.increaseRightSlimeScore(e); }.bind(this), false);
    this.canvas.addEventListener("ballHitRightSideOfFloor", function (e) { this.increaseLeftSlimeScore(e); }.bind(this), false);
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
    return score == this.winningScore;
  },

  emitGameOverEvent: function (event) {
    this.canvas.dispatchEvent(event);
  },

  draw: function (context) {
    this.setScoreboardFont(context);
    this.drawScoreboard(context);
  },

  setScoreboardFont: function (context) {
    context.font = "18px sans-serif";
    context.textAlign = "center";
    context.fillStyle = "lightgrey";
  },

  drawScoreboard: function (context) {
    context.fillText(this.scoreboardDisplayFormat(), context.canvas.width/2, 30);
  },

  scoreboardDisplayFormat: function () {
    return this.leftSlimeScore + " - " + this.rightSlimeScore;
  }
};

module.exports = Scoreboard;
