let background;
let middleground;
const gameWidth = 288;
const gameHeight = 192;
let hurtFlag = false;
let hurtTimer;
let frogTimer;
let frogJumpSide = 'left';
const animVel = 10;

let character = 'link';
let jumpCounter = 0;
const maxJump = 2;
let pacmanAbility = 0;
let linkAbility = 0;

let scoreString = '';
let scoreText;
let score = 0;
let ability = 0;
let abilityString = '';
let abilityText;
let lives = 3;
let abPoints = 5;
let ghosts = [];

let hearts = [];
let heartCounter = 10;
let abilityMeter;


let Pacman_Run;
let Pacman_Ability;


let player = {
	create: function () {
		
        this.createPlayer(7, 12);

        game.time.events.loop(Phaser.Timer.SECOND * 2, this.abUp);
        game.time.events.loop(Phaser.Timer.SECOND, this.abDown);

        abilityMeter = game.add.image(gameWidth/2,5, "");
        abilityMeter.anchor.setTo(0.5, 0);
        abilityMeter.loadTexture("ability", "ability-5", true);
        abilityMeter.fixedToCamera = true;

        this.bindKeys();
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        scoreString = 'Score : ';
        scoreText = game.add.text(25, 10, scoreString + score, { font: '10px Arial', fill: '#fff' });
        scoreText.fixedToCamera = true;
        scoreText.anchor.setTo(0.5, 0.5);

		for (i = 0; i < lives; i++) {
			hearts[i] = game.add.image(gameWidth-heartCounter, gameHeight-(gameHeight-10), "heart");
			hearts[i].fixedToCamera = true;
            hearts[i].anchor.setTo(0.5, 0.5);
			heartCounter += 10;
		}

        this.button = game.add.button(gameWidth/2, gameHeight/2, 'button', this.useButtons, this, 2, 1, 0);
        this.button.anchor.set(0.5);
        this.button.scale.set(0.25);
        this.button.inputEnabled = true;
        this.button.fixedToCamera = true;


        this.actionBtn = game.add.sprite(20, gameHeight-20, 'action');
        this.actionBtn.anchor.set(0.5);
        this.actionBtn.scale.set(0.5);
        this.actionBtn.inputEnabled = false;
        this.actionBtn.fixedToCamera = true;


        this.switchBtn = game.add.sprite(gameWidth-20, gameHeight-20, 'switch');
        this.switchBtn.anchor.set(0.5);
        this.switchBtn.scale.set(0.5);
        this.switchBtn.inputEnabled = false;
        this.switchBtn.fixedToCamera = true;


        Pacman_Run = game.add.audio('Pacman_Run', 0.6, true);
        Pacman_Ability = game.add.audio('Pacman_Ability', 1, false);

    },

    bindKeys: function () {
        this.wasd = {
            jump: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            crouch: game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        };
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
		game.physics.arcade.enable(this.player);
		this.switchPlayer();

        // timer
        hurtTimer = game.time.create(false);
        hurtTimer.loop(500, this.resetHurt, this);
    },

    abUp: function() {

          if (abPoints < 5 && ability == 0){
              abPoints++;
              abilityMeter.loadTexture("ability", "ability-" + abPoints, true);
          }
    },

    abDown: function() {

        if (abPoints > 0 && ability == 1) {
            abPoints--;
            abilityMeter.loadTexture("ability", "ability-" + abPoints, true);
        }
    },

    movePlayer: function () {

        ghosts.forEach(this.ghostAbility);

        if (abPoints <= 0) {
            ability = 0;
            pacmanAbility = 0;
            linkAbility = 0;
        }


        if (abPoints == 0) {
            Pacman_Ability.stop();
        }


        if (hurtFlag) {
            this.player.animations.play('hurt');
            return;
        }

        if (this.wasd.jump.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y = -170;
        }


        const vel = 150;
        gyro.frequency = 10;
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
            if (!hurtFlag) {
                if (game.device.android) {
                    if (o.y < -1 || player.wasd.left.isDown) {
                        player.player.body.velocity.x = -vel;
                        player.player.scale.x = -1;
                    } else if (o.y > 1 || player.wasd.right.isDown) {
                        player.player.body.velocity.x = vel;
                        player.player.scale.x = 1;
                    } else {
                        player.player.body.velocity.x = 0;
                    }
                } else {
                    if (o.y > 1 || player.wasd.left.isDown) {
                        player.player.body.velocity.x = -vel;
                        player.player.scale.x = -1;
                    } else if (o.y < -1 || player.wasd.right.isDown) {
                        player.player.body.velocity.x = vel;
                        player.player.scale.x = 1;
                    } else {
                        player.player.body.velocity.x = 0;
                    }
                }

            }
        });


		if (this.player.body.velocity.x)
		{
		    if  (character === 'link' && linkAbility) {
		        this.player.animations.play('block');
            }
            else {
                this.player.animations.play('run');
            }
		}
		else
		{
		    if  (character === 'link' && linkAbility) {
                this.player.animations.play('idle_block');
            }
            else {
                this.player.animations.play('idle');
            }
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

    linkReset : function () {

        linkAbility = !linkAbility;

    },

    pacmanReset : function () {
        if (pacmanAbility) {
            Pacman_Ability.stop();
        } else {
            Pacman_Ability.play();
        }

        pacmanAbility = !pacmanAbility;

    },

    ghostAbility: function (ghost){
        if (pacmanAbility) {
            ghost.animations.play('ability');
        } else {
            ghost.animations.play('run');
        }

    },

    abilityReset: function() {

        ability = !ability;
    },

    action: function () {
        switch (character) {
            case 'link':
                this.abilityReset();
                this.linkReset();
            //    game.time.events.add(Phaser.Timer.SECOND*abPoints, this.linkReset);
                break;
            case 'mario':
                if (jumpCounter < maxJump)
                {
					this.player.body.velocity.y = -160;
					jumpCounter++;

                    game.sound.play('Mario_Jump');
                }
                break;
            case 'pacman':
                this.pacmanReset();

                this.abilityReset();

            //    game.time.events.add(Phaser.Timer.SECOND*abPoints, this.pacmanReset);
                break;

        }
    },

    createItemFeedback: function (x, y) {
        const itemFeedback = game.add.sprite(x, y, 'atlas');
        itemFeedback.anchor.setTo(0.5);
        const animFeedback = itemFeedback.animations.add('feedback', Phaser.Animation.generateFrameNames('item-feedback/item-feedback-', 1, 4, '', 0), 16, false);
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
                this.player.body.setSize(16, 24, 2, 0);
                //add animations
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
                this.player.animations.add('idle', Phaser.Animation.generateFrameNames('player-2/run-', 1, 4, '', 0), animVel, true);
                this.player.animations.add('run', Phaser.Animation.generateFrameNames('player-2/run-', 1, 2, '', 0), 10, true);
                this.player.animations.add('jump', Phaser.Animation.generateFrameNames('player-2/run-', 1, 4, '', 0), animVel, true);
                this.player.animations.add('hurt', Phaser.Animation.generateFrameNames('player-2/hurt-', 1, 4, '', 0), animVel, true);
                this.player.animations.play('idle');

                Pacman_Run.play();

                character = 'pacman';
             	break;

    		case 'pacman':
                Pacman_Run.stop();

				this.createItemFeedback(this.player.x, this.player.y);
                this.player.anchor.setTo(0.5);
                game.physics.arcade.enable(this.player);
                this.player.body.gravity.y = 500;
                this.player.body.setSize(18, 18, 0, 0);
                //add animations
                this.player.animations.add('idle', ['player-3/run-1'], 1, false);
                this.player.animations.add('run', Phaser.Animation.generateFrameNames('player-3/run-', 1, 2, '', 0), 10, true);
                this.player.animations.add('hurt', Phaser.Animation.generateFrameNames('player-3/hurt-', 1, 2, '', 0), animVel, true);
                this.player.animations.add('jump', ['player-3/run-2'], 1, false);
                this.player.animations.add('block', Phaser.Animation.generateFrameNames('player-3/block-', 1, 2, '', 0), animVel, true);
                this.player.animations.add('idle_block', ['player-3/block-1'], 1, false);
                this.player.animations.play('idle');

                character = 'link';
		        break;
        }
    }
};


const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "");

game.global = {
  thumbRows: 2,
  thumbCols : 3,
  thumbWidth : 64,
  thumbHeight : 64,
  thumbSpacing : 8,
  starsArray : [0,4,4,4,4,4],
  level : 1
};

game.state.add('Boot', boot);
game.state.add('Preload', preload);
game.state.add('TitleScreen', titleScreen);
game.state.add('LevelSelect', levelSelect);
game.state.add('Level1', level1);


game.state.start("Boot");
