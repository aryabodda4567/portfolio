// ULTRA SIMPLE VERSION - No dependencies
console.log("=== SCRIPT.JS LOADED ===");

// Skills Data
const skillsData = [
  {
    category: "Core Intelligence",
    skills: ["Java", "Python", "C++", "Data Structures", "System Design", "SQL", "C"]
  },
  {
    category: "Web Engineering",
    skills: ["React.js", "Node.js", "Spring Boot", "Three.js", "Express.js", "PHP"]
  },
  {
    category: "Mobile & Platforms",
    skills: ["Android SDK", "Firebase", "Linux"]
  },
  {
    category: "Decentralized Systems",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "Solana"]
  },
  {
    category: "AI & Agents",
    skills: ["LLMs", "RAG Systems", "Phidata", "Ollama", "Groq API"]
  },
  {
    category: "Infrastructure",
    skills: ["AWS", "Docker", "Neo4j", "Git", "Hibernate"]
  }
];

// Projects Data
const projectsData = [
  {
    title: "OS-AI Assistant",
    desc: "A powerful operating system agent tailored for Linux. Integrates multiple specialized autonomous agents for shell command execution, web scraping, and file system operations using Groq & Phidata.",
    link: "https://github.com/aryabodda4567/os-ai",
    tech: ["Python", "Groq API", "Phidata"]
  },
  {
    title: "Chess AI: Grandmaster Logic",
    desc: "An advanced competitive chess engine running locally via Llama 3.2. Blends traditional minimax algorithms with LLM-based strategic evaluation for dynamic gameplay.",
    link: "https://github.com/aryabodda4567/Chess-AI",
    tech: ["Java", "Llama 3.2", "Ollama"]
  },
  {
    title: "Financial Agent Swarm",
    desc: "A multi-agent team designed to analyze market trends. Orchestrates distinct agents for news analysis, stock data, and risk assessment to provide holistic financial advice.",
    link: "https://github.com/aryabodda4567/LLMOS",
    tech: ["Python", "Phidata", "Finance API"]
  },
  {
    title: "RAG Knowledge Engine",
    desc: "Retrieval-Augmented Generation system converting natural language into complex SQL queries. Empowers non-technical users to extract deep insights from databases instantly.",
    link: "https://github.com/aryabodda4567/RAG",
    tech: ["Java", "Spring Boot", "Ollama"]
  },
  {
    title: "Crypto Visualizer",
    desc: "Real-time Ethereum transaction tracker using Graph Databases. Visualizes flow of funds between wallets to detect patterns and money laundering risks.",
    link: "https://github.com/aryabodda4567/crypto-tracker",
    tech: ["Neo4j", "Cytoscape.js", "Ethereum"]
  },
  {
    title: "Secure Ethereum Wallet",
    desc: "A non-custodial blockchain wallet interface. Enables secure signing, transaction management, and balance tracking directly on the Ethereum mainnet.",
    link: "https://github.com/aryabodda4567/Etherium-Wallet-App",
    tech: ["Java", "Web3j", "Blockchain"]
  },
  {
    title: "Enterprise HRM Suite",
    desc: "Comprehensive Human Resource Management tool built for scale. Features employee tracking, payroll management, and performance analytics with robust role-based access control.",
    link: "https://github.com/aryabodda4567/HRM_Tool",
    tech: ["Spring Boot", "MySQL", "Hibernate"]
  },
  {
    title: "Community Impact Platform",
    desc: "A social service application connecting volunteers with donation drives. Features real-time geo-location, chat, and event coordination.",
    link: "https://github.com/aryabodda4567/Offering-hands",
    tech: ["Android SDK", "Firebase", "Java"]
  },
  {
    title: "Remote Device Controller",
    desc: "IoT bridge enabling remote control of mobile devices via web sockets. Allows command execution and screen mirroring with low latency.",
    link: "https://github.com/aryabodda4567/WebSocketMobileLink",
    tech: ["Python", "WebSocket", "Automation"]
  },
  {
    title: "Interactive Quiz Engine",
    desc: "Gamified learning platform with real-time scoreboards and dynamic question banks. Scalable architecture to handle concurrent user sessions.",
    link: "https://github.com/aryabodda4567/nodejs-quiz-app",
    tech: ["Node.js", "Express", "MongoDB"]
  }
];

// Function to inject skills
function injectSkills() {
  console.log("Injecting skills...");
  const container = document.getElementById('skills-container');

  if (!container) {
    console.error("ERROR: skills-container not found!");
    return;
  }

  let html = '';
  skillsData.forEach(category => {
    html += `
            <div class="skill-category glass-card">
                <h3>${category.category}</h3>
                <div class="skill-tags">
                    ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
  });

  container.innerHTML = html;
  console.log("✓ Skills injected! Count:", skillsData.length);
}

// Function to inject projects
function injectProjects() {
  console.log("Injecting projects...");
  const container = document.getElementById('projects-container');

  if (!container) {
    console.error("ERROR: projects-container not found!");
    return;
  }

  let html = '';
  projectsData.forEach(project => {
    html += `
            <div class="project-wrapper">
                <a href="${project.link}" target="_blank" class="project-card glass-card">
                    <div class="project-header">
                        <i class="fas fa-folder folder-icon"></i>
                        <div class="external-links">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.desc}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </a>
            </div>
        `;
  });

  container.innerHTML = html;
  console.log("✓ Projects injected! Count:", projectsData.length);
}

// Execute when DOM is ready
if (document.readyState === 'loading') {
  console.log("Waiting for DOM...");
  document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM ready! Injecting content...");
    injectSkills();
    injectProjects();
  });
} else {
  console.log("DOM already loaded! Injecting content...");
  injectSkills();
  injectProjects();
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Header scroll effect - OPTIMIZED: Passive listener
  const header = document.querySelector('.glass-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Custom Cursor with Ripple Effect & Smooth Trail
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');

  if (cursorDot && cursorOutline) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Update cursor position - OPTIMIZED: Passive listener
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant dot follow
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }, { passive: true });

    // Smooth outline follow (creates beautiful trail effect)
    function animateCursor() {
      // Lerp (linear interpolation) for smooth following
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Create ripple on click (syncs with background)
    document.addEventListener('click', function (e) {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      ripple.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(ripple);

      // Expand outline on click
      cursorOutline.classList.add('active');
      setTimeout(() => {
        cursorOutline.classList.remove('active');
      }, 200);

      // Remove ripple after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Expand cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('active');
      });
    });
  }
});

console.log("=== SCRIPT.JS FINISHED LOADING ===");
