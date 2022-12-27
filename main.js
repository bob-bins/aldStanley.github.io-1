import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import earthBumpImg from "./pictures/earthBump.jpeg"
import earthTextureImg from "./pictures/earthTexture.jpeg"
import marsTextureImg from "./pictures/marsTexture.jpeg"
import spaceBGImg from "./pictures/spaceBG.jpg"



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

//Mypic rectangle
const Mypic = new THREE.TextureLoader().load('pictures/IMG_6594.jpeg');
const me = new THREE.Mesh(
    new THREE.PlaneGeometry(10,17),
    new THREE.MeshStandardMaterial({
      map: Mypic,
    })
);
scene.add(me);
me.position.z = -25;
me.position.x = 5;
me.position.y = 3;


//moon
const moonTexture = new THREE.TextureLoader().load('pictures/moon.jpeg');
const moonNormal = new THREE.CubeTextureLoader().load('pictures/normal.jpeg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
      map:moonTexture,
      normalMap: moonNormal
    })
);
scene.add(moon);
moon.position.z = 15;
moon.position.x = 20;

// //earth
const earthTexture = new THREE.TextureLoader().load(earthTextureImg);
const earthNormal = new THREE.CubeTextureLoader().load(earthBumpImg);
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
      map: earthTexture,
      normalMap: earthNormal,
    })
);
scene.add(earth);
earth.position.z = 15;
earth.position.x = -5;

//mars
const marsTexture = new THREE.TextureLoader().load(marsTextureImg);
const marsNormal = new THREE.CubeTextureLoader().load('pictures/marsNormal.jpeg');
const mars = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
      map: marsTexture,
      normalMap: marsNormal,
    })
);
scene.add(mars);
//mars.position.z = 5;
mars.position.x = -15;

//Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,0,30);
const ambientLight = new THREE.AmbientLight(0xffffff);
//scene.add(ambientLight);
scene.add(pointLight);

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
const controls = new OrbitControls(camera, renderer.domElement);
//scene.add(lightHelper, gridHelper, controls);


//adding stars to the background
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(90));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

//Space background
const spaceTexture = new THREE.TextureLoader().load(spaceBGImg);
scene.background = spaceTexture;



//scroll animation
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  
  camera.position.z = t*-0.005;
  camera.position.x = t*-0.002;
  camera.rotation.y = t*-0.002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);

  //earth rotation
  earth.rotation.x += 0.005;
  earth.rotation.y += 0.005;

  //mars rotation
  mars.rotation.x += 0.01;
  mars.rotation.z += 0.005;

  //me rotation
  me.rotation.y += 0.02;

  moon.rotation.x -= 0.005;
  moon.rotation.y += 0.005;

  controls.update();

  renderer.render(scene,camera);

  camera.x += 0.1;
}

animate();