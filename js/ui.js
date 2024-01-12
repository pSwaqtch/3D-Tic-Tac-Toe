import { hoveredCube } from './interaction';

function generateLayers(ticTacToeData) {
  // Create a 3D 4x4x4 char array and fill it with random 'X' and 'O'
  for (let label = 0; label < 4; label++) {
    const ticTacToeGrid = document.getElementById("ticTacToeGrid" + label);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("data-layer", label);
        cell.setAttribute("data-row", i);
        cell.setAttribute("data-column", j);

        // Set the content of each cell based on the data in the array
        cell.textContent = ticTacToeData[label][i][j];

        ticTacToeGrid.appendChild(cell);
      }
    }
  }
}

function generateCellWidth() {
  var elements = document.querySelectorAll(".cell:not(.label)");

    // Loop through each element and set the width based on the height
  elements.forEach(function(element) {
    var heightValue = getComputedStyle(element).height;
    element.style.width = heightValue;
  });
};

function highlightCell() {
  if (hoveredCube) {
    const hoveredCubePosition = hoveredCube.position;

    const layer = (3-(hoveredCubePosition.y/100))/2;
    const row = (3-(hoveredCubePosition.x/100))/2;
    const col = (3-(hoveredCubePosition.z/100))/2;

    const targetDiv = document.querySelector(`.cell[data-layer="${layer}"][data-row="${row}"][data-column="${col}"]`);

    if (targetDiv) {
      targetDiv.style.borderColor = '#0f0';
      targetDiv.style.borderStyle = 'ridge';
      targetDiv.style.borderWidth = '5px';
    }

    const targetDivLabel = document.querySelector(`.grid[layerid="${layer}"]`);

    if(targetDivLabel) {
      targetDivLabel.style.borderColor = '#00ff00';
      targetDivLabel.style.borderStyle = 'ridge';
      targetDivLabel.style.borderWidth = '5px';
    }

  }
}

function dehighlightCell() {
  if (hoveredCube) {
    const hoveredCubePosition = hoveredCube.position;

    const layer = (3-(hoveredCubePosition.y/100))/2;
    const row = (3-(hoveredCubePosition.x/100))/2;
    const col = (3-(hoveredCubePosition.z/100))/2;

    const targetDiv = document.querySelector(`.cell[data-layer="${layer}"][data-row="${row}"][data-column="${col}"]`);

    if (targetDiv && !hoveredCube.isClicked) {
      targetDiv.style.borderColor = '';
      targetDiv.style.borderStyle = '';
      targetDiv.style.borderWidth = '';
    }

    const targetDivLabel = document.querySelector(`.grid[layerid="${layer}"]`);

    if(targetDivLabel) {
      targetDivLabel.style.borderColor = '';
    }
  }
}

export { generateLayers, generateCellWidth, highlightCell, dehighlightCell };
