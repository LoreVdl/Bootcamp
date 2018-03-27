var game;
var background;
var middleground;
var gameWidth = 288;
var gameHeight = 192;
var hurtFlag = false;
var hurtTimer;
var frogTimer;
var frogJumpSide = 'left';

var character = 'fox';
var jumpCounter = 0;
var maxJump = 2;


var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "");

game.global = {
  thumbRows: 2,
  thumbCols : 3,
  thumbWidth : 64,
  thumbHeight : 64,
  thumbSpacing : 8,
  starsArray : [0,4,4,4,4,4],
  level : 1
}

game.state.add('Boot', boot);
game.state.add('Preload', preload);
game.state.add('TitleScreen', titleScreen);
game.state.add('LevelSelect', levelSelect);
game.state.add('Level1', level1);

game.state.start("Boot");
