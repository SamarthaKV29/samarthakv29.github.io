var xRot, yRot, oldX = 0,
	oldY = 0,
	oldZ = 0,
	draggin = false,
	animating = false, loader, materials, cubeMesh, renderer, camera, scene, output, menuBtn, pntL, pntL2, joystick, tX, tY, roundedV = 0, roundedH = 0, roundedDR = 1, mat, colr, colR = 100/255, colG = 100/255, colB = 100/255;


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

	$("#setTex").change(function(){
		switch (parseInt($(this).val())) {
			case 1: currtex = steeltex; break;
			case 2: currtex = bricktex; break;
			case 3: currtex = tiletex; break;
			default:
		}
		mat = new THREE.MeshStandardMaterial({color: colr, map: currtex, side:THREE.FrontSide, roughness: 0.19, metalness: 0.17});
		scene.remove(cubeMesh);
		cubeMesh = new THREE.Group();
		drawRoundedBox(0,0,80,80,roundedV,roundedH,roundedDR);
		scene.add(cubeMesh);
		renderer.render(scene,camera);
	});

	var mDown1 = false;
	$("#DoubleSide").change(function(evt){
		try{
			if(!$(this).is(":checked"))
				mat.side = THREE.FrontSide;
			else {
				mat.side = THREE.DoubleSide;
			}
		}catch(e){
			console.log("Mesh not defined");
		}
		mat = new THREE.MeshStandardMaterial({color: colr, map: currtex, side:THREE.FrontSide, roughness: 0.19, metalness: 0.17});
		scene.remove(cubeMesh);
		cubeMesh = new THREE.Group();
		drawRoundedBox(0,0,80,80,roundedV,roundedH,roundedDR);
		scene.add(cubeMesh);
		renderer.render(scene,camera);
	});
	$("#colR").change(function() {
		colR = $(this).val()/255;
		colr = new THREE.Color(colR, colG, colB);
		mat = new THREE.MeshStandardMaterial({color: colr, map: currtex, side:THREE.FrontSide, roughness: 0.19, metalness: 0.17});
		scene.remove(cubeMesh);
		cubeMesh = new THREE.Group();
		drawRoundedBox(0,0,80,80,roundedV,roundedH,roundedDR);
		scene.add(cubeMesh);
		renderer.render(scene,camera);
	});
	$("#colG").change(function() {
		colG = $(this).val()/255;
		colr = new THREE.Color(colR, colG, colB);
		mat = new THREE.MeshStandardMaterial({color: colr, map: currtex, side:THREE.FrontSide, roughness: 0.19, metalness: 0.17});
		scene.remove(cubeMesh);
		cubeMesh = new THREE.Group();
		drawRoundedBox(0,0,80,80,roundedV,roundedH,roundedDR);
		scene.add(cubeMesh);
		renderer.render(scene,camera);
	});
	$("#colB").change(function() {
		colB = $(this).val()/255;
		colr = new THREE.Color(colR, colG, colB);
		mat = new THREE.MeshStandardMaterial({color: colr, map: currtex, side:THREE.FrontSide, roughness: 0.19, metalness: 0.17});
		scene.remove(cubeMesh);
		cubeMesh = new THREE.Group();
		drawRoundedBox(0,0,80,80,roundedV,roundedH,roundedDR);
		scene.add(cubeMesh);
		renderer.render(scene,camera);
	});



	$("#setV").mouseout(function(){
		$(this).attr("value","SetV").attr("type","button");
	}).mousedown(function(){
		mDown1 = true;
		$(this).attr('type','range').attr('min', '-0.9').attr('max', '0.9').attr('defaultValue', '0').attr('step', '0.01');
	}).mousemove(function(){
		if(mDown1){
			v = $(this).val();
			console.log(v);
			roundedV = v;
			scene.remove(cubeMesh);
			cubeMesh = new THREE.Group();
			drawRoundedBox(0,0,80,80,roundedV,roundedH,roundedDR);
			scene.add(cubeMesh);

			renderer.render(scene,camera);
		}
	}).mouseup(function(){
		mDown1 = false;
		$(this).attr("type","button").val("SetV");
	});
	$("#setH").mouseout(function(){
		$(this).attr("value","SetH").attr("type","button");
	}).mousedown(function(){
		mDown1 = true;
		$(this).attr('type','range').attr('min', '-0.9').attr('max', '0.9').attr('defaultValue', '0').attr('step', '0.01');
	}).mousemove(function(){
		if(mDown1){
			v = $(this).val();
			console.log(v);
			roundedH = v;
			scene.remove(cubeMesh);
			cubeMesh = new THREE.Group();
			drawRoundedBox(0,0,80,80,roundedV,roundedH,roundedDR);
			scene.add(cubeMesh);

			renderer.render(scene,camera);
		}
	}).mouseup(function(){
		mDown1 = false;
		$(this).attr("type","button").val("SetH");
	});
	$("#setDR").mouseout(function(){
		$(this).attr("value","SetDepthRatio").attr("type","button");
	}).mousedown(function(){
		mDown1 = true;
		$(this).attr('type','range').attr('min', '0').attr('max', '1').attr('defaultValue', '0').attr('step', '0.01');
	}).mousemove(function(){
		if(mDown1){
			v = $(this).val();
			console.log(v);
			roundedDR = v;
			scene.remove(cubeMesh);
			cubeMesh = new THREE.Group();
			drawRoundedBox(0,0,80,80,roundedV,roundedH,roundedDR);
			scene.add(cubeMesh);

			renderer.render(scene,camera);
		}
	}).mouseup(function(){
		mDown1 = false;
		$(this).attr("type","button").val("SetDepthRatio");
	});




	renderer.render( scene, camera );
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
				cubeMesh.rotation.y = yRot;
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
	colr = new THREE.Color(colR,colG,colB);
	loader = new THREE.TextureLoader();
	steeltex = loader.load('textures/steel.jpg');
	tiletex = loader.load('textures/tile.jpg');
	bricktex = loader.load('textures/brick.jpg');
	currtex = steeltex;
	mat = new THREE.MeshStandardMaterial({color: colr, map: currtex, side:THREE.FrontSide, roughness: 0.19, metalness: 0.17});
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x141E30 );
	cubeMesh = new THREE.Group();
	drawRoundedBox(0,0,80,80,roundedV,roundedH,roundedDR);
	pntL = new THREE.PointLight(0xffffff, 0.6, 1500);
	pntL2 = new THREE.PointLight(0xffffff, 0.9, 1500);
	pntL.position.set(0,50,-200);
	pntL2.position.set(0,50,250);
	scene.add(pntL,pntL2);
	scene.add(new THREE.AmbientLight(0xffffff, 0.5));
	output = $( '#output' );
	output.append( renderer.domElement );
}
function getPlaneSideGeo(width){
	var shape = new THREE.Shape();
	shape.moveTo(-width, -width);
	shape.lineTo(-width, width);
	shape.lineTo(width, width);
	shape.lineTo(width,-width);
	shape.lineTo(-width, -width);
	return new THREE.ShapeGeometry(shape);
}

function getCurvedSideGeo(width, vORh){
	var shape = new THREE.Shape();
	shape.moveTo(-width, -width);
	shape.lineTo(-width, width);
	shape.lineTo(width, width);
	shape.lineTo(width,-width);
	shape.lineTo(-width, -width);
	rad = Math.abs(width * vORh) - 0.09;
	hole1 = new THREE.Path();
	hole1.absarc(0,0,rad,0,Math.PI*2);

	shape.holes.push(hole1);
	return new THREE.ShapeGeometry(shape);
}

function getFace(w,vORh,mat){

	mgrp = new THREE.Group();
	if(vORh == 0){
		mgrp.add(new THREE.Mesh(getPlaneSideGeo(w), mat));
		return mgrp;
	}
	mgrp.add(new THREE.Mesh(getCurvedSideGeo(w,vORh,true), mat));
	rad = (w * vORh) - 0.02;
	sphr = new THREE.Mesh(new THREE.SphereGeometry(rad,20,20,0,Math.PI,0,Math.PI), mat);

	if(vORh < 0)
		sphr.scale = -1;
	mgrp.add(sphr);
	return mgrp;

}
function drawRoundedBox(xS, yS, xE, yE, v, h, depthRatio){
	var wdth = Math.abs(xE - xS);
	var lnth = Math.abs(yE - yS);

	faces = [];
	for(i=0; i< 6; i++){
		if( i == 4 || i == 5)
			faces.push(getFace(wdth,v,mat));
		else {
			faces.push(getFace(wdth,h,mat));
		}
	}
	depp = wdth;

	faces[0].position.z = depp;
	faces[1].position.z = -depp;
	faces[1].rotation.y = Math.PI;
	faces[2].rotation.y = Math.PI / 2;
	faces[3].rotation.y = -Math.PI / 2;
	faces[2].position.x = depp;
	faces[3].position.x = -depp;
	faces[4].rotation.x = -Math.PI / 2;
	faces[5].rotation.x = Math.PI / 2;
	faces[4].position.y = depp;
	faces[5].position.y = -depp;
	for(i=0;i<6;i++)
		cubeMesh.add(faces[i]);

	cubeMesh.scale.y = lnth/wdth;
	cubeMesh.scale.z = depthRatio;
	scene.add(cubeMesh);
}
