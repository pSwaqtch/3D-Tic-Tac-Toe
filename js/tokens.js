import * as THREE from 'three';
import { scene } from './scene';

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

function createRotatingToken(position) {
  const tokenGeometry = new THREE.BoxGeometry(80,80,80);
  const tokenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const token = new THREE.Mesh(tokenGeometry, tokenMaterial);

  token.position.copy(position);

  const animateToken = () => {
    token.rotation.x += 0.01;
    token.rotation.y += 0.01;
    requestAnimationFrame(animateToken);
  };

  animateToken();

  scene.add(token);
}

export { createRandomArray, createRotatingToken };
