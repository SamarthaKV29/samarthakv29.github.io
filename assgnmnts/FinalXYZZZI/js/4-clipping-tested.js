/*
StudentID: 01654104
This is the solution to Q 2) in the final exam.
Detailed description of functions below
Resources:
1. THREE.JS, stadard library for WebGL implementations. https://threejs.org/
2. JQUERY, standard library for javascript functions, http://jquery.com/
3. Jquery Draggable: Extension for dragging support.
4. CSS styles.
*/


//Created only one view, Perspective. Used clipping from THREE js library support.



	viewVol = new THREE.Group();
	pnts = [];
	pnts2 = [];
	planegeo = new THREE.PlaneGeometry(400,300);
	pnts = planegeo.vertices;
	var i;
	planegeo = new THREE.PlaneGeometry(200,150);
	pnts2 = planegeo.vertices;
	viewVol.add(
		createline(new THREE.Vector3(pnts[0].x, pnts[0].y, -200), new THREE.Vector3(pnts[1].x, pnts[1].y, -200)),
		createline(new THREE.Vector3(pnts[1].x, pnts[1].y, -200), new THREE.Vector3(pnts[3].x, pnts[3].y, -200)),
		createline(new THREE.Vector3(pnts[2].x, pnts[2].y, -200), new THREE.Vector3(pnts[0].x, pnts[0].y, -200)),
		createline(new THREE.Vector3(pnts[3].x, pnts[3].y, -200), new THREE.Vector3(pnts[2].x, pnts[2].y, -200)),
		createline(new THREE.Vector3(pnts2[0].x, pnts2[0].y, 200), new THREE.Vector3(pnts2[1].x, pnts2[1].y, 200)),
		createline(new THREE.Vector3(pnts2[1].x, pnts2[1].y, 200), new THREE.Vector3(pnts2[3].x, pnts2[3].y, 200)),
		createline(new THREE.Vector3(pnts2[2].x, pnts2[2].y, 200), new THREE.Vector3(pnts2[0].x, pnts2[0].y, 200)),
		createline(new THREE.Vector3(pnts2[3].x, pnts2[3].y, 200), new THREE.Vector3(pnts2[2].x, pnts2[2].y, 200)),
		createline(new THREE.Vector3(pnts[0].x, pnts[0].y, -200), new THREE.Vector3(pnts2[0].x, pnts2[0].y, 200)),
		createline(new THREE.Vector3(pnts[1].x, pnts[1].y, -200), new THREE.Vector3(pnts2[1].x, pnts2[1].y, 200)),
		createline(new THREE.Vector3(pnts[2].x, pnts[2].y, -200), new THREE.Vector3(pnts2[2].x, pnts2[2].y, 200)),
		createline(new THREE.Vector3(pnts[3].x, pnts[3].y, -200), new THREE.Vector3(pnts2[3].x, pnts2[3].y, 200))
	);


	cubeMesh = new THREE.Group();
	cubeMesh.add(viewVol);


	var localPlane = new THREE.Plane( new THREE.Vector3( 0, 0, -1 ), 0.8 );
	var globalPlane = new THREE.Plane( new THREE.Vector3( - 1, 0, 0 ), 0.1 );

	var mat1 = new THREE.MeshPhongMaterial( {
						color: 0x80ee10,
						shininess: 100,
						side: THREE.DoubleSide,
						clippingPlanes: [ localPlane ],
						clipShadows: true
					} );

	cubeCC = new THREE.Mesh(new THREE.BoxGeometry(100,100,100), mat1);
	cubeMesh.add(cubeCC);
