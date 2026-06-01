import { WorkExperience } from "../types";
import { ExperienceTimelineSkeleton } from "./Skeletons";

interface ExperienceTimelineProps {
  experiencesActive: boolean;
  experiencesList: WorkExperience[];
}

export default function ExperienceTimeline({
  experiencesActive,
  experiencesList,
}: ExperienceTimelineProps) {
  return (
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
          <div className="relative p-8 md:p-12 border-l border-white/10 space-y-12 max-w-full">
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
                  <div className="space-y-1 max-w-3xl">
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
  );
}
