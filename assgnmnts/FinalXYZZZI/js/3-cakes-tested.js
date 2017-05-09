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
//A function to calculate the line endpoint. Its is based on the parametic form of the line.

function calcLine(inx,iny,ang,r){
	return {
		x: inx + r * Math.cos(ang),
		y: iny + r * Math.sin(ang)
	};
}

//This is the formula for calculating the difference between the polygon and cake.
function calcDiffernce(Nsides, rad, hgt){
	var vc, vp;
	vp = apothem * apothem * Nsides * Math.tan(Math.PI/Nsides) * hgt; //Volume of polyhedron
	//console.log(vp);
	vc = Math.PI * rad * rad * hgt; //Volume of cyllinder
	$("#diff").val((1-(vp/vc))*100);
}


//A function that takes center, radius, angle, and number of sides and returns the shape as a THREE js primitive.
////Note: angle here is the 180 - interior angle. So for n = 8, interior angle = 135, angle = 45.
//This function is used internally in getNSidedPolyHedron() function.
function getNSidedPoly(c,r,ang,n){
	pnts = [];
	for(i=0;i<=n;i++){
		next = calcLine(c.x, c.y, ang * i, r);
		pnts.push(new THREE.Vector3(next.x, next.y, 0));
	}
	shp = new THREE.Shape();
	shp.fromPoints(pnts);

	polyPoints = pnts;
	v1 = (new THREE.Vector2(pnts[1].x, pnts[1].y));
	v2 = (new THREE.Vector2(pnts[2].x, pnts[2].y));
	apothem = v1.distanceTo(v2) / 2;
	apothem = Math.sqrt(rad * rad - apothem * apothem);
	return shp;
}

//A function that takes center, radius, number of sides and height, and returns the shape as a polyhedron mesh.
////Note: angle here is the 180 - interior angle. So for n = 8, interior angle = 135, angle = 45.
//It is calculated for usage in getNSidedPoly() function.
//I have used an extrude geometry to draw extruded shape.
function getNSidedPolyHedron(c,r,n,h){
	var ang = (180 - (((n-2)*180)/n)) * (Math.PI/180);
	bas1shp = getNSidedPoly(c,r,ang,n);
	var extrudeSettings = {
		steps: 100,
		amount: h,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	};
	geo = new THREE.ExtrudeGeometry(bas1shp, extrudeSettings);
	polyhedron = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color: 0x00aafa}));
	polyhedron.position.z += 10;
	calcDiffernce(Nsides, rad, hgt);
	return polyhedron;
}

//This function takes center, radius and height and returns a cyllinder mesh.
function getCyllinder(c,r,h){
	circlePath = new THREE.Shape();
	circlePath.absarc(c.x,c.y,r,0,Math.PI * 2);
	var extrudeSettings = {
		steps: 100,
		amount: h,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	};
	geo = new THREE.ExtrudeGeometry(circlePath, extrudeSettings);
	cyll = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color: 0xfaaa0a}));
	return cyll;
}


//Drawing the slice can be tricky. A special angle needs to be calculated, as shown below.
//This function takes the number of sides, center, radius and height and returns a complete group of two meshes,
//one for each slice of cake, and slice of polygon. I had to reduce n by 1 to draw the slice properly.

function drawSlice( n, c, r, h ) {
	n = n - 1;
	var slicem = new THREE.Group();
	var angl = ( sTheta / n ) * ( Math.PI / 180 );
	var extrudeSettings = {
		steps: 100,
		amount: h,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	};
	cakesliceshp = new THREE.Shape();
	cakesliceshp.absarc( c.x, c.y, r, 0, ( Math.PI / 180 ) * sTheta );
	slicecyllgeo = new THREE.ExtrudeGeometry( cakesliceshp, extrudeSettings );
	slicem.add( new THREE.Mesh( slicecyllgeo, new THREE.MeshPhongMaterial( {
		color: 0xfaaa0a,
		lights: true
	} ) ) );
	pnts = [];
	for ( i = 0; i <= n; i++ ) {
		next = calcLine( c.x, c.y, angl * i, r );
		pnts.push( new THREE.Vector2( next.x, next.y ) );
	}
	polyslice = new THREE.Shape();
	polyslice.fromPoints( pnts );
	slicegeo = new THREE.ExtrudeGeometry( polyslice, extrudeSettings );
	slicemesh = new THREE.Mesh( slicegeo, new THREE.MeshPhongMaterial( {
		color: 0x00aafa,
		lights: true
	} ) );
	slicemesh.position.z += 10;
	slicem.add( slicemesh );
	return slicem;
}

//This function takes a single value, the difference(%) and displays the result in an element with id 'tabnos'
//To compute the value, I use the dervied equation as shown in the image. I find the value of (ntan(PI/n)) and compare it to the constant C1 shown in image.
function calcDifference( t ) {

	v = parseFloat( t.value );
	v = 1 - v / 100; //Convert the value from %age to decimal.
	const C1 = ( v * Math.PI * rad * rad ) / ( apothem * apothem );
	for ( i = 3; i < 99; i++ ) { //Testing for all the angles and number of sides.
		tanPIbyN = Math.tan( Math.PI / i ); // THIS is (n * tan (PI/n))
		diff = ( C1 ).toFixed( 4 ) - ( i * tanPIbyN ).toFixed( 4 ); //Compare the difference.
		if ( diff < 0.01 && diff > -0.01 ) { // check if the diff error is between [-1,1]
			$( '#tabnos' ).val( i ); //Update the value when match.
			return;
		}
	}
}
