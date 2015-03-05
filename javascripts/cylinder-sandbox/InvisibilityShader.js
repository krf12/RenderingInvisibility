/**
* @author Kit Farmer / http://about.me/HugCushionKit
*
*
* Based on alteredq's Fresnel Shader / http://alteredqualia.com/
*/

THREE.InvisibilityShader = {

	uniforms: {

		"tCube": { type: "t", value: null }

	},

	vertexShader: [

		"varying vec3 vRefractForward[10];",
		"varying vec3 vRefractEnd[3];",
		"varying vec3 vRefractBegin[3];",
		"varying vec3 vNormal;",

		"void main() {",

			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",

			"vNormal = normal;",

			"vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",

			"vec3 I = worldPosition.xyz - cameraPosition;",

			"vRefractForward[0] = refract( normalize( I ), worldNormal, 1.0 );",
			"vRefractForward[1] = refract( normalize( vRefractForward[0] ), worldNormal, 0.9 );",
			"vRefractForward[2] = refract( normalize( vRefractForward[1] ), worldNormal, 0.8 );",
			"vRefractForward[3] = refract( normalize( vRefractForward[2] ), worldNormal, 0.7 );",
			"vRefractForward[4] = refract( normalize(	vRefractForward[3] ), worldNormal, 0.6 );",
			"vRefractForward[5] = refract( normalize( vRefractForward[4] ), worldNormal, 0.5 );",
			"vRefractForward[6] = refract( normalize( vRefractForward[5] ), worldNormal, 0.4);",
			"vRefractForward[7] = refract( normalize( vRefractForward[6] ), worldNormal, 0.3);",
			"vRefractForward[8] = refract( normalize( vRefractForward[7] ), worldNormal, 0.2);",
			"vRefractForward[9] = refract( normalize( vRefractForward[8] ), worldNormal, 0.1);",

			"vRefractBegin[0] = vRefractForward[0];;",
			"vRefractBegin[1] = vRefractForward[1];",
			"vRefractBegin[2] = vRefractForward[2];",

			"vRefractEnd[0] = vRefractForward[0];;",
			"vRefractEnd[1] = vRefractForward[1];",
			"vRefractEnd[2] = vRefractForward[2];",

			"gl_Position = projectionMatrix * mvPosition;",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform samplerCube tCube;",
		"varying vec3 vRefractBegin[3];",
		"varying vec3 vRefractEnd[3];",
		"varying vec3 vNormal;",

		"void main() {",

			"vec2 uv = normalize( vNormal ).xy * 0.5 + 0.5;",

			"vec4 refractedColor = vec4( 1.0 );",

			"if ( vNormal.z < 0.0 )",
			"{",
			"refractedColor.r = textureCube( tCube, vec3( -vRefractEnd[0].x, vRefractEnd[0].yz ) ).r;",
			"refractedColor.g = textureCube( tCube, vec3( -vRefractEnd[1].x, vRefractEnd[1].yz ) ).g;",
			"refractedColor.b = textureCube( tCube, vec3( -vRefractEnd[2].x, vRefractEnd[2].yz ) ).b;",
			"}",
			"else {",
			"refractedColor.r = textureCube( tCube, vec3( -vRefractBegin[0].x, vRefractBegin[0].yz ) ).r;",
			"refractedColor.g = textureCube( tCube, vec3( -vRefractBegin[1].x, vRefractBegin[1].yz ) ).g;",
			"refractedColor.b = textureCube( tCube, vec3( -vRefractBegin[2].x, vRefractBegin[2].yz ) ).b;",
			"};",

			"gl_FragColor = refractedColor;",

		"}"

	].join("\n")

};
