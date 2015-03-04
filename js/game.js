
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		enemyBaseHealth: 1,
		playerBaseHealth: 10,
		enemyCreepHealth: 1,
		playerHealth: 20,
		enemyCreepAttack: 1,
		playerAttack: 1,
		playerAttackTimer: 1000,
		enemyCreepAttackTimer: 1000,
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		gameManager: "",
		HeroDeathManager: "";
		player: "",
		exp: 0,
		// these are going to be used to buy stuff
		gold: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0
		// variable thata will affeect the movement etc of the character
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1076, 600, true, '1.0')) {
		// we changed the numbers after canvas because we want the game to fit our screen
		// this is the basic set up of the game appearance
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		me.pool.register("player", game.PlayerEntity, true);
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		me.pool.register("FriendCreep", game.FriendCreep,true);
		me.pool.register("GameManager", game.GameTimerManager);
		me.pool.register("HeroDeathManager", game.GameHeroDeathManager);
		// registering the enemy and player base to the pool
		// the character is being added and connected to the entites file
		// true says any object you register with true you can make multiple instances of

		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Start the game.
		me.state.change(me.state.MENU);
	}
};
