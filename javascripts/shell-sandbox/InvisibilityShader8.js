/**
* @author Kit Farmer / http://about.me/HugCushionKit
*
*
* Based on alteredq's Fresnel Shader / http://alteredqualia.com/
*/

THREE.InvisShader8 = {

	uniforms: {

		"tCube": { type: "t", value: null }

	},

	vertexShader: [

		"varying vec3 vRefractForward[9];",
		"varying vec3 vRefractBackward[8];",
		"varying vec3 vRefractEnd[3];",
		"varying vec3 vRefractBegin[3];",
		"varying vec3 vNormal;",
		"varying vec3 fNormal;",

		"vec3 refractFull(vec3 I, vec3 N, float eta);",

		"vec3 refractFull(vec3 I, vec3 N, float eta){",
		"float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));",

		"float kCheck = sqrt(k);",

		"if(kCheck < 0.0){",
		"kCheck = kCheck * -1.0;",
		"}",

		"vec3 R = eta * I - (eta * dot(N, I) + kCheck) * N;",
		"return R; }",

		"void main() {",

			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",

			"vNormal = normal;",
			"fNormal = normal;",

			"vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",

			"vec3 I = worldPosition.xyz - cameraPosition;",

			"vRefractForward[0] = refractFull( normalize(I) , vNormal, 1.0/0.9 );",
			"vRefractForward[1] = refractFull( vRefractForward[0] , vNormal, 0.9/0.8 );",
			"vRefractForward[2] = refractFull( vRefractForward[1] , vNormal, 0.8/0.7 );",
			"vRefractForward[3] = refractFull( vRefractForward[2] , vNormal, 0.7/0.6 );",
			"vRefractForward[4] = refractFull( vRefractForward[3] , vNormal, 0.6/0.5 );",
			"vRefractForward[5] = refractFull( vRefractForward[4] , vNormal, 0.5/0.4 );",
			"vRefractForward[6] = refractFull( vRefractForward[5] , vNormal, 0.4/0.3);",
			"vRefractForward[7] = refractFull( vRefractForward[6] , vNormal, 0.3/0.2);",
			"vRefractForward[8] = refractFull( vRefractForward[7] , vNormal, 0.2/0.1);",

			"vRefractBackward[0] = refractFull( vRefractForward[8] , vNormal, 0.1/0.2 );",
			"vRefractBackward[1] = refractFull( vRefractBackward[0] , vNormal, 0.2/0.3 );",
			"vRefractBackward[2] = refractFull( vRefractBackward[1] , vNormal, 0.3/0.4 );",
			"vRefractBackward[3] = refractFull( vRefractBackward[2] , vNormal, 0.4/0.5 );",
			"vRefractBackward[4] = refractFull( vRefractBackward[3] , vNormal, 0.5/0.6 );",
			"vRefractBackward[5] = refractFull( vRefractBackward[4] , vNormal, 0.6/0.7 );",
			"vRefractBackward[6] = refractFull( vRefractBackward[5] , vNormal, 0.7/0.8);",
			"vRefractBackward[7] = refractFull( vRefractBackward[6] , vNormal, 0.8/0.9);",

			"vRefractBegin[0] = vRefractForward[8];",
			"vRefractBegin[1] = vRefractForward[8];",
			"vRefractBegin[2] = vRefractForward[8];",

			"vRefractEnd[0] = vRefractBackward[0];",
			"vRefractEnd[1] = vRefractBackward[0];",
			"vRefractEnd[2] = vRefractBackward[0];",

			"gl_Position = projectionMatrix * mvPosition;",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform samplerCube tCube;",
		"varying vec3 vRefractBegin[3];",
		"varying vec3 vRefractEnd[3];",
		"varying vec3 fNormal;",

		"void main() {",

			"vec4 refractedColor = vec4( 1.0 );",

			"if ( fNormal.z < 0.0 )",
			"{",
			"refractedColor = textureCube( tCube, vec3( -vRefractEnd[2].x, vRefractEnd[2].yz ) );",
			"}",
			"else {",
			"refractedColor = textureCube( tCube, vec3( -vRefractBegin[0].x, vRefractBegin[0].yz ) );",
			"};",

			"gl_FragColor = refractedColor;",

		"}"

	].join("\n")

};
