import { useState, useEffect } from "react";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

interface HeaderProps {
  ownerName: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  onOpenResume: () => void;
  onLogAdd: (msg: string) => void;
  scrollToSection: (id: string) => void;
}

export default function Header({
  ownerName,
  githubUrl,
  linkedinUrl,
  email,
  onOpenResume,
  onLogAdd,
  scrollToSection,
}: HeaderProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " // ").substring(0, 22) + "_UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-[#2A2A2A]/20 bg-[#131313]/95 backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-[1400px] mx-auto">
        {/* Logo Brand Design */}
        <div 
          onClick={() => scrollToSection("system-core")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-sm border border-terminal-green/40 group-hover:border-white transition-all bg-[#1a1a1a]">
            <img src="/favicon-dark.svg" alt="Personal Logo" />
          </div>
          <div>
            <div className="font-display text-sm font-bold text-white tracking-wider">
              {ownerName.replace(" ", "_").toUpperCase()}
            </div>
            <div className="font-mono text-[9px] text-terminal-green tracking-widest leading-none">
              SYS_NODE_US_WEST // {time}
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
              onOpenResume();
              onLogAdd("TRIGGER // RESUME_MODAL");
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1e1e1e] border border-white/10 hover:border-white max-md:hidden rounded-sm font-mono text-[10px] font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-150 cursor-pointer"
          >
            <FileText className="w-3 h-3" />
            COMPILE_RESUME
          </button>
          <div className="flex items-center gap-2 max-md:gap-1 text-on-surface-variant">
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => onLogAdd("NAV // GITHUB_LINK")}
              className="hover:bg-white/5 p-2 rounded-sm cursor-pointer hover:text-white transition-colors"
            >
              <Github className="w-4 h-4 md:w-5 h-5" />
            </a>
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => onLogAdd("NAV // LINKEDIN_LINK")}
              className="hover:bg-white/5 p-2 rounded-sm cursor-pointer hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4 md:w-5 h-5" />
            </a>
            <a 
              href={`mailto:${email}`}
              onClick={() => onLogAdd("NAV // EMAIL_LINK")}
              className="hover:bg-white/5 p-2 rounded-sm cursor-pointer hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 md:w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
