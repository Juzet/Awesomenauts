game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); 
		// this is showing the title screen
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("register").style.visibility = "visible";

		me.input.unbindKey(me.input.KEY.B);
		me.input.unbindKey(me.input.KEY.Q);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.A);
		var exp1cost = ((game.data.exp1 + 1) * 10);

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				// making a call to the super function
				this.font = new me.Font("Arial", 26, "white");
				// setting a font on the screen
				// me.input.registerPointerEvent("pointerdown",this, this.newGame.bind(this), true);
				// // this is waiting for the mouse to be clicked to start the game
			}, 

            draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD", this.pos.x, this.pos.y);
				// when we are drawing something we are passing in the context of where we are
			}   

		})));
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("register").style.visibility = "hidden";
	}
});