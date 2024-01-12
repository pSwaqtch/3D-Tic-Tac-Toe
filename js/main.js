// main.js
import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

import { init, animate, onWindowResize } from './scene';
import { handleMouseMove, handleMouseClick } from './interaction';
import { generateLayers, generateCellWidth, } from './ui';
import { createRandomArray } from './tokens.js';

const ticTacToeData = createRandomArray(4, 4, 4);

init(ticTacToeData);
animate();

window.addEventListener("mousemove", (event) => handleMouseMove(event, ticTacToeData));
window.addEventListener("click", (event) => handleMouseClick(event, ticTacToeData));
document.addEventListener("DOMContentLoaded", () => generateLayers(ticTacToeData));
document.addEventListener("DOMContentLoaded", generateCellWidth);
window.addEventListener('resize', onWindowResize);
