import React, { useState, useEffect, useRef } from "react";
import { PORTFOLIO_OWNER, PROJECTS, WORK_EXPERIENCES, SKILL_GROUPS } from "../data";
import { Project, WorkExperience, SkillGroup } from "../types";

interface TerminalLine {
  text: string;
  isCmd?: boolean;
  type?: "green" | "dim" | "white" | "red" | "yellow";
}

interface TerminalWidgetProps {
  onOpenResume: () => void;
  onLogAdd: (msg: string) => void;
  newExternalLog?: TerminalLine | null;
  ownerData?: typeof PORTFOLIO_OWNER | null;
  projectsData?: Project[] | null;
  experiencesData?: WorkExperience[] | null;
  skillsData?: SkillGroup[] | null;
}

export default function TerminalWidget({ 
  onOpenResume, 
  onLogAdd,
  newExternalLog = null,
  ownerData = null,
  projectsData = null,
  experiencesData = null,
  skillsData = null
}: TerminalWidgetProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "SYSTEM CORE DIAGNOSTIC v1.0.4 - SECURE HANDSHAKE SET" },
    { text: "UPLINK ESTABLISHED. TYPE 'help' FOR AVAILABLE SYSTEM OPERATIONS.", type: "green" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [logsCount, setLogsCount] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Dynamically map loaded datasets or fallback keys
  const owner = ownerData || PORTFOLIO_OWNER;
  const projects = projectsData || PROJECTS;
  const experiences = experiencesData || WORK_EXPERIENCES;
  const skillGroups = skillsData || SKILL_GROUPS;

  // Track and append real-time telemetry loading ticks
  useEffect(() => {
    if (newExternalLog) {
      setHistory((prev) => [...prev, newExternalLog]);
    }
  }, [newExternalLog]);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Command router
  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    onLogAdd(`CMD_EXEC // ${trimmed.toUpperCase()}`);

    if (!trimmed) return;

    const newHistory = [...history, { text: `> ${cmdText}`, isCmd: true }];

    const words = trimmed.split(" ");
    const primaryCmd = words[0];

    switch (primaryCmd) {
      case "help":
        newHistory.push(
          { text: "AVAILABLE SENDER NODES & UTILITIES:", type: "white" },
          { text: "  about            Print developer core specifications and system bio." },
          { text: "  projects         List full-stack software repositories and active codes." },
          { text: "  skills           Evaluate core technology grid with load progress." },
          { text: "  experience       Stream historical work records chronologically." },
          { text: "  download_resume  Initiate pipeline compile and open printable resume doc." },
          { text: "  neofetch         Render system specification layout and ASCII brand." },
          { text: "  ping             Measure link transmissions and latency nodes." },
          { text: "  clear            Reset terminal telemetry history." }
        );
        break;

      case "about":
        newHistory.push(
          { text: "--- SYSTEM BIO ---", type: "white" },
          { text: `NAME:      ${owner.name.toUpperCase()}` },
          { text: `ROLE:      ${owner.title.toUpperCase()}` },
          { text: `LOC:       ${owner.location.toUpperCase()}` },
          { text: `EMAIL:     ${owner.email.toUpperCase()}` },
          { text: `CORE STAT: ACTIVE_DEVELOPER_NODE` },
          { text: `BIO:       ${owner.bio}` }
        );
        break;

      case "projects":
        newHistory.push(
          { text: "--- ACTIVE SOFTWARE REPOSITORIES ---", type: "white" }
        );
        projects.forEach(p => {
          newHistory.push(
            { text: `[${p.id}] - ${p.description}`, type: "yellow" },
            { text: `  Category: ${p.category} | Tags: ${p.tags.join(", ")} | Stars: ★ ${p.stars || 0}`, type: "dim" }
          );
        });
        break;

      case "skills":
        newHistory.push(
          { text: "--- CORE TECHNOLOGY PROGRESS GRID ---", type: "white" }
        );
        skillGroups.forEach(g => {
          newHistory.push({ text: `[ ${g.category.toUpperCase()} ]`, type: "white" });
          g.items.forEach(item => {
            const level = item.level || 90; // Default to visually complete level bar if not formatted
            const barCount = Math.round(level / 10);
            const fillBar = "█".repeat(barCount);
            const emptyBar = "░".repeat(10 - barCount);
            newHistory.push({
              text: `  ${item.name.padEnd(22)} [${fillBar}${emptyBar}] ${level}% - ${item.info}`,
              type: "green"
            });
          });
        });
        break;

      case "experience":
        newHistory.push(
          { text: "--- SYSTEM TIMELINE RECORDS ---", type: "white" }
        );
        experiences.forEach(exp => {
          newHistory.push(
            { text: `[${exp.period}] ${exp.role.toUpperCase()} // ${exp.company.toUpperCase()}`, type: "white" },
            { text: `  Status: ${exp.status} | Location: ${exp.location}`, type: "dim" },
            { text: `  Description: ${exp.description}`, type: "dim" }
          );
          exp.highlights.forEach(h => {
            newHistory.push({ text: `    • ${h}`, type: "dim" });
          });
        });
        break;

      case "download_resume":
        newHistory.push(
          { text: "INITIATING PARALLEL COMPILATION PIPELINE...", type: "green" },
          { text: "BUILDING RESUME MANIFEST FROM DATA NODE... [ OK ]" },
          { text: "EMULATING SYSTEM DOWNLOAD GATEWAY... OPENING WINDOW NOW.", type: "yellow" }
        );
        setTimeout(() => {
          onOpenResume();
        }, 800);
        break;

      case "clear":
        setHistory([]);
        setInputValue("");
        return;

      case "ping":
        const lat = Math.floor(Math.random() * 35) + 15;
        newHistory.push(
          { text: `64 bytes from alexth-dev-node (127.0.0.1): icmp_seq=1 ttl=64 time=${lat}ms`, type: "green" },
          { text: `64 bytes from alexth-dev-node (127.0.0.1): icmp_seq=2 ttl=64 time=${lat - 2}ms`, type: "green" },
          { text: "--- alexth-dev-node ping statistics ---", type: "dim" },
          { text: "2 packets transmitted, 2 received, 0% packet loss, link latency stable.", type: "dim" }
        );
        break;

      case "neofetch":
        const ascii = [
          "   /\\_/\\      alex@kernel-node",
          "  ( o.o )     ----------------",
          "   > ^ <      OS: Arch Linux x86_64",
          "  /     \\     Kernel: 6.9.15-kernel-amd",
          " |       |    Shell: zsh 5.9",
          "  \\_____/     Env: React 19 // Vite Host",
          "              Terminal: TerminalWidget.tsx",
          "              CPU: Intel Core Virtual Nodes",
          "              GPU: Canvas Render Engine",
          "              Memory: 8342MiB / 16384MiB"
        ];
        ascii.forEach(line => {
          newHistory.push({ text: line, type: "green" });
        });
        break;

      default:
        newHistory.push(
          { text: `ERROR: COMMAND NOT REGISTERED: '${primaryCmd}'`, type: "red" },
          { text: "TYPE 'help' TO QUERY COMPATIBLE TELEMETRY PROTOCOLS.", type: "dim" }
        );
        break;
    }

    setHistory(newHistory);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      onClick={handleTerminalClick}
      className="glass-panel p-4 md:p-6 rounded-sm font-mono text-xs md:text-sm h-[400px] flex flex-col justify-between cursor-text"
    >
      {/* Visual top bar of terminal window */}
      <div className="flex justify-between items-center pb-3 border-b border-white/10 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
          <span className="ml-2 font-semibold text-[10px] tracking-wider text-on-surface-variant">alex_thorne@sys-uplink: ~</span>
        </div>
        <div className="text-[10px] text-terminal-green uppercase animate-pulse">
          • ONLINE_LINK_ESTABLISHED
        </div>
      </div>

      {/* Terminal History viewport */}
      <div className="flex-1 overflow-y-auto py-4 space-y-1.5 scrollbar-thin">
        {history.map((line, index) => {
          let colorClass = "text-on-surface";
          if (line.type === "green") colorClass = "text-terminal-green";
          if (line.type === "dim") colorClass = "text-on-surface-variant opacity-60";
          if (line.type === "white") colorClass = "text-white font-semibold";
          if (line.type === "red") colorClass = "text-red-400";
          if (line.type === "yellow") colorClass = "text-yellow-400";
          
          if (line.isCmd) colorClass = "text-white font-medium";

          return (
            <div key={index} className="leading-relaxed whitespace-pre-wrap">
              <span className={colorClass}>{line.text}</span>
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Line Input */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/5 bg-black/20">
        <span className="text-terminal-green font-bold select-none">&gt;</span>
        <input 
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 outline-none caret-transparent"
          placeholder="Type 'help' to query developer nodes or experience records..."
          maxLength={80}
        />
        {/* Blinking block cursor simulation */}
        <span className="cursor-blink text-terminal-green font-bold h-4 w-2 relative -left-2 top-[1px]">█</span>
      </div>
    </div>
  );
}
