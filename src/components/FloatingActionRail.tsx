interface FloatingActionRailProps {
  scrollToSection: (id: string) => void;
  onOpenResume: () => void;
  onLogAdd: (msg: string) => void;
}

export default function FloatingActionRail({
  scrollToSection,
  onOpenResume,
  onLogAdd,
}: FloatingActionRailProps) {
  return (
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
            onOpenResume();
            onLogAdd("ACCENT_RAIL // RESUME_COMPILER");
          }}
          className="material-symbols-outlined text-[18px] text-white/50 hover:text-white cursor-pointer transition-colors"
          title="COMPILE RESUME"
        >
          description
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
  );
}
