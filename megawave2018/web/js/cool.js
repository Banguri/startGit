$(document).ready(function(){  
var C, C2, D, DAMPING, DELTA_X, DELTA_X2, DELTA_Z, DELTA_Z2, H, MAX_DT, MAX_ITERATRED_DT, MAX_Y, N, SIGMA, SIM_SPEED, W, animate, camera, controls, geometry, hitTest, idx, init, initGeometry, integrate, mesh, now, projector, renderer, scene, wave1, wave2, sw, sh, first, sw13, sh13

  N = 60
  W = 200
  H = W
  D = 10
  C = 0.05
  C2 = C * C
  DAMPING = 0.001
  SIM_SPEED = 1.3
  DELTA_X = W / N
  DELTA_X2 = DELTA_X * DELTA_X
  DELTA_Z = H / N
  DELTA_Z2 = DELTA_Z * DELTA_Z
  MAX_DT = 12
  MAX_ITERATRED_DT = 100
  MAX_Y = 1.2
  SIGMA = 0.12
  sw = window.innerWidth
  sh = window.innerHeight
  first = true
  
  init = function() {
    var face, light, materials, matrix, updateViewport, _i, _len, _ref
    scene = new THREE.Scene()
    
    var textureLoader = new THREE.TextureLoader()
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.set(0, 100, 0)
    
    light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 20, 0).normalize()
    scene.add(light)
    
    geometry = new THREE.PlaneGeometry(W, H, N, N)
    matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2)
    geometry.applyMatrix(matrix)
    initGeometry()
    
    materials = [
      new THREE.MeshPhongMaterial({
        map : textureLoader.load('../img/bg_megawave.jpg'),
        color: 0xffffff
      }), new THREE.MeshBasicMaterial({
        visible: false
      })
    ]
    
    mesh = new THREE.Mesh(geometry, materials[0])
    scene.add(mesh)
        
    controls = new THREE.TrackballControls(camera)
    projector = new THREE.Projector()
    
    if(Detector.webgl){ 
        renderer = new THREE.WebGLRenderer({alpha:true})
    } else { 
        renderer = new THREE.CanvasRenderer(); 
    }    
    
    updateViewport = function() {
        sw = window.innerWidth
        sh = window.innerHeight
        
        // var swx = -(368*sw/1473)
            
        renderer.setSize(sw, sh)
        // renderer.setViewport(swx, 0, sw, sh)                
        camera.aspect = sw / sh
        mesh.scale.x = 2.2
        mesh.scale.Y = 1
        mesh.scale.z = 1
        
        camera.updateProjectionMatrix()
        controls.target.set(0, 0, 0)        
    }
    window.addEventListener('resize', updateViewport)
    document.addEventListener('mousemove', hitTest)
    
    camera.rotation.z = 0
    $('#canvas').append(renderer.domElement)
    updateViewport()
    //document.body.appendChild(renderer.domElement)
  }

  now = Date.now()
  
  animate = function() {
    var dt
    dt = Date.now() - now
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    //controls.update();
    dt *= SIM_SPEED;
    if (dt > MAX_ITERATRED_DT) {
      dt = MAX_ITERATRED_DT
    }
    while (dt > 0) {
      if (dt > MAX_DT) {
        integrate(MAX_DT)
      } else {
        integrate(dt)
      }
      dt -= MAX_DT
    }
    
    return now = Date.now()
  }

  idx = function(x, z) {
    return x + (N + 1) * z;
  }

  initGeometry = function() {
    var index, vertex, _i, _len, _ref, _results
    _ref = geometry.vertices
    _results = []
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      vertex = _ref[index]
      vertex.y = MAX_Y * Math.exp(-SIGMA * vertex.x * vertex.x) * Math.exp(-SIGMA * vertex.z * vertex.z)
      vertex.uy = 0
      _results.push(vertex.ay = 0)
    }
    return _results
  }

  integrate = function(dt) {
    var d2x, d2z, i, iNextX, iNextZ, iPrevX, iPrevZ, v, x, z, _i, _j, _k, _l
    v = geometry.vertices
    for (z = _i = 1; 1 <= N ? _i < N : _i > N; z = 1 <= N ? ++_i : --_i) {
      for (x = _j = 1; 1 <= N ? _j < N : _j > N; x = 1 <= N ? ++_j : --_j) {
        i = idx(x, z)
        iPrevX = idx(x - 1, z)
        iNextX = idx(x + 1, z)
        iPrevZ = idx(x, z - 1)
        iNextZ = idx(x, z + 1)
        d2x = (v[iNextX].y - 2 * v[i].y + v[iPrevX].y) / DELTA_X2
        d2z = (v[iNextZ].y - 2 * v[i].y + v[iPrevZ].y) / DELTA_Z2
        v[i].ay = C2 * (d2x + d2z)
        v[i].ay += -DAMPING * v[i].uy
        v[i].uy += dt * v[i].ay
        v[i].newY = v[i].y + dt * v[i].uy
      }
    }
    for (z = _k = 1; 1 <= N ? _k < N : _k > N; z = 1 <= N ? ++_k : --_k) {
      for (x = _l = 1; 1 <= N ? _l < N : _l > N; x = 1 <= N ? ++_l : --_l) {
        i = idx(x, z)
        v[i].y = v[i].newY
      }
    }
    geometry.verticesNeedUpdate = true
    geometry.computeFaceNormals()
    geometry.computeVertexNormals()
    geometry.normalsNeedUpdate = true
  }

  hitTest = function(e) {
    var index, intersects, p, raycaster, vector, vertex, x, z, _i, _len, _ref, _results
    vector = new THREE.Vector3((e.clientX / window.innerWidth) * 2 - 0.5, -(e.clientY / window.innerHeight) * 2 + 1, 0.5)
    vector.unproject(camera)
    raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize())
    intersects = raycaster.intersectObjects([mesh])
    if (intersects.length) {
      p = intersects[0].point
      _ref = geometry.vertices
      _results = []
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        vertex = _ref[index]
        x = vertex.x - p.x
        z = vertex.z - p.z
        vertex.y += MAX_Y * Math.exp(-SIGMA * x * x) * Math.exp(-SIGMA * z * z)
        if (vertex.x === -W / 2 || vertex.x === W / 2 || vertex.z === -H / 2 || vertex.z === H / 2) {
          _results.push(vertex.y = 0)
        } else {
          _results.push(void 0)
        }
      }
      return _results
    }
  }

  init()
  animate()
})