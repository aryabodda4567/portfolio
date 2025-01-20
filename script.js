document.addEventListener("DOMContentLoaded", function () {
  // Data for skills
  const skills = [
    { name: "Web Development", level: "75%" },
    { name: "Spring Boot", level: "70%" },
    { name: "Android Development", level: "40%" },
    { name: "Blockchain", level: "45%" },
    { name: "Python", level: "75%" },
    { name: "Database Management System (SQL)", level: "75%" },
    { name: "Data Structures", level: "75%" },
    { name: "Node.js (Express.js)", level: "65%" },
    { name: "System Design", level: "50%" }
  ];
  

  // Data for projects
  const projects = [
    {
      title: "HRM Tool",
      description: "An HRM tool built with Spring Boot and SQL for efficient employee management.",
      link: "https://github.com/aryabodda4567/HRM_Tool"
    },
    {
      title: "Crypto Transaction Tracker",
      description: "Visualizes Ethereum transactions in real-time using Neo4j and Cytoscape.js.",
      link: "https://github.com/aryabodda4567/crypto-tracker"
    },
    {
      title: "Community Impact Platform",
      description: "Social service platform developed using Android and Firebase.",
      link: "https://github.com/aryabodda4567/Offering-hands"
    },
    {
      title: "Ethereum Wallet",
      description: "A secure wallet for Ethereum transactions using Web3J and Java.",
      link: "https://github.com/aryabodda4567/Etherium-Wallet-App"
    },
    {
      title: "Quiz App",
      description: "Interactive quiz application built with Node.js and web technologies.",
      link: "https://github.com/aryabodda4567/nodejs-quiz-app"
    },
    {
      title: "Remote Mobile Control",
      description: "Enables remote control of mobile devices using Python and WebSockets.",
      link: "https://github.com/aryabodda4567/WebSocketMobileLink"
    },
    {
      title: "RAG Application",
      description: "Built with Java Spring Boot and Ollama to generate dynamic SQL queries and fetch data based on natural language queries.",
      link: "https://github.com/aryabodda4567/RAG"
    },
    {
      title: "LLM Agents Team for Financial Advice",
      description: "Designed a team of LLM agents to provide financial suggestions, such as stock recommendations, developed with the Phidata framework and Python.",
      link: "https://github.com/aryabodda4567/LLMOS"
    },    
    {
      title: "Backend Developer - Easy Marriage (Startup)",
      description: "Developed secure authentication systems and optimized listing features to enhance platform functionality and scalability",
      link: null
    }
    
  ];

  // Generate skills dynamically
  const skillsContainer = document.querySelector("#skills .skills");
  skills.forEach((skill) => {
    const skillCard = document.createElement("div");
    skillCard.classList.add("skill-card");

    skillCard.innerHTML = `
      <h4>${skill.name}</h4>
      <div class="skill-bar"><span style="width: ${skill.level};"></span></div>
    `;

    skillsContainer.appendChild(skillCard);
  });

  // Generate project cards dynamically
  const projectsContainer = document.querySelector("#projects .projects");
  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    if(project.link!=null){
    projectCard.innerHTML = `
    <a href='${project.link}' target='_blank'>
      <h4>${project.title}</h4>
      <p>${project.description}</p>
      
    </a>  
    `;
    }
    else{
      projectCard.innerHTML = `
      
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        
       
      `;
    }

    projectsContainer.appendChild(projectCard);
  });
});