import { useState, useEffect } from "react";
import { PORTFOLIO_OWNER, PROJECTS, WORK_EXPERIENCES, SKILL_GROUPS } from "./data";
import { Project, WorkExperience, SkillGroup } from "./types";
import { fetchPortfolioData } from "./utils/sheetFetcher";

// Modals and Forms
import ResumeModal from "./components/ResumeModal";
import ContactForm from "./components/ContactForm";

// Modular Sub-components
import CRTOverlay from "./components/CRTOverlay";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MetricsSection from "./components/MetricsSection";
import ProjectsGrid from "./components/ProjectsGrid";
import SkillsCarousel from "./components/SkillsCarousel";
import ExperienceTimeline from "./components/ExperienceTimeline";
import MissionManifests from "./components/MissionManifests";
import FloatingActionRail from "./components/FloatingActionRail";
import Footer from "./components/Footer";

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

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

  // Handle addition of custom log items via interactive components
  const handleAddLog = (msg: string) => {
    setLatestTerminalLog({ text: msg.toUpperCase(), type: "dim" });
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      handleAddLog(`SCROLL_NAV_TO // #${id.toUpperCase()}`);
    }
  };

  // Owner reference pointing dynamically
  const currentOwner = ownerActive && ownerData ? ownerData : PORTFOLIO_OWNER;

  return (
    <div className="relative min-h-screen font-sans bg-[#131313] text-[#e2e2e2] selection:bg-white selection:text-black overflow-x-hidden">
      {/* Immersive CRT, scanline, and stardust grain layers */}
      <CRTOverlay />

      {/* FIXED HEADER SYSTEM */}
      <Header 
        ownerName={currentOwner.name}
        githubUrl={currentOwner.github}
        linkedinUrl={currentOwner.linkedin}
        email={currentOwner.email}
        onOpenResume={() => setIsResumeOpen(true)}
        onLogAdd={handleAddLog}
        scrollToSection={scrollToSection}
      />

      {/* CORE FRAME LAYOUT */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-12 pt-28 pb-20 space-y-24">
        
        {/* HERO SPEC TERMINAL CORE VIEWPORT */}
        <HeroSection 
          ownerActive={ownerActive}
          ownerData={ownerData}
          pipelineLogs={pipelineLogs}
          scrollToSection={scrollToSection}
          onOpenResume={() => setIsResumeOpen(true)}
          onLogAdd={handleAddLog}
          latestTerminalLog={latestTerminalLog}
          projectsList={projectsList}
          experiencesList={experiencesList}
          skillsList={skillsList}
        />

        {/* METRICS METADATA BLOCK */}
        <MetricsSection />

        {/* ACTIVE PROJECT REPOSITORY HUB */}
        <ProjectsGrid 
          projectsActive={projectsActive}
          projectsList={projectsList}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLogAdd={handleAddLog}
        />

        {/* RECENT OPERATIONAL TECHNOLOGY CAROUSEL */}
        <SkillsCarousel 
          skillsActive={skillsActive}
          skillsList={skillsList}
          onLogAdd={handleAddLog}
        />

        {/* WORK EXPERIENCE LOG REPOSITORY */}
        <ExperienceTimeline 
          experiencesActive={experiencesActive}
          experiencesList={experiencesList}
        />

        {/* CORE SPECIFICATIONS MANIFEST CARDS */}
        <MissionManifests />

        {/* COLLABORATION INTAKE GATEWAY */}
        <section id="contact-handshake" className="scroll-mt-28">
          <ContactForm onSuccessLogged={handleAddLog} />
        </section>

      </main>

      {/* FOOTER CLOCKS & COPYRIGHT LAUNCHERS */}
      <Footer 
        ownerName={currentOwner.name}
        githubUrl={currentOwner.github}
        linkedinUrl={currentOwner.linkedin}
        telegramUrl={currentOwner.telegram}
        onLogAdd={handleAddLog}
        scrollToSection={scrollToSection}
      />

      {/* FLOATING ACTION DESKTOP ACCENT RAIL */}
      <FloatingActionRail 
        scrollToSection={scrollToSection}
        onOpenResume={() => setIsResumeOpen(true)}
        onLogAdd={handleAddLog}
      />

      {/* FULL PRINT RESUME DRAWER MODAL */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}
