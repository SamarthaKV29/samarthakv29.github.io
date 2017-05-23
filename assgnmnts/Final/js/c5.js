/*
StudentID: 01654104

*/


var xRot, yRot, oldX = 0,
	oldY = 0,
	oldZ = 0,
	draggin = false,
	animating = false, loader, materials, cubeMesh, renderer, camera, scene, output, menuBtn, pntL, pntL2, joystick, tX, tY;



//Animate function - required for re-rendering
function animate() {
	requestAnimationFrame( animate );
	if ( animating ) {

		cubeMesh.rotation.x += 0.001;
		cubeMesh.rotation.y += 0.001;
		cubeMesh.rotation.z += 0.001;

	}
	renderer.render( scene, camera );
}

//Initialization of all the required objects.
function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.antialias = true;
	renderer.autoClear = true;
	renderer.setSize(800,600);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	renderer.setPixelRatio( window.devicePixelRatio );
	camera = new THREE.OrthographicCamera( -800, 800, 600, -600, 100, 100000 );
	camera.position.z = 250;
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x141E30 );

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.renderReverseSided = false;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;



	cubeMesh = new THREE.Group();
	loader = new THREE.TextureLoader();
	worldmap = loader.load('textures/worldmap.jpg');
	worldmap.format = THREE.RGBFormat;
	//worldmap.mapping = THREE.SphericalReflectionMapping;
	var sgeo = new THREE.SphereGeometry( 600, 32, 32 );
	var smat = new THREE.MeshPhongMaterial( {color: 0xffffff, map: worldmap, side: THREE.DoubleSide} );
	var sphere = new THREE.Mesh( sgeo, smat );
	sphere.castShadow = true;

	textcbe = loader.load( "textures/worldmap.jpg" );
	textcbe.format = THREE.RGBFormat;
	textcbe.mapping = THREE.EquirectangularReflectionMapping;



	bumptex = loader.load('textures/bumpmap.png');
	bumptex.format = THREE.RGBFormat;
	bumptex.anisotropy = 4;
	bumptex.repeat.set( 0.998, 0.998 );
	bumptex.offset.set( 0.001, 0.001 );
	bumptex.wrapS = bumptex.wrapT = THREE.RepeatWrapping;
	var cube = new THREE.Mesh(
		new THREE.BoxGeometry(200,200,200),
		new THREE.MeshPhongMaterial({
			color: 0xffffff,
			envMap:textcbe,
			specular: 0x222222,
			shininess: 25,
			side: THREE.DoubleSide,
			bumpMap: bumptex,
			bumpScale: 10
		 })
	 );

	cubeMesh.add(sphere,cube);




	// plane = new THREE.Mesh(new THREE.PlaneGeometry(10000,10000,10000), new THREE.MeshStandardMaterial({color:0x000000}))
	// plane.rotation.y = Math.PI/2;
	// scene.add(plane);

	scene.add(cubeMesh);
	pntL = new THREE.PointLight(0xffffff, 5, 1500);
	pntL2 = new THREE.PointLight(0xffffff, 2, 1500);
	pntL.position.set(-100,150,900);
	pntL2.position.set(100,-150,900);

	scene.add(pntL,pntL2);
	scene.add(new THREE.AmbientLight(0xffffff,2));
	output = $( '#output' );
	output.append( renderer.domElement );
}




function zoomin(){
	camera.position.z -= 5;
	cubeMesh.scale.x += 1; cubeMesh.scale.z += 1; cubeMesh.scale.y += 1;
}

function zoomout(){
	camera.position.z += 5;
	if(cubeMesh.scale.x > 1){
		cubeMesh.scale.x -= 0.1; cubeMesh.scale.z -= 0.1; cubeMesh.scale.y -= 0.1;
	}
	else{
		cubeMesh.scale.x = 1; cubeMesh.scale.z = 1; cubeMesh.scale.y = 1;
	}
}





//ignore buttons
$( document ).ready( function() {
	menuBtn = $("#startStop");
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
			try{
				if(tX < 5){
					travMesh.position.x -= 5;
				}
				else if(tX > 29){
					travMesh.position.x += 5;
				}
				if(tY < 5){
					travMesh.position.y += 5;
				}
				else if(tY > 29){
					travMesh.position.y -= 5;
				}
			}catch(ee){
				travMesh = cubeMesh;
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


	$( "#output" ).mousemove( function( evt ) {
		evt.preventDefault();
		//console.log(evt.which);
		//console.log(deltaX, deltaY);
		if(evt.which == 1){
			if ( draggin ) {
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
					cubeMesh.rotation.y	 = yRot;
				}
				renderer.render( scene, camera );
			}
		}
		else if(evt.which == 3){

			deltaX = ( parseInt( oldX - evt.clientX ) * (Math.PI / 180));
			deltaY = ( parseInt( oldY - evt.clientY ) * (Math.PI / 180));
			if ( Math.abs( deltaY ) > 0.1 ) {
				xRot = deltaY;
				//console.log("moving along x");
				camera.rotation.x = xRot;
			}
			if ( Math.abs( deltaX ) > 0.1 ) {
				yRot = -deltaX;
				//console.log("moving along y");
				camera.rotation.y	 = yRot;
			}
			renderer.render( scene, camera );
		}
		else if(evt.which == 2){
			deltaX = ( parseInt( oldX - evt.clientX ) * (Math.PI / 180));
			deltaY = ( parseInt( oldY - evt.clientY ) * (Math.PI / 180));
			if ( Math.abs( deltaY ) > 0.1 ) {
				xRot = deltaY;
				//console.log("moving along x");
				camera.position.z -= xRot;
			}
			if ( Math.abs( deltaX ) > 0.1 ) {
				yRot = -deltaX;
				//console.log("moving along y");
				camera.position.z	+= yRot;
			}
			renderer.render( scene, camera );
		}
	} ).mousedown( function( evt ) {
		animating = false;
		menuBtn.text("Start Animating");
		if(oldX == 0 && oldY == 0){
			oldX = evt.clientX;
			oldY = evt.clientY;
		}

		draggin = true;
	} ).mouseup( function( evt ) {
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
	camera.rotation.set(0,0,0);
	camera.position.z = 250;
	renderer.render(scene, camera);
}
function resetScale(){
	cubeMesh.scale.x = 1;
	cubeMesh.scale.y = 1;
	cubeMesh.scale.z = 1;

	renderer.render(scene, camera);
}
function resetTranslate(){
	try{
		travMesh.position.x = 0;
		travMesh.position.y = 0;
		travMesh.position.z = 0;
	}catch(ex){
		travMesh = cubeMesh;
	}

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
	if ( !animating ) {
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

// function getBounds(){
// 	bb = new Array(100);
// 	vc = Math.PI * rad * rad * hgt;
// 	bb.push(100);
// 	bb.push(98);
// 	bb.push(97);
// 	for(i = 3; i< 100; i++){
// 		vp = apothem * apothem * (i) * Math.tan(Math.PI/(i)) * hgt;
// 		bb.push((1-(vp/vc))*100);
// 	}
// 	return bb;
	//////////////--------------
	// bounds = getBounds();
	// for(i=0; i < bounds.length; i++){
	// 	console.log(Math.abs(bounds[i] / v));
	// 	if( Math.abs(bounds[i] - v) < 0.001){
	// 		$('#tabnos').val(i-100);
	// 		break;
	// 	}
	//
	// }
// }
