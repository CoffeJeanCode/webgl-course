// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  // WebGL background color
  renderer.setClearColor("#101010", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const loader = new THREE.TextureLoader();

  const earthTexture = loader.load("earth.jpg");
  const mooonTexture = loader.load("moon.jpg");

  // Setup a material
  const earthMaterial = new THREE.MeshBasicMaterial({
    map: earthTexture,
    flatShading: true,
  });

  const moonMaterial = new THREE.MeshBasicMaterial({
    map: mooonTexture,
    flatShading: true,
  });

  // Setup a mesh with geometry + material
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);

  moonMesh.position.set(1.5, 1, 0);
  moonMesh.scale.setScalar(0.25);

  scene.add(moonMesh);
  scene.add(earthMesh);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
