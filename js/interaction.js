import * as THREE from 'three';
import { camera, cubes } from './scene';
import { createRotatingToken } from './tokens.js';
import { highlightCell, dehighlightCell } from './ui';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredCube = null;

function handleMouseMove(event, ticTacToeData) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(cubes);

  if (hoveredCube && !hoveredCube.isClicked) {
    hoveredCube.material.color.set(0xcccccc);
    dehighlightCell();
  }

  hoveredCube = intersects.length > 0 ? intersects[0].object : null;

  if (hoveredCube && !hoveredCube.isClicked) {
    hoveredCube.material.color.set('#ff0000');
    highlightCell();
  } else if (hoveredCube && hoveredCube.isClicked) {
    dehighlightCell();
  }
}

function handleMouseClick(event, ticTacToeData) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(cubes);

  if (intersects.length > 0) {
    const selectedCube = intersects[0].object;
    selectedCube.material.color.set('#ffffff');
    selectedCube.isClicked = true;

    // Perform additional game logic based on the clicked cube
    const selectedCubePosition = selectedCube.position ;
    const layer = (3-(selectedCubePosition.y/100))/2;
    const row = (3-(selectedCubePosition.x/100))/2;
    const col = (3-(selectedCubePosition.z/100))/2;

    ticTacToeData[layer][row][col] = 'X';
    
    // Find the corresponding div based on the data attributes
    const targetDiv = document.querySelector(`.cell[data-layer="${layer}"][data-row="${row}"][data-column="${col}"]`);

    // Check if the div is found and then change its border color
    if (targetDiv) {
      targetDiv.style.borderColor = '#ff0000'; // Set the border color to red
      targetDiv.textContent = ticTacToeData[layer][row][col];
    }
    const coordinatesPointText = `Marked Coordinates: 
    X: ${layer},
    Y: ${row},
    Z: ${col}`;
      // console.log(ticTacToeData);

    // Add sphere inside
    createRotatingToken(selectedCubePosition);
    console.log("printed");
  }
}

export { handleMouseMove, handleMouseClick, hoveredCube };
