/* global window, document */
import input from './shared/input';
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  Vector3,
  Math as threeMath
} from 'three';


export default () => {
  input();


  let camera, scene, renderer, stars = [];
  let longitude = 0;
  let latitude = 0;
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  function init() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.target = new Vector3(0, 0, 0);
    camera.position.x = 5;
    camera.position.z = 5;
    scene = new Scene();
    scene.background = new Color(0x0e0e0f);
    renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  function addSphere() {
    for (let z = -1000; z < 1000; z += 10) {
      let geometry = new SphereGeometry(0.5, 32, 32);
      let material = new MeshBasicMaterial({
        color: 0xffffff
      });
      let sphere = new Mesh(geometry, material);
      sphere.position.x = Math.random() * 1000 - 500;
      sphere.position.y = Math.random() * 1000 - 500;
      sphere.position.z = z;
      sphere.scale.x = sphere.scale.y = 2;
      scene.add(sphere);
      stars.push(sphere);
    }
  }

  function render() {
    requestAnimationFrame(render);
    latitude = Math.max(-30, Math.min(30, latitude));
    camera.target.x = 2 * Math.sin(threeMath.degToRad(90 - latitude)) * Math.cos(threeMath.degToRad(longitude));
    camera.target.y = 2 * Math.cos(threeMath.degToRad(90 - latitude));
    camera.target.z = 2 * Math.sin(threeMath.degToRad(90 - latitude)) * Math.sin(threeMath.degToRad(longitude));
    camera.lookAt(camera.target);
    renderer.render(scene, camera);
  }

  function onDocumentMouseMove(event) {
    longitude = (event.clientX) * 0.1;
    latitude = (-event.clientY) * 0.1;
  }

  init();
  addSphere();
  render();
};
