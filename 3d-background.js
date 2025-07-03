// 3D Background for the entire website
document.addEventListener("DOMContentLoaded", function() {
  // Check if device supports 3D effects
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowPerfDevice = isMobile && (navigator.deviceMemory < 4 || navigator.hardwareConcurrency < 4);
  
  // Get canvas container
  const canvasContainer = document.getElementById('canvas-container');
  if (!canvasContainer) return;
  
  // Three.js variables
  let scene, camera, renderer;
  let particles, particleSystem;
  const particleCount = isLowPerfDevice ? 200 : 1000;
  
  // Mouse position for interaction
  let mouseX = 0;
  let mouseY = 0;
  
  // Initialize Three.js scene
  function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0a192f, 0.9);
    canvasContainer.appendChild(renderer.domElement);
    
    // Create particle geometry
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Create particles with random positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position particles in a 3D grid
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      
      // Set particle colors (professional blue/green gradient)
      colors[i3] = 0.1 + Math.random() * 0.1; // R
      colors[i3 + 1] = 0.5 + Math.random() * 0.3; // G
      colors[i3 + 2] = 0.7 + Math.random() * 0.3; // B
      
      // Randomize particle sizes
      sizes[i] = Math.random() * 2;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create particle material with custom shader
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePosition: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mousePosition;
        
        void main() {
          vColor = color;
          
          // Calculate distance from mouse
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float distance = length(mousePosition - vec2(position.x, position.y)) * 0.05;
          
          // Add subtle movement
          float movement = sin(time * 0.5 + position.x * 0.5) * 0.5 + 
                          cos(time * 0.3 + position.y * 0.3) * 0.5;
          
          // Apply size based on distance from mouse
          gl_PointSize = size * (1.0 / -mvPosition.z) * (1.0 + movement) * (1.0 + (1.0 / (distance + 1.0)));
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create circular particles
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          
          // Add glow effect
          float glow = 1.0 - (r / 0.5);
          
          gl_FragColor = vec4(vColor, glow);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    
    // Start animation loop
    animate();
  }
  
  // Handle window resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  // Handle mouse movement
  function onMouseMove(event) {
    // Calculate normalized mouse position
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update shader uniform
    if (particleSystem && particleSystem.material.uniforms) {
      particleSystem.material.uniforms.mousePosition.value.set(mouseX * 50, mouseY * 50);
    }
    
    // Rotate camera slightly based on mouse position
    if (camera) {
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
    }
  }
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Update time uniform for animation
    if (particleSystem && particleSystem.material.uniforms) {
      particleSystem.material.uniforms.time.value += 0.01;
    }
    
    // Rotate particle system
    if (particleSystem) {
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;
    }
    
    renderer.render(scene, camera);
  }
  
  // Initialize
  init();
  
  // Add hover effects to interactive elements
  function initHoverEffects() {
    // Elements to add hover effects to
    const interactiveElements = document.querySelectorAll('.project-card, .skill-card, .btn, .title-tag, nav ul li a');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'hover-ripple';
        this.appendChild(ripple);
        
        // Position ripple at center
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        
        // Animate and remove
        setTimeout(() => {
          ripple.remove();
        }, 1000);
        
        // Add glow effect
        this.classList.add('hover-glow');
      });
      
      element.addEventListener('mouseleave', function() {
        // Remove glow effect
        this.classList.remove('hover-glow');
      });
    });
  }
  
  // Initialize hover effects
  initHoverEffects();
});
