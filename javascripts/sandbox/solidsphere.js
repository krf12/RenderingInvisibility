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

	 var lineMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

		var lineGeometry = new THREE.Geometry();

	var normalArray = new Array();
	var ratio = 500;

	for(i = 0; i < 10; i++){

		var linex = ratio * Math.sin(Math.PI/5) * Math.cos(Math.PI/5);
		var liney = ratio * Math.sin(Math.PI/5) * Math.sin(Math.PI/5);
		var linez = ratio * Math.cos(Math.PI/5);
		var normalVector = new THREE.Vector3(linex, liney, linez);

		normalArray.push(normalVector);
		ratio = ratio - 50;

	}

	var incidentVector = new THREE.Vector3(1000, 1000, 1000);
	incidentVector.normalize();

	var lineArray = new Array(incidentVector);

  var inVector = refractIn(incidentVector, normalArray[0]);
	lineArray.push(inVector);

	var firstVector = refractFull(inVector, normalArray[1], 1.0/0.9);
	lineArray.push(firstVector);
  var secondVector = refractFull(firstVector, normalArray[2], 0.9/0.8);
	lineArray.push(secondVector);
	var thirdVector = refractFull(secondVector, normalArray[3], 0.8/0.7);
	lineArray.push(thirdVector);
	var fourthVector = refractFull(thirdVector, normalArray[4], 0.7/0.6);
	lineArray.push(fourthVector);
	var fifthVector = refractFull(fourthVector, normalArray[5], 0.6/0.5);
	lineArray.push(fifthVector);
	var sixthVector = refractFull(fifthVector, normalArray[6], 0.5/0.4);
	lineArray.push(sixthVector);
	var seventhVector = refractFull(sixthVector, normalArray[7], 0.4/0.3);
	lineArray.push(seventhVector);
	var eigthVector = refractFull(seventhVector, normalArray[8], 0.3/0.2);
  lineArray.push(eigthVector);
	var ninthVector = refractFull(eigthVector, normalArray[9], 0.2/0.1);
	lineArray.push(ninthVector);

	var tenthVector = refractFull(ninthVector, normalArray[8], 0.1/0.2);
	lineArray.push(tenthVector);
	var eleventhVector = refractFull(tenthVector, normalArray[7], 0.2/0.3);
	lineArray.push(eleventhVector);
	var twelfthVector = refractFull(eleventhVector, normalArray[6], 0.3/0.4);
	lineArray.push(twelfthVector);
	var thirteenthVector = refractFull(twelfthVector, normalArray[5], 0.4/0.5);
	lineArray.push(thirteenthVector);
	var fourteenthVector = refractFull(thirteenthVector, normalArray[4], 0.5/0.6);
	lineArray.push(fourteenthVector);
	var fifteenthVector = refractFull(fourteenthVector, normalArray[3], 0.6/0.7);
	lineArray.push(fifteenthVector);
	var sixteenthVector = refractFull(fifteenthVector, normalArray[2], 0.7/0.8);
	lineArray.push(sixteenthVector);
 	var seventeenthVector = refractFull(sixteenthVector, normalArray[1], 0.8/0.9);
	lineArray.push(seventeenthVector);

	outVector = refractOut(seventeenthVector, normalArray[0]);
	lineArray.push(outVector);

	var lineRatio = 50;

	for(j = 0; j < lineArray.length; j++){
		//console.log(lineArray[j]);

		var tempVector = new THREE.Vector3(0, 0, 0);
		tempVector.copy(lineArray[j]);
		if(j != 0){
		tempVector.normalize();
		tempVector.multiplyScalar(lineRatio);
		}

		console.log(tempVector);


		lineGeometry.vertices.push(tempVector);

		lineRatio = lineRatio + 50;
	}

	var line = new THREE.Line(lineGeometry, lineMaterial);
	scene.add(line);

	var cubeGeom = new THREE.CubeGeometry(25, 25, 25);
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
