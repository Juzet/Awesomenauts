game.ExperienceManager = Object.extend ({
	init: function(x, y, settings) {
		this.alwaysUpdate = true;
		// this is making sure the data is always updating and it is not loosing the data
		this.gameover = false;
	},

	update: function() {
		// none of these get called until one of the flags are set 
		if(game.data.win === true && !this.gameover) {
		//this is going to do something if I win 
			this.gameOver(true);
		} 
		else if(game.data.win === false && !this.gameover) {
		// this will do something if I loose
			this.gameOver(false);
		}
		return true;
		// checking all the statements but making sure the result being outputted is true
	}, 
	
	gameOver: function (win) {
		if (win) {
			game.data.exp += 10;
			// the experience is going up buy ten each time you kill the things
		}
		else {
			game.data.exp += 1; 
			// if you don't kill the thing the game experience will increase only by one if you die
		}
		

		this.gameover = true;
		// this is making sure when you die the data is restarted
		me.save.exp = game.data.exp;
		// for testing code purposes
		console.log("Juzet is awesome " + me.save.exp);
		me.save.exp2 = 4; 
		// this is printing out the number of experience you have 
	}
});
