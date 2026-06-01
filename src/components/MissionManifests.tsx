export default function MissionManifests() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-panel p-6 rounded-sm border-t-2 border-white flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center font-mono text-[10px] opacity-40 select-none">
            <span>[ MANIFEST // 01 ]</span>
            <span className="text-terminal-green animate-pulse">TELEMETRY_LINK_ESTABLISHED</span>
          </div>
          <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">MISSION_INTEGRITY</h3>
          <p className="font-sans text-xs md:text-sm text-[#bcbbc5]/80 leading-relaxed text-justify">
            Empowering next-generation full stack interfaces with rigorous low-latency architectures, robust test coverage pipelines, and transparent peer systems reviews.
          </p>
        </div>
        <div className="font-mono text-[9px] text-[#bcbbc5]/20 mt-6 select-none">[ SYSTEM_CHECK_OK ]</div>
      </div>

      <div className="glass-panel p-6 rounded-sm border-t-2 border-white/20 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center font-mono text-[10px] opacity-40 select-none">
            <span>[ MANIFEST // 02 ]</span>
            <span className="text-terminal-green">CIPHER_HANDSHAKE_STABLE</span>
          </div>
          <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">ARCHITECTURAL_HONESTY</h3>
          <p className="font-sans text-xs md:text-sm text-[#bcbbc5]/80 leading-relaxed text-justify">
            Rejecting superficial UI templates in favor of bespoke layout hierarchies, clean pixel ratios, and performance benchmarks that truly satisfy complex browser configurations.
          </p>
        </div>
        <div className="font-mono text-[9px] text-[#bcbbc5]/20 mt-6 select-none">[ SYSTEM_STATE_COMPILING ]</div>
      </div>

      <div className="glass-panel p-6 rounded-sm border-t-2 border-white/20 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center font-mono text-[10px] opacity-40 select-none">
            <span>[ MANIFEST // 03 ]</span>
            <span className="text-terminal-green">DECRYPTION_STACKS_PASS</span>
          </div>
          <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">CORE_SENSORS_STREAMS</h3>
          <p className="font-sans text-xs md:text-sm text-[#bcbbc5]/80 leading-relaxed text-justify">
            Actively engineering real integrations with decentralized networks, relational frameworks, state protocols, and high frequency telemetry interfaces.
          </p>
        </div>
        <div className="font-mono text-[9px] text-[#bcbbc5]/20 mt-6 select-none">[ DECRYPTION_VERIFIED_DONE ]</div>
      </div>
    </section>
  );
}
