var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
var viewAngle = 45, aspect = screenWidth/screenHeight, near = 0.1, far = 20000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(screenWidth, screenHeight);
document.body.appendChild(renderer.domElement);

//Global Variables
var scene, camera, cubemap, controls, innerControls, keyboard;
var innerCameraActive = false;
var sphere0, sphere1, sphere2, sphere3, sphere4, sphere5, sphere6, sphere7, sphere8;
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

	var sphereRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];

	var copyInvisShader;

	for(var i = 0; i < sphereRatios.length; i++){

	if(i == 0){
		copyInvisShader = THREE.InvisShader0;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere0 = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere0);
	}
	else if(i == 1){
		copyInvisShader = THREE.InvisShader1;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere1 = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere1);
	}
	else if(i == 2){
		copyInvisShader = THREE.InvisShader2;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere2 = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere2);
	}
	else if(i == 3){
		copyInvisShader = THREE.InvisShader3;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere3 = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere3);
	}
	else if(i == 4){
		copyInvisShader = THREE.InvisShader4;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere4 = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere4);
	}
	else if(i == 5){
		copyInvisShader = THREE.InvisShader5;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere5 = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere5);
	}
	else if(i == 6){
		copyInvisShader = THREE.InvisShader6;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere6 = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere6);
	}
	else if(i == 7){
		copyInvisShader = THREE.InvisShader7;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere7 = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere7);
	}
	else if(i == 8){
		copyInvisShader = THREE.InvisShader8;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereGeom = new THREE.SphereGeometry(sphereRatios[i], 100, 100);
		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere8 = new THREE.Mesh(sphereGeom, sphereMaterial);

		scene.add(sphere8);
	}
	}

	var innerSphereGeom = new THREE.SphereGeometry(100, 100, 100);
	var innerClearMaterial = new THREE.MeshLambertMaterial( { envMap: cubemap, transparent: true, refractionRatio: 0.6, opacity: 0.8, side: THREE.BackSide } );
	var innerSphere = new THREE.Mesh(innerSphereGeom, innerClearMaterial);

	scene.add(innerSphere);


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

function updateSpheres(){

	if(params.chromatic){
		var sphereRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
		var copyInvisShader;

		for(var i = 0; i < sphereRatios.length; i++){

		if(i == 0){
			copyInvisShader = THREE.ChromaticShader0;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var sphereMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			sphere0.material = sphereMaterial;
		}
		else if(i == 1){
			copyInvisShader = THREE.ChromaticShader1;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var sphereMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			sphere1.material = sphereMaterial;
		}
		else if(i == 2){
			copyInvisShader = THREE.ChromaticShader2;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var sphereMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			sphere2.material = sphereMaterial;
		}
		else if(i == 3){
			copyInvisShader = THREE.ChromaticShader3;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var sphereMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			sphere3.material = sphereMaterial;
		}
		else if(i == 4){
			copyInvisShader = THREE.ChromaticShader4;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var sphereMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			sphere4.material = sphereMaterial;
		}
		else if(i == 5){
			copyInvisShader = THREE.ChromaticShader5;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var sphereMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			sphere5.material = sphereMaterial;
		}
		else if(i == 6){
			copyInvisShader = THREE.ChromaticShader6;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var sphereMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			sphere6.material = sphereMaterial;
		}
		else if(i == 7){
			copyInvisShader = THREE.ChromaticShader7;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var sphereMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			sphere7.material = sphereMaterial;
		}
		else if(i == 8){
			copyInvisShader = THREE.ChromaticShader8;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var sphereMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			sphere8.material = sphereMaterial;
		}
		}
	}
	else{
	var sphereRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
	var copyInvisShader;

	for(var i = 0; i < sphereRatios.length; i++){

	if(i == 0){
		copyInvisShader = THREE.InvisShader0;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere0.material = sphereMaterial;
	}
	else if(i == 1){
		copyInvisShader = THREE.InvisShader1;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere1.material = sphereMaterial;
	}
	else if(i == 2){
		copyInvisShader = THREE.InvisShader2;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere2.material = sphereMaterial;
	}
	else if(i == 3){
		copyInvisShader = THREE.InvisShader3;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere3.material = sphereMaterial;
	}
	else if(i == 4){
		copyInvisShader = THREE.InvisShader4;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere4.material = sphereMaterial;
	}
	else if(i == 5){
		copyInvisShader = THREE.InvisShader5;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere5.material = sphereMaterial;
	}
	else if(i == 6){
		copyInvisShader = THREE.InvisShader6;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere6.material = sphereMaterial;
	}
	else if(i == 7){
		copyInvisShader = THREE.InvisShader7;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere7.material = sphereMaterial;
	}
	else if(i == 8){
		copyInvisShader = THREE.InvisShader8;
		var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
		invisShaderUniforms["tCube"] = refractmap;
		copyInvisShader.uniforms = invisShaderUniforms;

		var sphereMaterial = new THREE.ShaderMaterial({
			fragmentShader: copyInvisShader.fragmentShader,
			vertexShader: copyInvisShader.vertexShader,
			uniforms: copyInvisShader.uniforms,
			side: THREE.FrontSide
		});

		sphere8.material = sphereMaterial;
	}
	}
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

	updateSpheres();
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
