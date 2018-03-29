preload = {
    preload: function () {
        var loadingBar = this.add.sprite(game.width / 2, game.height / 2, 'loading');
        loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);
        // environment
        game.load.image('background', 'assets/environment/back.png');
        game.load.image('middleground', 'assets/environment/middle.png');

        game.load.image('enter', 'assets/sprites/tapTheScreen.png');
        game.load.image('credits', 'assets/sprites/credits-text.png');
        //tileset
        game.load.image('tileset', 'assets/environment/tileset.png');
        game.load.tilemap('map', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
        // atlas sprites
        game.load.atlasJSONArray('atlas', 'assets/atlas/atlas.png', 'assets/atlas/atlas.json');
        game.load.atlasJSONArray('atlas-props', 'assets/atlas/atlas-props.png', 'assets/atlas/atlas-props.json');
        // arrow sprites
        game.load.atlasJSONArray('new-atlas', 'assets/atlas/new-atlas.png', 'assets/atlas/new-atlas.json');
        // characters sprites
        game.load.atlasJSONArray('characters', 'assets/characters/characters.png', 'assets/characters/characters.json');

		game.load.spritesheet("level_arrows", "assets/level_arrows.png", 48, 48);

        game.load.spritesheet('button', 'assets/buttons/button.png');


        game.load.image("level1", "assets/sprites/Level1.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level2", "assets/sprites/Level2.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level3", "assets/sprites/Level3.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level4", "assets/sprites/Level4.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level5", "assets/sprites/Level5.png", game.global.thumbWidth, game.global.thumbHeight);
        game.load.image("level6", "assets/sprites/Level6.png", game.global.thumbWidth, game.global.thumbHeight);

        // sounds
        game.load.audio('Enemy_Die', 'assets/sound/Enemy_Die.mp3');
        game.load.audio('lever', 'assets/sound/lever.mp3');
        game.load.audio('Mario_Jump', 'assets/sound/Mario_Jump.mp3');
        game.load.audio('Pacman_Run', 'assets/sound/Pacman_Run.mp3');
        game.load.audio('pickup', 'assets/sound/pickup.mp3');
        game.load.audio('Winning_Sound', 'assets/sound/Winning_Sound.mp3');
        game.load.audio('Zelda_Block', 'assets/sound/Zelda_Block.mp3');
    },
    create: function () {
        this.game.state.start('TitleScreen');
    }
}
