export default function MetricsSection() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <div className="glass-panel p-6 text-center rounded-sm hover:border-[#10B981]/30 transition-all cursor-default select-none group">
        <span className="font-mono text-[10px] text-[#bcbbc5] tracking-widest block mb-1">DSA_SOLVED_CHALLENGES</span>
        <span className="font-display text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform block">450+</span>
        <span className="font-mono text-[9px] text-[#bcbbc5]/40 uppercase mt-2 block">[ PROBLEMS ACROSS SITES ]</span>
      </div>

      <div className="glass-panel p-6 text-center rounded-sm hover:border-[#10B981]/30 transition-all cursor-default select-none group">
        <span className="font-mono text-[10px] text-[#bcbbc5] tracking-widest block mb-1">GRAPH_DP_MODULES</span>
        <span className="font-display text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform block">15+</span>
        <span className="font-mono text-[9px] text-[#bcbbc5]/40 uppercase mt-2 block">[ TRAVERSALS & STATE MODELS ]</span>
      </div>

      <div className="glass-panel p-6 text-center rounded-sm hover:border-[#10B981]/30 transition-all cursor-default select-none group">
        <span className="font-mono text-[10px] text-[#bcbbc5] tracking-widest block mb-1">AVG_COMPLEXITY_TARGET</span>
        <span className="font-display text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform block">O(N log N)</span>
        <span className="font-mono text-[9px] text-[#bcbbc5]/40 uppercase mt-2 block">[ OPTIMAL CONSTRAINT GUARANTEE ]</span>
      </div>

      <div className="glass-panel p-6 text-center rounded-sm hover:border-white/30 transition-all cursor-default select-none group border-white/20">
        <span className="font-mono text-[10px] text-terminal-green tracking-widest block mb-1">COMPETITIVE_RATING</span>
        <span className="font-display text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform block">1650+</span>
        <span className="font-mono text-[9px] text-terminal-green/50 uppercase mt-2 block">[ ACTIVE PARTICIPATION LEVEL ]</span>
      </div>
    </section>
  );
}
