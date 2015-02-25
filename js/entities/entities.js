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