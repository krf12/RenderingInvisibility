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

		"varying vec3 vRefractForward[9];",
		"varying vec3 vRefractBackward[8];",
		"varying vec3 vRefractEnd[3];",
		"varying vec3 vRefractBegin[3];",
		"varying vec3 vNormal;",

		"void main() {",

			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",

			"vNormal = normal;",

			"vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",

			"vec3 I = worldPosition.xyz - cameraPosition;",

			"vRefractForward[0] = refract( normalize( I ), normal, 1.0/0.9 );",
			"vRefractForward[1] = refract( normalize( vRefractForward[0] ), normal, 0.9/0.8 );",
			"vRefractForward[2] = refract( normalize( vRefractForward[1] ), normal, 0.8/0.7 );",
			"vRefractForward[3] = refract( normalize( vRefractForward[2] ), normal, 0.7/0.6 );",
			"vRefractForward[4] = refract( normalize(	vRefractForward[3] ), normal, 0.6/0.5 );",
			"vRefractForward[5] = refract( normalize( vRefractForward[4] ), normal, 0.5/0.4 );",
			"vRefractForward[6] = refract( normalize( vRefractForward[5] ), normal, 0.4/0.3);",
			"vRefractForward[7] = refract( normalize( vRefractForward[6] ), normal, 0.3/0.2);",
			"vRefractForward[8] = refract( normalize( vRefractForward[7] ), normal, 0.2/0.1);",

			"vRefractBackward[0] = refract( normalize( vRefractForward[8] ), normal, 0.1/0.2 );",
			"vRefractBackward[1] = refract( normalize( vRefractBackward[0] ), normal, 0.2/0.3 );",
			"vRefractBackward[2] = refract( normalize( vRefractBackward[1] ), normal, 0.3/0.4 );",
			"vRefractBackward[3] = refract( normalize( vRefractBackward[2] ), normal, 0.4/0.5 );",
			"vRefractBackward[4] = refract( normalize( vRefractBackward[3] ), normal, 0.5/0.6 );",
			"vRefractBackward[5] = refract( normalize( vRefractBackward[4] ), normal, 0.6/0.7 );",
			"vRefractBackward[6] = refract( normalize( vRefractBackward[5] ), normal, 0.7/0.8);",
			"vRefractBackward[7] = refract( normalize( vRefractBackward[6] ), normal, 0.8/0.9);",

			"vRefractBegin[0] = vRefractForward[0];;",
			"vRefractBegin[1] = vRefractForward[1];",
			"vRefractBegin[2] = vRefractForward[2];",

			"vRefractEnd[0] = vRefractBackward[7];",
			"vRefractEnd[1] = vRefractBackward[6];",
			"vRefractEnd[2] = vRefractBackward[5];",

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
