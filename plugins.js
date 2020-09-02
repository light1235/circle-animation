
const scene = new THREE.Scene();
const  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 3000 );
camera.position.z = 130;





let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFCFF);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});



let texture;


let controls = new  THREE.OrbitControls(camera,renderer.domElement);

     geometry = new THREE.Geometry();
     for(let i=0;i<360;i++) {
          texture = new THREE.Vector3(
               Math.sin(i/10)*100,
               Math.cos(i/10)*100,
               0
          );
          texture.velocity = 0;
          texture.acceleration = 0.02;
          geometry.vertices.push(texture);
          geometry.colors.push(new THREE.Color(Math.random(),Math.random(),Math.random()));
     }
     material = new THREE.PointsMaterial({
          vertexColors: THREE.VertexColors,
          size: 30,
          transparent: true,
          sizeAttenuation:false,
          alphaTest:0.5,
     });
     mesh = new THREE.Line(geometry,material);
     scene.add(mesh);


     var i = 0;
const animate = function () {
     i++;
     requestAnimationFrame( animate );

     geometry.verticesNeedUpdate = true;
     geometry.vertices.forEach( function(particle, index){
          var dX, dY, dZ;
          dX = Math.sin(i/10 + index/2)/2;
          dY = 0;
          dZ = 0;
          particle.add(new THREE.Vector3(dX, dY, dZ));
     });
     geometry.verticesNeedUpdate = true;
     renderer.render( scene, camera );
};

animate();



