/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/

var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

var renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

//var sphereTexture = new THREE.ImageUtils.loadTexture('./tutorial-assets/box.png');
var sphereGeom =  new THREE.SphereGeometry( 40, 32, 16 );

// overlapping translucent red/green/blue spheres
var redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0.5 } );
var sphere = new THREE.Mesh( sphereGeom.clone(), redMaterial );
sphere.position.set(-100, 50, 50);
scene.add( sphere );

var greenMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.5 } );
var sphere = new THREE.Mesh( sphereGeom.clone(), greenMaterial );
sphere.position.set(-100, 50, -50);
scene.add( sphere );

var blueMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, transparent: true, opacity: 0.5 } );
var sphere = new THREE.Mesh( sphereGeom.clone(), blueMaterial );
sphere.position.set(-100, 50, -150);
scene.add( sphere );

camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
scene.add(camera);
camera.position.set(0,150,400);
camera.lookAt(sphere.position);

var controls = new THREE.OrbitControls( camera, renderer.domElement );

var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

scene.add(skybox);

var ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);
var light = new THREE.PointLight(0xffffff);
light.position.set(0,250,0);
scene.add(light);

var clock = new THREE.Clock();

function update(){
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

function animate(){
  requestAnimationFrame( animate );
  render();
  update();
}

animate();
