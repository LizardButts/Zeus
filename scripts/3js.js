/* To run this code on a local server, enter the following into the terminal:
parcel ./index.html
*/

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// Camera Controls
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
/*camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
*/
camera.position.set(1, 1, 5);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();



const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);


const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FFFF});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

function animate(){
    box.rotation.x += 0.02;
    box.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);