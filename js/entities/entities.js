// TODO
game.PlayerEntity = me.Entity.extend ({
	// this is a class
	init: function(x, y, settings) {
		// melon js uses this constructor on most things to help us set up
		this._super(me.Entity, "init", [x, y, {
			// this means reaching to the constructor of entites
			image: "player",
			width: 64,
			// tells the screen what amount of space to reserve
			height: 64,
			spritewidth: "64",
			// spritewidth/height are passing the main information tells what to do with the image
			spriteheight: "64",
			// these are setting the properties of the picture o the right demensions so the picture appears properly
			getShape: function() {
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
				// rect is what the guy can walk in to
			}
		}]);
		this.type = 'PlayerEntity';
		this.health = game.data.playerHealth;
		// using the games file to set the movements
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		// this also changes the y velocity of the character
		// this is the movement speed of the character
		this.facing = "right";		
		// keeps track of which direction the character is going
		this.now = new Date().getTime();
		// keeps track of what time it is in the game
		this.lastHit = this.now;
		// keeps track of what time it is in the game basically doing the this.now variable
		this.dead = false;
		// local variable being kept track in the fly
		this.attack = game.data.playerAttack;
		this.lastAttack = new Date().getTime();
		// this is stopping the attacks
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		// this says wherever the player goes the screen will follow him

		this.renderable.addAnimation("idle", [78]);
		// when the character is still this is what he will look like
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		// this is going to be what the cahracter is going to change into

		this.renderable.setCurrentAnimation("idle");
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72] , 80);
	}, 

	update: function(delta) {
		this.now = new Date().getTime();
		// this function is what happens on the fly
		if (this.health <= 0) {
			this.dead = true;
			// this is killing my player enemy
		}
		if(me.input.isKeyPressed("right")) {
			// set the position of my x by adding the velocity to find above in set veloctiy 
			// setVeloctiy() and multiplying it by timer.tick
			// me.timer.tick makes the movement look smooth
			this.facing = "right";
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
			// this is flipping the animation around

		}
		else if(me.input.isKeyPressed("left")) {
			// set the position of my x by adding the velocity to find above in set veloctiy 
			// setVeloctiy() and multiplying it by timer.tick
			// me.timer.tick makes the movement look smooth
			this.facing = "left";
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(false);
			// this is flipping the animation around

		}
		else {
			this.body.vel.x = 0;
		}
		if (me.input.isKeyPressed('jump') && !this.body.jumping && !this.body.falling) {
     	 // make sure we are not already jumping or falling
      		this.body.jumping = true;
        // set current vel to the maximum defined value
        // gravity will then do the rest
        	this.body.vel.y -= this.body.accel.y * me.timer.tick;
        	me.audio.play("jump");
        }
		if(me.input.isKeyPressed("attack")) {
			if (!this.renderable.isCurrentAnimation("attack")) {
				// set current animation to attack and once that is over
				// goes back to the idle animations
				this.renderable.setCurrentAnimation("attack", "idle");
				// makes it so that the next time we start this sequence we begin from the first animation not where we left off when we switched to another animation
				this.renderable.setAnimationFrame();
			}
		}
		if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) 
		//allowing the guy to not immediately walk 
		{
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
				// this says it doesnt want to start the walk animation if it is already walking
			}
		}
		else if(!this.renderable.isCurrentAnimation("attack")) {
			this.renderable.setCurrentAnimation("idle");
		}
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		// passing a parameter into collide function
		// delta is the change in time that has happens
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		// this is updating the animations on the fly
		return true;
	},
	loseHealth: function(damage) {
		this.health = this.health - damage;
		// subtracting players health
		
	},

	collideHandler: function(response) {
		if(response.b.type === 'EnemyBase'){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;


			if (ydif< -40 && xdif< 70 && xdif > -35) {
				this.body.falling = false;
				this.body.vel.y = -1;
			}


			else if (xdif > -30 && this.facing === 'right' && (xdif < 0)) {
				this.body.vel.x = 0;
				// stops the player from moving
				// this.pos.x = this.pos.x - 1;
				// slighty turns the character
			}
			else if (xdif< 70 && this.facing === 'left' && xdif > 0) {
				this.body.vel.x = 0;
				// stops the player from moving
				// this.pos.x = this.pos.x + 1;
				// cant walk into castle from left or right
			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) {
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
				// if we are attacking and hitting the castle it looses health
			}
		}
		else if(response.b.type==='EnemyCreep') {
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;
			if (xdif >0) {
				this.pos.x = this.pos.x +1;
			// pushing the player a little to the right if coming in from the right and allowing us not to crash into the creep
			if(this.facing ==="left") {
					this.body.vel.x = 0;
				}
			}
			else {
				// this.pos.x = this.pos.x - 1;
			//pushing the player to the left if coming in from the left, and allowing us not to crash into the creep 
			if(this.facing ==="right") {
					this.body.vel.x = 0;
				}

			}
			if(this.renderable.isCurrentAnimation("attack")&& this.now-this.lastHit >= game.data.playerAttackTimer && (Math.abs(ydif) <= 40) && (((xdif >0) && this.facing==="left") || ((xdif<0 && this.facing==="right")))
				) {
				// if the character is to the right of the creep and you are facing left it should be able to be attacked and vice vera
				// making sure we can hit the creep
				this.lastHit = this.now;
				// if the creeps health is less than our attack, execute code in our statements
			if(response.b.health <= game.data.playerAttack) {
				// adds one gold for a creep kill
				game.data.gold += 1;
				console.log("Current gold: " + game.data.gold);
			}
				response.b.loseHealth(game.data.playerAttack);
				// making the creep loose one energy when hit
			}
		}
		// this is going to determine what happens when we hit the enemy entity
	}
});


game.PlayerBaseEntity = me.Entity.extend ({
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",

			getShape: function() {
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
				// this shows the height of the bases
			}
}]);
		this.broken = false;
		// this is saying that the tower has not yet been touched/attacked
		this.health = game.data.playerBaseHealth;
		// starting energy for tower
		this.alwaysUpdate = true;
		// updates the screen whether or not we are not looking at it
		this.body.onCollision = this.onCollision.bind(this);
		// if somebody runs into the tower it will be able to collide with it

		this.type = "PlayerBase";
		// this is a type you can use to check to see what you are running into
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
		// renderable is a class built in melon js that we can play with the animation with


	}, 

	update: function(delta) {
		if( this.health <= 0) {
			this.broken =  true;
			// this means that the character is dead
			this.renderable.setCurrentAnimation("broken");
	}
		this.body.update(delta);
		// updates the code

		this._super(me.Entity, "update", [delta]);
		// telling the superclass to update
		return true;
	},

		loseHealth: function(damage) {
			this.health = this.health - damage;
		},
		onCollision: function() {

		}
	
});
game.EnemyBaseEntity = me.Entity.extend ({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",

			getShape: function() {
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
				// this shows the hight of the bases
			}
}]);
		this.broken = false;
		// this is saying that the tower has not yet been
		this.health = game.data.EnemyBaseHealth;
		// starting energy for tower
		this.alwaysUpdate = true;
		// updates the screen whether or not we are not looking at it
		this.body.onCollision = this.onCollision.bind(this);
		// if somebody runs into the tower it will be able to collide with it

		this.type = "EnemyBase";
		// this is a type you can use to check to see what you are running into
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
		// renderable is a class built in melon js that we can play with the animation with

	}, 

	update: function(delta) {
		if( this.health <= 0) {
			this.broken =  true;
			// this means that the character is dead
			this.renderable.setCurrentAnimation("broken");
	}
		this.body.update(delta);
		// updates the code

		this._super(me.Entity, "update", [delta]);
		// telling the super class to update
		return true;
	},
		onCollision: function() {

		}, 
		loseHealth: function() {
			this.health--;
		}
	
});
game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",

			getShape: function() {
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
				// this shows the hight of the bases
			}
		}]);

			this.health = game.data.enemyCreepHealth;
			this.alwaysUpdate = true;
			this.attacking = false;
			// this shows us if the enemy is currently attacking
			this.lastAttacking = new Date().getTime();
			// keep track of when the creep last attacks anything
			this.lastHit = new Date().getTime();
			// also keeps track of the last time thte creep hits anything
			this.now = new Date().getTime();
			// refesh every single times

			this.body.setVelocity(3, 20);
			this.type = "EnemyCreep";

			this.renderable.addAnimation("walk", [3, 4, 5], 80);
			this.renderable.setCurrentAnimation("walk");
		},

			loseHealth: function(damage) {

				this.health = this.health - damage;

			},
			update: function(delta) {
				if (this.health <= 0) {
					me.game.world.removeChild(this);
					// emeny get killed and kicked out of the game
				}
				this.now = new Date().getTime();
				// refesh every single time
				this.body.vel.x -= this.body.accel.x * me.timer.tick;

				me.collision.check(this, true, this.collideHandler.bind(this), true);
				// cahnging the drection of the creep
				this.body.update(delta);


				this._super(me.Entity, "update", [delta]);
				// this is updating the animations on the fly
				return true;	 

			},

	collideHandler: function(response) {

		if(response.b.type === 'PlayerBase'){
			this.attacking = true;
			// this.lastAttacking = true.now;
			this.body.vel.x = 0;
			this.pos.x = this.pos.x + 1;
			// sliding to the right

		if ((this.now-this.lastHit >= 1000)) {
			// setting a timer
			this.lastHit = this.now;
			// making sure its not hitting the b entity repeaditely so it looses health 
			response.b.loseHealth(game.data.enemyCreepAttack);  
		}
	}
		else if (response.b.type === 'PlayerEntity') {
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking = true;
			// this.lastAttacking = true.now;

		if (xdif>0) {
			this.pos.x = this.pos.x + 1;
			this.body.vel.x = 0;
		}

		if ((this.now - this.lastHit >= 1000 && xdif> 0)) {
			// if the osition is to the right it is going to have a bigger value than the one to the left
			// setting a timer
			this.lastHit = this.now;
			// making sure its not hitting something multiple so it looses health 
			response.b.loseHealth(game.data.enemyCreepAttack); 

		}

	}
}

});
game.FriendCreep = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",

			getShape: function() {
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
				// this shows the hight of the bases
			}
		}]);

			this.health = game.data.enemyCreepHealth;
			this.alwaysUpdate = true;
			this.attacking = false;
			// this shows us if the enemy is currently attacking
			this.lastAttacking = new Date().getTime();
			// keep track of when the creep last attacks anything
			this.lastHit = new Date().getTime();
			// also keeps track of the last time thte creep hits anything
			this.now = new Date().getTime();
			// refesh every single times

			this.body.setVelocity(3, 20);
			this.type = "EnemyCreep";

			this.renderable.addAnimation("walk", [3, 4, 5], 80);
			this.renderable.setCurrentAnimation("walk");
		},

			loseHealth: function(damage) {

				this.health = this.health - damage;

			},
			update: function(delta) {
				if (this.health <= 0) {
					me.game.world.removeChild(this);
					// emeny get killed and kicked out of the game
				}
				this.now = new Date().getTime();
				// refesh every single time
				this.body.vel.x -= this.body.accel.x * me.timer.tick;

				me.collision.check(this, true, this.collideHandler.bind(this), true);
				// cahnging the drection of the creep
				this.body.update(delta);


				this._super(me.Entity, "update", [delta]);
				// this is updating the animations on the fly
				return true;	 

			},

	collideHandler: function(response) {

		if(response.b.type === 'EnemyBase'){
			this.attacking = true;
			// this.lastAttacking = true.now;
			this.body.vel.x = 0;
			this.pos.x = this.pos.x + 1;
			// sliding to the right

		if ((this.now-this.lastHit >= 1000)) {
			// setting a timer
			this.lastHit = this.now;
			// making sure its not hitting the b entity repeaditely so it looses health 
			response.b.loseHealth(game.data.enemyCreepAttack);  
		}
	}
		else if (response.b.type === 'PlayerEntity') {
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking = true;
			// this.lastAttacking = true.now;

		if (xdif>0) {
			this.pos.x = this.pos.x + 1;
			this.body.vel.x = 0;
		}

		if ((this.now - this.lastHit >= 1000 && xdif> 0)) {
			// if the osition is to the right it is going to have a bigger value than the one to the left
			// setting a timer
			this.lastHit = this.now;
			// making sure its not hitting something multiple so it looses health 
			response.b.loseHealth(game.data.enemyCreepAttack); 

		}

	}
}
});
game.GameManager = Object.extend({
	// this is an object but we still need and init function
	init: function(x, y, settings) {
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		// player shouldnt get more gold if the game is paused
		this.alwaysUpdate = true;
	},
	update: function() {
		 this.now = new Date().getTime();
		 
		 if(game.data.player.dead) {
		 	me.game.world.removeChild(game.data.player);
		 	me.state.current().resetPlayer(10, 0);

		 }
		 // creep is going to spawn at the same time the gold comes
		 if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)) {
			game.data.gold += 1;
			console.log("Current gold: " + game.data.gold);
		 
		 };



		 if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
		 	// checking to see if we have multiples of ten
		 	// this.now - .. makes sure the spawn isnt repeating
		 	this.lastCreep = this.now;
		 	var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
		 	me.game.world.addChild(creepe, 5);
		 	var friend = me.pool.pull("FriendCreep", 200, 0, {});
		 	me.game.world.addChild(friend, 5);

		 };
		 return true;
	}

});