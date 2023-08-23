import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";
let scene = "";
let camera = "";
let renderer = "";
const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGL1Renderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const vertice = [];
  const sprite = new THREE.TextureLoader().load("/public/images/bubble.png");
  for (let i = 0; i < 10000; i++) {
    const x = 2000 * Math.random() - 1000;
    const y = 2000 * Math.random() - 1000;
    const z = 2000 * Math.random() - 1000;
    vertice.push(x, y, z);
  }
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertice, 3)
  );
  const material = new THREE.PointsMaterial({
    size: 35,
    sizeAttenuation: true,
    map: sprite,
    alphaTest: 0.5,
    transparent: true,
  });
  material.color.setHSL(1.0, 0.3, 0.7);

  // Added light
  const light = new THREE.PointLight(0xffffff, 100, 50);
  light.position.set(0, 10, 4);
  light.castShadow = true;
  light.shadow.mapSize.width = 512; // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 500;

  scene.add(light);
  const particle = new THREE.Points(geometry, material);
  scene.add(particle);
  camera.position.z = 200;

  //controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  //transform controll
  const transformControll = new TransformControls(camera, renderer.domElement);

  transformControll.addEventListener("dragging-changed", (e) => {
    controls.enabled = !e.value;
  });

  // transformControll.attach(particle);
  scene.add(transformControll);
};
init();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
