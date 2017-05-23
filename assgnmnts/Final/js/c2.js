/*
StudentID: 01654104

*/

var xRot, yRot, oldX = 0,
	oldY = 0,
	oldZ = 0,
	draggin = false,
	animating = false, loader, materials, cubeMesh, renderer, camera, scene, output, menuBtn, pntL, pntL2, joystick, tX, tY, travMesh = cubeMesh, mycone, myprism, mycyll;



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
	//renderer.alpha = true;
	renderer.autoClear = true;
	//renderer.setFaceCulling(0);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	renderer.setPixelRatio( window.devicePixelRatio );
	//camera = new THREE.PerspectiveCamera( 90, 1.5, 0.5, 10000 );
	camera = new THREE.OrthographicCamera( 600 / - 2, 600 / 2, 400 / 2, 400 / - 2, 1, 10000 );
	camera.position.z = 450;

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x141E30 );

	cubeMesh = new THREE.Group();

	//Calling the prism draw function
	myprism = drawPrism(
		new THREE.Vector3(100,100,100),
		new THREE.Vector3(100,-100,-100),
		new THREE.Vector3(-100,100,-100),
		new THREE.Vector3(-100,-100,100)
	);
	//Calling the cyllinder draw function
	mycyll = drawCyllinder((new THREE.Vector3(0,0,0)), 100, 200);
	//Calling the cone draw function
	mycone = drawCone((new THREE.Vector3(0,0,0)), 100, 100);

	//Adding thme all to the group cubeMesh

	cubeMesh.add(
		myprism,
		mycone,
		mycyll
	);
	// /cubeMesh.rotation.x = Math.PI /2;
	scene.add(cubeMesh);
	pntL = new THREE.PointLight(0xffffff, 0.6, 1500);
	pntL2 = new THREE.PointLight(0xffffff, 0.9, 1500);
	pntL.position.set(0,50,-200);
	pntL2.position.set(0,50,250);
	scene.add(pntL,pntL2);
	scene.add(new THREE.AmbientLight(0xffffff, 0.5));
	output = $( '#output' );
	output.append( renderer.domElement );
}


//ignore buttons
$( document ).ready( function() {
	menuBtn = $("#startStop");
	init();
	animate();


	$("#selectObject").change(function() {
		switch (this.value) {
			case '0':
				travMesh = cubeMesh;
				break;
			case '1':
				travMesh = mycone;
				break;
			case '2':
				travMesh = myprism;
				break;
			case '3':
				travMesh = mycyll;
				break;
			default:
				travMesh = cubeMesh;
		}
	});

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
		//console.log(deltaX, deltaY);
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
