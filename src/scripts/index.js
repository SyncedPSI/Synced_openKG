/* global window, document */
import input from './shared/input';
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  Vector3,
} from 'three';


export default () => {
  input();

  let camera, scene, renderer, stars = [];
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  let cameraAmpl = { x: 2, y: 3};
  let cameraVelocity = 0.05;
  let mousePosition = { x: 0, y: 0 };
  const normalizedOrientation = new Vector3();
  const lookAt = new Vector3();

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  function init() {
    camera = new PerspectiveCamera(50, screenWidth / screenHeight, 1, 1000);
    camera.position.set(0, 0, 10);
    scene = new Scene();
    scene.background = new Color(0x0e0e0f);
    renderer = new WebGLRenderer();
    renderer.setSize(screenWidth, screenHeight);
    const devicePixelRatio = window.devicePixelRatio ? Math.min(1.6, window.devicePixelRatio) : 1;
    renderer.setPixelRatio(devicePixelRatio);
    document.body.appendChild(renderer.domElement);
  }

  function addSphere() {
    for (let i = 0; i < 300; i++) {
      let geometry = new SphereBufferGeometry(.6, 2, 2);;
      let material = new MeshBasicMaterial({
        color: 0x4F4F4F
      });
      let sphere = new Mesh(geometry, material);
      sphere.position.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        -Math.random() * 0.5
      ).normalize().multiplyScalar(getRandomFloat(100, 300));

      scene.add(sphere);
      stars.push(sphere);
    }
  }

  function render() {
    requestAnimationFrame(render);
    camera.position.x += (normalizedOrientation.x - camera.position.x) * cameraVelocity;
    camera.position.y += (normalizedOrientation.y - camera.position.y) * cameraVelocity;
    camera.lookAt(lookAt);
    renderer.render(scene, camera);
  }

  function onDocumentMouseMove(event) {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;

    normalizedOrientation.set(
      -((mousePosition.x / screenWidth) - 0.5) * cameraAmpl.x,
      ((mousePosition.y / screenHeight) - 0.5) * cameraAmpl.y,
      0.5,
    );
  }

  function getRandomFloat (min, max) {
    return (Math.random() * (max - min)) + min
  };

  init();
  addSphere();
  render();
};
