var xRot, yRot, oldX = 0,
	oldY = 0,
	oldZ = 0,
	draggin = false,
	animating = false, loader, materials, cubeMesh, renderer, camera, scene, output, menuBtn, pntL, pntL2, joystick, tX, tY, inputting = false, inpX = 0, inpY = 0, inpZ = 0, meshVer = [], verCount = 0, rCx = 300, rCy = 200,wdth = 800,hgt = 600;


$( document ).ready( function() {
	menuBtn = $("#startStop");
	output = $( '#output' );

	init();
	animate();

	var joys = $('div.joys');
	$( "div.stickE" ).draggable({
		create: function() {
			$(this).data("startLeft",parseInt($(this).css("left")));
      $(this).data("startTop",parseInt($(this).css("top")));
		},
	  containment: "div.baseE",
		scroll: false,
		cursor: 'pointer',
		drag: function(evt,ui) {
			tX = Math.ceil(ui.position.left);
			tY = Math.ceil(ui.position.top);
			if(tX < 5){
				cubeMesh.position.x -= 5;
			}
			else if(tX > 29){
				cubeMesh.position.x += 5;
			}
			if(tY < 5){
				cubeMesh.position.y += 5;
			}
			else if(tY > 29){
				cubeMesh.position.y -= 5;
			}
			renderer.render(scene, camera);
		}
	}).mouseup(function() {
		resetJoys($(this));
	});
	joys.mouseup(function() {
		resetJoys($('div.stickE'));
	});
	$('body').mouseup(function() {
		resetJoys($('div.stickE'));
	})
	resetJoys($('div.stickE'));






	renderer.render( scene, camera );
	//For inputting
	$( "#output" ).mousemove(function(evt){
		//console.log(evt.offsetX, evt.offsetY);
	})
	.mousedown( function( evt ) {
		if(inputting){
			if(inpX == 0 && inpY == 0){
				inpX = evt.offsetX - rCx;
				inpY = evt.offsetY - rCy;
			}
		}
	} ).mouseup( function( evt ) {
		if(inputting){
			deltaX = evt.offsetX - rCx;
			deltaY = evt.offsetY - rCy;
			inpZ = parseInt(Math.sqrt(Math.pow((deltaX - inpX), 2) + Math.pow((deltaY - inpY), 2))) % 250;

			meshVer.push(new THREE.Vector3(inpX,inpY,inpZ));
			inpX = 0;
			inpY = 0;
			if(meshVer.length % 3 == 0){
				generatePoly();
				renderer.render(scene, camera);
			}
		}


	} );

	//For moving the mesh
	$( "#output" ).mousemove( function( evt ) {
		//console.log(deltaX, deltaY);
		if ( draggin && inputting == false) {

			deltaX = ( parseInt( oldX - evt.clientX ) * (Math.PI / 180));
			deltaY = ( parseInt( oldY - evt.clientY ) * (Math.PI / 180));
			if ( Math.abs( deltaY ) > 0.1 ) {
				xRot = deltaY;
				//console.log("moving along x");
				cubeMesh.rotation.x = xRot;
			}
			if ( Math.abs( deltaX ) > 0.1 ) {
				yRot = -deltaX;
				//console.log("moving along y");
				cubeMesh.rotation.y = yRot;
			}
			renderer.render( scene, camera );
		}
	} ).mousedown( function( evt ) {
		$(this).css("cursor", "crosshair");
		animating = false;
		menuBtn.text("Start Animating");
		if(oldX == 0 && oldY == 0){
			oldX = evt.clientX;
			oldY = evt.clientY;
		}

		draggin = true;
	} ).mouseup( function( evt ) {
		$(this).css("cursor", "default");
		draggin = false;
	} );






	$("#RotateZ").mouseout(function(){
    $(this).attr("value","RotateZ").attr("type","button");
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '0').attr('max', '360').attr('defaultValue', '0');
  }).mousemove(function(){
			v = $(this).val();

     if(!isNaN(parseFloat(v))){
			 oldZ = (v * (2 * Math.PI) / 360);
			 cubeMesh.rotation.z = oldZ;
			 renderer.render(scene,camera);
		 }
  }).mouseup(function(){
    $(this).attr("type","button").val("RotateZ");
  });
	$("#TranslateZ").mouseout(function(){
    $(this).attr("value","TranslateZ").attr("type","button");
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '-400').attr('max', '100').attr('defaultValue', '0');
  }).mousemove(function(){
			v = $(this).val();
     if(!isNaN(parseFloat(v))){
			 cubeMesh.position.z = v;
			 renderer.render(scene,camera);
		 }
  }).mouseup(function(){
    $(this).attr("type","button").val("TranslateZ");
  });
	$("#ScaleX").mouseout(function(){
    $(this).attr("value","ScaleX").attr("type","button");
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '1').attr('max', '100').attr('defaultValue', '1');
  }).mousemove(function(){
			v = $(this).val();

     if(!isNaN(parseFloat(v))){

			 cubeMesh.scale.x = v/100;
			 renderer.render(scene,camera);
		 }
  }).mouseup(function(){
    $(this).attr("type","button").val("ScaleY");
  });
	$("#ScaleY").mouseout(function(){
    $(this).attr("value","ScaleY").attr("type","button");
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '1').attr('max', '100').attr('defaultValue', '1');
  }).mousemove(function(){
			v = $(this).val();

     if(!isNaN(parseFloat(v))){
			 cubeMesh.scale.y = v/100;
			 renderer.render(scene,camera);
		 }
  }).mouseup(function(){
    $(this).attr("type","button").val("ScaleY");
  });
	$("#ScaleZ").mouseout(function(){
    $(this).attr("value","ScaleZ").attr("type","button");
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '1').attr('max', '100').attr('defaultValue', '1');
  }).mousemove(function(){
			v = $(this).val();

     if(!isNaN(parseFloat(v))){
			 cubeMesh.scale.z = v/100;
			 renderer.render(scene,camera);
		 }
  }).mouseup(function(){
    $(this).attr("type","button").val("ScaleZ");
  });

	$("#LightIntensity").mouseout(function(){
    $(this).attr("value","Lighting Intensity").attr("type","button");
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '0').attr('max', '5').attr('defaultValue', '0').attr('step', '0.2');
  }).mousemove(function(){
		 v = $(this).val();
     if(!isNaN(parseFloat(v))){
			 pntL.intensity = v;
			 pntL2.intensity = v;
			 renderer.render(scene,camera);
		 }
  }).mouseup(function(){
    $(this).attr("type","button").val("Lighting Intensity");
  });
	renderer.render( scene, camera );
} );
function resetRotations(){
	cubeMesh.rotation.x = 0;
	cubeMesh.rotation.y = 0;
	cubeMesh.rotation.z = 0;

	renderer.render(scene, camera);
}
function resetScale(){
	cubeMesh.scale.x = 1;
	cubeMesh.scale.y = 1;
	cubeMesh.scale.z = 1;

	renderer.render(scene, camera);
}
function resetTranslate(){
	cubeMesh.position.x = 0;
	cubeMesh.position.y = 0;
	cubeMesh.position.z = 0;

	renderer.render(scene, camera);
}
function resetTransforms(){
	cubeMesh.rotation.x = 0;
	cubeMesh.rotation.y = 0;
	cubeMesh.rotation.z = 0;

	cubeMesh.scale.x = 1;
	cubeMesh.scale.y = 1;
	cubeMesh.scale.z = 1;

	cubeMesh.position.x = 0;
	cubeMesh.position.y = 0;
	cubeMesh.position.z = 0;

	renderer.render(scene, camera);
}
function toggleAnimating(btn) {
	var lll = btn.parent();
	var ico = lll.children('i');
	if ( !animating && inputting ) {
		animating = true;
		btn.text("Stop Animating");
		ico.removeClass('fa fa-play').addClass('fa fa-pause');
		animate();
	} else {
		animating = false;
		ico.removeClass('fa fa-pause').addClass('fa fa-play');
		btn.text("Start Animating");
	}
}
function resetJoys(stick){
	stick.css("left", "16px").css("top", "16px");
}
function animate() {
	requestAnimationFrame( animate );
	if ( animating ) {

		cubeMesh.rotation.x += 0.001;
		cubeMesh.rotation.y += 0.001;
		cubeMesh.rotation.z += 0.001;

	}
	renderer.render( scene, camera );
}


function init(){

	renderer = new THREE.WebGLRenderer();
	renderer.antialias = true;
	//renderer.alpha = true;
	renderer.autoClear = true;
	renderer.setFaceCulling(0);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	renderer.setPixelRatio( window.devicePixelRatio );
	camera = new THREE.PerspectiveCamera( 90, 1.5, 0.5, 10000 );
	camera.position.z = 250;

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x141E30 );
	cubeMesh = new THREE.Group();
	pntL = new THREE.PointLight(0xffffff, 0.5, 1500);
	pntL2 = new THREE.PointLight(0xffffff, 0.5, 1500);
	pntL.position.set(0,0,0);
	pntL2.position.set(0,0,200);
	scene.add(pntL,pntL2);
	scene.add(new THREE.AmbientLight(0xffffff, 0.4));
// 	yaxis = new THREE.Line(	)
// 	geometry.vertices.push(
// 	new THREE.Vector3( -10, 0, 0 ),
// 	new THREE.Vector3( 0, 10, 0 ),
// );
// 	yaxis.moveTo(, 0);
// 	yaxis.lineTo($())



	var geo = new THREE.Geometry(), geo2 = new THREE.Geometry();
	geo.vertices.push(
		new THREE.Vector3( -wdth/2, 0, 0 ),
		new THREE.Vector3( wdth/2, 0, 0 )
	)
	geo2.vertices.push(
		new THREE.Vector3( 0, -hgt/2, 0 ),
		new THREE.Vector3( 0, hgt/2, 0 )
	)
	scene.add( new THREE.Line( geo, new THREE.LineBasicMaterial({color: 0xdddddd, linewidth: 1.5}) ) );
	scene.add( new THREE.Line( geo2, new THREE.LineBasicMaterial({color: 0xdddddd, linewidth: 1.5}) ) );

	output.append( renderer.domElement );


	renderer.render(scene, camera);
}

verCount = 0;
function generatePoly(){
	//return (new THREE.Mesh(new THREE.BoxGeometry(100,100,100), new THREE.MeshPhongMaterial({color: 0xff0000})));
	scene.remove(cubeMesh);
	cubeMesh = new THREE.Group();
	for(i = 0; i < meshVer.length; i+=3){
		geo = new THREE.Geometry();
		geo.vertices.push(meshVer[i]);
		geo.vertices.push(meshVer[i+1]);
		geo.vertices.push(meshVer[i+2]);
		geo.faces.push( new THREE.Face3( 0, 1, 2 ) );
		geo.computeFaceNormals();
		var colr = new THREE.Color("rgb("+parseInt((Math.random()*255))+","+parseInt((Math.random()*255))+","+parseInt((Math.random()*255))+")");
		mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color: colr, side: THREE.DoubleSide}));
		//mesh.scale.set(0.5,0.5,0.5);
		cubeMesh.add(mesh);

	}
	scene.add(cubeMesh);
}

function toggleInputting(t){
	if(t.checked)
		inputting = true;
	else {
		inputting = false;
	}
}
