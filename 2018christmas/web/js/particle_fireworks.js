var camera, tick = 0,
    scene, renderer, clock = new THREE.Clock(true),
    controls, xp, yp, sw, sh,
    options, spawnerOptions, particleSystem, velDelta, pos

function init(id) {
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 184)
    scene = new THREE.Scene();
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
        spawnRate: 5000,
        horizontalSpeed: 1.5,
        verticalSpeed: 1.33,
        timeScale: 1
    }    
    if(Detector.webgl){ 
        renderer = new THREE.WebGLRenderer({alpha:true})
    } else { 
        renderer = new THREE.CanvasRenderer(); 
    }
    sw = window.innerWidth
    sh = window.innerHeight
    renderer.setSize(sw, sh)
    particleSystem.scale.x = 2

    $('#particle_'+id).append(renderer.domElement) 
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
}

$(document).mousemove(function(e){
    xp = e.clientX
    yp = e.clientY
})

function animate() {    
    requestAnimationFrame(animate)
    var delta = clock.getDelta() * spawnerOptions.timeScale
    tick += delta;
    if (tick < 0) tick = 0
    if (delta > 0) {
        options.position.x = (xp/4-sw/8)/6
        options.position.y = -(yp/4-sh/8)/3
       //options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 20;
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

$(document).ready(function() {
    init('main')
    animate()
});