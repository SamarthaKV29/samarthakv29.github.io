var scene, camera, renderer;
var geometry, material, mesh, hmesh;
var inners = document.getElementsByClassName('inner');
var cnvss = document.getElementsByClassName('cnvs');
var headerCube = document.getElementById("headerCube");
var headerInner = document.getElementById("headerInner");
var cube;

$(document).ready(function() {

  init(cnvss[0], inners[0], 0.796, 0.796, 0, 'forestgreen');
  init(cnvss[1], inners[1], 35, 35.346, 0, 0x73a9e4);
  init(cnvss[2], inners[2], 0.6, 0.6, 0, 0xa3a9e4);
  initsp(cnvss[3], inners[3]);
  init(cnvss[4], inners[4], 0.1, 0.1, 0, 0x902a0a);
  init(cnvss[5], inners[5], 0.3, 0.25, -0.05, 0xaaaa04);
  initpers(cnvss[6], inners[6], 0,0, 0, 0xa30914);
  initpers(cnvss[7], inners[7], 0,0.796, 0, 0xafaaff);
  initpers(cnvss[8], inners[8], 0.696,0.75, 0, 0xa8a808);
  initsp2(headerCube, headerInner);
  animate();



  function initsp(cnv, parnt) {
    renderer = new THREE.WebGLRenderer({canvas: cnv});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(cnv.width, cnv.height);
		renderer.setPixelRatio( window.devicePixelRatio );
    camera = new THREE.PerspectiveCamera( 45, 1, 0.5, 1000 );

		camera.position.z = 400;

    scene = new THREE.Scene();
    geometry = new THREE.PlaneGeometry( 120, 120 );
		material1 = new THREE.MeshPhysicalMaterial( {color:0xff0000, roughness: 0.5, metalness: 0.5} );
    material2 = new THREE.MeshPhysicalMaterial( {color:0x555555, roughness: 0.5, metalness: 0.5} );
    material3 = new THREE.MeshPhysicalMaterial( {color:0x0000ff, roughness: 0.5, metalness: 0.5} );

		mesh1 = new THREE.Mesh( geometry, material1 );
    mesh1.position.x = -75;
    mesh1.position.y = -75;
		scene.add( mesh1 );
    mesh2 = new THREE.Mesh( geometry, material2 );
    mesh2.position.x = 75;
    mesh2.position.y = 75;
    scene.add( mesh2 );
    mesh3 = new THREE.Mesh( geometry, material3 );
    mesh3.position.x = -75;
    mesh3.position.y = 75;
    scene.add( mesh3 );


    scene.add(new THREE.AmbientLight(0xffffff, 1));
    parnt.appendChild( renderer.domElement );
    renderer.render( scene, camera );
  }

  function initpers(cnv, parnt, rotx, roty, rotz, ccolor) {
    renderer = new THREE.WebGLRenderer({canvas: cnv});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(cnv.width, cnv.height);
		renderer.setPixelRatio( window.devicePixelRatio );
    camera = new THREE.PerspectiveCamera( 45, 1, 0.5, 1000 )
    //camera = new THREE.OrthographicCamera(  -100, 100, -100, 100, 0.5,1000);
		camera.position.z = 260;

    scene = new THREE.Scene();
    geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
		material = new THREE.MeshPhysicalMaterial( {color: ccolor, roughness: 0.5, metalness: 0.5, wireframe: false} );
		mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = false;
    mesh.receiveShadow = true;

		scene.add( mesh );
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    pntL = new THREE.PointLight(0xffffff, 2, 10000);
    pntL.position.set(0,25,100);
    pntL.castShadow = true;
    //Set up shadow properties for the light
    pntL.shadow.mapSize.width = 128;  // default
    pntL.shadow.mapSize.height = 128; // default
    pntL.shadow.camera.near = 0.5;       // default
    pntL.shadow.camera.far = 500;      // default

    scene.add(pntL);

    mesh.rotation.x = rotx;
    mesh.rotation.y = roty;
    mesh.rotation.z = rotz;
    parnt.appendChild( renderer.domElement );
    renderer.render( scene, camera );
  }
//-----------------------------------------------------------------------------------------
  function init(cnv, parnt, rotx, roty, rotz, ccolor) {
    renderer = new THREE.WebGLRenderer({canvas: cnv});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(cnv.width, cnv.height);
		renderer.setPixelRatio( window.devicePixelRatio );
    //camera = new THREE.PerspectiveCamera( 45, 1, 0.5, 1000 )
    camera = new THREE.OrthographicCamera(  -100, 100, -100, 100, 0.5,1000);
		camera.position.z = 400;

    scene = new THREE.Scene();
    geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
		material = new THREE.MeshPhysicalMaterial( {color: ccolor, roughness: 0.5, metalness: 0.5, wireframe: false} );
		mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = false;
    mesh.receiveShadow = true;

		scene.add( mesh );
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    pntL = new THREE.PointLight(0xffffff, 2, 10000);
    pntL.position.set(0,0,-100);
    pntL.castShadow = true;
    //Set up shadow properties for the light
    pntL.shadow.mapSize.width = 128;  // default
    pntL.shadow.mapSize.height = 128; // default
    pntL.shadow.camera.near = 0.5;       // default
    pntL.shadow.camera.far = 500;      // default

    scene.add(pntL);

    mesh.rotation.x = rotx;
    mesh.rotation.y = roty;
    mesh.rotation.z = rotz;
    parnt.appendChild( renderer.domElement );
    renderer.render( scene, camera );
  }


  function animate() {
    requestAnimationFrame( animate );
		hmesh.rotation.x += 0.005;
		hmesh.rotation.y += 0.01;
    hmesh.rotation.z += 0.02;

    if(hmesh.scale.x < 1)
      hmesh.scale.x += 0.05;
    else {
      hmesh.scale.x = 0;
    }
    if(hmesh.scale.y < 1)
      hmesh.scale.y += 0.05;
    else {
      hmesh.scale.y = 0;
    }
    if(hmesh.scale.z < 1)
      hmesh.scale.z += 0.05;
    else {
      hmesh.scale.z = 0;
    }



    var c = "rgb("+ parseInt(hmesh.rotation.x * 290 % 255) + ", "+ parseInt(hmesh.rotation.y * 290 % 255) + ", "+ parseInt(hmesh.rotation.z * 290 % 255) + ")";
    hmesh.material.color = new THREE.Color( c );
    renderer.render( scene, camera );
  }


  function initsp2(cnv, parnt) {
    renderer = new THREE.WebGLRenderer({canvas: cnv});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(cnv.width, cnv.height);
		renderer.setPixelRatio( window.devicePixelRatio );
    camera = new THREE.PerspectiveCamera( 45, 1, 0.5, 1000 );
		camera.position.z = 400;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x141E30 );
    loader = new THREE.TextureLoader();
    loader.load('textures/crate.gif', function(texture) {
      texture.needsUpdate = true;
      material = new THREE.MeshBasicMaterial({map:texture})
    });
    geometry = new THREE.BoxGeometry(100,100,100);
		//material = new THREE.MeshPhysicalMaterial( {color:0xffcac0, roughness: 1, metalness: 0.5} );
		hmesh = new THREE.Mesh( geometry, material );

    hmesh.castShadow = false;
    hmesh.receiveShadow = true;

		scene.add( hmesh );
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    pntL = new THREE.PointLight(0xffffff, 2, 1000);
    pntL.position.set(100,200,100);
    pntL.castShadow = true;
    //Set up shadow properties for the light
    pntL.shadow.mapSize.width = 128;  // default
    pntL.shadow.mapSize.height = 128; // default
    pntL.shadow.camera.near = 0.5;       // default
    pntL.shadow.camera.far = 500;      // default

    scene.add(pntL);

    parnt.appendChild( renderer.domElement );
  }


});
