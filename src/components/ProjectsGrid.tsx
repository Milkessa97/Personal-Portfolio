import { motion, AnimatePresence } from "motion/react";
import { Database, Sliders, Globe, Shield, Github, ArrowUpRight } from "lucide-react";
import { Project } from "../types";
import { ProjectCardSkeleton } from "./Skeletons";

interface ProjectsGridProps {
  projectsActive: boolean;
  projectsList: Project[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLogAdd: (msg: string) => void;
}

export default function ProjectsGrid({
  projectsActive,
  projectsList,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onLogAdd,
}: ProjectsGridProps) {
  // Filter project listing
  const currentProjectsSource = projectsActive ? projectsList : [];
  const filteredProjects = currentProjectsSource.filter((project) => {
    const matchesCategory = activeCategory === "ALL" || project.category.toUpperCase() === activeCategory.toUpperCase();
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
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
                onLogAdd(`FILTER // CAT: ${cat.toUpperCase()}`);
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
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 select-none">
                        {p.githubUrl && (
                          <a 
                            href={p.githubUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={() => onLogAdd(`GITHUB_OPEN // ${p.id}`)}
                            className="w-7 h-7 border border-white/10 hover:border-white rounded-sm flex items-center justify-center text-[#bcbbc5] hover:text-white transition-colors"
                          >
                            <Github className="w-4 h-4 md:w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2 select-none">
                        {p.liveUrl && (
                          <a 
                            href={p.liveUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={() => onLogAdd(`GITHUB_OPEN // ${p.id}`)}
                            className="w-7 h-7 border border-white/10 hover:border-white rounded-sm flex items-center justify-center text-[#bcbbc5] hover:text-white transition-colors"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                          )}
                      </div>
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
      {projectsActive && filteredProjects.length === 0 && (
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
  );
}
