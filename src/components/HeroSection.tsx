import { ChevronRight, ArrowUpRight } from "lucide-react";
import { ProfileSkeleton } from "./Skeletons";

interface HeroSectionProps {
  ownerActive: boolean;
  ownerData: any;
  pipelineLogs: string[];
  scrollToSection: (id: string) => void;
  onOpenResume: () => void;
  onLogAdd: (msg: string) => void;
  latestTerminalLog: any;
  projectsList: any[];
  experiencesList: any[];
  skillsList: any[];
}

export default function HeroSection({
  ownerActive,
  ownerData,
  pipelineLogs,
  scrollToSection,
  onOpenResume,
  onLogAdd,
  latestTerminalLog,
  projectsList,
  experiencesList,
  skillsList,
}: HeroSectionProps) {
  return (
    <section id="system-core" className="scroll-mt-28 w-full">
      <div className="grid grid-cols-1 gap-8 w-full items-stretch">
        {/* Left Column: Full-Width Minimalist Bio Block */}
        <div className="lg:col-span-7 glass-panel p-6 md:p-12 flex flex-col justify-between rounded-sm relative min-h-[460px]">
          {/* Corner Tag */}
          <div className="mb-6 flex justify-between items-center select-none opacity-60">
            <span className="font-mono text-[10px] tracking-widest text-[#bcbbc5] uppercase">SYSTEM_CORE_VIEWPORT // SPEC_INFO</span>
            <span className="font-mono text-[10px] text-terminal-green">[ STATUS: {ownerActive ? "ACTIVE_NODE" : "ALIGNED_LOADING"} ]</span>
          </div>
          <hr className="border-[#2A2A2A]/20 mb-8" />

          {!ownerActive || !ownerData ? (
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
                  {ownerData.title.toUpperCase()}
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] leading-[1.1] tracking-tight text-white uppercase font-bold">
                  BUILDING THE <span className="text-black bg-white px-2 italic">BLUEPRINTS</span> FOR RESPONSIVE <br/>WEB SYSTEMS.
                </h1>
              </div>

              <p className="font-sans text-base md:text-lg text-[#bcbbc5] max-w-3xl font-light leading-relaxed">
                {ownerData.bio}
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
                    onOpenResume();
                    onLogAdd("TRIGGER // RESUME_COMPILER");
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
          {ownerActive && ownerData && (
            <div className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-t border-white/5 pt-4 opacity-50 select-none">
              <div className="font-mono text-[10px] text-terminal-green">
                [ STATUS: ENCRYPTED_AND_LIVE ]
              </div>
              <div className="font-mono text-[10px] text-right max-sm:text-left leading-tight">
                LOC: {ownerData.location.toUpperCase()}<br />
                LAST_COMPILED_TELEMETRY: v1.0.4
              </div>
            </div>
          )}
        </div>


      </div>
    </section>
  );
}
