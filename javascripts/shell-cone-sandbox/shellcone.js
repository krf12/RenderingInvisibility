var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
var viewAngle = 45, aspect = screenWidth/screenHeight, near = 0.1, far = 20000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(screenWidth, screenHeight);
document.body.appendChild(renderer.domElement);

//Global Variables
var scene, camera, cubemap, controls, innerControls, keyboard;
var innerCameraActive = false;
var cone0, cone1, cone2, cone3, cone4, cone5, cone6, cone7, cone8;
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

	var coneRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];
	var heightRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];
	var copyInvisShader;

	for(var i = 0; i < coneRatios.length; i++){

		if(i == 0){
			copyInvisShader = THREE.InvisShader0;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var coneGeom = new THREE.CylinderGeometry(0, coneRatios[i], coneRatios[i], heightRatios[i], 100, 100);
			var coneMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cone0 = new THREE.Mesh(coneGeom, coneMaterial);

			scene.add(cone0);
		}
		else if(i == 1){
			copyInvisShader = THREE.InvisShader1;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var coneGeom = new THREE.CylinderGeometry(0, coneRatios[i], coneRatios[i], heightRatios[i], 100, 100);
			var coneMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cone1 = new THREE.Mesh(coneGeom, coneMaterial);

			scene.add(cone1);
		}
		else if(i == 2){
			copyInvisShader = THREE.InvisShader2;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var coneGeom = new THREE.CylinderGeometry(0, coneRatios[i], coneRatios[i], heightRatios[i], 100, 100);
			var coneMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cone2 = new THREE.Mesh(coneGeom, coneMaterial);

			scene.add(cone2);
		}
		else if(i == 3){
			copyInvisShader = THREE.InvisShader3;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var coneGeom = new THREE.CylinderGeometry(0, coneRatios[i], coneRatios[i], heightRatios[i], 100, 100);
			var coneMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cone3 = new THREE.Mesh(coneGeom, coneMaterial);

			scene.add(cone3);
		}
		else if(i == 4){
			copyInvisShader = THREE.InvisShader4;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var coneGeom = new THREE.CylinderGeometry(0, coneRatios[i], coneRatios[i], heightRatios[i], 100, 100);
			var coneMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cone4 = new THREE.Mesh(coneGeom, coneMaterial);

			scene.add(cone4);
		}
		else if(i == 5){
			copyInvisShader = THREE.InvisShader5;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var coneGeom = new THREE.CylinderGeometry(0, coneRatios[i], coneRatios[i], heightRatios[i], 100, 100);
			var coneMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cone5 = new THREE.Mesh(coneGeom, coneMaterial);

			scene.add(cone5);
		}
		else if(i == 6){
			copyInvisShader = THREE.InvisShader6;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var coneGeom = new THREE.CylinderGeometry(0, coneRatios[i], coneRatios[i], heightRatios[i], 100, 100);
			var coneMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cone6 = new THREE.Mesh(coneGeom, coneMaterial);

			scene.add(cone6);
		}
		else if(i == 7){
			copyInvisShader = THREE.InvisShader7;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var coneGeom = new THREE.CylinderGeometry(0, coneRatios[i], coneRatios[i], heightRatios[i], 100, 100);
			var coneMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cone7 = new THREE.Mesh(coneGeom, coneMaterial);

			scene.add(cone7);
		}
		else if(i == 8){
			copyInvisShader = THREE.InvisShader8;
			var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
			invisShaderUniforms["tCube"] = refractmap;
			copyInvisShader.uniforms = invisShaderUniforms;

			var coneGeom = new THREE.CylinderGeometry(0, coneRatios[i], coneRatios[i], heightRatios[i], 100, 100);
			var coneMaterial = new THREE.ShaderMaterial({
				fragmentShader: copyInvisShader.fragmentShader,
				vertexShader: copyInvisShader.vertexShader,
				uniforms: copyInvisShader.uniforms,
				side: THREE.FrontSide
			});

			cone8 = new THREE.Mesh(coneGeom, coneMaterial);

			scene.add(cone8);
		}
	}


	var innerCylinderGeom = new THREE.CylinderGeometry(0, 100, 100, 100, 100, 100);
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

function updateCones(){

	if(params.chromatic){
		var coneRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
		var heightRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
		var copyInvisShader;

		for(var i = 0; i < coneRatios.length; i++){

			if(i == 0){
				copyInvisShader = THREE.ChromaticShader0;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone0.material = coneMaterial;
			}
			else if(i == 1){
				copyInvisShader = THREE.ChromaticShader1;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone1.material = coneMaterial;
			}
			else if(i == 2){
				copyInvisShader = THREE.ChromaticShader2;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone2.material = coneMaterial;
			}
			else if(i == 3){
				copyInvisShader = THREE.ChromaticShader3;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone3.material = coneMaterial;
			}
			else if(i == 4){
				copyInvisShader = THREE.ChromaticShader4;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone4.material = coneMaterial;
			}
			else if(i == 5){
				copyInvisShader = THREE.ChromaticShader5;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone5.material = coneMaterial;
			}
			else if(i == 6){
				copyInvisShader = THREE.ChromaticShader6;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone6.material = coneMaterial;
			}
			else if(i == 7){
				copyInvisShader = THREE.ChromaticShader7;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone7.material = coneMaterial;
			}
			else if(i == 8){
				copyInvisShader = THREE.ChromaticShader8;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone8.material = coneMaterial;
			}
		}
	}
	else{
		var coneRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
		var heightRatios = [500, 450, 400, 350, 300, 250, 200, 150, 100];
		var copyInvisShader;

		for(var i = 0; i < coneRatios.length; i++){

			if(i == 0){
				copyInvisShader = THREE.InvisShader0;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone0.material = coneMaterial;
			}
			else if(i == 1){
				copyInvisShader = THREE.InvisShader1;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone1.material = coneMaterial;
			}
			else if(i == 2){
				copyInvisShader = THREE.InvisShader2;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone2.material = coneMaterial;
			}
			else if(i == 3){
				copyInvisShader = THREE.InvisShader3;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone3.material = coneMaterial;
			}
			else if(i == 4){
				copyInvisShader = THREE.InvisShader4;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone4.material = coneMaterial;
			}
			else if(i == 5){
				copyInvisShader = THREE.InvisShader5;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone5.material = coneMaterial;
			}
			else if(i == 6){
				copyInvisShader = THREE.InvisShader6;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone6.material = coneMaterial;
			}
			else if(i == 7){
				copyInvisShader = THREE.InvisShader7;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone7.material = coneMaterial;
			}
			else if(i == 8){
				copyInvisShader = THREE.InvisShader8;
				var invisShaderUniforms = THREE.UniformsUtils.clone(copyInvisShader.uniforms);
				invisShaderUniforms["tCube"] = refractmap;
				copyInvisShader.uniforms = invisShaderUniforms;

				var coneMaterial = new THREE.ShaderMaterial({
					fragmentShader: copyInvisShader.fragmentShader,
					vertexShader: copyInvisShader.vertexShader,
					uniforms: copyInvisShader.uniforms,
					side: THREE.FrontSide
				});

				cone8.material = coneMaterial;
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

			updateCones();
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
