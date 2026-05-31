import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Sparkles, 
  Globe, 
  Sliders, 
  Workflow, 
  Cpu, 
  Database, 
  Layers, 
  GitBranch, 
  Network, 
  Brain, 
  Shield, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  ChevronLeft, 
  ArrowUpRight, 
  Clock 
} from "lucide-react";
import { PORTFOLIO_OWNER, PROJECTS, WORK_EXPERIENCES, SKILL_GROUPS } from "./data";
import { Project, WorkExperience, SkillGroup } from "./types";
import { fetchPortfolioData } from "./utils/sheetFetcher";
import ResumeModal from "./components/ResumeModal";
import TerminalWidget from "./components/TerminalWidget";
import ContactForm from "./components/ContactForm";

// High-Tech Skeleton Loaders for each section block
function ProfileSkeleton() {
  return (
    <div className="space-y-6 flex-grow flex flex-col justify-center animate-pulse py-8">
      <div className="space-y-4">
        <div className="h-5 w-32 bg-white/5 border border-white/10 rounded-sm"></div>
        <div className="space-y-2">
          <div className="h-10 w-full bg-white/10 rounded-sm"></div>
          <div className="h-10 w-4/5 bg-white/5 rounded-sm"></div>
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <div className="h-4 w-full bg-white/5 rounded-sm"></div>
        <div className="h-4 w-11/12 bg-white/5 rounded-sm"></div>
        <div className="h-4 w-2/3 bg-white/5 rounded-sm"></div>
      </div>
      <div className="pt-6 flex flex-wrap gap-4">
        <div className="h-10 w-36 bg-white/10 rounded-sm"></div>
        <div className="h-10 w-36 bg-white/5 border border-white/10 rounded-sm"></div>
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="glass-panel p-6 rounded-sm flex flex-col justify-between border-l-2 border-l-white/20 animate-pulse relative h-[250px]">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10"></div>
          <div className="h-5 w-14 bg-white/10 rounded-sm"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-2/3 bg-white/10 rounded-sm"></div>
          <div className="h-3 w-full bg-white/5 rounded-sm"></div>
          <div className="h-3 w-5/6 bg-white/5 rounded-sm"></div>
        </div>
        <div className="flex gap-1.5 pt-2">
          <div className="h-4 w-12 bg-white/5 rounded-xs"></div>
          <div className="h-4 w-16 bg-white/5 rounded-xs"></div>
        </div>
      </div>
      <div className="pt-4 border-t border-white/5 mt-4 flex justify-between items-center">
        <div className="h-3 w-28 bg-white/5"></div>
        <div className="h-3 w-10 bg-white/5"></div>
      </div>
    </div>
  );
}

function SkillCardSkeleton() {
  return (
    <div className="min-w-[280px] sm:min-w-[340px] max-w-[360px] glass-panel p-6 rounded-sm flex flex-col justify-between animate-pulse">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10"></div>
          <div className="h-5 w-20 bg-white/10 rounded-sm"></div>
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-1/2 bg-white/10 rounded-sm"></div>
          <div className="h-3 w-full bg-white/5 rounded-sm"></div>
        </div>
      </div>
      <div className="pt-4 border-t border-white/5 mt-5 flex justify-between items-center">
        <div className="h-3 w-16 bg-white/5"></div>
        <div className="h-4 w-12 bg-white/10"></div>
      </div>
    </div>
  );
}

function ExperienceTimelineSkeleton() {
  return (
    <div className="relative pl-8 md:pl-12 border-l border-white/10 space-y-12 max-w-4xl animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="relative">
          <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-sm bg-[#131313] border-2 border-white/10 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="h-5 w-20 bg-white/10 rounded-sm"></div>
              <div className="h-4 w-24 bg-white/5 rounded-sm"></div>
            </div>
            <div className="h-5 w-1/3 bg-white/10 rounded-sm"></div>
            <div className="h-4 w-1/4 bg-white/10 rounded-sm"></div>
            <div className="h-4 w-2/3 bg-white/5 rounded-sm"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "SYS_INIT // BOOSTRAP COMPLETED.",
    "NETWORK_LINK // TUNNEL_OK LOC_US",
    "KERNEL_TRUST // INTEGRITY verified."
  ]);

  // Spreadsheet Dynamic State Core
  const [ownerData, setOwnerData] = useState<typeof PORTFOLIO_OWNER | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [skillsList, setSkillsList] = useState<SkillGroup[]>([]);
  const [experiencesList, setExperiencesList] = useState<WorkExperience[]>([]);

  // Sequential loading and log-sync variables
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([
    "CSEC_SYSTEM_INIT... SUCCESS",
    "LINK_SECURE: R_HANDSHAKE: [ ESTABLISHED ]",
    "LOADING CORE MODULES: FULL_STACK, WEB_UI, REPOS, telemetry"
  ]);
  const [latestTerminalLog, setLatestTerminalLog] = useState<{ text: string; isCmd?: boolean; type?: "green" | "dim" | "white" | "red" | "yellow" } | null>(null);

  const [ownerActive, setOwnerActive] = useState(false);
  const [projectsActive, setProjectsActive] = useState(false);
  const [skillsActive, setSkillsActive] = useState(false);
  const [experiencesActive, setExperiencesActive] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Synchronous loading pipeline
  useEffect(() => {
    let active = true;

    async function loadPipeline() {
      // Step 0: Fetch spreadsheet URL data
      setLatestTerminalLog({ text: "🚀 INITIATING TRANS-CLOUD DATA SHIELD CHANNELS...", type: "yellow" });
      setPipelineLogs((prev) => [...prev, "🚀 INITIATING TRANS-CLOUD DATA SHIELD CHANNELS..."]);
      
      let fetchedBuff = null;
      try {
        fetchedBuff = await fetchPortfolioData();
        if (!active) return;
        
        const sourceLabel = fetchedBuff.source === "google_sheets" ? "CLOUD_GOOGLE_SPREADSHEET" : "LOCAL_SECURE_CIPHER_CACHE";
        setLatestTerminalLog({ text: `[00/04] DISCONNECTED SOURCE: READY ON ${sourceLabel}`, type: "green" });
        setPipelineLogs((prev) => [...prev, `[00/04] SOURCE DETECTED: READY ON ${sourceLabel}`]);
      } catch (err) {
        if (!active) return;
        console.error(err);
        setLatestTerminalLog({ text: "[00/04] STINK DISCONNECTED. ATTEMPTING LOCAL COLD BOOT CHANNELS...", type: "red" });
        setPipelineLogs((prev) => [...prev, "[00/04] DISCONNECTED. ATTEMPTING LOCAL COLD BOOT CHANNELS..."]);
      }

      // Step 1: Owner Bio section sequential reveal
      await new Promise(resolve => setTimeout(resolve, 800));
      if (!active) return;
      setLatestTerminalLog({ text: "[01/04] UNLOCKING BIOMETRIC OWNER SIGNATURE NODES...", type: "white" });
      setPipelineLogs((prev) => [...prev, "[01/04] UNLOCKING BIOMETRIC OWNER SIGNATURE..."]);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!active) return;
      const finalOwner = fetchedBuff?.owner || PORTFOLIO_OWNER;
      setOwnerData(finalOwner);
      setOwnerActive(true);
      setLoadingStep(1);
      setLatestTerminalLog({ text: `[01/04] SUCCESS: PROFILE [${finalOwner.name.toUpperCase()}] LINKED SECURELY.`, type: "green" });
      setPipelineLogs((prev) => [...prev, `[01/04] SUCCESS: PROFILE [${finalOwner.name.toUpperCase()}] LINKED.`]);

      // Step 2: Project list loading
      await new Promise(resolve => setTimeout(resolve, 800));
      if (!active) return;
      setLatestTerminalLog({ text: "[02/04] PROBING SYSTEMS SPEC_REPOS ARTIFACT FORK...", type: "white" });
      setPipelineLogs((prev) => [...prev, "[02/04] PROBING SYSTEMS SPEC_REPOS ARTIFACT FORK..."]);

      await new Promise(resolve => setTimeout(resolve, 1200));
      if (!active) return;
      const finalProjects = fetchedBuff?.projects || PROJECTS;
      setProjectsList(finalProjects);
      setProjectsActive(true);
      setLoadingStep(2);
      setLatestTerminalLog({ text: `[02/04] SUCCESS: FETCHED [${finalProjects.length}] REPOSITORY CODES OK.`, type: "green" });
      setPipelineLogs((prev) => [...prev, `[02/04] SUCCESS: FETCHED [${finalProjects.length}] REPOS OK.`]);

      // Step 3: Technology items loading
      await new Promise(resolve => setTimeout(resolve, 800));
      if (!active) return;
      setLatestTerminalLog({ text: "[03/04] DECOMPRESSING SYSTEMS OPERATION SKILLS MATRIX...", type: "white" });
      setPipelineLogs((prev) => [...prev, "[03/04] DECOMPRESSING SYSTEMS OPERATION SKILLS..."]);

      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!active) return;
      const finalSkills = fetchedBuff?.skills || SKILL_GROUPS;
      setSkillsList(finalSkills);
      setSkillsActive(true);
      setLoadingStep(3);
      setLatestTerminalLog({ text: `[03/04] SUCCESS: PARSED [${finalSkills.reduce((sum, g) => sum + g.items.length, 0)}] PROTOCOLS.`, type: "green" });
      setPipelineLogs((prev) => [...prev, `[03/04] SUCCESS: PARSED SKILLS MATRIX PROTOCOLS.`]);

      // Step 4: Temporal Timeline Work Experience reveal
      await new Promise(resolve => setTimeout(resolve, 800));
      if (!active) return;
      setLatestTerminalLog({ text: "[04/04] RESTORING TEMPORAL HISTORICAL TIME TRACKS...", type: "white" });
      setPipelineLogs((prev) => [...prev, "[04/04] RESTORING TEMPORAL HISTORICAL TIME TRACKS..."]);

      await new Promise(resolve => setTimeout(resolve, 1200));
      if (!active) return;
      const finalExperiences = fetchedBuff?.experiences || WORK_EXPERIENCES;
      setExperiencesList(finalExperiences);
      setExperiencesActive(true);
      setLoadingStep(4);
      setLatestTerminalLog({ text: `[04/04] SUCCESS: STREAMS LOADED OK. PORTFOLIO ENGINE IS 100% OPERATIONAL.`, type: "green" });
      setPipelineLogs((prev) => [...prev, "[04/04] SUCCESS: PORTFOLIO ENGINE IS 100% OPERATIONAL."]);
    }

    loadPipeline();
    return () => {
      active = false;
    };
  }, []);

  // Scroll carousel elements smoothly
  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollAmount = container.clientWidth * 0.85;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
      handleAddLog(`CAROUSEL_SCROLL // DIR: ${direction.toUpperCase()}`);
    }
  };

  // Maps developer knowledge names to matching UI icons
  const getSkillIcon = (name: string, category: string) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes("typescript") || lowercaseName.includes("javascript")) {
      return <Terminal className="w-5 h-5" />;
    }
    if (lowercaseName.includes("react")) {
      return <Sparkles className="w-5 h-5" />;
    }
    if (lowercaseName.includes("next")) {
      return <Globe className="w-5 h-5" />;
    }
    if (lowercaseName.includes("tailwind")) {
      return <Sliders className="w-5 h-5" />;
    }
    if (lowercaseName.includes("python")) {
      return <Workflow className="w-5 h-5" />;
    }
    if (lowercaseName.includes("fastapi")) {
      return <Cpu className="w-5 h-5" />;
    }
    if (lowercaseName.includes("supabase") || lowercaseName.includes("postgres")) {
      return <Database className="w-5 h-5" />;
    }
    if (lowercaseName.includes("redux")) {
      return <Layers className="w-5 h-5" />;
    }
    if (lowercaseName.includes("git")) {
      return <GitBranch className="w-5 h-5" />;
    }
    if (lowercaseName.includes("graph")) {
      return <Network className="w-5 h-5" />;
    }
    if (lowercaseName.includes("dsa") || lowercaseName.includes("dynamic") || lowercaseName.includes("algorithms") || lowercaseName.includes("competitive")) {
      return <Brain className="w-5 h-5" />;
    }
    
    // Fallback icon based on category
    if (category.toLowerCase().includes("backend") || category.toLowerCase().includes("database")) return <Database className="w-5 h-5" />;
    if (category.toLowerCase().includes("language")) return <Cpu className="w-5 h-5" />;
    if (category.toLowerCase().includes("algo") || category.toLowerCase().includes("dsa")) return <Brain className="w-5 h-5" />;
    return <Sliders className="w-5 h-5" />;
  };

  // Dynamic live clock in UTC format to match temporal aesthetic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace("T", " // ").substring(0, 22) + "_UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Owner reference pointing dynamically
  const currentOwner = ownerActive && ownerData ? ownerData : PORTFOLIO_OWNER;

  // Filter project listing
  const currentProjectsSource = projectsActive ? projectsList : [];
  const filteredProjects = currentProjectsSource.filter((project) => {
    const matchesCategory = activeCategory === "ALL" || project.category.toUpperCase() === activeCategory.toUpperCase();
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle addition of custom log items via interactive components
  const handleAddLog = (msg: string) => {
    const now = new Date().toTimeString().split(" ")[0];
    setSystemLogs((prev) => [`[${now}] ${msg.toUpperCase()}`, ...prev.slice(0, 7)]);
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      handleAddLog(`SCROLL_NAV_TO // #${id.toUpperCase()}`);
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-[#131313] text-[#e2e2e2] selection:bg-white selection:text-black overflow-x-hidden">
      {/* Immersive CRT, scanline, and stardust grain layers */}
      <div className="crt-overlay" />
      <div className="scanline-move" />
      <div className="noise-texture" />

      {/* FIXED HEADER SYSTEM */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-[#2A2A2A]/20 bg-[#131313]/95 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-[1400px] mx-auto">
          {/* Logo Brand Design */}
          <div 
            onClick={() => scrollToSection("system-core")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-sm border border-terminal-green/40 group-hover:border-white transition-all bg-[#1a1a1a]">
              <span className="material-symbols-outlined text-[18px] text-terminal-green group-hover:text-white transition-colors animate-pulse">terminal</span>
            </div>
            <div>
              <div className="font-display text-sm font-bold text-white tracking-wider">
                {currentOwner.name.replace(" ", "_").toUpperCase()}
              </div>
              <div className="font-mono text-[9px] text-terminal-green tracking-widest leading-none">
                SYS_NODE_US_WEST
              </div>
            </div>
          </div>

          {/* Desktop Navigation Link Tags */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] font-bold">
            <button 
              onClick={() => scrollToSection("project-galleries")}
              className="text-[#bcbbc5] hover:text-white pb-0.5 border-b border-transparent hover:border-white transition-all duration-200 outline-none cursor-pointer"
            >
              ARCHIVES // PROJECTS
            </button>
            <button 
              onClick={() => scrollToSection("skill-units")}
              className="text-[#bcbbc5] hover:text-white pb-0.5 border-b border-transparent hover:border-white transition-all duration-200 outline-none cursor-pointer"
            >
              PROTOCOLS // SKILLS
            </button>
            <button 
              onClick={() => scrollToSection("experience-logs")}
              className="text-[#bcbbc5] hover:text-white pb-0.5 border-b border-transparent hover:border-white transition-all duration-200 outline-none cursor-pointer"
            >
              TEMPORAL // EXP
            </button>
            <button 
              onClick={() => scrollToSection("contact-handshake")}
              className="text-[#bcbbc5] hover:text-white pb-0.5 border-b border-transparent hover:border-white transition-all duration-200 outline-none cursor-pointer"
            >
              UPLINK_CONNECT
            </button>
          </nav>

          {/* Header Action Grid */}
          <div className="flex items-center gap-4 text-white">
            <button 
              onClick={() => {
                setIsResumeOpen(true);
                handleAddLog("TRIGGER // RESUME_MODAL");
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1e1e1e] border border-white/10 hover:border-white max-md:hidden rounded-sm font-mono text-[10px] font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-150 cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              COMPILE_RESUME
            </button>
            <div className="flex items-center gap-2 max-md:gap-1 text-on-surface-variant">
              <a 
                href={currentOwner.github} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => handleAddLog("NAV // GITHUB_LINK")}
                className="hover:bg-white/5 p-2 rounded-sm cursor-pointer hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 md:w-5 h-5" />
              </a>
              <a 
                href={currentOwner.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => handleAddLog("NAV // LINKEDIN_LINK")}
                className="hover:bg-white/5 p-2 rounded-sm cursor-pointer hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 md:w-5 h-5" />
              </a>
              <a 
                href={`mailto:${currentOwner.email}`}
                onClick={() => handleAddLog("NAV // EMAIL_LINK")}
                className="hover:bg-white/5 p-2 rounded-sm cursor-pointer hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 md:w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* CORE FRAME LAYOUT */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-12 pt-28 pb-20 space-y-24">
        
        {/* HERO SPEC TERMINAL CORE VIEWPORT */}
        <section id="system-core" className="scroll-mt-28 w-full">
          {/* Full-Width Minimalist Bio Block */}
          <div className="w-full glass-panel p-6 md:p-12 flex flex-col justify-between rounded-sm relative min-h-[460px]">
            {/* Corner Tag */}
            <div className="mb-6 flex justify-between items-center select-none opacity-60">
              <span className="font-mono text-[10px] tracking-widest text-[#bcbbc5] uppercase">SYSTEM_CORE_VIEWPORT // SPEC_INFO</span>
              <span className="font-mono text-[10px] text-terminal-green">[ STATUS: {ownerActive ? "ACTIVE_NODE" : "ALIGNED_LOADING"} ]</span>
            </div>
            <hr className="border-[#2A2A2A]/20 mb-8" />

            {!ownerActive ? (
              <ProfileSkeleton />
            ) : (
              <div className="space-y-6 flex-grow flex flex-col justify-center">
                {/* Dynamic Telemetry Streams showing dynamic loading notes above heading */}
                <div className="font-mono text-xs leading-relaxed text-terminal-green opacity-90 space-y-1 block max-w-3xl bg-black/40 p-4 rounded-sm border border-white/5 font-semibold">
                  {pipelineLogs.slice(-3).map((log, i) => (
                    <p key={i} className="truncate">
                      &gt;&gt; {log}
                    </p>
                  ))}
                  <span className="inline-block animate-pulse w-1.5 h-3.5 bg-terminal-green ml-1 align-middle"></span>
                </div>

                <div className="space-y-4">
                  <span className="inline-block bg-white/5 border border-white/10 px-2.5 py-1 text-terminal-green font-mono text-[10px] tracking-widest uppercase rounded-sm">
                    {currentOwner.title.toUpperCase()}
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-[1.1] tracking-tight text-white uppercase font-bold">
                    BUILDING THE <span className="text-black bg-white px-2 italic">BLUEPRINTS</span> FOR RESPONSIVE WEB SYSTEMS.
                  </h1>
                </div>

                <p className="font-sans text-base md:text-lg text-[#bcbbc5] max-w-3xl font-light leading-relaxed">
                  {currentOwner.bio}
                </p>

                {/* Primary CTA Buttons */}
                <div className="pt-6 flex flex-wrap gap-4 font-mono">
                  <button 
                    onClick={() => scrollToSection("project-galleries")}
                    className="px-6 py-3 bg-white hover:bg-[#e2e2e2] text-black font-semibold text-xs tracking-wider uppercase rounded-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    EXPLORE_ARCHIVES
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      setIsResumeOpen(true);
                      handleAddLog("TRIGGER // RESUME_COMPILER");
                    }}
                    className="px-6 py-3 border border-white/20 hover:border-white text-white hover:bg-white/5 font-semibold text-xs tracking-wider uppercase rounded-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    DOWNLOAD_RESUME.pdf
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Location stats footer */}
            <div className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-t border-white/5 pt-4 opacity-50 select-none">
              <div className="font-mono text-[10px] text-terminal-green">
                [ STATUS: ENCRYPTED_AND_LIVE ]
              </div>
              <div className="font-mono text-[10px] text-right max-sm:text-left leading-tight">
                LOC: {currentOwner.location.toUpperCase()}<br />
                LAST_COMPILED_TELEMETRY: v1.0.4
              </div>
            </div>
          </div>
        </section>

        {/* METRICS METADATA BLOCK */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="glass-panel p-6 text-center rounded-sm hover:border-[#10B981]/30 transition-all cursor-default select-none group">
            <span className="font-mono text-[10px] text-[#bcbbc5] tracking-widest block mb-1">DSA_SOLVED_CHALLENGES</span>
            <span className="font-display text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform block">450+</span>
            <span className="font-mono text-[9px] text-[#bcbbc5]/40 uppercase mt-2 block">[ PROBLEMS ACROSS SITES ]</span>
          </div>

          <div className="glass-panel p-6 text-center rounded-sm hover:border-[#10B981]/30 transition-all cursor-default select-none group">
            <span className="font-mono text-[10px] text-[#bcbbc5] tracking-widest block mb-1">GRAPH_DP_MODULES</span>
            <span className="font-display text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform block">15+</span>
            <span className="font-mono text-[9px] text-[#bcbbc5]/40 uppercase mt-2 block">[ TRAVERSALS & STATE MODELS ]</span>
          </div>

          <div className="glass-panel p-6 text-center rounded-sm hover:border-[#10B981]/30 transition-all cursor-default select-none group">
            <span className="font-mono text-[10px] text-[#bcbbc5] tracking-widest block mb-1">AVG_COMPLEXITY_TARGET</span>
            <span className="font-display text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform block">O(N log N)</span>
            <span className="font-mono text-[9px] text-[#bcbbc5]/40 uppercase mt-2 block">[ OPTIMAL CONSTRAINT GUARANTEE ]</span>
          </div>

          <div className="glass-panel p-6 text-center rounded-sm hover:border-white/30 transition-all cursor-default select-none group border-white/20">
            <span className="font-mono text-[10px] text-terminal-green tracking-widest block mb-1">COMPETITIVE_RATING</span>
            <span className="font-display text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform block">1650+</span>
            <span className="font-mono text-[9px] text-terminal-green/50 uppercase mt-2 block">[ ACTIVE PARTICIPATION LEVEL ]</span>
          </div>
        </section>

        {/* ACTIVE PROJECT REPOSITORY HUB */}
        <section id="project-galleries" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-terminal-green tracking-widest uppercase block">DIRECTORY // PATH: /PROJECTS/ACTIVE_REPOS</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                SOFTWARE ARCHIVE GRID
              </h2>
            </div>
            
            {/* Project Category Filter Controls */}
            <div className="flex flex-wrap gap-2 font-mono text-[10px] font-bold">
              {["ALL", "SYSTEMS", "BACKEND", "FRONTEND", "FULL-STACK"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat.toUpperCase());
                    handleAddLog(`FILTER // CAT: ${cat.toUpperCase()}`);
                  }}
                  className={`px-3.5 py-1.5 border transition-all rounded-sm select-none cursor-pointer ${
                    activeCategory === cat.toUpperCase() 
                      ? "bg-white text-black border-white" 
                      : "border-white/10 hover:border-white/30 text-[#bcbbc5] hover:text-white"
                  }`}
                >
                  {cat.replace("-", "_") + "_FILES"}
                </button>
              ))}
            </div>
          </div>

          {/* Search filters & query count info */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </div>
              <input 
                type="text"
                value={searchQuery}
                disabled={!projectsActive}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e1e1e]/60 border border-white/15 text-white placeholder-white/20 text-xs font-mono pl-10 pr-4 py-2.5 focus:border-white focus:outline-none focus:ring-0 rounded-sm uppercase tracking-wider disabled:opacity-40" 
                placeholder={projectsActive ? "PROBE_REPOS_BY_TAGS_OR_NAMES..." : "PROBING SYSTEMS SYSTEM REPOS..."}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/50 hover:text-white"
                >
                  ╳
                </button>
              )}
            </div>

            <div className="font-mono text-[10px] text-[#bcbbc5]/50 flex items-center gap-2">
              <span>PROBES_YIELDED: [{filteredProjects.length}] NODES</span>
              {searchQuery && (
                <span className="text-yellow-400 font-bold">[ SEARCH ACTIVE ]</span>
              )}
            </div>
          </div>

          {/* PROJECT GRID CARDS */}
          {!projectsActive ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p) => (
                  <motion.div 
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="glass-panel p-6 rounded-sm flex flex-col justify-between hover:border-white/40 group hover:shadow-[0_0_25px_rgba(255,255,255,0.03)] transition-all duration-300 relative border-l-2 border-l-white"
                  >
                    <div className="space-y-4">
                      {/* Top actions/stats bar */}
                      <div className="flex justify-between items-center">
                        <div className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center bg-[#1a1a1a]">
                          {p.category === "Backend" && <Database className="w-4 h-4 text-terminal-green" />}
                          {p.category === "Frontend" && <Sliders className="w-4 h-4 text-terminal-green" />}
                          {p.category === "Full-Stack" && <Globe className="w-4 h-4 text-terminal-green" />}
                          {p.category === "Systems" && <Shield className="w-4 h-4 text-terminal-green" />}
                        </div>

                        <div className="flex items-center gap-2 select-none">
                          <span className="font-mono text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 text-[#bcbbc5] rounded-sm">
                            ★ {p.stars || 0}
                          </span>
                          <a 
                            href={p.githubUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={() => handleAddLog(`GITHUB_OPEN // ${p.id}`)}
                            className="w-7 h-7 border border-white/10 hover:border-white rounded-sm flex items-center justify-center text-[#bcbbc5] hover:text-white transition-colors"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Headline and descriptions */}
                      <div className="space-y-2">
                        <h3 className="font-display text-lg font-bold text-white tracking-tight uppercase group-hover:text-terminal-green transition-colors">
                          {p.title}
                        </h3>
                        <p className="font-sans text-xs md:text-sm text-[#bcbbc5] leading-relaxed line-clamp-3">
                          {p.description}
                        </p>
                      </div>

                      {/* Technology indicators */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {p.tags.map((t, idx) => (
                          <span 
                            key={idx}
                            className="font-mono text-[9px] bg-[#1a1a1a] border border-white/10 px-2 py-0.5 text-white/70"
                          >
                            {t.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expansion action block to terminal */}
                    <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center font-mono text-[10px] text-[#bcbbc5]/40">
                      <button 
                        onClick={() => handleAddLog(`PRY_SPEC // ${p.id}: ${p.longDescription.substring(0, 50)}...`)}
                        className="hover:text-white underline decoration-dotted transition-colors outline-none cursor-pointer"
                      >
                        PRY_SPECIFICATIONS_VIA_LOGS
                      </button>
                      <span className="uppercase text-[9px]">
                        {p.updated}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

            {/* Prompt for empty search */}
            {filteredProjects.length === 0 && (
              <div className="col-span-full py-16 text-center border border-dashed border-white/10 bg-[#161616]/30">
                <span className="material-symbols-outlined text-[42px] text-white/10 block mb-2">sensor_alert</span>
                <span className="font-mono text-[12px] text-white/50 block">NO ALIGNED CODE_NODES MATCH SEARCH PARAMS.</span>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("ALL");
                  }}
                  className="mt-4 font-mono text-[10px] text-terminal-green hover:underline"
                >
                  [ RESET_FILTERS_TO_CORE_SPEC ]
                </button>
              </div>
            )}
        </section>

        {/* RECENT OPERATIONAL TECHNOLOGY CAROUSEL */}
        <section id="skill-units" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-white/5 pb-4">
            <div>
              <span className="font-mono text-[10px] text-terminal-green tracking-widest uppercase block">SYSTEM_STRUCTURE // INTERACTIVE_NODES</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mt-1">
                OPERATIONAL_STACK_PROTOCOLS
              </h2>
            </div>
            
            {/* Minimalist Navigation Buttons for the Scroll Slide Track */}
            <div className="flex items-center gap-2 max-sm:w-full">
              <button 
                onClick={() => scrollSlider("left")}
                disabled={!skillsActive}
                className="w-10 h-10 border border-white/10 hover:border-white text-[#bcbbc5] hover:text-white hover:bg-white/5 rounded-sm flex items-center justify-center transition-colors active:scale-95 cursor-pointer disabled:opacity-45"
                title="PREVIOUS INDEX"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollSlider("right")}
                disabled={!skillsActive}
                className="w-10 h-10 border border-white/10 hover:border-white text-[#bcbbc5] hover:text-white hover:bg-white/5 rounded-sm flex items-center justify-center transition-colors active:scale-95 cursor-pointer disabled:opacity-45"
                title="NEXT INDEX"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Smooth Snapping Carousel Wrapper with Horizontal Touch Swiping */}
          {!skillsActive ? (
            <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
              <SkillCardSkeleton />
              <SkillCardSkeleton />
              <SkillCardSkeleton />
            </div>
          ) : (
            <div 
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 select-none"
            >
              {skillsList.flatMap(g => g.items.map(item => ({ ...item, category: g.category }))).map((skill, index) => {
                const IconComponent = getSkillIcon(skill.name, skill.category);
                return (
                  <div 
                    key={index} 
                    className="min-w-[280px] sm:min-w-[340px] max-w-[360px] snap-center glass-panel p-6 rounded-sm flex flex-col justify-between hover:border-white/40 transition-all duration-300 group"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 border border-white/10 rounded-sm bg-[#161616] flex items-center justify-center text-terminal-green group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                          {IconComponent}
                        </div>
                        <span className="font-mono text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 text-[#bcbbc5] rounded-sm uppercase tracking-wider">
                          {skill.category}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-display text-sm font-bold text-white uppercase tracking-tight group-hover:text-terminal-green transition-colors duration-200">
                          {skill.name}
                        </h3>
                        <p className="font-sans text-xs text-[#bcbbc5]/80 leading-relaxed pr-2">
                          {skill.info}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 font-mono text-[9px] text-[#bcbbc5]/20 uppercase mt-5 flex justify-between items-center">
                      <span>[ CORE_SKILL_0{index + 1} ]</span>
                      <span className="text-terminal-green font-bold">[ READY ]</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* WORK EXPERIENCE LOG REPOSITORY */}
        <section id="experience-logs" className="scroll-mt-28">
          <div className="glass-panel p-6 md:p-10 rounded-sm">
            <div className="border-b border-white/5 pb-4 mb-12">
              <span className="font-mono text-[10px] text-terminal-green tracking-widest uppercase block">LOG_STREAM // OPERATIONS</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mt-1">
                TEMPORAL_WORK_TIMELINE
              </h2>
            </div>

            {/* Chronological List of Work Items */}
            {!experiencesActive ? (
              <ExperienceTimelineSkeleton />
            ) : (
              <div className="relative pl-8 md:pl-12 border-l border-white/10 space-y-12 max-w-4xl">
                {experiencesList.map((job, idx) => (
                  <div key={job.id} className="relative group">
                    {/* Circle Indicator on timeline */}
                    <div className={`absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-sm bg-[#131313] border-2 transition-all duration-300 flex items-center justify-center select-none ${
                      job.status === "ACTIVE" 
                        ? "border-terminal-green scale-110 shadow-[0_0_8px_#10B981]" 
                        : "border-white/20 group-hover:border-white"
                    }`}>
                      <span className="font-mono text-[9px] font-bold text-white leading-none">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`font-mono text-[9px] px-2 py-0.5 border select-none tracking-widest uppercase ${
                            job.status === "ACTIVE" 
                              ? "bg-terminal-green/5 border-terminal-green text-terminal-green font-bold" 
                              : "bg-white/5 border-white/20 text-[#bcbbc5]"
                          }`}>
                            {job.status === "ACTIVE" ? "ACTIVE_NODE" : "ARCHIVED_NODE"}
                          </span>
                          <span className="font-mono text-[10px] text-[#bcbbc5] opacity-50 block">📍 {job.location.toUpperCase()}</span>
                        </div>
                        
                        <h3 className="font-display text-lg md:text-xl font-bold text-white tracking-tight uppercase">
                          {job.role}
                        </h3>
                        <h4 className="font-mono text-xs text-terminal-green font-bold">
                          {job.company.toUpperCase()}
                        </h4>
                        
                        <p className="font-sans text-xs md:text-sm text-[#bcbbc5] pt-2 text-justify max-w-2xl font-light">
                          {job.description}
                        </p>

                        {/* Job highlights */}
                        <ul className="pt-3 space-y-2 max-w-2.5xl">
                          {job.highlights.map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="flex items-start gap-2 font-sans text-xs md:text-sm text-[#bcbbc5]/85">
                              <span className="text-terminal-green font-mono pt-1 select-none">»</span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="font-mono text-right max-md:text-left text-xs md:text-sm">
                        <div className="text-white font-bold whitespace-nowrap">{job.period}</div>
                        <div className="text-[10px] text-white/30 tracking-widest mt-0.5 select-none">[ TEMPORAL_LOG ]</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CORE SPECIFICATIONS MANIFEST CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-sm border-t-2 border-white flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center font-mono text-[10px] opacity-40 select-none">
                <span>[ MANIFEST // 01 ]</span>
                <span className="text-terminal-green animate-pulse">TELEMETRY_LINK_ESTABLISHED</span>
              </div>
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">MISSION_INTEGRITY</h3>
              <p className="font-sans text-xs md:text-sm text-[#bcbbc5]/80 leading-relaxed text-justify">
                Empowering next-generation full stack interfaces with rigorous low-latency architectures, robust test coverage pipelines, and transparent peer systems reviews.
              </p>
            </div>
            <div className="font-mono text-[9px] text-[#bcbbc5]/20 mt-6 select-none">[ SYSTEM_CHECK_OK ]</div>
          </div>

          <div className="glass-panel p-6 rounded-sm border-t-2 border-white/20 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center font-mono text-[10px] opacity-40 select-none">
                <span>[ MANIFEST // 02 ]</span>
                <span className="text-terminal-green">CIPHER_HANDSHAKE_STABLE</span>
              </div>
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">ARCHITECTURAL_HONESTY</h3>
              <p className="font-sans text-xs md:text-sm text-[#bcbbc5]/80 leading-relaxed text-justify">
                Rejecting superficial UI templates in favor of bespoke layout hierarchies, clean pixel ratios, and performance benchmarks that truly satisfy complex browser configurations.
              </p>
            </div>
            <div className="font-mono text-[9px] text-[#bcbbc5]/20 mt-6 select-none">[ SYSTEM_STATE_COMPILING ]</div>
          </div>

          <div className="glass-panel p-6 rounded-sm border-t-2 border-white/20 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center font-mono text-[10px] opacity-40 select-none">
                <span>[ MANIFEST // 03 ]</span>
                <span className="text-terminal-green">DECRYPTION_STACKS_PASS</span>
              </div>
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">CORE_SENSORS_STREAMS</h3>
              <p className="font-sans text-xs md:text-sm text-[#bcbbc5]/80 leading-relaxed text-justify">
                Actively engineering real integrations with decentralized networks, relational frameworks, state protocols, and high frequency telemetry interfaces.
              </p>
            </div>
            <div className="font-mono text-[9px] text-[#bcbbc5]/20 mt-6 select-none">[ DECRYPTION_VERIFIED_DONE ]</div>
          </div>
        </section>

        {/* COLLABORATION INTAKE GATEWAY */}
        <section id="contact-handshake" className="scroll-mt-28">
          <ContactForm onSuccessLogged={handleAddLog} />
        </section>

      </main>

      {/* FOOTER CLOCKS & COPYRIGHT LAUNCHERS */}
      <footer className="w-full border-t border-white/5 py-12 bg-black/40 relative z-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col items-center gap-6">
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-mono text-[10px] text-[#bcbbc5]/60 uppercase tracking-widest select-none">
            <a 
              href={currentOwner.github} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => handleAddLog("NAV // GITHUB_LINK_FOOTER")}
              className="hover:text-white transition-colors"
            >
              [ GITHUB_CODE ]
            </a>
            <a 
              href={currentOwner.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => handleAddLog("NAV // LINKEDIN_LINK_FOOTER")}
              className="hover:text-white transition-colors"
            >
              [ LINKEDIN_NODE ]
            </a>
            <a 
              href={currentOwner.telegram} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => handleAddLog("NAV // TG_LINK_FOOTER")}
              className="hover:text-white transition-colors"
            >
              [ TELEGRAM_UPLINK ]
            </a>
            <span className="text-white/10 font-bold max-sm:hidden">|</span>
            <button 
              onClick={() => scrollToSection("system-core")}
              className="hover:text-white underline decoration-dotted outline-none cursor-pointer"
            >
              LOC_UP()
            </button>
            <span className="hover:text-white cursor-pointer select-none">
              NET_V1.0.4-STABLE
            </span>
          </div>

          <div className="font-mono text-[10px] text-white/30 text-center select-none uppercase">
            © 2026 {PORTFOLIO_OWNER.name.toUpperCase()}. ALL RIGHTS REPORTED IN CORE MATRIX. // ARCHITECTURE BY HANDSHAKE PROTOCOLS.
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION DESKTOP ACCENT RAIL */}
      <div className="fixed left-4 bottom-4 z-40 max-lg:hidden">
        <div className="glass-panel p-3 flex flex-col gap-4 border-l-2 border-white rounded-none">
          <span 
            onClick={() => scrollToSection("system-core")}
            className="material-symbols-outlined text-[18px] text-white/50 hover:text-white cursor-pointer transition-colors"
            title="SCROLL TO CORE"
          >
            grid_view
          </span>
          <span 
            onClick={() => scrollToSection("project-galleries")}
            className="material-symbols-outlined text-[18px] text-white/50 hover:text-white cursor-pointer transition-colors"
            title="ACTIVE ARCHIVES"
          >
            folder_open
          </span>
          <span 
            onClick={() => {
              setIsResumeOpen(true);
              handleAddLog("ACCENT_RAIL // RESUME_COMPILER");
            }}
            className="material-symbols-outlined text-[18px] text-white/50 hover:text-white cursor-pointer transition-colors"
            title="COMPILE RESUME"
          >
            verified_user
          </span>
          <span 
            onClick={() => scrollToSection("contact-handshake")}
            className="material-symbols-outlined text-[18px] text-white/50 hover:text-white cursor-pointer transition-colors"
            title="Secure Handshake Intake"
          >
            hub
          </span>
        </div>
      </div>

      {/* FULL PRINT RESUME DRAWER MODAL */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}
