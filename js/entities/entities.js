// TODO
game.PlayerEntity = me.Entity.extend ({
		init: function(x, y, settings) {
		// this is a class
		this.setSuper(x,y,settings);
		// going to make the init function easier
		this.setPlayerTimers();
		// setting timers
		this.setAttributes();
		this.type = 'PlayerEntity';
		this.setFlags();
		
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		// this says wherever the player goes the screen will follow him
		this.addAnimation();

		this.renderable.setCurrentAnimation("idle");

		
	},
	// making functions so that the code can look clean and function easier
	setSuper: function(x,y,settings) {
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
	},

	setPlayerTimers: function() {
		this.now = new Date().getTime();
		// keeps track of what time it is in the game
		this.lastHit = this.now;
		// keeps track of what time it is in the game basically doing the this.now variable	
		this.lastSpear = this.now;
		// last spear being thrown at the base or the creep
		this.lastAttack = new Date().getTime();
		// this is stopping the attacks
	},

	setAttributes: function() {
		this.health = game.data.playerHealth;
		// using the games file to set the movements
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		// this also changes the y velocity of the character
		this.attack = game.data.playerAttack;
	},

	setFlags: function() {
		this.facing = "right";		
		// keeps track of which direction the character is going
		// this is the movement speed of the character
		this.dead = false;
		this.attacking = false;
		// local variable being kept track in the fly
	},

	addAnimation: function() {
		this.renderable.addAnimation("idle", [78]);
		// when the character is still this is what he will look like
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		// this is going to be what the cahracter is going to change into
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72] , 80);
	},

	update: function(delta) {
		this.now = new Date().getTime();
		// this function is what happens on the fly
		this.dead = this.checkIfDead();

		this.checkKeyPressesAndMove();

		this.checkAbilityKeys();

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

	checkIfDead: function () {
		if (this.health <= 0) {
			return true;
			// this is killing my player enemy
		}
	},

	checkKeyPressesAndMove: function () {

		if(me.input.isKeyPressed("right")) {
			this.moveRight();

		}
		else if(me.input.isKeyPressed("left")) {
			this.moveLeft();

		}
		else {
			this.body.vel.x = 0;
		}
		if (me.input.isKeyPressed('jump') && !this.body.jumping && !this.body.falling) {
     	 	this.jump();
        }
        this.attacking = me.input.isKeyPressed("attack");
	},
	moveRight: function() {
		// set the position of my x by adding the velocity to find above in set veloctiy 
			// setVeloctiy() and multiplying it by timer.tick
			// me.timer.tick makes the movement look smooth
			this.facing = "right";
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
			// this is flipping the animation around
	},
	moveLeft: function() {
		// set the position of my x by adding the velocity to find above in set veloctiy 
			// setVeloctiy() and multiplying it by timer.tick
			// me.timer.tick makes the movement look smooth
			this.facing = "left";
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(false);
			// this is flipping the animation around
	},
	jump: function() {
		 // make sure we are not already jumping or falling
      		this.body.jumping = true;
        // set current vel to the maximum defined value
        // gravity will then do the rest
        	this.body.vel.y -= this.body.accel.y * me.timer.tick;
        	me.audio.play("jump");
	},

	loseHealth: function(damage) {
		this.health = this.health - damage;
		// subtracting players health
		
	},

	collideHandler: function(response) {
		if(response.b.type === 'EnemyBase'){
			this.collideWithEnemyBase(response);	
		}
		else if(response.b.type==='EnemyCreep') {
			this.collideWithEnemyCreep(response);	
		}
	},

	collideWithEnemyBase: function (response) {
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
			else if (xdif< 70 && this.facing === 'left' && (xdif > 0)) {
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
	},
	
	checkAbilityKeys: function() {
		if(me.input.isKeyPressed("skill1")) {
			this.speedBurst();
		}
		else if (me.input.isKeyPressed("skill2")){
			this.eatCreep();
		}
		else if (me.input.isKeyPressed("skill3")){
			this.throwSpear();
		}

	},

	throwSpear: function() {
		if((this.now-this.lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 > 0) {
			this.lastSpear = this.now;
		 	var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
			me.game.world.addChild(spear, 10);
		}
	},

	collideWithEnemyCreep: function(response) {
		var xdif = this.pos.x - response.b.pos.x;
		var ydif = this.pos.y - response.b.pos.y;
			
			this.stopMovement(xdif);
			if (this.checkAttack(xdif, ydif)) {
				this.hitCreep(response);
			};
			
	},
	stopMovement: function (xdif) {
			if (xdif > 0) {
				this.pos.x = this.pos.x +1;
			// pushing the player a little to the right if coming in from the right and allowing us not to crash into the creep
			if(this.facing ==="left") {
					this.body.vel.x = 0;
				}
			}
			else {
			//pushing the player to the left if coming in from the left, and allowing us not to crash into the creep 
			if(this.facing ==="right") {
					this.body.vel.x = 0;
				}

			}
		},

	checkAttack: function (xdif, ydif) {
		if(this.renderable.isCurrentAnimation("attack")&& this.now-this.lastHit >= game.data.playerAttackTimer && (Math.abs(ydif) <= 40) && (((xdif >0) && this.facing==="left") || ((xdif<0 && this.facing==="right")))
				) {
				// if the character is to the right of the creep and you are facing left it should be able to be attacked and vice vera
				// making sure we can hit the creep
				this.lastHit = this.now;
				// if the creeps health is less than our attack, execute code in our statements
				return true;
 	
		}
				return false;
		},
	hitCreep: function (response) {
		if(response.b.health <= game.data.playerAttack) {
				// adds one gold for a creep kill
				game.data.gold += 1;
				console.log("Current gold: " + game.data.gold);
			}
				response.b.loseHealth(game.data.playerAttack);
				// making the creep loose one energy when hit
			}
		// this is going to determine what happens when we hit the enemy entity
	// all these functions are simply breaking down the code into diiferent funcitons so it is easier for us

});