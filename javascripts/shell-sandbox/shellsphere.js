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
		'./skybox-assets/posx.png',
		'./skybox-assets/negx.png',
		'./skybox-assets/posy.png',
		'./skybox-assets/negy.png',
		'./skybox-assets/posz.png',
		'./skybox-assets/negz.png'
	];

	cubemap = THREE.ImageUtils.loadTextureCube( urls, render );
	refractmap = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping(), render );

	var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
	shader.uniforms['tCube'].value = refractmap; // apply textures to shader
	var skyBoxGeometry = new THREE.CubeGeometry(2000, 2000, 2000);
	var skyBoxMaterial = new THREE.ShaderMaterial( {
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		transparent: true,
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

	var invisShader = THREE.InvisShader;
	var invisShaderUniforms = THREE.UniformsUtils.clone(invisShader.uniforms);
	invisShaderUniforms["tCube"] = refractmap;

	var refractionsRatios = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];
	var sphereRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];

	for(var i = 0; i < refractionsRatios.length; i++){

		console.log(i);
		invisShaderUniforms["mRefractionNumber"] = i;
		console.log(invisShaderUniforms["mRefractionNumber"]);
		invisShader.uniforms = invisShaderUniforms;
		console.log(invisShader.uniforms["mRefractionNumber"]);
		invisShaderUniforms["mRefractionRatio"] = refractionsRatios[i];

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: invisShader.fragmentShader,
			vertexShader: invisShader.vertexShader,
			uniforms: invisShader.uniforms,
			side: THREE.FrontSide
		});

		var sphere = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere);
	}

	var innerSphereGeom = new THREE.SphereGeometry(50, 100, 100);
	var innerClearMaterial = new THREE.MeshLambertMaterial( { envMap: cubemap, transparent: true, refractionRatio: 0.6, opacity: 0.8, side: THREE.BackSide } );
	var innerSphere = new THREE.Mesh(innerSphereGeom, innerClearMaterial);

	scene.add(sphere);

	var cubeGeom = new THREE.CubeGeometry(10, 10, 10);
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
	var cube = new THREE.Mesh(cubeGeom, cubeMaterial);
	scene.add(cube);

	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 50, 1).normalize();
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
