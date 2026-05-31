import { Project, WorkExperience, SkillGroup } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Milkessa Habtamu",
  title: "Junior Full-Stack Web Developer & Competitive Programmer",
  location: "Addis Ababa, Ethiopia",
  email: "milkessahabtamukebu@gmail.com",
  phone: "+251 83 774 4439",
  github: "https://github.com/Milkessa97",
  linkedin: "https://www.linkedin.com/in/milkessa-habtamu-831bb432b/",
  telegram: "https://t.me/milkessa04",
  bio: "Passionate junior full-stack developer and active competitive programmer. Currently sharpening my problem-solving skills by mastering graph algorithms, dynamic programming, and advanced data structures & algorithms (DSA), while building highly polished web applications.",
  resumeUrl: "#" // Simulating download via generated document / printable route
};

export const PROJECTS: Project[] = [
  {
    id: "PROJ_1",
    title: "CSEC CPD Editorial Web Application",
    description: "A sleek, user-friendly React application designed to streamline the editorial workflow for the Computer Science & Engineering CLUB (CSEC) COmpetitive programming division. This app allows contest writers to easily post problem explanations, code solutions, and editorial content in a structured format, enhancing accessibility and engagement for the competitive programming community.",
    longDescription: "Built with React and Tailwind CSS, this application features a clean and intuitive interface that enables contest writers to create and manage editorial content efficiently. The app supports rich text formatting for problem explanations, code snippets with syntax highlighting, and show on click (SPOILER) mechanism for displaying solution. It also includes a responsive design to ensure optimal viewing across devices, making it easier for users to access valuable editorial resources on the go.",
    tags: ["TypeScript", "React", "Tailwind CSS"],
    category: "Systems",
    updated: "1M_AGO",
    // stars: 18,
    // forks: 3,
    githubUrl: "https://github.com/Milkessa97/CSEC_CPD_Editorial_Web_app",
    liveUrl: "https://csec-cpd-editorials.vercel.app/"
  }
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: "EXP_1",
    role: "Front-End Developer Intern",
    company: "Ethiopian Capital Market Authority (ECMA)",
    period: "JUNE 2025 - AUG 2025",
    status: "COMPLETED",
    location: "Addis Ababa, Ethiopia",
    description: "Delivered a demo of a modernized, functional React-based Visitor Management System, showcasing a clean UI and efficient data handling.",
    highlights: [
      "Solo Frontend Development: Crafted a fully functional React application, demonstrating a modernized Visitor Management System with an intuitive UI and efficient data handling.",
      "State Management & API Integration: Implemented robust state management using Redux, ensuring seamless data flow and synchronization with a mock backend API, simulating real-world interactions.",
      "Team Collaboration & Feedback: Collaborated closely with a backend developer and mentors, actively participating in code reviews and incorporating feedback to enhance the application's performance and user experience."
    ]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages & Core",
    icon: "code_blocks",
    items: [
      { name: "TypeScript / JavaScript", level: 0, info: "Strict structural safety, async/await cycles, functional array processes." },
      { name: "Python", level: 0, info: "Robust script automations, algorithmic structures, clean script files." },
      { name: "C++ // Competitive Coding", level: 0, info: "Fast I/O routines, memory optimizations, custom templates." }
    ]
  },
  {
    category: "Frontend UI Stack",
    icon: "desktop_windows",
    items: [
      { name: "React js", level: 0, info: "State management hooks, custom hooks, reusable modular layout grids." },
      { name: "Next js", level: 0, info: "Server-side routing layout, server components, optimized assets." },
      { name: "Tailwind CSS", level: 0, info: "Rapid utilities, responsive columns, high contrast theme vars." },
      { name: "Redux State Management", level: 0, info: "Global state stores, action dispatch, slice integration." }
    ]
  },
  {
    category: "Backend & Databases",
    icon: "database",
    items: [
      { name: "FastAPI Engine", level: 0, info: "Fast async microservices, Pydantic type validation, auto API docs." },
      { name: "PostgreSQL Database", level: 0, info: "Structured schemas, relational lookup keys, indices optimization." },
      { name: "Supabase Integration", level: 0, info: "Instant backend setups, auth tables, secure row-level policies." },
      { name: "Git Control & Workflows", level: 0, info: "Version commits branching, secure pull requests handles, code merging." }
    ]
  },
  {
    category: "Algorithms & DSA",
    icon: "psychology",
    items: [
      { name: "Graph Algorithms", level: 0, info: "Depth-first/breadth-first traversal, shortest paths (Dijkstra, Bellman-Ford)." },
      { name: "Data Structures (DSA)", level: 0, info: "Balanced trees, hash maps, queues, stack buffers, disjoint-set structures." },
      { name: "Competitive Programming", level: 0, info: "Fast-execution runtimes, optimal space complexity, constraint evaluation." }
    ]
  }
];
