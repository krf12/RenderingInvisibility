/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/

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

var renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight;
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
});

var scene = new THREE.Scene();

var sphereGeom =  new THREE.SphereGeometry( 40, 32, 16 );

var urls = [
  './skybox-assets/posx.png',
  './skybox-assets/negx.png',
  './skybox-assets/posy.png',
  './skybox-assets/negy.png',
  './skybox-assets/posz.png',
  './skybox-assets/negz.png'
];

var cubemap = THREE.ImageUtils.loadTextureCube(urls);
cubemap.format = THREE.RGBFormat;

var refractionmap = texture = THREE.ImageUtils.loadTextureCube(
                         urls, new THREE.CubeRefractionMapping() );

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

var clearMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: refractionmap, transparent: true, refractionRatio: .6, opacity: 0.5 } );
var sphere = new THREE.Mesh( sphereGeom.clone(), clearMaterial );
sphere.position.set(-100, 50, 50);
scene.add( sphere );

camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
scene.add(camera);
camera.position.set(0,150,400);
camera.lookAt(sphere.position);

//Controls taken from Three.js tutorial - adds zoom and camera movement
var controls = new THREE.OrbitControls( camera, renderer.domElement );

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
