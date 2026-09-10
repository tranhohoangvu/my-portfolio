/**
 * ==============================================================================
 * Skills Data Module (Tab: Skills)
 * Independent client-side data store for technical skills, devicon & project mapping
 * ==============================================================================
 */
(function (global) {
  "use strict";

  const categories = [
    {
      id: "core_languages",
      vi: {
        title: "Ngôn ngữ cốt lõi",
        meta: "Nền tảng lập trình & tư duy thuật toán"
      },
      en: {
        title: "Core Languages",
        meta: "Programming foundations & algorithmic problem solving"
      },
      skills: [
        { id: "c", name: "C", devicon: "devicon-c-plain colored", level: "Academic Core", projectIds: [] },
        { id: "csharp", name: "C#", devicon: "devicon-csharp-plain colored", framework: ".NET WinForms", projectIds: ["warehouse"] },
        { id: "java", name: "Java", devicon: "devicon-java-plain colored", level: "OOP Foundation", projectIds: [] },
        { id: "python", name: "Python", devicon: "devicon-python-plain colored", frameworks: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face"], projectIds: ["vietnamese-ocr", "nlp-translation", "stock-ml"] },
        { id: "javascript", name: "JavaScript", devicon: "devicon-javascript-plain colored", frameworks: ["Node.js", "Express.js", "React"], projectIds: ["coursehub", "ecommerce"] },
        { id: "php", name: "PHP", devicon: "devicon-php-plain colored", framework: "Laravel", projectIds: ["pos"] }
      ]
    },
    {
      id: "backend_architecture",
      vi: {
        title: "Kiến trúc Backend & API",
        meta: "RESTful API, MVC, JWT RBAC & Microservices"
      },
      en: {
        title: "Backend Architecture & APIs",
        meta: "RESTful API, MVC, JWT RBAC & Microservices"
      },
      skills: [
        { id: "nodejs", name: "Node.js", devicon: "devicon-nodejs-plain colored", projectIds: ["coursehub", "ecommerce"] },
        { id: "express", name: "Express.js", devicon: "devicon-express-original colored", projectIds: ["coursehub", "ecommerce"] },
        { id: "laravel", name: "Laravel", devicon: "devicon-laravel-plain colored", projectIds: ["pos"] },
        { id: "restapi", name: "RESTful API", devicon: "devicon-postman-plain colored", projectIds: ["coursehub", "ecommerce"] },
        { id: "dotnet", name: ".NET WinForms", devicon: "devicon-dot-net-plain colored", projectIds: ["warehouse"] },
        { id: "react", name: "React", devicon: "devicon-react-original colored", projectIds: ["coursehub", "ecommerce"] }
      ]
    },
    {
      id: "databases_and_optimization",
      vi: {
        title: "Cơ sở dữ liệu & Tối ưu",
        meta: "Raw SQL, Indexing, Transactions & Schema Design"
      },
      en: {
        title: "Databases & Storage",
        meta: "Raw SQL, Indexing, Transactions & Schema Design"
      },
      skills: [
        { id: "postgresql", name: "PostgreSQL", devicon: "devicon-postgresql-plain colored", projectIds: ["coursehub"] },
        { id: "mysql", name: "MySQL", devicon: "devicon-mysql-plain colored", projectIds: ["warehouse", "pos"] },
        { id: "mongodb", name: "MongoDB", devicon: "devicon-mongodb-plain colored", projectIds: ["ecommerce"] },
        { id: "sqlserver", name: "SQL Server", devicon: "devicon-microsoftsqlserver-plain colored", projectIds: ["warehouse"] },
        { id: "rawsql", name: "Raw SQL", devicon: "devicon-postgresql-plain colored", projectIds: ["coursehub"] }
      ]
    },
    {
      id: "ai_devops_and_tools",
      vi: {
        title: "AI, DevOps & Công cụ",
        meta: "Mô hình Học sâu, Container hóa & CI/CD Pipeline"
      },
      en: {
        title: "AI, DevOps & Tools",
        meta: "Deep Learning, Containerization & CI/CD Pipelines"
      },
      skills: [
        { id: "pytorch", name: "PyTorch", devicon: "devicon-pytorch-original colored", projectIds: ["vietnamese-ocr", "nlp-translation"] },
        { id: "tensorflow", name: "TensorFlow", devicon: "devicon-tensorflow-original colored", projectIds: ["stock-ml"] },
        { id: "docker", name: "Docker", devicon: "devicon-docker-plain colored", projectIds: ["ecommerce"] },
        { id: "compose", name: "Docker Compose", devicon: "devicon-docker-plain colored", projectIds: ["ecommerce"] },
        { id: "nginx", name: "Nginx", devicon: "devicon-nginx-original colored", projectIds: ["ecommerce"] },
        { id: "git", name: "Git", devicon: "devicon-git-plain colored", projectIds: ["coursehub", "ecommerce", "vietnamese-ocr", "nlp-translation", "stock-ml", "warehouse", "pos"] },
        { id: "github", name: "GitHub", devicon: "devicon-github-original colored", projectIds: ["coursehub", "ecommerce", "vietnamese-ocr", "nlp-translation", "stock-ml", "warehouse", "pos"] },
        { id: "postman", name: "Postman", devicon: "devicon-postman-plain colored", projectIds: ["coursehub", "ecommerce"] },
        { id: "linux", name: "Linux", devicon: "devicon-linux-plain colored", projectIds: [] }
      ]
    }
  ];

  // Bidirectional mapping table (Item 8: Interactive Skill Linking)
  const mapping = {
    // Core Languages
    c: { name: "C", projects: [] },
    csharp: { name: "C#", projects: ["warehouse"] },
    java: { name: "Java", projects: [] },
    python: { name: "Python", projects: ["vietnamese-ocr", "nlp-translation", "stock-ml"] },
    javascript: { name: "JavaScript", projects: ["coursehub", "ecommerce"] },
    php: { name: "PHP", projects: ["pos"] },

    // Backend Architecture & Frameworks
    nodejs: { name: "Node.js", projects: ["coursehub", "ecommerce"] },
    express: { name: "Express.js", projects: ["coursehub", "ecommerce"] },
    laravel: { name: "Laravel", projects: ["pos"] },
    restapi: { name: "RESTful API", projects: ["coursehub", "ecommerce"] },
    dotnet: { name: ".NET WinForms", projects: ["warehouse"] },
    react: { name: "React", projects: ["coursehub", "ecommerce"] },

    // Databases & Storage
    postgresql: { name: "PostgreSQL", projects: ["coursehub"] },
    mysql: { name: "MySQL", projects: ["warehouse", "pos"] },
    mongodb: { name: "MongoDB", projects: ["ecommerce"] },
    sqlserver: { name: "SQL Server", projects: ["warehouse"] },
    rawsql: { name: "Raw SQL", projects: ["coursehub"] },

    // AI, DevOps & Tools
    pytorch: { name: "PyTorch", projects: ["vietnamese-ocr", "nlp-translation"] },
    tensorflow: { name: "TensorFlow", projects: ["stock-ml"] },
    docker: { name: "Docker", projects: ["ecommerce"] },
    compose: { name: "Docker Compose", projects: ["ecommerce"] },
    nginx: { name: "Nginx", projects: ["ecommerce"] },
    git: { name: "Git", projects: ["coursehub", "ecommerce", "vietnamese-ocr", "nlp-translation", "stock-ml", "warehouse", "pos"] },
    github: { name: "GitHub", projects: ["coursehub", "ecommerce", "vietnamese-ocr", "nlp-translation", "stock-ml", "warehouse", "pos"] },
    postman: { name: "Postman", projects: ["coursehub", "ecommerce"] },
    linux: { name: "Linux", projects: [] }
  };

  /**
   * Helper: Normalize any tag string to its standard Skill ID
   */
  function normalizeTagToSkillId(tagStr) {
    if (!tagStr) return null;
    const s = tagStr.toLowerCase().trim();
    if (s.includes("postgres")) return "postgresql";
    if (s.includes("mongo")) return "mongodb";
    if (s.includes("mysql")) return "mysql";
    if (s.includes("sql server")) return "sqlserver";
    if (s.includes("raw sql") || s === "native pg (no orm)") return "rawsql";
    if (s.includes("node")) return "nodejs";
    if (s.includes("express")) return "express";
    if (s.includes("react")) return "react";
    if (s.includes("pytorch")) return "pytorch";
    if (s.includes("tensorflow")) return "tensorflow";
    if (s.includes("docker compose") || s.includes("compose")) return "compose";
    if (s.includes("docker")) return "docker";
    if (s.includes("nginx")) return "nginx";
    if (s.includes("laravel")) return "laravel";
    if (s.includes("livewire") || s.includes("php")) return "php";
    if (s.includes("c#") || s.includes("csharp")) return "csharp";
    if (s.includes(".net") || s.includes("winform")) return "dotnet";
    if (s.includes("python")) return "python";
    if (s.includes("rest") || s.includes("api")) return "restapi";
    if (s.includes("postman")) return "postman";
    if (s.includes("git")) return "git";
    return null;
  }

  const SKILLS_DATA = {
    categories: categories,
    mapping: mapping,
    normalizeTagToSkillId: normalizeTagToSkillId,

    getSkill: function (id) {
      return mapping[id] || null;
    },

    getProjectsForSkill: function (id) {
      return mapping[id] ? mapping[id].projects : [];
    },

    getCategories: function (lang) {
      const isEn = lang === "en";
      return categories.map((cat) => {
        const localized = cat[isEn ? "en" : "vi"] || cat.vi;
        return {
          id: cat.id,
          title: localized.title,
          meta: localized.meta,
          skills: cat.skills.map((s) => ({
            id: s.id,
            name: s.name,
            devicon: s.devicon,
            framework: s.framework,
            frameworks: s.frameworks,
            level: s.level,
            projectIds: s.projectIds || (mapping[s.id] ? mapping[s.id].projects : [])
          }))
        };
      });
    }
  };

  // Export to global scope
  global.SKILLS_DATA = SKILLS_DATA;
})(typeof window !== "undefined" ? window : this);
