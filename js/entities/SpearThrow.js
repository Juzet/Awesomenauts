game.SpearThrow = me.Entity.extend ({
		init: function(x, y, settings, facing) {
		this._super(me.Entity, "init", [x, y, {
			image: "spear",
			width: 48,
			height: 48,
			spritewidth: "48",
			spriteheight: "48",

			getShape: function() {
				return (new me.Rect(0, 0, 48, 48)).toPolygon();
				// this shows the hight of the bases
			}

		}]);
			this.alwaysUpdate = true;
			this.body.setVelocity(8, 0);
			this.attack = game.data.ability3*3;
			this.type = "spear";
			this.facing = facing;
	},
	update: function(delta) {
			if (this.facing === 'left') {
				
				this.body.vel.x -= this.body.accel.x * me.timer.tick;
			}
			else {

				this.body.vel.x += this.body.accel.x * me.timer.tick;
			}

			me.collision.check(this, true, this.collideHandler.bind(this), true);
			// cahnging the drection of the creep
			this.body.update(delta);


			this._super(me.Entity, "update", [delta]);
			// this is updating the animations on the fly
			return true;	 

	},
	collideHandler: function(response) {
		if(response.b.type === 'EnemyBase' || response.b.type === 'EnemyCreep'){
			// making sure its not hitting the b entity repeaditely so it looses health 
			response.b.loseHealth(this.attack);  
			me.game.world.removeChild(this);
		}
	},


})