var game;
var background;
var middleground;
var gameWidth = 288;
var gameHeight = 192;
var hurtFlag = false;
var hurtTimer;
var frogTimer;
var frogJumpSide = 'left';

var character = 'link';
var jumpCounter = 0;
var maxJump = 2;
var pacmanAbility = 0;

var scoreString = '';
var scoreText;
var score = 0;

var livesString = '';
var livesText;
var lives = 3;

var player = {
	create: function () {

        this.createPlayer(7, 12);


        this.bindKeys();
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        scoreString = 'Score : ';
        scoreText = game.add.text(25, 10, scoreString + score, { font: '10px Arial', fill: '#fff' });
        scoreText.fixedToCamera = true;
        scoreText.anchor.setTo(0.5, 0.5);

        livesString = 'Lives : ';
        livesText = game.add.text(gameWidth-25, 10, livesString + lives, { font: '10px Arial', fill: '#fff' });
        livesText.fixedToCamera = true;
        livesText.anchor.setTo(0.5, 0.5);

        this.leftButton = game.add.button(gameWidth/2, gameHeight/2, 'button', this.useButtons, this, 2, 1, 0);
        this.leftButton.anchor.set(0.5);
        this.leftButton.scale.set(0.25);
        this.leftButton.inputEnabled = true;
        this.leftButton.fixedToCamera = true;
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

        if (hurtFlag) {
            this.player.animations.play('hurt');
            return;
        }

        if (this.wasd.jump.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y = -170;
        }


        var vel = 150;
        gyro.frequency = 0.5;
/*
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
        }*/


        gyro.startTracking(function(o) {
            if (!hurtFlag)
            {
                if (o.y < -1 || player.wasd.left.isDown)
                {
                    player.player.body.velocity.x = -vel;
                    player.player.scale.x = -1;
                }
                else if (o.y > 1 || player.wasd.right.isDown)
                {
                    player.player.body.velocity.x = vel;
                    player.player.scale.x = 1;
                }
                else
                {
                    player.player.body.velocity.x = 0;
                }
            }
        });


		if (this.player.body.velocity.x !=0)
		{
			this.player.animations.play('run');
		}
		else
		{
			this.player.animations.play('idle');
		}


        // jump animation
        if (this.player.body.velocity.y < 0) {
            this.player.animations.play('jump');
        } else if (this.player.body.velocity.y > 0) {
            this.player.animations.play('fall');
        }



        // reset jumpcounter
        if (this.player.body.onFloor())
        {
            jumpCounter = 0;
        }
    },

    useButtons: function () {
        if (game.input.pointer1.x < game.width/2)
        {
            this.action();
        }
        else if (game.input.pointer1.x > game.width/2)
        {
            this.switchPlayer();
        }
    },

    pacmanReset : function () {
        pacmanAbility = !pacmanAbility;
    },

    action: function () {
        switch (character) {
            case 'link':
                this.player.animations.play('block');
                break;
            case 'mario':
                if (jumpCounter < maxJump)
                {
					this.player.body.velocity.y = -160;
					jumpCounter++;
                }
                break;
            case 'pacman':
                this.pacmanReset();
                game.time.events.add = (Phaser.Timer.SECOND*5, this.pacmanReset);
                break;

        }
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

    switchPlayer: function () {
        switch(character) {
		    case 'link':
				this.createItemFeedback(this.player.x, this.player.y);
                this.player.anchor.setTo(0.5);
                game.physics.arcade.enable(this.player);
                this.player.body.gravity.y = 500;
                this.player.body.setSize(10, 24, 10, 0);
                //add animations
                var animVel = 15;
                this.player.animations.add('idle', ['player-1/idle'], 1, false);
                this.player.animations.add('run', Phaser.Animation.generateFrameNames('player-1/run-', 1, 4, '', 0), animVel, true);
                this.player.animations.add('jump', ['player-1/jump-1'], 1, false);

                this.player.animations.add('hurt', Phaser.Animation.generateFrameNames('player-1/hurt-', 1, 2, '', 0), animVel, true);
                this.player.animations.play('idle');
                character = 'mario';
		        break;

		    case 'mario':
				this.createItemFeedback(this.player.x, this.player.y);
                this.player.anchor.setTo(0.5);
                game.physics.arcade.enable(this.player);
                this.player.body.gravity.y = 500;
                this.player.body.setSize(15, 15, 0, 0);
                //add animations
                var animVel = 15;
                this.player.animations.add('idle', Phaser.Animation.generateFrameNames('player-2/run-', 1, 4, '', 0), animVel, true);
                this.player.animations.add('run', Phaser.Animation.generateFrameNames('player-2/run-', 1, 2, '', 0), 10, true);
                this.player.animations.add('jump', Phaser.Animation.generateFrameNames('player-2/run-', 1, 4, '', 0), animVel, true);
                this.player.animations.add('hurt', Phaser.Animation.generateFrameNames('player-2/hurt-', 1, 4, '', 0), animVel, true);
                this.player.animations.play('idle');

                character = 'pacman';
             	break;

    		case 'pacman':
				this.createItemFeedback(this.player.x, this.player.y);
                this.player.anchor.setTo(0.5);
                game.physics.arcade.enable(this.player);
                this.player.body.gravity.y = 500;
                this.player.body.setSize(18, 18, 0, 0);
                //add animations
                var animVel = 15;
                this.player.animations.add('idle', ['player-3/run-1'], 1, false);
                this.player.animations.add('run', Phaser.Animation.generateFrameNames('player-3/run-', 1, 2, '', 0), 10, true);
                this.player.animations.add('hurt', Phaser.Animation.generateFrameNames('player-3/hurt-', 1, 2, '', 0), animVel, true);
                this.player.animations.add('jump', ['player-3/run-2'], 1, false);
                this.player.animations.add('block', Phaser.Animation.generateFrameNames('player-3/block-', 1, 2, '', 0), animVel, true);
                this.player.animations.play('idle');

                character = 'link';
		        break;
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
game.state.add('GameOver', gameOverScreen);


game.state.start("Boot");
