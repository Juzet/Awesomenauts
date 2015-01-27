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

		this.body.setVelocity(5, 20);
		// this a lso changes the y velocity of the character
		// this is the movement speed of the character

		this.renderable.addAnimation("idle", [78]);
		// when the character is still this is what he will look like
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		// this is going to be what the cahracter is going to change into

		this.renderable.setCurrentAnimation("idle");
	}, 

	update: function(delta) {
		// this function is what happens on the fly
		if(me.input.isKeyPressed("right")) {
			// set the position of my x by adding the velocity to find above in set veloctiy 
			// setVeloctiy() and multiplying it by timer.tick
			// me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX("true");
			// this is flipping the animation around

		}
		else {
			this.body.vel.x = 0;
		}

		if(this.body.vel.x !== 0) 
		//allowing the guy to not immediately walk 
		{
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
				// this says it doesnt want to start the walk animation if it is already walking
			}
		}
		else {
			this.renderable.setCurrentAnimation("idle");
		}
		// delta is the change in time that has happens

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		// this is updating the animations on the fly
		return true;
	}
});


game.PlayerBaseEntity = me.Entity.extend ({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",

			getShape: function() {
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
}]);
		this.broken = false;
		// this is saying that the tower has not yet been
		this.health = 10;
		// starting energy for tower
		this.alwaysUpdate = true;
		// updates the screen whether or not we are not looking at it
		this.body.onCollision = this.onCollision.bind(this);
		// if somebody runs into the tower it will be able to collide with it

		this.type = "PlayerBaseEntity";
		// this is a type you can use to check to see what you are running into

	}, 

	update: function(delta) {
		if( this.health <= 0) {
			this.broken =  true;
			// this means that the character is dead
	}
		this.body.update(delta);
		// updates the code

		this._super(me.Entity, "update", [delta]);
		return true;
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
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
}]);
		this.broken = false;
		// this is saying that the tower has not yet been
		this.health = 10;
		// starting energy for tower
		this.alwaysUpdate = true;
		// updates the screen whether or not we are not looking at it
		this.body.onCollision = this.onCollision.bind(this);
		// if somebody runs into the tower it will be able to collide with it

		this.type = "EnemyBaseEntity";
		// this is a type you can use to check to see what you are running into

	}, 

	update: function(delta) {
		if( this.health <= 0) {
			this.broken =  true;
			// this means that the character is dead
	}
		this.body.update(delta);
		// updates the code

		this._super(me.Entity, "update", [delta]);
		return true;
	},
		onCollision: function() {

		}
	
});
