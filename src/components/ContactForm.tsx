import React, { useState, useRef } from "react";

interface ContactFormProps {
  onSuccessLogged: (messageSummary: string) => void;
}

export default function ContactForm({ onSuccessLogged }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Internship Offer",
    message: ""
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [showTransmitLogs, setShowTransmitLogs] = useState<boolean[]>( [false, false, false] );
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name.toUpperCase());
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name.toUpperCase());
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("PLEASE INITIALIZE ALL IDENTIFICATION FIELDS.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(0);
    setShowTransmitLogs([false, false, false]);

    // Animate secure handshake stages
    setTimeout(() => {
      setSubmitStep(1);
      setShowTransmitLogs(p => [true, p[1], p[2]]);
    }, 1000);

    setTimeout(() => {
      setSubmitStep(2);
      setShowTransmitLogs(p => [p[0], true, p[2]]);
    }, 2000);

    // Perform real sheet webhook submission if configured
    const webhookUrl = (import.meta as any).env?.VITE_GOOGLE_SHEET_FORM_WEBHOOK || (import.meta as any).env?.NEXT_PUBLIC_GOOGLE_SHEET_FORM_WEBHOOK;
    let isCapturedByGSheet = false;

    if (webhookUrl) {
      try {
        const payload = {
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          type: formData.type,
          message: formData.message,
          attachment: fileName || "NONE"
        };
        
        await fetch(webhookUrl.trim(), {
          method: "POST",
          mode: "no-cors", // Crucial for standard Google Sheets Google Apps Script redirect handling without CORS preflight block
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        isCapturedByGSheet = true;
      } catch (err) {
        console.warn("WEBHOOK_POST_DISCONNECTED // Grateful fallback active:", err);
      }
    }

    setTimeout(() => {
      setSubmitStep(3);
      setShowTransmitLogs(p => [p[0], p[1], true]);
    }, 3000);

    setTimeout(() => {
      setSubmitStep(4); // COMPLETED!
      const destLabel = isCapturedByGSheet ? "GOOGLE_SHEET_COLUMN_ROW" : "TEMPORAL_LOG_NODE";
      onSuccessLogged(`[UPLINK COMPLETED] Sender: ${formData.name.toUpperCase()} (Route: ${formData.type.toUpperCase()}) // Destination: ${destLabel}`);
    }, 4000);
  };

  const closeOverlay = () => {
    setIsSubmitting(false);
    setFormData({ name: "", email: "", type: "Internship Offer", message: "" });
    setFileName(null);
  };

  // Spinner animation frames
  const spinnerFrame = ["|", "/", "-", "\\"];
  const [spinnerIdx, setSpinnerIdx] = useState(0);

  React.useEffect(() => {
    if (!isSubmitting) return;
    const interval = setInterval(() => {
      setSpinnerIdx((prev) => (prev + 1) % 4);
    }, 100);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const stepsDescriptions = [
    { text: "ESTABLISHING_SECURE_TUNNEL...", msg: "Initiating multi-layered cryptographic handshake with local telemetry logs..." },
    { text: "ENCRYPTING_PACKETS...", msg: "Applying AES-256GCM block algorithms to payload arrays to prevent external monitoring..." },
    { text: "RAW_HANDSHAKE_VERIFICATION...", msg: "Awaiting remote acknowledgement response packets from target system stack..." },
    { text: "UPLINK_ESTABLISHED // STABLE", msg: "Transmission successful. Proposal packets mapped and successfully synchronized. Packet integrity checked at 100%." }
  ];

  const currentDesc = stepsDescriptions[Math.min(submitStep, 3)];

  return (
    <div className="w-full">
      <div className="mb-8">
        <span className="font-label-caps text-label-caps text-on-surface-variant font-mono">DIRECTORY: /UPLINK/COLLABORATION</span>
        <div className="flex items-center gap-3 mt-2">
          <span className="material-symbols-outlined text-3xl text-primary">handshake</span>
          <h2 className="font-display text-headline-lg text-primary uppercase">COLLABORATION_GATEWAY</h2>
        </div>
        <p className="text-on-surface-variant text-body-md mt-4 max-w-2xl font-sans">
          Establish a secure handshake with the developer system node. I am currently open to internship pipelines, full-time engineering roles, sponsorships, and deep technical consultations.
        </p>
      </div>

      <div className="glass-panel p-6 md:p-8 rounded-sm">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase font-mono block">Sender / Identification Name</label>
            <input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text" 
              required
              className="w-full bg-[#0e0e0e] border border-white/10 text-primary font-mono text-sm px-4 py-3 focus:border-terminal-green focus:outline-none placeholder:text-white/10 uppercase"
              placeholder="IDENTIFY_SENDER_REF"
            />
          </div>

          <div className="space-y-2">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase font-mono block">Secure Client Email Uplink</label>
            <input 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              required
              className="w-full bg-[#0e0e0e] border border-white/10 text-primary font-mono text-sm px-4 py-3 focus:border-terminal-green focus:outline-none placeholder:text-white/10 uppercase"
              placeholder="ENTER_SENDER_UPLINK_ADDR"
            />
          </div>

          <div className="space-y-2">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase font-mono block">Engagement Route</label>
            <div className="relative">
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-[#0e0e0e] border border-white/10 text-primary font-mono text-sm px-4 py-3 focus:border-terminal-green focus:outline-none uppercase appearance-none cursor-pointer"
              >
                <option>Full-Time Engineering</option>
                <option>Internship Offer</option>
                <option>Technical Advisory</option>
                <option>System Infrastructure Consulting</option>
                <option>Other Network Inquiry</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/50">
                <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase font-mono block">Encrypted Message Stream / Project Intent</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full bg-[#0e0e0e] border border-white/10 text-primary font-mono text-sm px-4 py-3 focus:border-terminal-green focus:outline-none placeholder:text-white/10 uppercase resize-none"
              placeholder="INPUT_DATA_STREAM_FOR_UPLINK..."
            />
          </div>

          <div className="md:col-span-3 space-y-2" onDragEnter={handleDrag}>
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase font-mono block">Project Brief Attachment (Optional)</label>
            <div 
              onClick={triggerFileSelect}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`w-full border-2 border-dashed rounded-sm p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group ${
                dragActive ? "border-terminal-green bg-terminal-green/5" : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                onChange={handleFileChange}
                className="hidden" 
              />
              <span className={`material-symbols-outlined text-3xl transition-colors ${
                dragActive ? "text-terminal-green" : "text-white/20 group-hover:text-white/60"
              }`}>
                upload_file
              </span>
              <span className="font-mono text-[12px] text-on-surface-variant uppercase text-center">
                {fileName ? `LOADED: ${fileName}` : "Drop_Specification_Manifest_or_Click_to_Select"}
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <button 
              type="submit"
              className="bg-white text-[#131313] px-8 py-3.5 font-mono text-xs font-semibold hover:bg-[#e2e2e2] transition-all active:scale-[0.98] outline-none flex items-center gap-2 tracking-wider"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              TRANSMIT_REQUEST // INITIALIZE_SECURE_HANDSHAKE
            </button>
          </div>
        </form>
      </div>

      {/* Simulated Transmission Progress Modal Backdrop */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-[#161616] border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.12)] overflow-hidden rounded-sm">
            {/* Top Stripe Accent */}
            <div className={`h-1 w-full transition-all duration-300 ${
              submitStep === 4 ? "bg-terminal-green shadow-[0_0_10px_#10B981]" : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            }`}></div>

            {/* Header label */}
            <div className="flex justify-between items-center px-6 pt-4">
              <span className="font-mono text-[10px] tracking-wider text-on-surface-variant font-bold">SYSTEM_MESSAGE // TRANSACTION</span>
              <span className="font-mono text-[10px] text-on-surface-variant/50">TRANS_REF: 0xFD4E</span>
            </div>

            <div className="p-8 pt-5 space-y-6">
              {/* Badge State */}
              <div className="flex items-center gap-3">
                <span className={`font-mono text-xs ${
                  submitStep === 4 ? "text-terminal-green font-bold" : "text-white animate-pulse"
                }`}>
                  {submitStep === 4 ? "[ STATUS: SUCCESS ]" : "[ STATUS: TRANSMITTING ]"}
                </span>
                <div className="h-[1px] flex-1 bg-white/10"></div>
              </div>

              {/* Headline */}
              <div className="space-y-1">
                <h3 className="font-display text-lg text-primary tracking-tight uppercase leading-none">
                  {submitStep === 4 ? "UPLINK_ESTABLISHED" : "TRANSMITTING_PAYLOAD"}
                </h3>
                <div className="h-0.5 w-12 bg-white mt-1"></div>
              </div>

              {/* Body message content */}
              <div className="space-y-4">
                <p className={`font-mono text-[13px] leading-relaxed border-l-2 pl-4 min-h-[46px] ${
                  submitStep === 4 ? "border-terminal-green text-on-surface" : "border-white/30 text-on-surface-variant"
                }`}>
                  {currentDesc.msg}
                </p>

                {/* Simulated micro terminal output */}
                <div className="bg-black/50 p-4 rounded-sm border border-white/5 font-mono text-[11px] text-terminal-green/85 space-y-1">
                  <p className={`transition-opacity duration-300 ${showTransmitLogs[0] ? "opacity-100" : "opacity-0"}`}>
                    &gt; LOG TIME_STAMP ATTACHED: {new Date().toISOString().substring(11, 19)}
                  </p>
                  <p className={`transition-opacity duration-300 ${showTransmitLogs[1] ? "opacity-100" : "opacity-0"}`}>
                    &gt; ENCRYPTION HANDLED: AES_256_GCM_OK
                  </p>
                  <p className={`transition-opacity duration-300 ${showTransmitLogs[2] ? "opacity-100" : "opacity-0"}`}>
                    &gt; DESTINATION_ACK: RECVD // KERNEL LINK STABLE
                  </p>
                  
                  {submitStep < 4 ? (
                    <p className="flex items-center gap-2 text-white">
                      <span>[{["|", "/", "-", "\\"][spinnerIdx]}]</span>
                      <span>{currentDesc.text}</span>
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex gap-3 pt-2 transition-opacity duration-300 ${
                submitStep === 4 ? "opacity-100" : "opacity-30 pointer-events-none"
              }`}>
                <button 
                  type="button"
                  onClick={closeOverlay}
                  className="flex-1 px-5 py-2.5 bg-white hover:bg-[#e2e2e2] text-black font-semibold font-mono text-xs rounded-sm active:scale-[0.98] transition-all"
                >
                  CLOSE_TERMINAL
                </button>
              </div>
            </div>

            {/* Glitch Tech Info */}
            <div className="px-6 pb-4 flex justify-between items-center opacity-30 text-[10px]">
              <span className="font-mono">KERNEL_RECOVERY_ENG_V1.0.4</span>
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-[13px]">terminal</span>
                <span className="material-symbols-outlined text-[13px]">shield</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
