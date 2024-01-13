import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { scene } from './scene';

const pivotGroup = new THREE.Group();

function createRandomArray(depth, rows, columns) {
  const array = [];
  for (let d = 0; d < depth; d++) {
    const layer = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        // Randomly choose 'X' or 'O'
        // const value = Math.random() < 0.5 ? 'X' : 'O';
        const value = ' ';
        row.push(value);
      }
      layer.push(row);
    }
    array.push(layer);
  }
  return array;
}

function createRotatingToken(position, tokenLetter) {
  // Load a font
  const fontLoader = new FontLoader();

  const createTextGeometry = (text, font) => {
    return new TextGeometry(text, {
      font: font,
      size: 150,
      height: 15,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 5,
    });
  };

  fontLoader.load('Courier.json', (font) => {
  // Create text geometries
    const textGeometry = createTextGeometry(tokenLetter, font);

  // Create material
    // const material = new THREE.MeshPhongMaterial({ color: 0x00ffff, specular: 0x555555, shininess: 30 });
    // const material = new THREE.MeshPhongMaterial({ color: 0x00ffff, transparent: false });
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: false });

  // Create meshe
    const textMesh = new THREE.Mesh(textGeometry, material);

  // Position the meshe
    textMesh.position.copy(position);

    scene.add(textMesh);

    textGeometry.center();

    scene.add(pivotGroup);
    pivotGroup.add(textMesh);

  // Animation
  // Rotate the text mesh
  // pivotGroup.rotation.y += 0.05;

  });

}

function animateTokens () {
  // pivotGroup.rotation.y += 0.05;
}

export { createRandomArray, createRotatingToken, animateTokens };
