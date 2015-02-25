/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/

//Scroll lock and ensuring resizing doesn't affect the camera.

if(window.addEventListener){
    window.addEventListener('DOMMouseScroll',wheel,false);
}

function wheel(event)
{
    event.preventDefault();
    event.returnValue=false;
}
window.onmousewheel=document.onmousewheel=wheel;

var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

var renderer = new THREE.RaytracingRenderer();
renderer.shadowMapEnabled = true;
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight;
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
});

//Global Variables
var scene;
var cubemap;
var camera;
var controls;

function init(){
  scene = new THREE.Scene();

  var urls = [
    './skybox-assets/posx.png',
    './skybox-assets/negx.png',
    './skybox-assets/posy.png',
    './skybox-assets/negy.png',
    './skybox-assets/posz.png',
    './skybox-assets/negz.png'
  ];

  cubemap = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping(), render );

  var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
  shader.uniforms['tCube'].value = cubemap; // apply textures to shader
  var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  var skyBoxMaterial = new THREE.ShaderMaterial( {
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });
  var skybox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  scene.add(skybox);

  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0,150,400);
  camera.lookAt(scene.position);

  //Controls taken from Three.js tutorial - adds zoom and camera movement
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  //var ambientLight = new THREE.AmbientLight(0x222222);
  //scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  addCentralObject();
  addShells();
}

function addCentralObject(){
  var cubeGeom = new THREE.CubeGeometry(100, 100, 100);
  var cubeMaterial = new THREE.MeshNormalMaterial();

  var cube = new THREE.Mesh(cubeGeom, cubeMaterial);
  cube.position.set(0,0,0);
  scene.add(cube);
}

function addShells(){

  var radius = [
      150, 200, 250, 300, 350
  ];

  var ratio = [
     0.5, 0.55, 0.6, 0.65, 0.7
  ];

  var clearMaterial;
  var sphere;
  for(var i = 0; i < radius.length; i++){
    var pts = []; // points array - path profile points stored here
    var detail = .005; //half-circle detail - how many angle increments will be used to generate points
    var radiusInst = radius[i] ; //radius for half sphere
    for(var angle = 0.0; angle < Math.PI; angle+= detail)
      pts.push(new THREE.Vector3(Math.cos(angle) * radiusInst, 0, Math.sin(angle) * radiusInst));

    hemisphereGeom = new THREE.LatheGeometry(pts, 12);

    clearMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: cubemap, transparent: true, refractionRatio: ratio[i], opacity: 0.5 } );
    secondClearMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: cubemap, transparent: true, refractionRatio: ratio[i], opacity: 0.5 } );
    sphere = new THREE.Mesh(hemisphereGeom, clearMaterial);
    sphere.position.set(0,0,0);
    scene.add(sphere);
    secondSphere = new THREE.Mesh(hemisphereGeom, secondClearMaterial);
    secondSphere.position.set(0,0,0);
    secondSphere.rotation.y = 180*(Math.PI/180);
    scene.add(secondSphere);
  }
}

function update(){
  controls.update();
}

function render() {
  renderer.clear();
  renderer.render(scene, camera);
}

function animate(){
  requestAnimationFrame( animate );
  render();
  update();
}

init();
animate();
