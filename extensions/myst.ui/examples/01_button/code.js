/*
 *  myst.ui.js Example 01 - Button
 *
 */

var myState = new myst.State();

myState.createUI = function() {
	// set the global context to this particular state
	// every created component from here on will default to this context
	myst.ui.setGlobalContext(this);

	// add a button component
	this.myButton = new myst.ui.SimpleButton({	
		//context: this, // commented on purpose, not needed after global context has been set
		// define button geometry and texture
		//x: 0, // commented on purpose, not needed as we're calling myButton.center to position the button
		//y: 0,
		width: 200,
		height: 100,
		texture: myAssets.graphics.button,
		//tileWidth: 200, // commented on purpose, not needed unless a stretchable button is desired
		//tileHeight: 100,
		// button tile data
		tiles: {
			normal: [0, 0],
			pressed: [1, 0]
		},
		// events
		onClick: function() {
			//alert('hello, world');
			console.log('click');
		},
		//test
		/*
		debug: true,
		debugData: '$activeTile $type $x $y $enabled $alpha'
		*/
	});

	// center the component
	this.myButton.center();
};

myState.init = function() {
	myState.createUI();
};
myState.draw = function() {
	this.surface.clear();
	this.myButton.draw();
};

var myGame = new myst.Game({
	canvasId: 'myst-example',
	state: myState,
	simpleLoop: true
});

var inputHandler = new myst.Input(myGame);

var myAssets = {
	graphics: {
		button: 'button.png'
	}
};

var myLoader = new myst.AssetLoader();

window.addEventListener('load', function() {
	// initialize the user interface extension
	myst.ui.init(inputHandler);
	// load assets
	myAssets = myLoader.load({
		assets: myAssets,
		done: myGame.run // run game when all is loaded
	});
});

