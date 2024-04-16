/*
 * Zakk
 * myst.js game demo
 * This project implements a simple HTML5 game.
 */

// camera.js | Implements the Camera class.

/*jshint esversion:9*/

const Camera = function() {
	this.x = 0;
	this.y = 0;

	/**
	 * Moves the camera to the specific location.
	 */
	this.moveTo = function(x, y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Moves the camera into position such that the entity is
	 * in the center.
	 * 
	 * @param {object} entity
	 */
	this.fixateOn = function(entity) {
	}
};