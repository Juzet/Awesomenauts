game.SpendGold = Object.extend ({
	init: function(x, y, settings) {
		this.now = new Date().getTime();
// allowing you buy your stuff whenever you want
		this.lastBuy = new Date().getTime();
// this is not pausing the game by itslef
		this.paused = false;
//this is always updating to the fly
		this.alwaysUpdate = true;	
//this is updating even when paused 
		this.updateWhenPaused = true;
// you aren't able to buy anything when the game isnt paused
		this.buying = false;
	},

	update: function() {
		this.now = new Date().getTime();
// this is pressing a the key buy and it showing the last buy functions
		if (me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000) {			
			this.lastBuy = this.now;
// if you are abuying it will run the function start buying
			if (!this.buying) {
				this.startBuying();
			}
// otherwise they will run stop buying code
			else {
				this.stopBuying();
			}
		}
// checking the keys you are using to buy stuff
		this.checkBuyKeys();

		return true;
	}, 
// the occuring functions when you press buy
	startBuying: function () {
// verifies that you buying something
		this.buying = true;
// when you buy you are entering these functions
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
//this is the gold screen that will pop up 
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
// this is still updating the buy screen even when paused
		game.data.buyscreen.updateWhenPaused = true;
// setting the opacity of the screen so you can still see your gae in the backgound
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
// adding the buyscreen to the child functions
		game.data.player.body.setVelocity(0, 0);
// when this is paused you cannot play the game
		me.state.pause(me.state.PLAY);
// binding the f1 key to the screen
		me.input.bindKey(me.input.KEY.F1, "F1", true);
// binding the f2 key to the screen
		me.input.bindKey(me.input.KEY.F2, "F2", true);
// binding the f3 key to the screen
		me.input.bindKey(me.input.KEY.F3, "F3", true);
// binding the f4 key to the screen
		me.input.bindKey(me.input.KEY.F4, "F4", true);
// binding the f5 key to the screen
		me.input.bindKey(me.input.KEY.F5, "F5", true);
// binding the f6 key to the screen
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		// this is controlling the functions
		// this is also initiating functions
		this.setBuyText();
	},

	setBuyText: function () {
		game.data.buytext = new (me.Renderable.extend({
// the init function is running this immediatly
			init: function() {
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 1, 1]);
//  300 50
// making a call to the super function
				this.font = new me.Font("Arial", 26, "white");
// setting a font on the screen
				this.updateWhenPaused = true;
// this is always updating when paused
				this.alwaysUpdate = true;
// always updating is true 
			}, 

            draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT", this.pos.x, this.pos.y);
// when we are drawing something we are passing in the context of where we are
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
// this is increasing the damage and it would run when pressing a certain button
				this.font.draw(renderer.getContext(), "Skill 2: Run faster. Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
// this is runnnig faster something you will recieve when you click a certain button
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
// this is increasing health will do so if brought
				this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
// this is an ability that will come with purchase
				this.font.draw(renderer.getContext(), "W Ability: Eat Creep for Health. Current Level: " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
// this is going to eat a creep with purchase
				this.font.draw(renderer.getContext(), "E Ability: Throw your spear. Current Level: " + game.data.ability3+ " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);
			}   

		}));
		me.game.world.addChild(game.data.buytext, 35);

	},

	stopBuying: function () {
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
// this is what happens when you stop buying the keys
		me.game.world.removeChild(game.data.buyscreen);
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		me.game.world.removeChild(game.data.buytext);
		// these are stopping the functions
		// this is unbinding the functions for when you are not buying
	},

	checkBuyKeys: function() {
		if (me.input.isKeyPressed("F1")) {
			if(this.checkCost(1)){
				this.makePurchase(1);
			}
		}
		else if (me.input.isKeyPressed("F2")) {
			if(this.checkCost(2)){
				this.makePurchase(2);
			}
		}
		else if (me.input.isKeyPressed("F3")) {
			if(this.checkCost(3)){
				this.makePurchase(3);
			}
		}
		else if (me.input.isKeyPressed("F4")) {
			if(this.checkCost(4)){
				this.makePurchase(4);
			}
		}
		else if (me.input.isKeyPressed("F5")) {
			if(this.checkCost(5)){
				this.makePurchase(5);
			}
		}
		else if (me.input.isKeyPressed("F6")) {
			if(this.checkCost(6)){
				this.makePurchase(6);
			}
		}
	}, 
	
	checkCost: function(skill) {
		if(skill===1 && (game.data.gold >= ((game.data.skill1 + 1)*10))) {
			// taking the skill level adding 1 and multiplying it by 10 for the cost
			return true;
		}
		else if(skill===2 && (game.data.gold >= ((game.data.skill2 + 1)*10))) {
			// taking the skill level adding 1 and multiplying it by 0 for the cost
			return true;
		}
		else if(skill===3 && (game.data.gold >= ((game.data.skill3 + 1)*10))) {
			// taking the skill level adding 1 and multiplying it by 10 for the cost
			return true;
		}
		else if(skill===4 && (game.data.gold >= ((game.data.ability1 + 1)*10))) {
			// taking the skill level adding 1 and multiplying it by 10 for the cost
			return true;
		}
		else if(skill===5 && (game.data.gold >= ((game.data.ability2 + 1)*10))) {
			// taking the skill level adding 1 and multiplying it by 10 for the cost
			return true;
		}
		else if(skill===6 && (game.data.gold >= ((game.data.ability3 + 1)*10))) {
			// taking the skill level adding 1 and multiplying it by 10 for the cost
			return true;
		}
		else {
			return false;
		}
	},
	
	makePurchase: function(skill) {
		if(skill===1) {
			game.data.gold -= ((game.data.skill1 +1)*10);
			game.data.skill1 += 1;
			game.data.playerAttack += 1; 
		}
		else if(skill===2) {
			game.data.gold -= ((game.data.skill2 +1)*10);
			game.data.skill2 += 1;
		}
		else if(skill===3) {
			game.data.gold -= ((game.data.skill3 +1)*10);
			game.data.skill3 += 1;
		}
		if(skill===4) {
			game.data.gold -= ((game.data.ability1 +1)*10);
			game.data.ability1 += 1;
		}
		if(skill===5) {
			game.data.gold -= ((game.data.ability2 +1)*10);
			game.data.ability2 += 1;
		}
		if(skill===6) {
			game.data.gold -= ((game.data.ability3 +1)*10);
			game.data.ability3 += 1;
		}
	}
});

