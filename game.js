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


var player = {
	create: function () {

        this.createPlayer(54, 9);


        this.bindKeys();
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);


        // create buttons
        this.jumpBtn = game.add.button(20, gameHeight-20, 'jump', this.jump, this, 2, 1, 0);
        this.jumpBtn.anchor.set(0.5);
        this.jumpBtn.scale.set(0.5);
        this.jumpBtn.inputEnabled = true;
        this.jumpBtn.fixedToCamera = true;

        this.actionBtn = game.add.button(gameWidth-20, gameHeight-20, 'action', this.action, this, 2, 1, 0);
        this.actionBtn.anchor.set(0.5);
        this.actionBtn.scale.set(0.5);
        this.actionBtn.inputEnabled = true;
        this.actionBtn.fixedToCamera = true;

        this.switchBtn = game.add.button(gameWidth-20, gameHeight-60, 'switch', this.switch, this, 2, 1, 0);
        this.switchBtn.anchor.set(0.5);
        this.switchBtn.scale.set(0.5);
        this.switchBtn.inputEnabled = true;
        this.switchBtn.fixedToCamera = true;
    },



    bindKeys: function () {
        this.wasd = {
            jump: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            crouch: game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        },
        game.input.keyboard.addKeyCapture(
            [Phaser.Keyboard.SPACEBAR,
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.DOWN]
        );
    },

    resetHurt: function () {
        hurtFlag = false;
    },

    createPlayer: function (x, y) {
        x *= 16;
        y *= 16;
        this.player = game.add.sprite(x, y, 'characters', 'player-3/run-1');
        this.player.anchor.setTo(0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;
        this.player.body.setSize(18, 18, 0, 0);
        //add animations
        var animVel = 15;
        this.player.animations.add('idle', ['player-3/run-1'], 1, false);
        this.player.animations.add('run', Phaser.Animation.generateFrameNames('player-3/run-', 1, 2, '', 0), 10, true);
        this.player.animations.add('hurt', Phaser.Animation.generateFrameNames('player-3/hurt-', 1, 2, '', 0), animVel, true);
        this.player.animations.play('idle');
        // timer
        hurtTimer = game.time.create(false);
        hurtTimer.loop(500, this.resetHurt, this);
    },

    movePlayer: function () {

		// reset jumpcounter
        if (this.player.body.onFloor())
        {
            jumpCounter = 0;
        }
        

        if (hurtFlag) {
            this.player.animations.play('hurt');
            return;
        }

        if (this.wasd.jump.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y = -170;
            jumpCounter++;
        }

        var vel = 150;

        if (this.wasd.left.isDown) {
            this.player.body.velocity.x = -vel;
            this.player.animations.play('run');
            this.player.scale.x = -1;
        } else if (this.wasd.right.isDown) {
            this.player.body.velocity.x = vel;
            this.player.animations.play('run');
            this.player.scale.x = 1;
        } else if (game.input.pointer1.isDown) {
            if (game.input.pointer1.x < game.width/2) {
                this.player.body.velocity.x = -vel;
                this.player.animations.play('run');
                this.player.scale.x = -1;
            } else if (game.input.pointer1.x > game.width/2) {
                this.player.body.velocity.x = vel;
                this.player.animations.play('run');
                this.player.scale.x = 1;
            } else {
                this.player.body.velocity.x = 0;
                this.player.animations.play('idle');
            }
        } else {
            this.player.body.velocity.x = 0;
            this.player.animations.play('idle');
        }



        // jump animation
        if (this.player.body.velocity.y < 0) {
            this.player.animations.play('jump');
        } else if (this.player.body.velocity.y > 0) {
            this.player.animations.play('fall');
        }
    },

    jump: function (sprite, pointer) {
        if (this.player.body.onFloor())
        {
            this.player.body.velocity.y = -170;
            jumpCounter++;
        }
    },

    action: function (sprite, pointer) {
        if (character == 'fox')
        {
            if (jumpCounter < maxJump)
            {
                this.player.body.velocity.y = -160;
                jumpCounter++;
            }
        }
        else if (character == 'mario')
        {
            if (this.player.body.onFloor())
            {
                this.player.body.velocity.y = -250;
            }
        }
        else if (character == 'pacman')
        {
            if (this.player.scale.x == -1)
            {
                this.player.body.velocity.x = -1000;
            }
            else if (this.player.scale.x == 1)
            {
                this.player.body.velocity.x = 1000;
            }
        }
    },

    switch: function (sprite, pointer) {
        if (character == 'fox')
        {
            character = 'mario';
            this.player.loadTexture('switch');
        }
        else if (character == 'mario')
        {
            character = 'pacman';
            this.player.loadTexture('jump');
        }
        else if (character == 'pacman')
        {
            jumpCounter = 0;
            character = 'fox';
            this.player.loadTexture('atlas');
        }
    }
}


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
