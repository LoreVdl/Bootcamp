level1 = {
    create: function () {
        this.createBackgrounds();

        this.createWorld();
        this.decorWorld();

        player.create();

        this.populateWorld();

		// music
        this.music = game.add.audio('music');
        this.music.loop = true;
        this.music.play();
    },

    decorWorld: function () {
        game.add.image(31 * 16, 4 * 16 + 3, 'atlas-props', 'tree');
        game.add.image(48 * 16, 3 * 16 + 5, 'atlas-props', 'house');
        game.add.image(10 * 16, 8 * 16 + 4, 'atlas-props', 'bush');
        game.add.image(11 * 16, 19 * 16 - 4, 'atlas-props', 'sign');
        game.add.image(15 * 16, 19 * 16 + 6, 'atlas-props', 'skulls');
        game.add.image(23 * 16, 19 * 16, 'atlas-props', 'face-block');
        game.add.image(28 * 16, 20 * 16, 'atlas-props', 'shrooms');
    },

    populateWorld: function () {
        // groups
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        //
        this.items = game.add.group();
        this.items.enableBody = true;

        //timer for frog jumps
        frogTimer = game.time.create(false);
        frogTimer.loop(2000, this.switchFrogJump, this);
        frogTimer.start();

        // create items
        this.createCherry(30, 5);
        this.createCherry(31, 5);
        this.createCherry(32, 5);
        //
        this.createCherry(23, 17);
        this.createCherry(24, 17);
        this.createCherry(25, 17);
        //
        this.createGem(3, 6);
        this.createGem(4, 6);
        this.createGem(5, 6);
        //
        this.createGem(44, 12);
        this.createGem(42, 13);
        this.createGem(42, 16);

        // create enemies

        this.createFrog(15, 9);
        this.createFrog(30, 20);
        this.createEagle(33, 6);
        this.createEagle(6, 7);
        this.createOpossum(42, 9);
        this.createOpossum(23, 20);
    },

    switchFrogJump: function () {
        frogJumpSide = (frogJumpSide == 'left') ? 'right' : 'left';
    },

    createBackgrounds: function () {
        this.background = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
        this.middleground = game.add.tileSprite(0, 80, gameWidth, gameHeight, 'middleground');
        this.background.fixedToCamera = true;
        this.middleground.fixedToCamera = true;
    },

    createWorld: function () {
        // tilemap
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        // which tiles collide
        this.map.setCollision([27, 29, 31, 33, 35, 37, 77, 81, 86, 87, 127, 129, 131, 133, 134, 135, 83, 84, 502, 504, 505, 529, 530, 333, 335, 337, 339, 366, 368, 262, 191, 193, 195, 241, 245, 291, 293, 295,]);
        // set some tiles one way collision
        this.setTopCollisionTiles(35);
        this.setTopCollisionTiles(36);
        this.setTopCollisionTiles(84);
        this.setTopCollisionTiles(86);
        this.setTopCollisionTiles(134);
        this.setTopCollisionTiles(135);
        this.setTopCollisionTiles(366);
        this.setTopCollisionTiles(367);
        this.setTopCollisionTiles(368);
        this.setTopCollisionTiles(262);
    },

    setTopCollisionTiles: function (tileIndex) {
        var x, y, tile;
        for (x = 0; x < this.map.width; x++) {
            for (y = 1; y < this.map.height; y++) {
                tile = this.map.getTile(x, y);
                if (tile !== null) {
                    if (tile.index == tileIndex) {
                        tile.setCollision(false, false, true, false);
                    }

                }
            }
        }
    },

    createEnemyDeath: function (x, y) {
        this.enemyDeath = game.add.sprite(x, y, 'atlas');
        this.enemyDeath.anchor.setTo(0.5);
        this.animDeath = this.enemyDeath.animations.add('dead', Phaser.Animation.generateFrameNames('enemy-death/enemy-death-', 1, 6, '', 0), 16, false);
        this.enemyDeath.animations.play('dead');
        this.animDeath.onComplete.add(function () {
            this.enemyDeath.kill();
        }, this);
    },

    createItemFeedback: function (x, y) {
        var itemFeedback = game.add.sprite(x, y, 'atlas');
        itemFeedback.anchor.setTo(0.5);
        var animFeedback = itemFeedback.animations.add('feedback', Phaser.Animation.generateFrameNames('item-feedback/item-feedback-', 1, 4, '', 0), 16, false);
        itemFeedback.animations.play('feedback');
        animFeedback.onComplete.add(function () {
            itemFeedback.kill();
        }, this);
    },

    createOpossum: function (x, y) {
        x *= 16;
        y *= 16;
        var temp = game.add.sprite(x, y, 'atlas', 'opossum/opossum-1');
        temp.anchor.setTo(0.5);
        game.physics.arcade.enable(temp);
        temp.body.gravity.y = 500;
        temp.body.setSize(16, 13, 8, 15);
        //add animations
        temp.animations.add('run', Phaser.Animation.generateFrameNames('opossum/opossum-', 1, 6, '', 0), 12, true);
        temp.animations.play('run');
        temp.body.velocity.x = 60 * game.rnd.pick([1, -1]);
        temp.body.bounce.x = 1;
        temp.enemyType = 'opossum';

        this.enemies.add(temp);
    },

    createEagle: function (x, y) {
        x *= 16;
        y *= 16;
        var temp = game.add.sprite(x, y, 'atlas', 'eagle/eagle-attack-1');
        temp.anchor.setTo(0.5);
        game.physics.arcade.enable(temp);
        temp.body.setSize(16, 13, 8, 20);
        //add animations
        temp.animations.add('attack', Phaser.Animation.generateFrameNames('eagle/eagle-attack-', 1, 4, '', 0), 12, true);
        temp.animations.play('attack');
        // tweens
        var VTween = game.add.tween(temp).to({
            y: y + 50
        }, 1000, Phaser.Easing.Linear.None, true, 0, -1);
        VTween.yoyo(true);
        temp.enemyType = 'eagle';

        this.enemies.add(temp);
    },

    createFrog: function (x, y) {
        x *= 16;
        y *= 16;
        var temp = game.add.sprite(x, y, 'atlas', 'frog/idle/frog-idle-1');
        temp.anchor.setTo(0.5);
        game.physics.arcade.enable(temp);
        temp.body.gravity.y = 500;
        temp.body.setSize(16, 16, 8, 11);
        //add animations
        temp.animations.add('idle', Phaser.Animation.generateFrameNames('frog/idle/frog-idle-', 1, 4, '', 0), 6, true);
        temp.animations.add('jump', ['frog/jump/frog-jump-1'], 6, false);
        temp.animations.add('fall', ['frog/jump/frog-jump-2'], 6, false);
        temp.animations.play('idle');
        temp.enemyType = 'frog';
        temp.side = 'right';

        this.enemies.add(temp);
    },

    createCherry: function (x, y) {
        x *= 16;
        y *= 16;
        var temp = game.add.sprite(x, y, 'atlas', 'cherry/cherry-1');
        temp.anchor.setTo(0.5);
        game.physics.arcade.enable(temp);
        //add animations
        temp.animations.add('idle', Phaser.Animation.generateFrameNames('cherry/cherry-', 1, 7, '', 0), 12, true);
        temp.animations.play('idle');

        this.items.add(temp);
    },

    createGem: function (x, y) {
        x *= 16;
        y *= 16;
        var temp = game.add.sprite(x, y, 'atlas', 'gem/gem-1');
        temp.anchor.setTo(0.5);
        game.physics.arcade.enable(temp);
        //add animations
        temp.animations.add('idle', Phaser.Animation.generateFrameNames('gem/gem-', 1, 5, '', 0), 12, true);
        temp.animations.play('idle');

        this.items.add(temp);
    },

    update: function () {
        //this.debugGame();
        game.physics.arcade.collide(player.player, this.layer);
        game.physics.arcade.collide(this.enemies, this.layer);
        game.physics.arcade.overlap(player.player, this.enemies, this.checkAgainstEnemies, null, this);
        game.physics.arcade.overlap(player.player, this.items, this.pickItem, null, this);

        player.movePlayer();

        this.enemiesManager();
        this.parallaxBackground();

    },

    pickItem: function (player, item) {
        this.createItemFeedback(item.x, item.y);
        item.kill();
    },

    enemiesManager: function () {
        for (var i = 0, len = this.enemies.children.length; i < len; i++) {

            var tempEnemy = this.enemies.children[i];

            // opossum
            if (tempEnemy.enemyType == 'opossum') {
                if (tempEnemy.body.velocity.x < 0) {
                    tempEnemy.scale.x = 1;
                } else {
                    tempEnemy.scale.x = -1;
                }
            }

            // eagle
            if (tempEnemy.enemyType == 'eagle') {
                if (tempEnemy.x > player.player.x) {
                    tempEnemy.scale.x = 1;
                } else {
                    tempEnemy.scale.x = -1;
                }
            }

            // frog
            if (tempEnemy.enemyType == 'frog') {
                if (tempEnemy.side == 'left' && frogJumpSide == 'right') {
                    tempEnemy.scale.x = 1;
                    tempEnemy.side = 'right';
                    tempEnemy.body.velocity.y = -200;
                    tempEnemy.body.velocity.x = -100;
                } else if (tempEnemy.side == 'right' && frogJumpSide == 'left') {
                    tempEnemy.scale.x = -1;
                    tempEnemy.side = 'left';
                    tempEnemy.body.velocity.y = -200;
                    tempEnemy.body.velocity.x = 100;
                } else if (tempEnemy.body.onFloor()) {
                    tempEnemy.body.velocity.x = 0;
                }
                // animations
                if (tempEnemy.body.velocity.y < 0) {
                    tempEnemy.animations.play('jump');
                } else if (tempEnemy.body.velocity.y > 0) {
                    tempEnemy.animations.play('fall');
                } else {
                    tempEnemy.animations.play('idle');
                }

            }

        }
    },

    checkAgainstEnemies: function (player, enemy) {

        if ((player.y + player.body.height * .5 < enemy.y ) && player.body.velocity.y > 0) {

            this.createEnemyDeath(enemy.x, enemy.y);
            enemy.kill();
            player.body.velocity.y = -200;
        } else {
            this.hurtPlayer();
        }

    },

    hurtPlayer: function () {
        if (hurtFlag) {
            return;
        }
        hurtFlag = true;
        hurtTimer.start();
        player.player.body.velocity.y = -100;

        player.player.body.velocity.x = (player.player.scale.x == 1) ? -100 : 100;
    },

    parallaxBackground: function () {
        this.background.tilePosition.x = this.layer.x * -0.1;
        this.middleground.tilePosition.x = this.layer.x * -0.5;
    },
    debugGame: function () {
        //game.debug.spriteInfo(this.player, 30, 30);
        //game.debug.body(this.enemies);
        game.debug.body(this.player);

        this.enemies.forEachAlive(this.renderGroup, this);
        this.items.forEachAlive(this.renderGroup, this);

    },
    renderGroup: function (member) {
        game.debug.body(member);
    },

}
