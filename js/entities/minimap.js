game.MiniMap = me.Entity.extend ({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 282,
			height: 161,
			spritewidth: "282",
			spriteheight: "161",
			// different details of the minimap
			// height
			// width
			// the apperarance of the minimap
			getShape: function() {
				return (new me.Rect(0, 0, 282, 161)).toPolygon();
			// this shows the hight of the bases
			}
		}]);
		this.floating = true;
		// wants the box to be floating
	}
});