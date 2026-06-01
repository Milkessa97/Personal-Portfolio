import { useRef } from "react";
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
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { SkillGroup } from "../types";
import { SkillCardSkeleton } from "./Skeletons";

interface SkillsCarouselProps {
  skillsActive: boolean;
  skillsList: SkillGroup[];
  onLogAdd: (msg: string) => void;
}

export default function SkillsCarousel({
  skillsActive,
  skillsList,
  onLogAdd,
}: SkillsCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Scroll carousel elements smoothly
  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollAmount = container.clientWidth * 0.85;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
      onLogAdd(`CAROUSEL_SCROLL // DIR: ${direction.toUpperCase()}`);
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

  return (
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
  );
}
