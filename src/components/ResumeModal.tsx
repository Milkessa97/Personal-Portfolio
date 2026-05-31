import React, { useRef } from "react";
import { PORTFOLIO_OWNER, PROJECTS, WORK_EXPERIENCES, SKILL_GROUPS } from "../data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = resumeRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Resume - ${PORTFOLIO_OWNER.name}</title>
              <style>
                body {
                  font-family: 'Inter', sans-serif;
                  color: #000;
                  background: #fff;
                  padding: 40px;
                  line-height: 1.5;
                }
                .header { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 24px; }
                .name { font-size: 28px; font-weight: bold; text-transform: uppercase; margin: 0; }
                .title { font-size: 16px; color: #555; margin: 4px 0 0 0; font-weight: 500; }
                .contact { font-size: 11px; margin-top: 8px; color: #333; display: flex; gap: 16px; flex-wrap: wrap; }
                .section { margin-top: 24px; }
                .section-title { font-size: 14px; font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
                .bio { font-size: 12px; color: #333; margin-bottom: 16px; }
                .experience-item { margin-bottom: 16px; }
                .job-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; }
                .company { color: #555; font-style: italic; font-weight: normal; }
                .period { font-weight: normal; font-size: 11px; color: #666; }
                .details { font-size: 11.5px; color: #222; margin-top: 4px; padding-left: 16px; }
                .details li { margin-bottom: 4px; }
                .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
                .skill-cat { font-weight: bold; font-size: 12px; margin-bottom: 4px; }
                .skill-list { font-size: 11px; color: #444; }
                @media print {
                  body { padding: 0; }
                  @page { margin: 1.5cm; }
                }
              </style>
            </head>
            <body>
              ${printContent}
              <script>
                window.onload = function() {
                  window.print();
                  window.close();
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl max-h-[85vh] bg-[#161616] border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.08)] flex flex-col rounded-md overflow-hidden"
        id="resume-modal-view"
      >
        {/* Border Top highlight */}
        <div className="h-1 bg-white w-full"></div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-terminal-green text-sm">terminal</span>
            <span className="font-label-caps text-xs tracking-wider text-on-surface">VIRTUAL_RESUME // DOCUMENT_SYSTEM</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#e2e2e2] text-[#131313] font-mono text-xs font-semibold rounded-sm active:scale-95 transition-all outline-none"
            >
              <span className="material-symbols-outlined text-xs">print</span>
              PRINT_TO_PDF
            </button>
            <button 
              onClick={onClose}
              className="flex items-center justify-center w-6 h-6 border border-white/20 hover:border-white hover:bg-white/5 font-mono text-xs text-on-surface-variant hover:text-white transition-colors"
            >
              ╳
            </button>
          </div>
        </div>

        {/* Printable Section Ref */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 text-black bg-white" ref={resumeRef}>
          <div className="max-w-3xl mx-auto font-sans text-xs leading-relaxed">
            {/* Header / Brand */}
            <div className="border-b-2 border-black pb-4">
              <h1 className="text-3xl font-bold uppercase tracking-tight m-0">{PORTFOLIO_OWNER.name}</h1>
              <p className="text-sm text-gray-600 font-medium tracking-wide mt-1 uppercase">{PORTFOLIO_OWNER.title}</p>
              
              <div className="mt-4 flex flex-wrap gap-y-1 gap-x-4 text-[10.5px] text-gray-700">
                <span className="flex items-center gap-1">📍 {PORTFOLIO_OWNER.location}</span>
                <span className="flex items-center gap-1">✉️ {PORTFOLIO_OWNER.email}</span>
                <span className="flex items-center gap-1">📞 {PORTFOLIO_OWNER.phone}</span>
                <span className="flex items-center gap-1">💻 github.com/alexthorne-dev</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mt-6">
              <div className="text-[12px] font-bold border-b border-gray-300 pb-1 text-black uppercase tracking-wider mb-2.5">
                Summary
              </div>
              <p className="text-gray-800 text-[11.5px] leading-relaxed">
                {PORTFOLIO_OWNER.bio}
              </p>
            </div>

            {/* Professional Experience */}
            <div className="mt-6">
              <div className="text-[12px] font-bold border-b border-gray-300 pb-1 text-black uppercase tracking-wider mb-3">
                Experience
              </div>
              
              <div className="space-y-5">
                {WORK_EXPERIENCES.map((job) => (
                  <div key={job.id} className="experience-item">
                    <div className="flex justify-between font-bold text-[11.5px]">
                      <span>
                        {job.role} <span className="text-gray-500 font-normal">at</span> <span className="font-semibold text-gray-800">{job.company}</span>
                      </span>
                      <span className="text-gray-600 text-[10.5px] font-normal">{job.period}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 italic mt-0.5">📍 {job.location}</div>
                    <p className="text-gray-700 mt-1.5 font-medium text-[11px]">{job.description}</p>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1 text-gray-800 text-[11px]">
                      {job.highlights.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Projects */}
            <div className="mt-6">
              <div className="text-[12px] font-bold border-b border-gray-300 pb-1 text-black uppercase tracking-wider mb-3">
                Selected Software Implementations
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map((project) => (
                  <div key={project.id} className="border border-gray-200 p-3 rounded-sm">
                    <div className="font-bold text-[11px] tracking-tight uppercase flex justify-between">
                      <span>{project.title}</span>
                      <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono font-normal">
                        {project.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono mt-1 italic">
                      {project.tags.join(" • ")}
                    </div>
                    <p className="text-[10.5px] text-gray-700 mt-1.5 leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Skills */}
            <div className="mt-6">
              <div className="text-[12px] font-bold border-b border-gray-300 pb-1 text-black uppercase tracking-wider mb-3">
                Technical Knowledge Grid
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILL_GROUPS.map((group, index) => (
                  <div key={index}>
                    <div className="font-bold text-[11px] text-gray-800 uppercase mb-1">{group.category}</div>
                    <div className="text-[10.5px] text-gray-700">
                      {group.items.map((item) => (
                        <div key={item.name} className="mb-0.5">
                          <span className="font-semibold">{item.name}:</span> {item.info}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education / Info */}
            <div className="mt-6 border-t-2 border-black pt-4 flex justify-between text-[10px] text-gray-500 uppercase font-semibold">
              <span>B.S. Software Engineering // University College Grid</span>
              <span>Generated in NeoTerminal Pipeline v1.0.4-STABLE</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="font-mono text-[10px] text-on-surface-variant/40">
            © 2026 {PORTFOLIO_OWNER.name} // PRESS PRINT_TO_PDF TO EMULATE DOCUMENT DOWNLOAD
          </span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 border border-white/20 hover:border-white text-on-surface hover:bg-white/5 font-mono text-xs rounded-sm active:scale-[0.98] transition-all"
          >
            CLOSE_MODULE
          </button>
        </div>
      </div>
    </div>
  );
}
