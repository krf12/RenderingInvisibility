var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
var viewAngle = 45, aspect = screenWidth/screenHeight, near = 0.1, far = 20000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(screenWidth, screenHeight);
document.body.appendChild(renderer.domElement);

//Global Variables
var scene, camera, cubemap, controls, innerControls, keyboard;
var innerCameraActive = false;

function init(){
	keyboard = new THREEx.KeyboardState();
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
	camera.position.set(0, 150, 400);
	camera.lookAt(scene.position);
	scene.add(camera);

	innerCamera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
	innerCamera.position.set(0, 0, 50);
	innerCamera.lookAt(scene.position);
	scene.add(innerCamera);

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	innerControls = new THREE.OrbitControls( innerCamera, renderer.domElement);


	var sphereGeom = new THREE.SphereGeometry(500, 100, 100);
	var clearMaterial = new THREE.MeshPhongMaterial( { color: 0x660066, transparent: true, refractionRatio: 0.6, opacity: 0.5, side: THREE.DoubleSide } );
	var sphere = new THREE.Mesh(sphereGeom, clearMaterial);

	var innerSphereGeom = new THREE.SphereGeometry(250, 100, 100);
	var innerClearMaterial = new THREE.MeshPhongMaterial( { color: 0x660066, transparent: true, refractionRatio: 0.6, opacity: 0.8, side:THREE.FrontSide } );
	var innerSphere = new THREE.Mesh(innerSphereGeom, innerClearMaterial);

	var innerClearMaterial2 = new THREE.MeshLambertMaterial( { color: 0xff0000, transparent: true, refractionRatio: 0.6, opacity: 0.8, side:THREE.BackSide } );
	var innerSphere2 = new THREE.Mesh(innerSphereGeom, innerClearMaterial2);

	scene.add(innerSphere);
	scene.add(innerSphere2);
	scene.add(sphere);

	var cubeGeom = new THREE.CubeGeometry(25, 25, 25);
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
	var cube = new THREE.Mesh(cubeGeom, cubeMaterial);
	scene.add(cube);

	var floorMaterial = new THREE.MeshBasicMaterial( { color: 0x222222, side: THREE.DoubleSide} );
	var floorGeometry = new THREE.PlaneGeometry(3000, 3000, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -500;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);



}

function update(){
	if(innerCameraActive){
		innerControls.update();
	}
	else{
		controls.update();
	}
	if ( keyboard.pressed("1") )
	{  innerCameraActive = true;  }
	if ( keyboard.pressed("2") )
	{  innerCameraActive = false;  }
}

function render() {
  renderer.clear();
  if (innerCameraActive)
	{  renderer.render( scene, innerCamera );  }
	else
	{  renderer.render( scene, camera );  }
}

function animate(){
  requestAnimationFrame( animate );
  render();
  update();
}

init();
animate();
