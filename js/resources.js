game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	{name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
	// we are just loading the background tiles to the template 
	{name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
	// we are also loading the meta tiles to the template
	{name: "player", type:"image", src: "data/img/OrcSpear.png"},
	// we are loading the player image to the template
	{name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
	{name: "creep1", type:"image", src: "data/img/brainmonster.png"},
	{name: "creep2", type:"image", src: "data/img/gloop.png"},
	{name: "title-screen", type:"image", src: "data/img/title.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	{name: "level01", type: "tmx", src: "data/map/test.tmx"},
 	// this is displaying our full background images
	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
	{name: "what", type: "audio", src: "data/bgm/"},
	{name: "blankSpace", type: "audio", src: "data/bgm/"},
	{name: "katy1", type: "audio", src: "data/bgm/"},
	{name: "miley", type: "audio", src: "data/bgm/"},
	 
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	{name: "jump", type: "audio", src: "data/sfx/"},

];
