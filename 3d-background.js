document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 150;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Enhanced particle system
  const particleCount = 120;
  const particles = [];
  const connectionDistance = 120;

  // Create particle material with glow
  const particleGeometry = new THREE.SphereGeometry(1, 8, 8);
  const particleMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f2ff,
    transparent: true,
    opacity: 0.9
  });

  // Create particles with enhanced physics
  for (let i = 0; i < particleCount; i++) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());

    // Random position
    particle.position.x = (Math.random() - 0.5) * 400;
    particle.position.y = (Math.random() - 0.5) * 400;
    particle.position.z = (Math.random() - 0.5) * 400;

    // Enhanced velocity
    particle.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 0.8
    );

    // Store original color
    particle.userData.baseColor = new THREE.Color(0x00f2ff);
    particle.userData.targetColor = new THREE.Color(0x00f2ff);

    scene.add(particle);
    particles.push(particle);
  }

  // Line material for connections
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f2ff,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending
  });

  // Mouse interaction variables
  let mouseX = 0;
  let mouseY = 0;
  const mouse3D = new THREE.Vector3();
  let isMouseMoving = false;
  let mouseTimeout;

  // Track mouse movement
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Convert 2D mouse to 3D space
    mouse3D.set(mouseX, mouseY, 0.5);
    mouse3D.unproject(camera);
    mouse3D.sub(camera.position).normalize();
    const distance = -camera.position.z / mouse3D.z;
    mouse3D.copy(camera.position).add(mouse3D.multiplyScalar(distance));

    // Track mouse activity
    isMouseMoving = true;
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      isMouseMoving = false;
    }, 100);
  });

  // Click explosion effect
  document.addEventListener('click', (event) => {
    const clickX = (event.clientX / window.innerWidth) * 2 - 1;
    const clickY = -(event.clientY / window.innerHeight) * 2 + 1;

    const clickPos = new THREE.Vector3(clickX, clickY, 0.5);
    clickPos.unproject(camera);
    clickPos.sub(camera.position).normalize();
    const dist = -camera.position.z / clickPos.z;
    clickPos.copy(camera.position).add(clickPos.multiplyScalar(dist));

    // Apply explosion force to nearby particles
    particles.forEach(particle => {
      const direction = new THREE.Vector3().subVectors(particle.position, clickPos);
      const distance = direction.length();

      if (distance < 200) {
        direction.normalize();
        const force = (200 - distance) / 200;
        particle.velocity.add(direction.multiplyScalar(force * 15)); // Strong explosion

        // Color flash on explosion
        particle.material.color.setHex(0xff0088); // Pink flash
        setTimeout(() => {
          particle.userData.targetColor.setHex(0x00f2ff);
        }, 200);
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop with enhanced interactions
  function animate() {
    requestAnimationFrame(animate);

    // Update particles with advanced physics
    particles.forEach((particle, i) => {
      // Apply velocity
      particle.position.add(particle.velocity);

      // ENHANCED: Stronger mouse attraction/repulsion
      if (mouse3D.length() > 0) {
        const direction = new THREE.Vector3().subVectors(mouse3D, particle.position);
        const distance = direction.length();

        if (distance < 200 && distance > 0) {
          direction.normalize();

          if (isMouseMoving) {
            // REPEL when mouse is moving (creates waves)
            const force = (200 - distance) / 200;
            particle.velocity.sub(direction.multiplyScalar(force * 0.5));

            // Dynamic color based on proximity
            const colorMix = (200 - distance) / 200;
            particle.userData.targetColor.setRGB(
              0 + colorMix * 1,      // More red when close
              0.95 - colorMix * 0.5,  // Less green when close
              1
            );
          } else {
            // ATTRACT when mouse is still
            const force = (200 - distance) / 200;
            particle.velocity.add(direction.multiplyScalar(force * 0.03));
          }
        } else {
          // Return to base color when far
          particle.userData.targetColor.setHex(0x00f2ff);
        }
      }

      // Smooth color transition
      particle.material.color.lerp(particle.userData.targetColor, 0.1);

      // Boundary wrapping
      const limit = 200;
      if (particle.position.x > limit) particle.position.x = -limit;
      if (particle.position.x < -limit) particle.position.x = limit;
      if (particle.position.y > limit) particle.position.y = -limit;
      if (particle.position.y < -limit) particle.position.y = limit;
      if (particle.position.z > limit) particle.position.z = -limit;
      if (particle.position.z < -limit) particle.position.z = limit;

      // Enhanced damping with variance
      const dampingFactor = isMouseMoving ? 0.96 : 0.98;
      particle.velocity.multiplyScalar(dampingFactor);

      // Dynamic pulsing based on velocity
      const speed = particle.velocity.length();
      const scale = 1 + Math.sin(Date.now() * 0.002 + i * 0.5) * 0.2 + speed * 0.5;
      particle.scale.setScalar(scale);
    });

    // Draw connections with enhanced opacity
    scene.children.forEach(child => {
      if (child.type === 'Line') {
        scene.remove(child);
      }
    });

    // Create connection lines with dynamic opacity
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = particles[i].position.distanceTo(particles[j].position);

        if (distance < connectionDistance) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            particles[i].position,
            particles[j].position
          ]);

          // Enhanced opacity based on distance and particle speed
          const baseOpacity = (1 - distance / connectionDistance) * 0.4;
          const speed1 = particles[i].velocity.length();
          const speed2 = particles[j].velocity.length();
          const speedBoost = Math.min((speed1 + speed2) * 0.1, 0.3);

          const material = lineMaterial.clone();
          material.opacity = baseOpacity + speedBoost;

          const line = new THREE.Line(geometry, material);
          scene.add(line);
        }
      }
    }

    // Enhanced camera movement with smooth parallax
    camera.position.x += (mouseX * 30 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 30 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
  console.log("✨ Interactive background initialized with", particleCount, "particles");
});