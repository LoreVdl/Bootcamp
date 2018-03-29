preload = {
    preload: function () {
        let loadingBar = this.add.sprite(game.width / 2, game.height / 2, 'loading');
        loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);
        // environment
        game.load.image('background', 'assets/environment/back.png');
        game.load.image('middleground', 'assets/environment/middle.png');

        game.load.image('enter', 'assets/sprites/tapTheScreen.png');
        game.load.image('credits', 'assets/sprites/credits-text.png');
        //tileSet
        game.load.image('tileset', 'assets/environment/tileset.png');
        game.load.tilemap('map', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
        // atlas sprites
        game.load.atlasJSONArray('atlas', 'assets/atlas/atlas.png', 'assets/atlas/atlas.json');
        game.load.atlasJSONArray('atlas-props', 'assets/atlas/atlas-props.png', 'assets/atlas/atlas-props.json');
        game.load.atlasJSONArray('ability', 'assets/sprites/ability.png', 'assets/sprites/ability.json');
        // arrow sprites
        game.load.atlasJSONArray('new-atlas', 'assets/atlas/new-atlas.png', 'assets/atlas/new-atlas.json');
        // characters sprites
        game.load.atlasJSONArray('characters', 'assets/characters/characters.png', 'assets/characters/characters.json');

		game.load.spritesheet("level_arrows", "assets/level_arrows.png", 48, 48);

        game.load.spritesheet('button', 'assets/buttons/button.png');
        game.load.spritesheet('action', 'assets/buttons/action.png');
        game.load.spritesheet('switch', 'assets/buttons/switch.png');

        game.load.image('heart', 'assets/sprites/heart.png');

        game.load.image('menu', 'assets/sprites/menu.png');
        game.load.image('gameOver', 'assets/sprites/GameOver.png');
        game.load.image('playAgain', 'assets/sprites/playAgain.png');
        game.load.image('youWin', 'assets/sprites/youWin.png');
        game.load.image('nextLevel', 'assets/sprites/nextLevel.png');


        game.load.image("level1", "assets/sprites/level1.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level2", "assets/sprites/level2.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level3", "assets/sprites/level3.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level4", "assets/sprites/level4.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level5", "assets/sprites/level5.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level6", "assets/sprites/level6.png", game.global.thumbWidth, game.global.thumbHeight);

        // sounds
        game.load.audio('Enemy_Die', 'assets/sound/Enemy_Die.mp3');
        game.load.audio('lever', 'assets/sound/lever.wav');
        game.load.audio('Mario_Jump', 'assets/sound/Mario_Jump.wav');
        game.load.audio('Pacman_Ability', 'assets/sound/Pacman_Ability.wav');
        game.load.audio('Pacman_Run', 'assets/sound/Pacman_Run.wav');
        game.load.audio('pickup', 'assets/sound/pickup.wav');
        game.load.audio('Winning_Sound', 'assets/sound/Winning_Sound.wav');
        game.load.audio('Zelda_Block', 'assets/sound/Zelda_Block.wav');
        game.load.audio('Mario_Death', 'assets/sound/Mario_Death.mp3');
        game.load.audio('Link_Death', 'assets/sound/Link_Death.mp3');
        game.load.audio('Pacman_Death', 'assets/sound/Pacman_Death.mp3');
    },
    create: function () {
        this.game.state.start('TitleScreen');
    }
};
