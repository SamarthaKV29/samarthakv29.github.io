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

//Tried to get bump map, but this is the best.


loader = new THREE.TextureLoader();
worldmap = loader.load('textures/worldmap.jpg');
worldmap.format = THREE.RGBFormat;
//worldmap.mapping = THREE.SphericalReflectionMapping;
var sgeo = new THREE.SphereGeometry( 600, 32, 32 );
var smat = new THREE.MeshPhongMaterial( {color: 0xffffff, map: worldmap, side: THREE.DoubleSide} );
var sphere = new THREE.Mesh( sgeo, smat );
sphere.castShadow = true;

//THe cube is loaded with EquirectangularReflectionMapping, which reflects the surface of the sphere.
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
