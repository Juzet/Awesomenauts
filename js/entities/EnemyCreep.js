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