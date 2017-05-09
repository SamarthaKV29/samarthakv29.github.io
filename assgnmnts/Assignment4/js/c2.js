var xRot, yRot, oldX = 0,
	oldY = 0,
	oldZ = 0,
	draggin = false,
	animating = false, loader, materials, cubeMesh, renderer, camera, scene, output, menuBtn, pntL, pntL2, joystick, tX, tY;


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
			console.log(tX, tY);
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
	$( "#output" ).mousemove( function( evt ) {
		//console.log(deltaX, deltaY);
		if ( draggin ) {

			deltaX = ( parseInt( oldX - evt.clientX ) * (Math.PI / 360));
			deltaY = ( parseInt( oldY - evt.clientY ) * (Math.PI / 360) );
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
		animating = false;
		menuBtn.text("Start Animating");
		oldX = evt.clientX;
		oldY = evt.clientY;
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
function animate() {
	requestAnimationFrame( animate );
	if ( animating ) {

		cubeMesh.rotation.x += 0.001;
		cubeMesh.rotation.y += 0.001;
		cubeMesh.rotation.z += 0.001;

	}
	renderer.render( scene, camera );
}

function init() {
	renderer = new THREE.WebGLRenderer();
	renderer.antialias = true;
	//renderer.alpha = true;
	renderer.autoClear = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	renderer.setPixelRatio( window.devicePixelRatio );
	camera = new THREE.PerspectiveCamera( 90, 1.5, 0.5, 10000 );
	camera.position.z = 250;
	loader = new THREE.TextureLoader();
	var front = loader.load('front.svg');
	var side = loader.load( 'side.svg' );
	var top = loader.load( 'top.svg' );
	front.anisotropy = 16;
	side.anisotropy = 16;
	top.anisotropy = 16;
	// front.needsUpdate = true;
	// side.needsUpdate = true;
	// top.needsUpdate = true;
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x141E30 );
	materials = [
		new THREE.MeshStandardMaterial( {
			color: 0xffffff,
			map: side,
			depthWrite: true,
			depthTest: true,
			shading: THREE.SmoothShading,

			metalness: 0.2
		} ), // right
		new THREE.MeshStandardMaterial( {
			color: 0xffffff,
			map: side,
			depthWrite: true,
			depthTest: true,
			shading: THREE.SmoothShading,

			metalness: 0.2
		} ), // left
		new THREE.MeshStandardMaterial( {
			color: 0xffffff,
			map: top,
			depthWrite: true,
			depthTest: true,
			shading: THREE.SmoothShading,

			metalness: 0.2
		} ), // top
		new THREE.MeshBasicMaterial( {
			color: 0x000000
		} ), // bottom
		new THREE.MeshStandardMaterial( {
			color: 0xffffff,
			map: front,
			depthWrite: true,
			depthTest: true,
			shading: THREE.SmoothShading,

			metalness: 0.2
		} ), // back
		new THREE.MeshStandardMaterial( {
			color: 0xffffff,
			map: front,
			depthWrite: true,
			depthTest: true,
			shading: THREE.SmoothShading,

			metalness: 0.2
		} ) // front
	];
	var cubeSidesMaterial = new THREE.MultiMaterial( materials );
	var cubeGeometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
	cubeMesh = new THREE.Mesh( cubeGeometry, cubeSidesMaterial );
	scene.add( cubeMesh );
	var ambient = new THREE.AmbientLight(0xffffff, 0.5);
	ambient.position = new THREE.Vector3(0,0,0);
	scene.add(ambient);
	pntL = new THREE.PointLight(0xffffff, 0.8, 500);
	pntL.position.set(-180,150,180);
	scene.add(pntL);
	pntL2 = new THREE.PointLight(0xffffff, 0.8, 500);
	pntL2.position.set(180,-150,180);
	scene.add(pntL2);
	//scene.add(mesh);
	output = $( '#output' );
	output.append( renderer.domElement );
}
