game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); 
		// this is showing the title screen


		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				// making a call to the super function
				this.font = new me.Font("Arial", 46, "white");
				// setting a font on the screen
				me.input.registerPointerEvent("pointerdown",this, this.newGame.bind(this), true);
				// this is waiting for the mouse to be clicked to start the game
			}, 

            draw: function(renderer) {
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
				// when we are drawing something we are passing in the context of where we are
			},

			update: function(dt) {
				return true;
				// making sure we are listening to stuff
			},  
			newGame: function() {
				me.input.releasePointerEvent('pointerdown', this);
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');
				me.state.change(me.state.PLAY);

		}    
			 

		})));

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				// making a call to the super function
				this.font = new me.Font("Arial", 46, "white");
				// setting a font on the screen
				me.input.registerPointerEvent("pointerdown",this, this.newGame.bind(this), true);
				// this is waiting for the mouse to be clicked to start the game
			}, 

            draw: function(renderer) {
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
				// when we are drawing something we are passing in the context of where we are
			},

			update: function(dt) {
				return true;
				// making sure we are listening to stuff
			},  
			newGame: function() {
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.PLAY);

		}    
		// this is like adding the start a new game pointer function it just changed a few things 

		})));
	  },
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});
