document.addEventListener("DOMContentLoaded", function() {
  const canvasContainer = document.getElementById('canvas-container');
  if (!canvasContainer) return;

  let scene, camera, renderer, particles;
  const particleCount = 2000;
  let mouseX = 0, mouseY = 0;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push((Math.random() - 0.5) * 10);
      positions.push((Math.random() - 0.5) * 10);
      positions.push((Math.random() - 0.5) * 10);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00c6ff,
      size: 0.02,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);

    animate();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0001;
    particles.rotation.x = time * 0.25;
    particles.rotation.y = time * 0.5;

    camera.position.x += (mouseX * 0.00005 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.00005 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  init();
});