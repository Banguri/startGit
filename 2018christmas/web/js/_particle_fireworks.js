var camera, tick = 0,
    scene, renderer, clock = new THREE.Clock(true),
    controls, xp, yp, sw, sh,
    options, spawnerOptions, particleSystem, velDelta, pos //gui = new dat.GUI(),

function init() {
    
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 184)
        
    scene = new THREE.Scene();
    // The GPU Particle system extends THREE.Object3D, and so you can use it
    // as you would any other scene graph component. Particle positions will be
    // relative to the position of the particle system, but you will probably only need one
    // system for your whole scene
    particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 10000
    });
    scene.add( particleSystem)
    velDelta = new THREE.Vector3()
    pos = new THREE.Vector3()
    // options passed during each spawned
    options = {
        position: new THREE.Vector3(),
        positionRandomness: .3,
        velocity: new THREE.Vector3(),
        velocityRandomness: 1,
        color: 0xfedb7d,
        colorRandomness: .2,
        turbulence: .15,
        lifetime: 2,
        size: 2,
        sizeRandomness: 5
    };
    spawnerOptions = {
        //spawnRate: 5000,
        //horizontalSpeed: 5.5,
        //verticalSpeed: 1.33,
        //timeScale: 1.5
        spawnRate: 5000,
        horizontalSpeed: 1.5,
        verticalSpeed: 1.33,
        timeScale: 1
    }    
    
    /*var axisHelper = new THREE.AxisHelper( 15 );
    scene.add( axisHelper );*/
    
    if(Detector.webgl){ 
        renderer = new THREE.WebGLRenderer({alpha:true})
    } else { 
        renderer = new THREE.CanvasRenderer(); 
    }
    sw = window.innerWidth
    sh = window.innerHeight
    renderer.setSize(sw, sh)
    particleSystem.scale.x = 2
    //renderer.setViewport(-sw/2, 0, sw, sh)
    
    $('#particleFireworks').append(renderer.domElement)
    // setup controls
    //controls = new THREE.TrackballControls(camera)    
    window.addEventListener('resize', onWindowResize, false)
    console.log(sw, sh)
}

function onWindowResize() {
    sw = window.innerWidth
    sh = window.innerHeight
    camera.aspect = sw / sh
    camera.updateProjectionMatrix()
    renderer.setSize(sw, sh)
    particleSystem.scale.x = 2
    //renderer.setViewport(-sw/2, 0, sw, sh)
}
$(document).mousemove(function(e){
    xp = e.clientX
    yp = e.clientY
})
function animate() {    
    requestAnimationFrame(animate)
    
    //camera.rotation.x = 0
    //camera.rotation.y = 0
    //camera.rotation.z = 0
    
    var delta = clock.getDelta() * spawnerOptions.timeScale
    tick += delta;
    if (tick < 0) tick = 0
    if (delta > 0) {
        options.position.x = (xp/4-sw/8)/6
        options.position.y = -(yp/4-sh/8)/3
        //options.position.x = Math.sin(tick * spawnerOptions.horizontalSpeed) * 20;
        //options.position.y = Math.sin(tick * spawnerOptions.verticalSpeed) * 10;
        options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 2;
        for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
            particleSystem.spawnParticle(options)
        }
    }
    particleSystem.update(tick)
    render()
}
function render() {
    renderer.render(scene, camera);
}


$(document).ready(function(){
    init()
    animate()
})
