//Global variables

var EPS = 0.0001,
    PI = 3.141592654,
    HALF_PI = 1.570796327;

var WIDTH = 400,
    HEIGHT = 400;

var container;
var gRenderer, gStats;
var gCamera, gScene, gCamera2, gScene2, gControls;
var gKeyboard; //keyboard state

var lambert1 = new THREE.MeshLambertMaterial({color: 0xCC0000});

var gRoomDim;
var gLightP;
var gLightI = 1.0;

//scene globals to be passed as uniforms
var gShapeNum = 4;
var gShapeP = []; //vec3
var gShapeR = []; //floats
var gShapeC = []; //vec3
var gShapeTi = 2; //2nd half hold cubes

//Initialization

function initScene(){
  gRoomDim = new THREE.Vector3(5.0, 5.0, 5.0);
  gLightP = new THREE.Vector3(0.0, 4.9, 0.0);

  //spheres

  gShapeP.push(new THREE.Vector3(-2.5, 1.0, -1.5));
  gShapeC.push(new THREE.Vector3(0.9, 0.0, 0.0));
  gShapeR.push(1.8);

  gShapeP.push(new THREE.Vector3(-2.5,1.0,2.0));
  gShapeC.push(new THREE.Vector3(0.0,0.9,0.0));
  gShapeR.push(1.2);

  // cubes (i>=2)

  gShapeP.push(new THREE.Vector3(2.5, -2.0, 1.5));
  gShapeC.push(new THREE.Vector3(0.9, 0.0, 0.9));
  gShapeR.push(1.5);

	gShapeP.push(new THREE.Vector3(2.5, 1.0, -2.0));
  gShapeC.push(new THREE.Vector3(0.0, 0.5, 0.0));
  gShapeR.push(1.0);
}

function initTHREE(){
  container = $('#webgl-container');

  //setup WebGL renderer
  gRenderer = new THREE.WebGLRenderer();
  gRenderer.setSize(WIDTH, HEIGHT);
  container.append(gRenderer.domElement);

  //camera
  gCamera = new THREE.OrthographicCamera(-.5,.5,.5,-5,-1,1);

  //scene
  gScene = new THREE.Scene();

  //camera for raytracing
  gCamera2 = new THREE.PerspectiveCamera(30, WIDTH/HEIGHT,1,1e3);
  gCamera2.position.z = 10;

  //controls
  gControls = new THREE.OrbitControls(gCamera2, gRenderer.domElement);

  gScene2 = new THREE.Scene();
  gScene2.add(gCamera2);

  var uniforms = {
    uCamPos: {type: "v3", value:gCamera2.position},
    uCamCenter: {type:"v3", value:gControls.target},
    uCampUp: {type: "v3", value: gCamera2.up},

    uShapeP: {type: "v3v", value: gShapeP},
    uShapeC: {type: "v3v", value: gShapeC},
    uShapeR: {type: "fv1", value: gShapeR},
    uShapeTi: {type: "i", value: gShapeTi}
  };

  var shader = new THREE.ShaderMaterial(
    {
      uniforms: uniforms,
      vertexShader: $("#shader-vs").text(),
      fragmentShader: $("#shader-fs").text()
    });

    //setup plane in scene for rendering
    var shape;
    shape = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shader);
    gScene.add(shape);
}

function update(){
  gControls.update();
  gRenderer.render(gScene,gCamera);
  requestAnimationFrame(update);
}

function init(){
  initScene();
  initTHREE();
  requestAnimationFrame(update);
}

/* DOC READY */
$(document).ready(function() {
  // load shader strings
  $("#shader-fs").load("shader/render.fs", init);
});
