var pages;
var levelThumbsGroup;
var currentPage;
var leftArrow;
var rightArrow;

levelSelect = {
  create: function() {
    background = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
    middleground = game.add.tileSprite(0, 80, gameWidth, gameHeight, 'middleground');

    pages = game.global.starsArray.length/(game.global.thumbRows*game.global.thumbCols);
  	currentPage = Math.floor(game.global.level/(game.global.thumbRows*game.global.thumbCols));

  	levelThumbsGroup = game.add.group();

  	var levelLength = game.global.thumbWidth*game.global.thumbCols+game.global.thumbSpacing*(game.global.thumbCols-1);
  	var levelHeight = game.global.thumbWidth*game.global.thumbRows+game.global.thumbSpacing*(game.global.thumbRows-1);

  	for(var l = 0; l < pages; l++) {

  	   var offsetX = (game.width-levelLength)/2+game.width*l;
       var offsetY = 20;
       var level = 1;

  		 for(var i = 0; i < game.global.thumbRows; i ++) {
         for(var j = 0; j < game.global.thumbCols; j ++) {
           var levelNumber = i*game.global.thumbCols+j+l*(game.global.thumbRows*game.global.thumbCols);
           var levelThumb = game.add.button(offsetX+j*(game.global.thumbWidth+game.global.thumbSpacing), offsetY+i*(game.global.thumbHeight+game.global.thumbSpacing), "level"+(level), this.thumbClicked, this);

           levelThumb.frame=game.global.starsArray[levelNumber];
           levelThumb.levelNumber = levelNumber+1;
           levelThumbsGroup.add(levelThumb);

           level++;
         }
       }
     }

     levelThumbsGroup.x = currentPage * game.width * -1
 },

  thumbClicked:function(button) {

    if(button.levelNumber == 1) {
      game.global.level = button.levelNumber;
      game.state.start("Level1");
		}
	},

  update: function () {
        background.tilePosition.x -= .3;
        middleground.tilePosition.x -= .6;

    }
}
