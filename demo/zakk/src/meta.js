/*
 * Zakk
 * myst.js game demo
 * This project implements a simple HTML5 game.
 */

// meta.js | Defines essentials like version number and preprocessor variables.

/*jshint esversion:9*/

/**
 * @author Danijel Durakovic
 * @version 0.0.3
 */
//            ^
//            |
//            |
//   For the build system

//              For the interface
//                      |
//                      |
//                      V

const GAME_VERSION = '0.0.3';

// >-- preprocessor variables -->

//? if (typeof DEBUG === 'undefined') DEBUG = false;
//? RELEASE = !DEBUG;

// <-- preprocessor variables <--

//? if (DEBUG) {

	// debug-related constants are listed here
	// these will get stripped out when building release

	const DEBUG_SKIP_SPLASH		= 1;  // set to 1 to skip splash intro
	const DEBUG_SKIP_INTRO		= 1;  // set to 1 to skip the intro screen
	const DEBUG_SKIP_TITLE		= 1;  // set to 1 to skip the title screen

//? }
