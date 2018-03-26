var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });


function preload() {
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
}



var platforms;
var star;


function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();

    platforms.enableBody = true;

    var ground = platforms.create(game.world.width/2, game.world.height-64, 'ground');

    ground.scale.set(5, 2);
    ground.anchor.set(0.5);

    ground.body.immovable = true;




    star = game.add.sprite(game.world.width/2, game.world.height/2, 'star');

    game.physics.arcade.enable(star);

    star.body.bounce.y = 0.2;
    star.body.gravity.y = 300;


    star.body.collideWorldBounds = true;
}



function update() {
	var hitPlatform = game.physics.arcade.collide(star, platforms);


	if (game.input.pointer1.isDown)
	{
		if (game.input.pointer1.x < window.innerWidth/2)
	   	{
	        star.x -= 2;
	    }
	    else if(game.input.pointer1.x > window.innerWidth/2)
	    {
	        star.x += 2;
	    }
	}
	
}