export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: "Backend" | "Frontend" | "Full-Stack" | "Systems";
  updated: string;
  stars?: number;
  forks?: number;
  githubUrl?: string;
  liveUrl?: string;
  architectureUrl?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  status: "ACTIVE" | "COMPLETED";
  location: string;
  description: string;
  highlights: string[];
}

export interface SystemLog {
  id: string;
  timestamp: string;
  type: "INFO" | "SUCCESS" | "WARN" | "ERROR" | "COMMAND";
  message: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  items: { name: string; level: number; info: string }[];
}
