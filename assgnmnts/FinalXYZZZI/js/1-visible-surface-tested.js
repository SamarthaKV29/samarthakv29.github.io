/*
StudentID: 01654104
This is the solution to Q 1) in the final exam.
Detailed description of functions below

Resources:
1. THREE.JS, stadard library for WebGL implementations. https://threejs.org/
2. JQUERY, standard library for javascript functions, http://jquery.com/
3. Jquery Draggable: Extension for dragging support.
4. CSS styles.
*/
//---A basic function written to return line primitive objects----
function createLine(u,v, mat){
	lgeo = new THREE.Geometry();
	lgeo.vertices.push(u);
	lgeo.vertices.push(v);
	var l = new THREE.Line(lgeo, mat);
	return l;
}

//====Question 1 solution====

/* Here I draw a prism by using 6 lines. As required, we take 4 vertices as input and output a prism. I have to apply some rotation to recenter the prism for consistency with other objects*/
function drawPrism(v1,v2,v3,v4){
	var lines = [];
	m = new THREE.LineBasicMaterial({color: 0xffff00 , linewidth: 1.5});
	lines[0] = createLine(v2,v3, m);
	lines[1] = createLine(v2,v4, m);
	lines[2] = createLine(v3,v4, m);
	lines[3] = createLine(v1,v2, m);
	lines[4] = createLine(v1,v3, m);
 	lines[5] = createLine(v1,v4, m);
	prism = new THREE.Group();
	for(i=0;i<lines.length;i++)
		prism.add(lines[i]);
	prism.rotation.x = Math.PI /5;
	prism.rotation.y = Math.PI /4;
	// prism.rotation.z = angle;
	return prism;
}
//Here in the path, we use extractPoints(num_of_points) to extract the points from the circle. We ask for 20 points here.
/* Here I draw a cone by using one circlepath as base and 20 lines. As required, we take center, radius and height as input and output a cone. */
function drawCone(c,r,h){
	circlePath = new THREE.Shape();
	circlePath.absarc(c.x,c.y,r,0,Math.PI * 2);
	geo = new THREE.ShapeGeometry(circlePath);
	bas1 = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({wireframe:true, color: 0x00ff00}));
	bas1.position.z = h/2;
	top1 = new THREE.Vector3(c.x,c.y,-h/2);
	bas1pnts = circlePath.extractAllPoints(20);
	geo = new THREE.Geometry();
	conee = new THREE.Group();
	conee.add(bas1);
	m = new THREE.LineBasicMaterial({color: 0x00ff00 , linewidth: 1.5});
	for(i=0;i<bas1pnts.shape.length;i++){
		v2 = new THREE.Vector3(bas1pnts.shape[i].x, bas1pnts.shape[i].y, h/2);
		conee.add(createLine(top1,v2, m));
	}
	conee.rotation.z = 15 * Math.PI / 180;
	return conee;
}
/* Here I draw a cyllinder by using two circlepaths as bases and 20 lines. As required, we take center, radius and height as input and output a cyllinder. */
function drawCyllinder(c,r,h){
	circlePath = new THREE.Shape();
	circlePath.absarc(c.x,c.y,r,0,Math.PI * 2);
	geo = new THREE.ShapeGeometry(circlePath);
	bas1 = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({wireframe:true, color: 0xff0000}));
	bas1.position.z = h/2;
	bas2 = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({wireframe:true, color: 0xff0000}));
	bas2.position.z = -h/2;
	bas1pnts = circlePath.extractAllPoints(20);
	geo = new THREE.Geometry();
	cyll = new THREE.Group();
	cyll.add(bas1);
	cyll.add(bas2);
	m = new THREE.LineBasicMaterial({color: 0xff0000 , linewidth: 1.5});
	for(i=0;i<bas1pnts.shape.length;i++){
		v1 = new THREE.Vector3(bas1pnts.shape[i].x, bas1pnts.shape[i].y, -h/2);
		v2 = new THREE.Vector3(bas1pnts.shape[i].x, bas1pnts.shape[i].y, h/2);
		cyll.add(createLine(v1,v2, m));
	}
	cyll.rotation.z = 15 * Math.PI / 180;
	return cyll;
}
