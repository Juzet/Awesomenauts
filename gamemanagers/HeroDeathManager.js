// this function is going to deal with the deaths
game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
   //this is always updating new info to the fly  
	},
	
	update: function() {
		 if(game.data.player.dead) {
		 	// code that will happen when the player is dead
		 	me.game.world.removeChild(game.data.player);
		 	// removing the player from the game
		 	me.game.world.removeChild(game.data.miniPlayer);
		 	// this is also removing the player from the mini map when dead
		 	me.state.current().resetPlayer(10, 0);

		 }
	}

});