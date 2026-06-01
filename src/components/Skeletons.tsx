// High-Tech Skeleton Loaders for each section block

export function ProfileSkeleton() {
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

export function ProjectCardSkeleton() {
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

export function SkillCardSkeleton() {
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

export function ExperienceTimelineSkeleton() {
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
