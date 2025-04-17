document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      // Scroll Down
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      // Scroll Up
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
  });

  // Skills data
  const skills = [
    {
      category: "Programming Languages",
      items: [
        { name: "Java", level: 90 },
        { name: "Python", level: 85 },
        { name: "SQL", level: 85 },
        { name: "C++", level: 80 },
        { name: "JavaScript", level: 85 },
        { name: "HTML/CSS", level: 90 },
        { name: "PHP", level: 75 },
        { name: "C", level: 80 },
        { name: "Shell Script",level: 70}
      ]
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "Spring Boot", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 80 },
        { name: "Hibernate", level: 75 },
        { name: "Android SDK", level: 80 },
        { name: "Web3.js", level: 75 },
        { name: "Solana Web3.js", level: 70 }
      ]
    },
    {
      category: "Blockchain Technologies",
      items: [
        { name: "Ethereum", level: 85 },
        { name: "Smart Contracts", level: 80 },
        { name: "Solidity", level: 85 },
        { name: "Bitquery API", level: 75 }
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "AWS (Cloud Practitioner)", level: 80 },
        { name: "Firebase", level: 85 },
        { name: "Neo4j", level: 75 },
        { name: "Git", level: 90 },
        { name: "Postman", level: 85 },
        { name: "IntelliJ", level: 90 },
        { name: "Android Studio", level: 85 },
        { name: "Linux OS", level: 70}
      ]
    },
    {
      category: "Analytical Skills",
      items: [
        { name: "Data Structures & Algorithms", level: 85 },
        { name: "System Design", level: 80 },
        { name: "Financial Analysis", level: 75 }
      ]
    }
  ];

  // Projects data
  const projects = [
    {
      title: "HRM Tool",
      description: "An HRM tool built with Spring Boot and SQL for efficient employee management.",
      link: "https://github.com/aryabodda4567/HRM_Tool",
      technologies: ["Spring Boot", "Java", "SQL", "MySQL"]
    },
    {
      title: "Crypto Transaction Tracker",
      description: "Visualizes Ethereum transactions in real-time using Neo4j and Cytoscape.js.",
      link: "https://github.com/aryabodda4567/crypto-tracker",
      technologies: ["Neo4j", "Cytoscape.js", "JavaScript", "Ethereum"]
    },
    {
      title: "Community Impact Platform",
      description: "Social service platform developed using Android and Firebase.",
      link: "https://github.com/aryabodda4567/Offering-hands",
      technologies: ["Android", "Firebase", "Java", "XML"]
    },
    {
      title: "Ethereum Wallet",
      description: "A secure wallet for Ethereum transactions using Web3J and Java.",
      link: "https://github.com/aryabodda4567/Etherium-Wallet-App",
      technologies: ["Java", "Web3J", "Ethereum", "Blockchain"]
    },
    {
      title: "Quiz App",
      description: "Interactive quiz application built with Node.js and web technologies.",
      link: "https://github.com/aryabodda4567/nodejs-quiz-app",
      technologies: ["Node.js", "Express", "MongoDB", "JavaScript"]
    },
    {
      title: "Remote Mobile Control",
      description: "Enables remote control of mobile devices using Python and WebSockets.",
      link: "https://github.com/aryabodda4567/WebSocketMobileLink",
      technologies: ["Python", "WebSocket", "Android", "Socket.io"]
    },
    {
      title: "RAG Application",
      description: "Built with Java Spring Boot and Ollama to generate dynamic SQL queries and fetch data based on natural language queries.",
      link: "https://github.com/aryabodda4567/RAG",
      technologies: ["Java", "Spring Boot", "Ollama", "SQL", "AI"]
    },
    {
      title: "LLM Agents Team for Financial Advice",
      description: "Designed a team of LLM agents to provide financial suggestions, such as stock recommendations, developed with the Phidata framework and Python.",
      link: "https://github.com/aryabodda4567/LLMOS",
      technologies: ["Python", "LLM", "Phidata", "AI", "Finance"]
    },    
    
    {
      title: "Ai based Chess Game",
      description: "A Chess app developed in Java and integrated with Llama3.2, running locally using Ollama. Designed for AI vs AI gameplay, it can be modified for PvP or player vs AI modes.",
      link: "https://github.com/aryabodda4567/Chess-AI",
      technologies: ["Java", "Llama", "Ollama", "AI", "Chess"]
    },
      {
      title: "OS-AI Assistant",
      description: "A powerful AI agent system for Linux that integrates multiple specialized agents for shell commands, web scraping, YouTube, finance data, and file operations using the Phidata framework and Groq API.",
      link: "https://github.com/aryabodda4567/os-ai",
      technologies: ["Python", "Phidata", "Groq", "Linux", "AI"]
    }
  ];

  // Render skills
  const skillsContainer = document.querySelector('.skills');
  skills.forEach(category => {
    const categorySection = document.createElement('div');
    categorySection.className = 'skill-category fade-in-section';
    
    categorySection.innerHTML = `
      <h3>${category.category}</h3>
      <div class="skill-items">
        ${category.items.map(skill => `
          <div class="skill-card">
            <h4>${skill.name}</h4>
            <div class="skill-bar">
              <span style="width: ${skill.level}%"></span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    skillsContainer.appendChild(categorySection);
    observer.observe(categorySection);
  });

  // Render projects
  const projectsContainer = document.querySelector('.projects');
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card fade-in-section';
    
    let projectContent = `
      <h4>${project.title}</h4>
      <p>${project.description}</p>
      <div class="tech-stack">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    `;

    if (project.link) {
      projectCard.innerHTML = `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer">
          ${projectContent}
        </a>
      `;
    } else {
      projectCard.innerHTML = projectContent;
    }

    // Add hover effect for non-link projects
    if (!project.link) {
      projectCard.addEventListener('mouseenter', () => {
        projectCard.style.transform = 'translateY(-10px)';
        projectCard.style.boxShadow = '0 10px 30px rgba(0, 255, 157, 0.2)';
      });

      projectCard.addEventListener('mouseleave', () => {
        projectCard.style.transform = 'translateY(0)';
        projectCard.style.boxShadow = 'none';
      });
    }

    projectsContainer.appendChild(projectCard);
    observer.observe(projectCard);
  });

  // Scroll indicator animation
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    });
  }

  // Add hover effect to social links
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-5px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
    }
  });

  // Close menu on window resize if open
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
    }
  });
});
