var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
var viewAngle = 45, aspect = screenWidth/screenHeight, near = 0.1, far = 20000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(screenWidth, screenHeight);
document.body.appendChild(renderer.domElement);

//Global Variables
var scene, camera, cubemap, controls, innerControls, keyboard;
var innerCameraActive = false;
var cylinder0, cylinder1, cylinder2, cylinder3, cylinder4, cylinder5, cylinder6, cylinder7, cylinder8;
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

	var cylinderRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];
	var heightRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];
	var copyInvisShader;

	for(var i = 0; i < cylinderRatios.length; i++){

		if(i == 0){
			copyInvisShader = THREE.InvisShader0;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);
			var cylinderMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cylinder0 = new THREE.Mesh(cylinderGeom, cylinderMaterial);

			scene.add(cylinder0);
		}
		else if(i == 1){
			copyInvisShader = THREE.InvisShader1;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);
			var cylinderMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cylinder1 = new THREE.Mesh(cylinderGeom, cylinderMaterial);

			scene.add(cylinder1);
		}
		else if(i == 2){
			copyInvisShader = THREE.InvisShader2;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);
			var cylinderMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cylinder2 = new THREE.Mesh(cylinderGeom, cylinderMaterial);

			scene.add(cylinder2);
		}
		else if(i == 3){
			copyInvisShader = THREE.InvisShader3;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);
			var cylinderMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cylinder3 = new THREE.Mesh(cylinderGeom, cylinderMaterial);

			scene.add(cylinder3);
		}
		else if(i == 4){
			copyInvisShader = THREE.InvisShader4;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);
			var cylinderMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cylinder4 = new THREE.Mesh(cylinderGeom, cylinderMaterial);

			scene.add(cylinder4);
		}
		else if(i == 5){
			copyInvisShader = THREE.InvisShader5;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);
			var cylinderMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cylinder5 = new THREE.Mesh(cylinderGeom, cylinderMaterial);

			scene.add(cylinder5);
		}
		else if(i == 6){
			copyInvisShader = THREE.InvisShader6;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);
			var cylinderMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cylinder6 = new THREE.Mesh(cylinderGeom, cylinderMaterial);

			scene.add(cylinder6);
		}
		else if(i == 7){
			copyInvisShader = THREE.InvisShader7;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);
			var cylinderMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cylinder7 = new THREE.Mesh(cylinderGeom, cylinderMaterial);

			scene.add(cylinder7);
		}
		else if(i == 8){
			copyInvisShader = THREE.InvisShader8;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);
			var cylinderMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cylinder8 = new THREE.Mesh(cylinderGeom, cylinderMaterial);

			scene.add(cylinder8);
		}
	}

	var cylinderGeom = new THREE.CylinderGeometry(cylinderRatios[i], cylinderRatios[i], heightRatios[i], 100, 100);

	var innerCylinderGeom = new THREE.CylinderGeometry(100, 100, 100, 100, 100);
	var innerClearMaterial = new THREE.MeshLambertMaterial( { envMap: cubemap, transparent: true, refractionRatio: 0.6, opacity: 0.8, side: THREE.BackSide } );
	var innerCylinder = new THREE.Mesh(innerCylinderGeom, innerClearMaterial);

	scene.add(innerCylinder);

	var cubeGeom = new THREE.CubeGeometry(25, 25, 25);
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
	var cube = new THREE.Mesh(cubeGeom, cubeMaterial);
	scene.add(cube);

	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 50, 1).normalize();
	scene.add(directionalLight);



}

function updateCylinders(){

	if(params.chromatic){
		var cylinderRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
		var heightRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
		var copyInvisShader;

		for(var i = 0; i < cylinderRatios.length; i++){

			if(i == 0){
				copyInvisShader = THREE.ChromaticShader0;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder0.material = cylinderMaterial;
			}
			else if(i == 1){
				copyInvisShader = THREE.ChromaticShader1;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder1.material = cylinderMaterial;
			}
			else if(i == 2){
				copyInvisShader = THREE.ChromaticShader2;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder2.material = cylinderMaterial;
			}
			else if(i == 3){
				copyInvisShader = THREE.ChromaticShader3;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder3.material = cylinderMaterial;
			}
			else if(i == 4){
				copyInvisShader = THREE.ChromaticShader4;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder4.material = cylinderMaterial;
			}
			else if(i == 5){
				copyInvisShader = THREE.ChromaticShader5;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder5.material = cylinderMaterial;
			}
			else if(i == 6){
				copyInvisShader = THREE.ChromaticShader6;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder6.material = cylinderMaterial;
			}
			else if(i == 7){
				copyInvisShader = THREE.ChromaticShader7;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder7.material = cylinderMaterial;
			}
			else if(i == 8){
				copyInvisShader = THREE.ChromaticShader8;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder8.material = cylinderMaterial;
			}
		}
	}
	else{
		var cylinderRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
		var heightRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
		var copyInvisShader;

		for(var i = 0; i < cylinderRatios.length; i++){

			if(i == 0){
				copyInvisShader = THREE.InvisShader0;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder0.material = cylinderMaterial;
			}
			else if(i == 1){
				copyInvisShader = THREE.InvisShader1;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder1.material = cylinderMaterial;
			}
			else if(i == 2){
				copyInvisShader = THREE.InvisShader2;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder2.material = cylinderMaterial;
			}
			else if(i == 3){
				copyInvisShader = THREE.InvisShader3;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder3.material = cylinderMaterial;
			}
			else if(i == 4){
				copyInvisShader = THREE.InvisShader4;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder4.material = cylinderMaterial;
			}
			else if(i == 5){
				copyInvisShader = THREE.InvisShader5;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder5.material = cylinderMaterial;
			}
			else if(i == 6){
				copyInvisShader = THREE.InvisShader6;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder6.material = cylinderMaterial;
			}
			else if(i == 7){
				copyInvisShader = THREE.InvisShader7;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder7.material = cylinderMaterial;
			}
			else if(i == 8){
				copyInvisShader = THREE.InvisShader8;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var cylinderMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cylinder8.material = cylinderMaterial;
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

			updateCylinders();
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
