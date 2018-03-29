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

        player.resetHurt();
    },

    restart: function () {
          game.paused = false;
          this.game.state.start('Level1');

      },

      menu: function() {
        game.paused = false;
        this.game.state.start('TitleScreen');
      },

    gameOver: function() {
      if (lives == 0) {
        Pacman_Run.stop();
        game.paused = true;

        player.button.inputEnabled = false;
        lives = 3;

        this.button2 = game.add.button(100, 30, 'action', this.restart, this, 2, 1, 0);
        this.button2.anchor.set(0.5);
        this.button2.scale.set(0.25);
        this.button2.inputEnabled = true;
        this.button2.fixedToCamera = true;

        this.button3 = game.add.button(200, 30, 'switch', this.menu, this, 2, 1, 0);
        this.button3.anchor.set(0.5);
        this.button3.scale.set(0.25);
        this.button3.inputEnabled = true;
        this.button3.fixedToCamera = true;
      }
    },

    decorWorld: function () {
        game.add.image(42 * 16, 7 * 16 + 3, 'atlas-props', 'tree');
        game.add.image(7 * 16, 6 * 16 + 5, 'atlas-props', 'house');
        game.add.image(41 * 16, 11 * 16 + 4, 'atlas-props', 'bush');
        game.add.image(25 * 16, 21 * 16 + 6, 'atlas-props', 'skulls');
        game.add.image(44 * 16, 21 * 16 + 6, 'atlas-props', 'skulls');
        game.add.image(16 * 16, 21 * 16, 'atlas-props', 'shrooms');
    },

    populateWorld: function () {
        // groups
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        //
        this.items = game.add.group();
        this.items.enableBody = true;

        this.lives = game.add.group();
        this.lives.enableBody = true;

        this.ends = game.add.group();
        this.ends.enableBody = true;

        this.arrows = game.add.group();
        this.arrows.enableBody = true;

        this.obstacles = game.add.group();
        this.obstacles.enableBody = true;

        this.obstaclesBig = game.add.group();
        this.obstaclesBig.enableBody = true;

        this.cranks = game.add.group();
        this.cranks.enableBody = true;

        //timer for frog jumps
        frogTimer = game.time.create(false);
        frogTimer.loop(2000, this.switchFrogJump, this);
        frogTimer.start();
/*
        arrowTimer1 = game.time.create(false);
        arrowTimer1.loop(2000, this.createArrow, this, 49, 21.5, -1);
        arrowTimer1.start();
*/
        arrowTimer2 = game.time.create(false);
        arrowTimer2.loop(3000, this.createArrow, this, 50, 20.5, -1);
        arrowTimer2.start();

        // create items
        this.createEnd(50, 12);

        this.createHendel(21, 5);
        this.createHendel(53, 21);

        this.createObstacle(33, 21);

        this.createObstacleBig(38, 11);
        this.createObstacleBig(38, 9);
        this.createObstacleBig(38, 7);
        this.createObstacleBig(38, 5);

        this.createCherry(28, 5);
        this.createCherry(29, 5);
        this.createCherry(30, 5);

        //
        this.createGem(28, 21);
        this.createGem(37, 20);
        this.createGem(38, 20);
        this.createGem(39, 20);


        // create enemies

        this.createFrog(31, 12);
        this.createFrog(44, 12);
        this.createEagle(16, 9);
        this.createOpossum(44, 21);
        this.createOpossum(25, 21);
        this.createGhost(20, 21);
    },

    createArrow: function (x, y, scale) {
        x *= 16;
        y *= 16;
        var temp = game.add.sprite(x, y, 'new-atlas' , 'arrow-1');
        temp.anchor.setTo(0.5);
        temp.scale.setTo(scale);
        game.physics.arcade.enable(temp);
        //add animations
        temp.animations.add('fly', Phaser.Animation.generateFrameNames('arrow-', 1, 3, '', 0), 1, true);
        temp.animations.play('fly');
        temp.body.velocity.x = 100 * scale;

        this.arrows.add(temp);
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
        this.map.setCollision([27, 29, 31, 33, 35, 37, 77, 81, 86, 87, 127, 129, 131, 133, 134, 135, 83, 84, 502, 504, 505, 529, 530, 333, 335, 337, 339, 366, 368, 262, 191, 193, 195, 241, 245, 247, 249, 291, 293, 295,]);
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
        this.setTopCollisionTiles(370);
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

        game.sound.play('Enemy_Die');

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

    createEnd: function (x, y) {
      x *= 16;
      y *= 16;
      var temp = game.add.sprite(x, y, 'atlas-props', 'sign');
      temp.anchor.setTo(0.8);
      game.physics.arcade.enable(temp);
      temp.body.gravity.y = 500;

      this.ends.add(temp);
    },

    createHendel: function (x, y) {
      x *= 16;
      y *= 16;
      var temp = game.add.sprite(x, y, 'atlas-props', 'crank-down');
      temp.anchor.setTo(0);
      game.physics.arcade.enable(temp);
      temp.body.gravity.y = 500;
      temp.body.moves = false;

      this.cranks.add(temp);
    },

    createHendelUp: function (x, y) {
      x *= 16;
      y *= 16;
      var temp = game.add.sprite(x, y, 'atlas-props', 'crank-up');
      temp.anchor.setTo(0);
      game.physics.arcade.enable(temp);
      temp.body.gravity.y = 500;
      temp.body.moves = false;

      game.sound.play('lever');

      this.cranks.add(temp);
    },

    createObstacle: function (x, y) {
      x *= 16;
      y *= 16;
      var temp = game.add.sprite(x, y, 'atlas-props', 'crate');
      temp.anchor.setTo(0);
      game.physics.arcade.enable(temp);
      temp.body.moves = false;

      this.obstacles.add(temp);
    },

    createObstacleBig: function (x, y) {
      x *= 16;
      y *= 16;
      var temp = game.add.sprite(x, y, 'atlas-props', 'block-big');
      temp.anchor.setTo(0);
      game.physics.arcade.enable(temp);
      temp.body.moves = false;
      temp.body.setSize(35, 35);
      this.obstacles.add(temp);
    },

    createOpossum: function (x, y) {
        x *= 16;
        y *= 16;
        var temp = game.add.sprite(x, y, 'atlas', 'opossum/opossum-1');
        temp.anchor.setTo(0.8);
        game.physics.arcade.enable(temp);
        temp.body.gravity.y = 500;
        temp.body.setSize(16, 18, 8, 9);
        //add animations
        temp.animations.add('run', Phaser.Animation.generateFrameNames('opossum/opossum-', 1, 6, '', 0), 12, true);
        temp.animations.play('run');
        temp.body.velocity.x = 60 * game.rnd.pick([1, -1]);
        temp.body.bounce.x = 1;
        temp.enemyType = 'opossum';

        this.enemies.add(temp);
    },

    createGhost: function (x, y) {
        x *= 16;
        y *= 16;
        var temp = game.add.sprite(x, y, 'characters', 'ghost/run-1');
        temp.anchor.setTo(0.5);
        game.physics.arcade.enable(temp);
        temp.body.gravity.y = 500;
        temp.body.setSize(16, 18, 0, 0);
        //add animations
        temp.animations.add('run', Phaser.Animation.generateFrameNames('ghost/run-', 1, 2, '', 0), 5, true);
        temp.animations.add('ability', Phaser.Animation.generateFrameNames('ghost/ability-', 1, 2, '', 0), 5, true);
        temp.animations.play('ability');
        temp.body.velocity.x = 60 * game.rnd.pick([1, -1]);
        temp.body.bounce.x = 1;
        temp.enemyType = 'ghost';
        ghosts.push(temp);
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

        this.lives.add(temp);
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
        game.physics.arcade.collide(this.ends, this.layer);
        game.physics.arcade.collide(this.obstacles, this.layer);
        game.physics.arcade.collide(this.cranks, this.layer);
        game.physics.arcade.collide(player.player, this.obstacles);
        game.physics.arcade.collide(this.enemies, this.obstacles);
        game.physics.arcade.collide(this.enemies, this.obstaclesBig);
        game.physics.arcade.collide(player.player, this.obstaclesBig);
        game.physics.arcade.overlap(player.player, this.enemies, this.checkAgainstEnemies, null, this);
        game.physics.arcade.overlap(player.player, this.items, this.pickItem, null, this);
        game.physics.arcade.overlap(player.player, this.lives, this.pickLives, null, this);
        game.physics.arcade.overlap(this.ends, player.player, this.endGame, null, this);
        game.physics.arcade.collide(player.player, this.cranks.children[0], this.destroyBlock, null, this);
        game.physics.arcade.collide(player.player, this.cranks.children[1], this.destroyBlockBig, null, this);
        game.physics.arcade.collide(this.arrows, this.layer, this.arrowHitWorld, null, this);
        game.physics.arcade.overlap(player.player, this.arrows, this.arrowHitPlayer, null, this);

        player.movePlayer();

        this.enemiesManager();
        this.parallaxBackground();

        this.gameOver();
    },

    arrowHitWorld: function (arrow) {
        arrow.kill();
    },

    arrowHitPlayer: function (player, arrow) {
        if (character == 'link' && linkAbility && hurtFlag == false) {

            if (((player.x + player.body.width * 0.5 > arrow.x) && player.scale.x == -1) || ((player.x + player.body.width * 0.5 < arrow.x) && player.scale.x == 1)) {

                arrow.kill()
            } else {
                arrow.kill();
                this.hurtPlayer();
            }
        } else {
            arrow.kill();
            this.hurtPlayer();
        }
    },

    destroyBlock: function (player, item) {
      this.createItemFeedback(item.x, item.y);
      item.kill();
      this.createHendelUp(21, 5);
      item = this.obstacles.children[0]
      this.createItemFeedback(item.x, item.y);
      item.kill();
    },

    destroyBlockBig: function (player, item) {
      this.createItemFeedback(item.x, item.y);
      item.kill();
      this.createHendelUp(53, 21);
      for (var i = 0; i < 5; i++) {
        item = this.obstacles.children[i];
        this.createItemFeedback(item.x, item.y);
        item.kill();
      }
    },

    endGame: function () {
        game.sound.play('Winning_Sound')
        game.paused = true;

        player.button.inputEnabled = false;
        lives = 3;

        this.button2 = game.add.button(100, 30, 'action', this.nextLevel, this, 2, 1, 0);
        this.button2.anchor.set(0.5);
        this.button2.scale.set(0.25);
        this.button2.inputEnabled = true;
        this.button2.fixedToCamera = true;

        this.button3 = game.add.button(200, 30, 'switch', this.menu, this, 2, 1, 0);
        this.button3.anchor.set(0.5);
        this.button3.scale.set(0.25);
        this.button3.inputEnabled = true;
        this.button3.fixedToCamera = true;
    },

    nextLevel: function() {
      game.paused = false;
      this.game.state.start('level1.js');
    },

    pickItem: function (player, item) {
        this.createItemFeedback(item.x, item.y);
        item.kill();
        score += 10;
        scoreText.text = scoreString + score;

        game.sound.play('pickup');
    },

    pickLives: function (player, item) {
        this.createItemFeedback(item.x, item.y);
        item.kill();
        lives += 1;
        livesText.text = livesString + lives;

        game.sound.play('pickup');
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

            // ghost
            if (tempEnemy.enemyType === 'ghost') {
                if (tempEnemy.body.velocity.x > 0) {
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

        if(pacmanAbility && character==="pacman" && enemy.enemyType==="ghost" ) {
            //Able to kill ghost
            this.createEnemyDeath(enemy.x, enemy.y);
            enemy.kill();
        }
        else if ((player.y + player.body.height * .5 < enemy.y ) && player.body.velocity.y > 0 && enemy.enemyType!=="ghost") {

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

        lives -= 1;
        livesText.text = livesString + lives;
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
