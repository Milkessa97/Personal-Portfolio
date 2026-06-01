interface FooterProps {
  ownerName: string;
  githubUrl: string;
  linkedinUrl: string;
  telegramUrl: string;
  onLogAdd: (msg: string) => void;
  scrollToSection: (id: string) => void;
}

export default function Footer({
  ownerName,
  githubUrl,
  linkedinUrl,
  telegramUrl,
  onLogAdd,
  scrollToSection,
}: FooterProps) {
  return (
    <footer className="w-full border-t border-white/5 py-12 bg-black/40 relative z-40">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col items-center gap-6">
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-mono text-[10px] text-[#bcbbc5]/60 uppercase tracking-widest select-none">
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noreferrer" 
            onClick={() => onLogAdd("NAV // GITHUB_LINK_FOOTER")}
            className="hover:text-white transition-colors"
          >
            [ GITHUB_CODE ]
          </a>
          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noreferrer" 
            onClick={() => onLogAdd("NAV // LINKEDIN_LINK_FOOTER")}
            className="hover:text-white transition-colors"
          >
            [ LINKEDIN_NODE ]
          </a>
          <a 
            href={telegramUrl} 
            target="_blank" 
            rel="noreferrer" 
            onClick={() => onLogAdd("NAV // TG_LINK_FOOTER")}
            className="hover:text-white transition-colors"
          >
            [ TELEGRAM_UPLINK ]
          </a>
          <span className="text-white/10 font-bold max-sm:hidden">|</span>
          <button 
            onClick={() => scrollToSection("system-core")}
            className="hover:text-white underline decoration-dotted outline-none cursor-pointer"
          >
            [ LOC_UP() ]
          </button>
          <span className="hover:text-white cursor-pointer select-none">
            NET_V1.0.4-STABLE
          </span>
        </div>

        <div className="font-mono text-[10px] text-white/30 text-center select-none uppercase">
          © 2026 {ownerName.toUpperCase()}. ALL RIGHTS REPORTED IN CORE MATRIX. // ARCHITECTURE BY HANDSHAKE PROTOCOLS.
        </div>
      </div>
    </footer>
  );
}
