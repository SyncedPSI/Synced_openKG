/* global window, document */
import input from './shared/input';
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Color
} from 'three';


export default () => {
  input();


  var camera, scene, renderer, stars = [];

  function init() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;
    scene = new Scene();
    scene.background = new Color(0x0e0e0f);
    renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  function addSphere() {
    for (var z = -1000; z < 1000; z += 20) {
      var geometry = new SphereGeometry(0.5, 32, 32);
      var material = new MeshBasicMaterial({
        color: 0xffffff
      });
      var sphere = new Mesh(geometry, material);
      sphere.position.x = Math.random() * 1000 - 500;
      sphere.position.y = Math.random() * 1000 - 500;
      sphere.position.z = z;
      sphere.scale.x = sphere.scale.y = 2;
      scene.add(sphere);
      stars.push(sphere);
    }
  }

  function animateStars() {
    for (var i = 0; i < stars.length; i++) {
      let star = stars[i];
      star.position.z += i / 10;
      if (star.position.z > 1000) star.position.z -= 2000;

    }
  }

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    animateStars();
  }

  init();
  addSphere();
  render();
};
