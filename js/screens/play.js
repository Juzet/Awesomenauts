game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01");
		// this is telling the code what to look at as far as maps
		// 

		var player = me.pool.pull("player", 0, 420, {});
		// we are a pulling the player out of the pool to the screen and making it appear on the screen
		// x and y are where he is starting
		
		me.game.world.addChild(player, 5);

		me.input.bindKey(me.input.KEY.RIGHT, "right");
		// me.input.bindKey(me.input.KEY.LEFT, "left");
		// this is loading level 01 from the resources.js file
		// uppercase and lowercase are really important because it can affect the code since it is case sensitive

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
// this is where the game is going to start so we have to put different functions in here
