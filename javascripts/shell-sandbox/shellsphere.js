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
		color: 0x0000ff,
		lineWidth: 5
	});

	var lineGeometry = new THREE.Geometry();

	var ratio = 500;

	var linex = ratio * Math.sin(Math.PI/5) * Math.cos(Math.PI/5);
	var liney = ratio * Math.sin(Math.PI/5) * Math.sin(Math.PI/5);
	var linez = ratio * Math.cos(Math.PI/5);
	var normalVector = new THREE.Vector3(linex, liney, linez);

	var incidentNormalVector = new THREE.Vector3(1000, 1000, 1000);
	var incidentVector = new THREE.Vector3(0,0,0)
	incidentVector.copy(incidentNormalVector);
	incidentNormalVector.normalize();

	var lineArray = new Array(incidentVector);

	var inVector = refractIn(incidentVector, normalVector);
	lineArray.push(inVector);

	var firstVector = refractFull(inVector, normalVector, 0.9, 450);
	lineArray.push(firstVector[0]);
	var secondVector = refractFull(firstVector[0], firstVector[1], 0.8, 400);
	lineArray.push(secondVector[0]);
	var thirdVector = refractFull(secondVector[0], secondVector[1], 0.7, 350);
	lineArray.push(thirdVector[0]);
	var fourthVector = refractFull(thirdVector[0], thirdVector[1], 0.6, 300);
	lineArray.push(fourthVector[0]);
	var fifthVector = refractFull(fourthVector[0], fourthVector[1], 0.5, 250);
	lineArray.push(fifthVector[0]);
	var sixthVector = refractFull(fifthVector[0], fifthVector[1], 0.4, 200);
	lineArray.push(sixthVector[0]);
	var seventhVector = refractFull(sixthVector[0], sixthVector[1], 0.3, 150);
	lineArray.push(seventhVector[0]);
	var eigthVector = refractFull(seventhVector[0], seventhVector[1], 0.2, 100);
	lineArray.push(eigthVector[0]);
	var ninthVector = refractFull(eigthVector[0], eigthVector[1], 0.1, 50);
	lineArray.push(ninthVector[0]);

	var tenthVector = refractFull(ninthVector[0], ninthVector[1], 0.2, 100);
	lineArray.push(tenthVector[0]);
	var eleventhVector = refractFull(tenthVector[0], tenthVector[1], 0.3, 150);
	lineArray.push(eleventhVector[0]);
	var twelfthVector = refractFull(eleventhVector[0], eleventhVector[1], 0.4, 200);
	lineArray.push(twelfthVector[0]);
	var thirteenthVector = refractFull(twelfthVector[0], twelfthVector[1], 0.5, 250);
	lineArray.push(thirteenthVector[0]);
	var fourteenthVector = refractFull(thirteenthVector[0], thirteenthVector[1], 0.6, 300);
	lineArray.push(fourteenthVector[0]);
	var fifteenthVector = refractFull(fourteenthVector[0], fourteenthVector[1], 0.7, 350);
	lineArray.push(fifteenthVector[0]);
	var sixteenthVector = refractFull(fifteenthVector[0], fifteenthVector[1], 0.8, 400);
	lineArray.push(sixteenthVector[0]);
	var seventeenthVector = refractFull(sixteenthVector[0], sixteenthVector[1], 0.9, 450);
	lineArray.push(seventeenthVector[0]);

	outVector = refractOut(seventeenthVector[0], seventeenthVector[1]);
	lineArray.push(outVector.negate());

	var lineRatio = 500;

	var splineArray = new Array();

	for(j = lineArray.length - 1; j > 0; j--){

		var tempVector = new THREE.Vector3(0, 0, 0);
		tempVector.copy(lineArray[j]);

		if(j != 0){
			tempVector.normalize();
			tempVector.multiplyScalar(lineRatio);
		}

		splineArray.push(tempVector);

		if(j < lineArray.length/2){
			lineRatio = lineRatio - 50;
			if(tempVector.x < 0){
				tempVector.negate();
			}
		}
		else if(j > lineArray.length/2){
			lineRatio = lineRatio + 50;
			if(tempVector.x > 0){
				tempVector.negate();
			}
		}

	}


	var spline = new THREE.SplineCurve3(splineArray);
	var num_points = 20;

	var splinePoints = spline.getPoints(num_points);

	var secondLineGeometry = new THREE.Geometry();

	for(var i = 0; i < splinePoints.length; i++){

		if(i < splinePoints.length/2 - 1){
			console.log(splinePoints[i]);
			lineGeometry.vertices.push(splinePoints[i]);
		}
		else{
			console.log(splinePoints[i]);
			secondLineGeometry.vertices.push(splinePoints[i]);
		}
	}

	var startVector = splinePoints[0];
	var endVector = splinePoints[splinePoints.length-1];

	var middleVector = new THREE.Vector3(((startVector.x + endVector.x)/2), ((startVector.y + endVector.y)/2), ((startVector.z + endVector.z)/2));

	middleVector.setX(-400);

	var curve = new THREE.QuadraticBezierCurve3(startVector, middleVector, endVector);

	var path = new THREE.CurvePath();

	path.add(curve);

	var line = new THREE.Line(lineGeometry, lineMaterial);
	scene.add(line);

	var secondline = new THREE.Line(secondLineGeometry, lineMaterial);
	scene.add(secondline);

	curvedLine = new THREE.Line(path.createPointsGeometry(20), lineMaterial);
	scene.add(curvedLine);


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
