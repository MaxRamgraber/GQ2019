var debounceMatrices = [];

function smoothCamera(inputMatrix, debounce_count=5) {
  // Creates a moving average over the last n matrices.
  debounceMatrices.push(inputMatrix);
  if(debounceMatrices.length < debounce_count + 1) {
    return inputMatrix;
  }
  else {
    debounceMatrices.shift();
    let outputMatrix = new THREE.Matrix4().multiplyScalar(0);
    for(n in debounceMatrices) {
      for(i in debounceMatrices[n].elements) {
        outputMatrix.elements[i] += debounceMatrices[n].elements[i];
      }
    }
    return outputMatrix.multiplyScalar(1 / debounce_count);
  }
}
