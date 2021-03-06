/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		option1: "",
		option1: "",	
		enemyBaseHealth: 1,
		playerBaseHealth: 1,
		enemyCreepHealth: 1,
		playerHealth: 10,
		enemyCreepAttack: 1,
		playerAttack: 1,
		playerAttackTimer: 1000,
		enemyCreepAttackTimer: 1000,
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		gameManager: "",
		HeroDeathManager: "",
		spearTimer: 15,
		player: "",
		exp: 0,
		// these are going to be used to buy stuff
		gold: 0,
		ability1: 0,
		ability2: 0,
		ability3: 0,
		skill1: 0,
		skill2: 0,
		skill3: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: "",
		pausePos: "",
		buyScreen: "",
		buyText: "",
		minimap: "",
		miniPlayer: ""
		// variable that will affeect the movement etc of the character
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
	// me.save.add({exp: 0, exp1: 0,exp: 2, exp3: 0, exp4: 0});

	me.state.SPENDEXP = 112;
	me.state.LOAD = 113;
	me.state.NEW = 114;

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
		me.pool.register("HeroCreep", game.HeroCreep,true);
		me.pool.register("GameTimerManager", game.GameTimerManager);
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		me.pool.register("ExperienceManager", game.ExperienceManager);
		me.pool.register("SpendGold", game.SpendGold);
		me.pool.register("spear", game.SpearThrow);
		me.pool.register("minimap", game.MiniMap, true);
		me.pool.register("miniplayer", game.MiniPlayerLocation, true);
		// registering the enemy and player base to the pool
		// the character is being added and connected to the entites file
		// true says any object you register with true you can make multiple instances of

		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.SPENDEXP, new game.spendExp());
		me.state.set(me.state.LOAD, new game.LoadProfile());
		me.state.set(me.state.NEW, new game.NewProfile());

		// Start the game.
		me.state.change(me.state.MENU);
	}
};
