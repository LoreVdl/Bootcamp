let pages;
let levelThumbsGroup;
let currentPage;

levelSelect = {
  create: function() {
    background = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
    middleground = game.add.tileSprite(0, 80, gameWidth, gameHeight, 'middleground');

    pages = game.global.starsArray.length/(game.global.thumbRows*game.global.thumbCols);
  	currentPage = Math.floor(game.global.level/(game.global.thumbRows*game.global.thumbCols));

  	levelThumbsGroup = game.add.group();

  	const levelLength = game.global.thumbWidth*game.global.thumbCols+game.global.thumbSpacing*(game.global.thumbCols-1);
  	const levelHeight = game.global.thumbWidth*game.global.thumbRows+game.global.thumbSpacing*(game.global.thumbRows-1);

  	for(let l = 0; l < pages; l++) {

  	   const offsetX = (game.width-levelLength)/2+game.width*l;
       const offsetY = 20;
       let level = 1;

  		 for(let i = 0; i < game.global.thumbRows; i ++) {
         for(let j = 0; j < game.global.thumbCols; j ++) {
           let levelNumber = i*game.global.thumbCols+j+l*(game.global.thumbRows*game.global.thumbCols);
           let levelThumb = game.add.button(offsetX+j*(game.global.thumbWidth+game.global.thumbSpacing), offsetY+i*(game.global.thumbHeight+game.global.thumbSpacing), "level"+(level), this.thumbClicked, this);

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

      if(button.levelNumber === 2) {
          game.global.level = button.levelNumber;
          game.state.start("Level1");
      }
      if(button.levelNumber === 3) {
          game.global.level = button.levelNumber;
          game.state.start("Level2");
      }
      if(button.levelNumber === 1) {
          game.global.level = button.levelNumber;
          game.state.start("Level2");
      }
  },

  update: function () {
        background.tilePosition.x -= .3;
        middleground.tilePosition.x -= .6;

    }
};
