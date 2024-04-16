/*
 * Zakk
 * myst.js game demo
 * This project implements a simple HTML5 game.
 */

// game_state.js | Main game state.

/*jshint esversion:9*/

//
// main state
//
const gameState  = new myst.State();

gameState.init = function() {
	// graphics
	this.gfx_master = assets.game.graphics.master;

	this.world = new World();
	this.camera = new Camera();

	this.player = {
		x: 0,
		y: 0
	};
};

gameState.enter = function() {
	// we've entered the game state. we need to prepare the game
	// set surface background redraw color
	this.surface.setFillClearMethod('#1e1e22');
	// create the game world
	this.world = new World();
	this.world.loadLevel(assets.game.data.level1);
	// TODO: create the game camera
	// TODO: center the camera on the player
	// we're all done!
};

gameState.draw = function() {
	const map_w = this.world.width;
	const map_h = this.world.height;

	let x, y, posx, posy, ix, iy, tileData, tileRow, tileCol, tileX, tileY;

	let view_x = this.camera.x;
	let view_y = this.camera.y;

	// clear surface first
	this.surface.clear();
	
	// draw backgrounds and walls
	for (y = 0; y < VIEWPORT_TILES_Y; ++y) {
		for (x = 0; x < VIEWPORT_TILES_X; ++x) {
			posx = x * TILESIZE - (view_x % TILESIZE);
			posy = y * TILESIZE - (view_y % TILESIZE);
			ix = x + Math.floor(view_x / TILESIZE);
			iy = y + Math.floor(view_y / TILESIZE);

			if (ix < 0 || iy < 0 || ix > map_w - 1 || iy > map_h - 1) {
				continue; // out of map bounds
			}

			tileData = this.world.map.get(ix, iy);
			const background = tileData[0];
			const wall = tileData[1];

			if (background > -1) {
			}
			if (wall > -1) {
				tileRow = Math.floor(wall / MASTER_TILESET_COLS);
				tileCol = wall % MASTER_TILESET_COLS;
				tileX = tileCol * TILESIZE;
				tileY = tileRow * TILESIZE;
				this.paint.tile(this.gfx_master, posx, posy, TILESIZE, TILESIZE, tileX, tileY);
			}
		}
	}

	this.paint.rectFill(this.player.x - view_x, this.player.y - view_y, 20, 40, 'red');

	// draw scanlines
	this.paint.graphics(assets.preload.graphics.scanlines, 0, 0);
};

gameState.update = function() {
	// debug~ move camera with arrow keys

	if (keyHandler.isKeyDown(keyHandler.keyLeft)) {
		/*
		if (this.camera[0] > 0) {
			this.camera[0] -= 5;
		}
		*/
		if (this.player.x > 0) {
			this.player.x -= 2;
		}
	}
	else if (keyHandler.isKeyDown(keyHandler.keyRight)) {
		/*
		if (this.camera[0] < this.world.width * TILESIZE - VIEWPORT_W) {
			this.camera[0] += 5;
		}
		*/
		this.player.x += 2;
	}

	if (keyHandler.isKeyDown(keyHandler.keyUp)) {
		/*
		if (this.camera[1] > 0) {
			this.camera[1] -= 5;
		}
		*/
		if (this.player.y > 0) {
			this.player.y -= 2;
		}
	}
	else if (keyHandler.isKeyDown(keyHandler.keyDown)) {
		/*
		if (this.camera[1] < this.world.height * TILESIZE - VIEWPORT_H) {
			this.camera[1] += 5;
		}
		*/
		this.player.y += 2;
	}

	// follow player with camera

	const player_center_x = this.player.x + 10;
	const player_center_y = this.player.y + 20;

	const camera_ideal_x = player_center_x - VIEWPORT_W / 2;
	const camera_ideal_y = player_center_y - VIEWPORT_H / 2;


	this.camera.moveTo(
	myst.clamp(camera_ideal_x, 0, this.world.width * TILESIZE - VIEWPORT_W),
	myst.clamp(camera_ideal_y, 0, this.world.height * TILESIZE - VIEWPORT_H)
	);

};