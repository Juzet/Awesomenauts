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
			alert("YOU WIN!");
		} 
		else if(game.data.win === false && !this.gameover) {
		// this will do something if I loose
			this.gameOver(false);
			alert("YOU LOSE!");
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
		// console.log("Juzet is awesome " + me.save.exp);
		// me.save.exp2 = 4; 
		// this is printing out the number of experience you have 
				me.state.change(me.state.MENU);
				$.ajax({
					type: "POST",
					url: "php/controller/save-user.php",
					data: {
						exp: game.data.exp,
						exp1: game.data.exp1,
						exp2: game.data.exp2,
						exp3: game.data.exp3,
						exp4: game.data.exp4,
		// filtering the data from the save user
					},

					dataType: "text"
				})
					.success (function(response) {
						if(response==="true") {
							me.state.change(me.state.MENU);
		// we want this to go to the menu state
						}
						else {
							alert("response");
						}
				})

					.fail(function(response) {
						alert("Fail");
					});
	}
});
