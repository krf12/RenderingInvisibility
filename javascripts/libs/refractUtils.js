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



function refractFull(incidentVector, normalVector, eta){
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
return R; }
