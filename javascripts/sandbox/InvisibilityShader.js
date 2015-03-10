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
		"varying vec3 vRefractBackward[10];",
		"varying vec3 vRefractEnd[3];",
		"varying vec3 vRefractBegin[3];",
		"varying vec3 vNormal;",

		"vec3 refractFull(vec3 I, vec3 N, float eta);",

		"vec3 refractFull(vec3 I, vec3 N, float eta){",
		"float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));",
    "vec3 R = eta * I - (eta * dot(N, I) + sqrt(k)) * N;",
		"return R; }",

		"void main() {",

			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",

			"vec3 I = worldPosition.xyz - cameraPosition;",

			"vNormal = normal;",

			"vRefractForward[0] = refractFull( normalize( I ), normal, 1.0 );",
			"vRefractForward[1] = refractFull( normalize( vRefractForward[0] ), normal, 0.9 );",
			"vRefractForward[2] = refractFull( normalize( vRefractForward[1] ), normal, 0.8 );",
			"vRefractForward[3] = refractFull( normalize( vRefractForward[2] ), normal, 0.7 );",
			"vRefractForward[4] = refractFull( normalize(	vRefractForward[3] ), normal, 0.6 );",
			"vRefractForward[5] = refractFull( normalize( vRefractForward[4] ), normal, 0.5 );",
			"vRefractForward[6] = refractFull( normalize( vRefractForward[5] ), normal, 0.4);",
			"vRefractForward[7] = refractFull( normalize( vRefractForward[6] ), normal, 0.3);",
			"vRefractForward[8] = refractFull( normalize( vRefractForward[7] ), normal, 0.2);",
			"vRefractForward[9] = refractFull( normalize( vRefractForward[8] ), normal, 0.1);",

			"vRefractBackward[0] = refractFull( normalize( vRefractForward[9] ), normal, 10.0 );",
			"vRefractBackward[1] = refractFull( normalize( vRefractBackward[0] ), normal, 20.0 );",
			"vRefractBackward[2] = refractFull( normalize( vRefractBackward[1] ), normal, 30.0 );",
			"vRefractBackward[3] = refractFull( normalize( vRefractBackward[2] ), normal, 40.0 );",
			"vRefractBackward[4] = refractFull( normalize( vRefractBackward[3] ), normal, 50.0 );",
			"vRefractBackward[5] = refractFull( normalize( vRefractBackward[4] ), normal, 60.0 );",
			"vRefractBackward[6] = refractFull( normalize( vRefractBackward[5] ), normal, 70.0 );",
			"vRefractBackward[7] = refractFull( normalize( vRefractBackward[6] ), normal, 80.0 );",
			"vRefractBackward[8] = refractFull( normalize( vRefractBackward[7] ), normal, 90.0 );",
			"vRefractBackward[9] = refractFull( normalize( vRefractBackward[8] ), normal, 100.0 );",

			"vRefractBegin[0] = vRefractForward[0];;",
			"vRefractBegin[1] = vRefractForward[1];",
			"vRefractBegin[2] = vRefractForward[2];",

			"vRefractEnd[0] = vRefractBackward[7];",
			"vRefractEnd[1] = vRefractBackward[8];",
			"vRefractEnd[2] = vRefractBackward[9];",

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
			"refractedColor = textureCube( tCube, vec3( -vRefractBegin[0].x, vRefractBegin[0].yz ));",
			//"refractedColor.r = textureCube( tCube, vec3( -vRefractBegin[0].x, vRefractBegin[0].yz ) ).r;",
			//"refractedColor.g = textureCube( tCube, vec3( -vRefractBegin[1].x, vRefractBegin[1].yz ) ).g;",
			//"refractedColor.b = textureCube( tCube, vec3( -vRefractBegin[2].x, vRefractBegin[2].yz ) ).b;",
			"};",

			"gl_FragColor = refractedColor;",

		"}"

	].join("\n")

};
