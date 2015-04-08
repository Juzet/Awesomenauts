game.GameTimerManager = Object.extend({
	// this is an object but we still need and init function
	init: function(x, y, settings) {
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
		// player shouldnt get more gold if the game is paused
		// putting everthing on timers
		// making sure everything has a specific function
		
	},
	update: function() {
		 this.now = new Date().getTime();
		 // this is updating the data to the fly immediatly

		 this.goldTimerCheck();
		 // checking the gold timers data

		 this.creepTimerCheck();
		 // checking the creep timers data

		 return true;
	}, 

	goldTimerCheck: function() {
			 // creep is going to spawn at the same time the gold comes
		 if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)) {
			game.data.gold += game.data.exp1+10;
			console.log("Current gold: " + game.data.gold);
		 
		 };
	}, 
	creepTimerCheck: function() {

		 if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
		 	// checking to see if we have multiples of ten
		 	// this.now - .. makes sure the spawn isnt repeating
		 	this.lastCreep = this.now;
		 	var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
		 	me.game.world.addChild(creepe, 5);
		 	var friend = me.pool.pull("FriendCreep", 200, 0, {});
		 	me.game.world.addChild(friend, 5);

		 };
	},

});