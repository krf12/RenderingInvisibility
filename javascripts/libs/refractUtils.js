function refractIn(incidentVector, normalVector){

var negativeVector = new THREE.Vector3(0, 0, 0);
negativeVector.copy(incidentVector);
var sigma = normalVector.dot(negativeVector.negate()) - Math.sqrt(incidentVector.dot(normalVector) * incidentVector.dot(normalVector) + 1.0 - incidentVector.dot(incidentVector));

var R = new THREE.Vector3(0, 0, 0);
var multiplyVector = new THREE.Vector3(0, 0, 0);
multiplyVector.copy(normalVector);

R = R.addVectors(incidentVector, multiplyVector.multiplyScalar(sigma));

return R; }



function refractOut(incidentVector, normalVector){
var negativeVector = new THREE.Vector3(0, 0, 0);
negativeVector.copy(incidentVector);
var sigma = normalVector.dot(negativeVector.negate()) + Math.sqrt(incidentVector.dot(normalVector) * incidentVector.dot(normalVector) + 1.0 - incidentVector.dot(incidentVector));

var R = new THREE.Vector3(0, 0, 0);
var multiplyVector = new THREE.Vector3(0, 0, 0);
multiplyVector.copy(normalVector);

R = R.addVectors(incidentVector, multiplyVector.multiplyScalar(sigma));

return R;  }



function refractFull(incidentVector, normalVector, eta, radius){
var k = 1.0 - eta * eta * (1.0 - normalVector.dot(incidentVector) * normalVector.dot(incidentVector));

var kCheck = Math.sqrt(k);

if(kCheck < 0.0){
kCheck = kCheck * -1.0;
}

var R = new THREE.Vector3(0, 0, 0);
var incidentCopyVector = new THREE.Vector3(0, 0, 0);
var normalCopyVector = new THREE.Vector3(0, 0, 0);

incidentCopyVector.copy(incidentVector);
normalCopyVector.copy(normalVector);

R = R.subVectors(incidentCopyVector.multiplyScalar(eta), normalCopyVector.multiplyScalar(eta * normalCopyVector.dot(incidentCopyVector) + kCheck));

incidentCopyVector.copy(R);
incidentCopyVector.normalize();
incidentCopyVector.multiplyScalar(radius - 50);

var centreVector = new THREE.Vector3(0,0,0);

var A = Math.pow(normalVector.x - centreVector.x, 2.0) + Math.pow(normalVector.y - centreVector.y, 2.0) + Math.pow(normalVector.z - centreVector.z, 2.0) + Math.pow(radius, 2.0);
var C = Math.pow(normalVector.x - incidentCopyVector.x, 2.0) + Math.pow(normalVector.y - incidentCopyVector.y, 2.0) + Math.pow(normalVector.z - incidentCopyVector.z, 2.0);
var B = Math.pow(incidentCopyVector.x - centreVector.x, 2.0) + Math.pow(incidentCopyVector.y - centreVector.y, 2.0) + Math.pow(incidentCopyVector.z - centreVector.z, 2.0) - A - C - Math.pow(radius, 2.0);

var positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
var negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);

var x, y, z = 0.0;

if((negativeT < 1) && (negativeT > 0)){
  x = (normalVector.x * (1 - negativeT)) + (negativeT * incidentCopyVector.x);
  y = (normalVector.y * (1 - negativeT)) + (negativeT * incidentCopyVector.y);
  z = (normalVector.z * (1 - negativeT)) + (negativeT * incidentCopyVector.z);
}

if((positiveT < 1) && (positiveT > 0)){
  x = (normalVector.x * (1 - positiveT)) + (positiveT * incidentCopyVector.x);
  y = (normalVector.y * (1 - positiveT)) + (positiveT * incidentCopyVector.y);
  z = (normalVector.z * (1 - positiveT)) + (positiveT * incidentCopyVector.z);
}

var refractVector = new THREE.Vector3(x, y, z);

return [R, refractVector]; }
