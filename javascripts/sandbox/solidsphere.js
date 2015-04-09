var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
var viewAngle = 45, aspect = screenWidth/screenHeight, near = 0.1, far = 20000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(screenWidth, screenHeight);
document.body.appendChild(renderer.domElement);

//Global Variables
var scene, camera, cubemap, controls, innerControls, keyboard;
var innerSphere;
var sphere;
var refractmap;
var innerCameraActive = false;
var params = {
		chromatic: false,
};

function init(){

	var gui = new dat.GUI({width : 250});
	gui.add(params, 'chromatic', "Chromatic?");
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

	if(params.chromatic){
		console.log("check");

		var ChromaticShader = THREE.ChromaticShader;
		var ChromaticUniforms = THREE.UniformsUtils.clone( ChromaticShader.uniforms );
		ChromaticUniforms[ "tCube" ].value = refractmap;

		var sphereGeom = new THREE.SphereGeometry(500,64,64);
		var clearMaterial = new THREE.ShaderMaterial( {
			fragmentShader: ChromaticShader.fragmentShader,
			vertexShader: ChromaticShader.vertexShader,
			uniforms: ChromaticUniforms,
			side: THREE.FrontSide
		});
		sphere = new THREE.Mesh(sphereGeom, clearMaterial);

		var ChromaticInnerShader = THREE.ChromaticInnerShader;
		var ChromaticInnerUniforms = THREE.UniformsUtils.clone( ChromaticInnerShader.uniforms );
		ChromaticInnerUniforms[ "tCube" ].value = refractmap;

		var innerGeom = new THREE.SphereGeometry(250,64,64);

		var innerClearMaterial = new THREE.ShaderMaterial( {
			fragmentShader: ChromaticInnerShader.fragmentShader,
			vertexShader: ChromaticInnerShader.vertexShader,
			uniforms: ChromaticInnerUniforms,
			side: THREE.FrontSide
		});

		innerSphere = new THREE.Mesh(innerGeom, innerClearMaterial);

	}
	else{
		console.log("other check");

		var InvisibilityShader = THREE.InvisibilityShader;
		var InvisibilityUniforms = THREE.UniformsUtils.clone( InvisibilityShader.uniforms );
		InvisibilityUniforms[ "tCube" ].value = refractmap;

		var sphereGeom = new THREE.SphereGeometry(500,64,64);
		var clearMaterial = new THREE.ShaderMaterial( {
			fragmentShader: InvisibilityShader.fragmentShader,
			vertexShader: InvisibilityShader.vertexShader,
			uniforms: InvisibilityUniforms,
			side: THREE.FrontSide
		});
		sphere = new THREE.Mesh(sphereGeom, clearMaterial);

		var InvisibilityInnerShader = THREE.InvisibilityInnerShader;
		var InvisibilityInnerUniforms = THREE.UniformsUtils.clone( InvisibilityInnerShader.uniforms );
		InvisibilityInnerUniforms[ "tCube" ].value = refractmap;

		var innerGeom = new THREE.SphereGeometry(250,64,64);

		var innerClearMaterial = new THREE.ShaderMaterial( {
			fragmentShader: InvisibilityInnerShader.fragmentShader,
			vertexShader: InvisibilityInnerShader.vertexShader,
			uniforms: InvisibilityInnerUniforms,
			side: THREE.FrontSide
		});

		innerSphere = new THREE.Mesh(innerGeom, innerClearMaterial);
	}


	var innerSphereGeom = new THREE.SphereGeometry(250, 100, 100);
	var innerClearMaterial2 = new THREE.MeshLambertMaterial( { envMap: refractmap, transparent: true, refractionRatio: 0.6, opacity: 0.8, side: THREE.BackSide } );
	var innerSphere2 = new THREE.Mesh(innerSphereGeom, innerClearMaterial2);

	scene.add(innerSphere2);
	scene.add(innerSphere);
	scene.add(sphere);

	var cubeGeom = new THREE.CubeGeometry(100, 100, 100);
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
	var cube = new THREE.Mesh(cubeGeom, cubeMaterial);
	scene.add(cube);

	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 50, 1).normalize();
	scene.add(directionalLight);

}

function updateSphere(){
	if(params.chromatic){

		var ChromaticShader = THREE.ChromaticShader;
		var ChromaticUniforms = THREE.UniformsUtils.clone( ChromaticShader.uniforms );
		ChromaticUniforms[ "tCube" ].value = refractmap;

		var clearMaterial = new THREE.ShaderMaterial( {
			fragmentShader: ChromaticShader.fragmentShader,
			vertexShader: ChromaticShader.vertexShader,
			uniforms: ChromaticUniforms,
			side: THREE.FrontSide
		});
		sphere.material = clearMaterial;

		var ChromaticInnerShader = THREE.ChromaticInnerShader;
		var ChromaticInnerUniforms = THREE.UniformsUtils.clone( ChromaticInnerShader.uniforms );
		ChromaticInnerUniforms[ "tCube" ].value = refractmap;

		var innerClearMaterial = new THREE.ShaderMaterial( {
			fragmentShader: ChromaticInnerShader.fragmentShader,
			vertexShader: ChromaticInnerShader.vertexShader,
			uniforms: ChromaticInnerUniforms,
			side: THREE.FrontSide
		});

		innerSphere.material = innerClearMaterial;

	}
	else{

		var InvisibilityShader = THREE.InvisibilityShader;
		var InvisibilityUniforms = THREE.UniformsUtils.clone( InvisibilityShader.uniforms );
		InvisibilityUniforms[ "tCube" ].value = refractmap;

		var clearMaterial = new THREE.ShaderMaterial( {
			fragmentShader: InvisibilityShader.fragmentShader,
			vertexShader: InvisibilityShader.vertexShader,
			uniforms: InvisibilityUniforms,
			side: THREE.FrontSide
		});
		sphere.material = clearMaterial;

		var InvisibilityInnerShader = THREE.InvisibilityInnerShader;
		var InvisibilityInnerUniforms = THREE.UniformsUtils.clone( InvisibilityInnerShader.uniforms );
		InvisibilityInnerUniforms[ "tCube" ].value = refractmap;

		var innerClearMaterial = new THREE.ShaderMaterial( {
			fragmentShader: InvisibilityInnerShader.fragmentShader,
			vertexShader: InvisibilityInnerShader.vertexShader,
			uniforms: InvisibilityInnerUniforms,
			side: THREE.FrontSide
		});

		innerSphere.material = innerClearMaterial;
	}

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

	updateSphere();

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
