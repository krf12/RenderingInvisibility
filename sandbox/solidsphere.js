var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
var viewAngle = 45, aspect = screenWidth/screenHeight, near = 0.1, far = 20000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(screenWidth, screenHeight);
document.body.appendChild(renderer.domElement);

//Global Variables
var scene, camera, cubemap, controls;

function init(){

	scene = new THREE.Scene();

	var urls = [
		'../pages/skybox-assets/posx.png',
		'../pages/skybox-assets/negx.png',
		'../pages/skybox-assets/posy.png',
		'../pages/skybox-assets/negy.png',
		'../pages/skybox-assets/posz.png',
		'../pages/skybox-assets/negz.png'
	];
	
	cubemap = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping(), render );
	
	var shader = THREE.ShaderLib['cube']; //init cube shader from built-in lib
	shader.uniforms['tCube'].value = cubemap; //apply textures to shader
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

	camera = new THREE.PerspectiveCamera ( viewAngle, aspect, near, far );
	scene.add(camera);
	camera.position.set(0, 150, 400);
	camera.lookAt(scene.position);

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	var sphereGeom = new THREE.SphereGeometry(150, 100, 100);
	var clearMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, refractionRatio: 0.6, opacity: 0.5 } );
	
	var sphere = new THREE.Mesh(sphereGeom, clearMaterial);
	scene.add(sphere);
	
	var floorMaterial = new THREE.MeshBasicMaterial( { color: 0x222222, side: THREE.DoubleSide} );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -155;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);
		

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