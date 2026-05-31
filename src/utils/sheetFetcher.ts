import { Project, WorkExperience, SkillGroup } from "../types";
import { PORTFOLIO_OWNER, PROJECTS, WORK_EXPERIENCES, SKILL_GROUPS } from "../data";

export interface ParsedPortfolioData {
  owner: typeof PORTFOLIO_OWNER;
  projects: Project[];
  experiences: WorkExperience[];
  skills: SkillGroup[];
  source: "google_sheets" | "local_cache";
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let currentVal = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        currentVal += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(currentVal);
      currentVal = "";
    } else {
      currentVal += char;
    }
  }
  result.push(currentVal);
  return result;
}

export function parseCSV(csvText: string): any[] {
  const lines: string[] = [];
  let currentLine = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === '\n' && !insideQuotes) {
      lines.push(currentLine.trim());
      currentLine = "";
      continue;
    } else if (char === '\r' && !insideQuotes) {
      continue;
    }
    currentLine += char;
  }
  if (currentLine) {
    lines.push(currentLine.trim());
  }

  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const rows: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const values = parseCSVLine(lines[i]);
    const row: any = {};
    headers.forEach((header, index) => {
      const sanitizedKey = header.trim().toLowerCase();
      if (sanitizedKey) {
        row[sanitizedKey] = values[index]?.trim() || "";
      }
    });
    rows.push(row);
  }

  return rows;
}

function getGidExportUrl(baseUrl: string, gid: string): string {
  const trimmed = baseUrl.trim();
  // Extract spreadsheet ID if of a standard format: /spreadsheets/d/ID/
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const spreadsheetId = match[1];
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
  }
  return trimmed;
}

export async function fetchPortfolioData(): Promise<ParsedPortfolioData> {
  const masterUrl = (import.meta as any).env?.VITE_GOOGLE_SHEET_URL || (import.meta as any).env?.NEXT_PUBLIC_GOOGLE_SHEET_URL;

  if (!masterUrl) {
    // Return mock data immediately if url is not declared
    return {
      owner: PORTFOLIO_OWNER,
      projects: PROJECTS,
      experiences: WORK_EXPERIENCES,
      skills: SKILL_GROUPS,
      source: "local_cache"
    };
  }

  // GIDs for each individual tab
  const ownerGid = (import.meta as any).env?.VITE_GOOGLE_SHEET_OWNER_GID;
  const projectsGid = (import.meta as any).env?.VITE_GOOGLE_SHEET_PROJECTS_GID;
  const experiencesGid = (import.meta as any).env?.VITE_GOOGLE_SHEET_EXPERIENCES_GID;
  const skillsGid = (import.meta as any).env?.VITE_GOOGLE_SHEET_SKILLS_GID;

  // Build target URLs
  const ownerUrl = getGidExportUrl(masterUrl, ownerGid);
  const projectsUrl = projectsGid ? getGidExportUrl(masterUrl, projectsGid) : null;
  const experiencesUrl = experiencesGid ? getGidExportUrl(masterUrl, experiencesGid) : null;
  const skillsUrl = skillsGid ? getGidExportUrl(masterUrl, skillsGid) : null;

  // Initial outputs default safely to our packed local records if fetching errors
  const data: ParsedPortfolioData = {
    owner: { ...PORTFOLIO_OWNER },
    projects: [...PROJECTS],
    experiences: [...WORK_EXPERIENCES],
    skills: [...SKILL_GROUPS],
    source: "google_sheets"
  };

  const fetchPromises: Promise<any>[] = [];

  // 1. Fetch Owner / Bio sheet
  fetchPromises.push(
    fetch(ownerUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP state ${res.status}`);
        return res.text();
      })
      .then(csv => {
        const rows = parseCSV(csv);
        if (rows.length > 0) {
          const row0 = rows[0];
          // Support both Key-Value layout or single-row full-column layout
          const isKeyValue = rows.some(r => r.key || r.field || r.property);
          if (isKeyValue) {
            rows.forEach(r => {
              const k = (r.key || r.field || r.property || r.column || "").trim().toLowerCase();
              const v = (r.value || r.content || r.text || "").trim();
              if (k && v) {
                if (k === "name") data.owner.name = v;
                if (k === "title") data.owner.title = v;
                if (k === "location") data.owner.location = v;
                if (k === "email") data.owner.email = v;
                if (k === "phone") data.owner.phone = v;
                if (k === "github") data.owner.github = v;
                if (k === "linkedin") data.owner.linkedin = v;
                if (k === "telegram") data.owner.telegram = v;
                if (k === "bio") data.owner.bio = v;
                if (k === "resumeurl" || k === "resume") data.owner.resumeUrl = v;
              }
            });
          } else {
            if (row0.name) data.owner.name = row0.name;
            if (row0.title) data.owner.title = row0.title;
            if (row0.location) data.owner.location = row0.location;
            if (row0.email) data.owner.email = row0.email;
            if (row0.phone) data.owner.phone = row0.phone;
            if (row0.github) data.owner.github = row0.github;
            if (row0.linkedin) data.owner.linkedin = row0.linkedin;
            if (row0.telegram) data.owner.telegram = row0.telegram;
            if (row0.bio) data.owner.bio = row0.bio;
            if (row0.resumeurl) data.owner.resumeUrl = row0.resumeurl;
          }
        }
      })
      .catch(err => {
        console.warn("Owner bio tab fetch failed. Defaulting safely. Error:", err);
      })
  );

  // 2. Fetch Projects sheet
  if (projectsUrl) {
    fetchPromises.push(
      fetch(projectsUrl)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP state ${res.status}`);
          return res.text();
        })
        .then(csv => {
          const rows = parseCSV(csv);
          if (rows.length > 0) {
            const mapped: Project[] = rows.map((row) => {
              const id = row.id || `PROJ_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
              const tags = row.tags ? row.tags.split(";").map((t: string) => t.trim()).filter(Boolean) : [];
              const category = (row.category || "Frontend") as any;
              return {
                id,
                title: row.title || "Untitled Project",
                description: row.description || "No description provided.",
                longDescription: row.longdescription || row.description || "Detailed specifications.",
                tags: tags.length > 0 ? tags : ["Tech Stack"],
                category: ["Backend", "Frontend", "Full-Stack", "Systems"].includes(category) ? category : "Frontend",
                updated: row.updated || "1D_AGO",
                stars: row.stars ? parseInt(row.stars, 10) : 0,
                forks: row.forks ? parseInt(row.forks, 10) : 0,
                githubUrl: row.githuburl || "#",
                liveUrl: row.liveurl || "#"
              };
            });
            data.projects = mapped;
          }
        })
        .catch(err => {
          console.warn("Projects tab fetch failed. Defaulting safely. Error:", err);
        })
    );
  }

  // 3. Fetch Experiences sheet
  if (experiencesUrl) {
    fetchPromises.push(
      fetch(experiencesUrl)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP state ${res.status}`);
          return res.text();
        })
        .then(csv => {
          const rows = parseCSV(csv);
          if (rows.length > 0) {
            const mapped: WorkExperience[] = rows.map((row) => {
              const id = row.id || `EXP_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
              const highlights = row.highlights 
                ? row.highlights.split(";").map((h: string) => h.trim()).filter(Boolean) 
                : [];
              return {
                id,
                role: row.role || "Developer Core",
                company: row.company || "Enterprise System",
                period: row.period || "PRESENT",
                status: row.status?.toUpperCase() === "ACTIVE" ? "ACTIVE" : "COMPLETED",
                location: row.location || "Remote",
                description: row.description || "Core engineering and responsive features.",
                highlights: highlights.length > 0 ? highlights : ["Uplink optimization logs."]
              };
            });
            data.experiences = mapped;
          }
        })
        .catch(err => {
          console.warn("Experiences tab fetch failed. Defaulting safely. Error:", err);
        })
    );
  }

  // 4. Fetch Skills sheet
  if (skillsUrl) {
    fetchPromises.push(
      fetch(skillsUrl)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP state ${res.status}`);
          return res.text();
        })
        .then(csv => {
          const rows = parseCSV(csv);
          if (rows.length > 0) {
            const tempSkillsMap: { [category: string]: { icon: string; items: { name: string; level: number; info: string }[] } } = {};
            rows.forEach((row) => {
              const category = row.category || "General Stack";
              const icon = row.icon || "code_blocks";
              const name = row.name;
              const level = row.level ? parseInt(row.level, 10) : 0;
              const info = row.info || "";

              if (name) {
                if (!tempSkillsMap[category]) {
                  tempSkillsMap[category] = { icon, items: [] };
                }
                tempSkillsMap[category].items.push({ name, level, info });
              }
            });

            const mapped: SkillGroup[] = Object.keys(tempSkillsMap).map((catName) => ({
              category: catName,
              icon: tempSkillsMap[catName].icon,
              items: tempSkillsMap[catName].items
            }));
            data.skills = mapped;
          }
        })
        .catch(err => {
          console.warn("Skills tab fetch failed. Defaulting safely. Error:", err);
        })
    );
  }

  await Promise.all(fetchPromises);
  return data;
}
