titleScreen =  {
    create: function () {
        background = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
        middleground = game.add.tileSprite(0, 80, gameWidth, gameHeight, 'middleground');
        this.title = game.add.image(game.width / 2, 70, 'title');
        this.title.anchor.setTo(0.5, 0);

        this.pressEnter = game.add.image(game.width / 2, game.height - 35, 'enter');
        this.pressEnter.anchor.setTo(0.5, 1);

        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        startKey.onDown.add(this.startGame, this);

        game.input.onDown.add(this.startGame, this);

        game.time.events.loop(700, this.blinkText, this);

        this.state = 1;
    },
    blinkText: function () {
        if (this.pressEnter.alpha) {
            this.pressEnter.alpha = 0;
        } else {
            this.pressEnter.alpha = 1;
        }
    }

    ,
    update: function () {
        background.tilePosition.x -= .3;
        middleground.tilePosition.x -= .6;

    },
    startGame: function () {
        if (this.state == 1) {
            this.state = 2;
            this.title2 = game.add.image(game.width / 2, 0, 'instructions');
            this.title2.anchor.setTo(0.5, 0);
            this.title.destroy();
        } else {
            this.game.state.start('LevelSelect');
        }

    }
}
