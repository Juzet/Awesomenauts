game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); 
		// this is showing the title screen
		me.input.bindKey(me.input.KEY.ENTER, "start");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height])
				// making a call to the super function
				this.font = new me.Font("Arial", 46, "white");
				// setting a font on the screen
			}, 

            draw: function(renderer) {
		this.font.draw(renderer.getContext(), "Awesomenauts", 450, 130);
		// when we are drawing something we are passing in the context of where we are
		this.font.draw(renderer.getContext(), "Press ENTER to play", 250, 530);
		}         })));

			this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
			// this is listening for someone pressing the enter button
			if (action === "start") {
				me.state.change(me.state.PLAY);
				}
			});
			
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKEY(me.input.KEY.ENTER); // TODO
		me.event.unsubscribe(this.handler);
	}
});
