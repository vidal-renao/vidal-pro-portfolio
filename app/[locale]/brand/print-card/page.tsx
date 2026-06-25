"use client";
import React from "react";
import BrandLogo from "@/components/BrandLogo";
import NetworkMesh from "@/components/NetworkMesh";
import VectorQR from "@/components/VectorQR";
import PrintTrigger from "@/components/ui/PrintTrigger";

// Icons matching the brand kit dashboard
const ShieldIcon = () => (
  <svg className="w-[22px] h-[22px] text-[#00A3E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const AutomationIcon = () => (
  <svg className="w-[22px] h-[22px] text-[#00A3E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-1.41m12.095-4.95l1.414-1.414M12 17.25V21m0-21v3.75m-3.077 8.457l-1.41 1.41m12.096 4.95l-1.414 1.414" />
  </svg>
);

const WorkplaceIcon = () => (
  <svg className="w-[22px] h-[22px] text-[#00A3E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const SaaSIcon = () => (
  <svg className="w-[22px] h-[22px] text-[#00A3E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const PinIcon = ({ className = "w-3 h-3" }) => (
  <svg className={`${className} text-[#00A3E0]`} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742c1.002-.722 2.607-2.037 3.864-4.19C19.12 14.545 20 12.003 20 9.5a8.001 8.001 0 00-16 0c0 2.503.88 5.045 2.535 7.91 1.257 2.153 2.862 3.468 3.864 4.19a16.975 16.975 0 001.14-.742zM12 12.75a3.25 3.25 0 100-6.5 3.25 3.25 0 000 6.5z" clipRule="evenodd" />
  </svg>
);

export default function PrintCardPage({ searchParams }: { searchParams: Promise<{ side?: string }> }) {
  const { side = "both" } = React.use(searchParams);

  const showFront = side === "front" || side === "both";
  const showBack = side === "back" || side === "both";

  return (
    <>
      <PrintTrigger />
      <div className="min-h-screen bg-[#2c313c] print:bg-transparent flex flex-col items-center justify-center p-8 gap-8 print:p-0 print:gap-0 select-none">
        {/* Floating Print Command Help */}
        <div className="print:hidden text-center max-w-md bg-[#111827]/90 text-white rounded-lg p-5 border border-gray-800 shadow-xl space-y-3">
          <h2 className="font-extrabold text-[#00A3E0] uppercase tracking-wide">
            Print Preview Mode
          </h2>
          <p className="text-xs text-gray-400">
            A print command has been triggered automatically. If blocked, press <kbd className="bg-gray-800 px-1 py-0.5 rounded text-white border border-gray-700">Ctrl + P</kbd> or <kbd className="bg-gray-800 px-1 py-0.5 rounded text-white border border-gray-700">Cmd + P</kbd> to save as PDF.
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-[#00A3E0] hover:bg-[#0082b3] rounded text-xs font-bold transition-all animate-none"
            >
              Trigger Print Dialog
            </button>
            <button
              onClick={() => window.close()}
              className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-xs font-bold transition-all text-gray-300"
            >
              Close Tab
            </button>
          </div>
        </div>

        {/* FRONT CARD CONTAINER */}
        {showFront && (
          <div className="card-print-page relative w-[85mm] h-[55mm] bg-[#111827] text-white flex flex-col justify-between p-[6%] shadow-2xl print:shadow-none overflow-hidden select-none">
            {/* Network Mesh background overlay */}
            <NetworkMesh className="absolute right-[-4%] top-0 h-full w-[45%] object-cover object-right opacity-45" />

            {/* Main Card Content Grid */}
            <div className="flex-1 grid grid-cols-[30%_1px_69%] items-center relative z-10">
              {/* Left Column: Logo */}
              <div className="pr-4 flex justify-start">
                <BrandLogo size="md" className="w-full h-auto max-w-[80px]" />
              </div>

              {/* Vertical Divider */}
              <div className="h-[75%] bg-gray-700/80" />

              {/* Right Column: Name & Title */}
              <div className="pl-5 flex flex-col justify-center">
                <h1 className="text-[20px] font-black text-white tracking-tight leading-none mb-1">
                  Vidal Reñao Lopelo
                </h1>
                <div className="w-10 h-0.5 bg-[#00A3E0] mb-2.5" />
                <div className="text-[9px] font-extrabold text-[#00A3E0] tracking-wider uppercase mb-0.5">
                  AI-Powered
                </div>
                <div className="text-[10.5px] font-bold text-gray-200 tracking-widest uppercase mb-2">
                  Infrastructure Architect
                </div>
                <div className="text-[7.5px] font-medium text-gray-400 tracking-wide">
                  Modern Workplace • Enterprise Automation • SaaS
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800/80 pt-2 flex items-center justify-between text-[7.5px] font-semibold text-gray-400 tracking-widest uppercase relative z-10">
              <div className="flex items-center gap-1">
                <PinIcon className="w-2.5 h-2.5" />
                <span>Basel • Switzerland • DACH</span>
              </div>
            </div>
          </div>
        )}

        {/* BACK CARD CONTAINER */}
        {showBack && (
          <div className="card-print-page relative w-[85mm] h-[55mm] bg-[#111827] text-white flex flex-col justify-between p-[6%] shadow-2xl print:shadow-none overflow-hidden select-none">
            {/* Tiny mesh corner decoration */}
            <NetworkMesh className="absolute right-[33%] top-[-20%] h-[60%] w-auto opacity-20 rotate-45" />

            {/* Main Card Content */}
            <div className="flex-1 grid grid-cols-[68%_1px_31%] items-center mb-2">
              {/* Left Column: Services */}
              <div className="pr-4">
                <div className="mb-2.5">
                  <span className="text-[8.5px] font-bold text-[#00A3E0] tracking-widest uppercase">
                    Core Services
                  </span>
                  <div className="w-8 h-0.5 bg-[#00A3E0] mt-0.5" />
                </div>

                {/* Services Grid (4 columns) */}
                <div className="grid grid-cols-4 gap-1.5">
                  <div className="flex flex-col items-center text-center">
                    <ShieldIcon />
                    <span className="text-[5.5px] font-bold text-white mt-1 leading-tight uppercase">ENTERPRISE INFRA</span>
                    <span className="text-[4.5px] text-gray-400 mt-0.5 leading-tight">Secure, scalable business systems.</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <AutomationIcon />
                    <span className="text-[5.5px] font-bold text-white mt-1 leading-tight uppercase">AI AUTOMATION</span>
                    <span className="text-[4.5px] text-gray-400 mt-0.5 leading-tight">Efficient workflows, less manual work.</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <WorkplaceIcon />
                    <span className="text-[5.5px] font-bold text-white mt-1 leading-tight uppercase">MODERN WORKPLACE</span>
                    <span className="text-[4.5px] text-gray-400 mt-0.5 leading-tight">Secure teams, cloud collaboration.</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <SaaSIcon />
                    <span className="text-[5.5px] font-bold text-white mt-1 leading-tight uppercase">SAAS ARCHITECTURE</span>
                    <span className="text-[4.5px] text-gray-400 mt-0.5 leading-tight">Platforms from idea to production.</span>
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="h-[80%] bg-gray-700/80" />

              {/* Right Column: Contact & QR */}
              <div className="pl-4 flex flex-col items-center justify-center">
                <VectorQR size={56} className="mb-1.5 p-1 bg-gray-900 border-gray-800" />
                <div className="w-full text-[5px] font-medium text-gray-300 space-y-0.5 leading-none">
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#00A3E0] font-bold">+</span>
                    <span>+41 77 972 62 99</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#00A3E0] font-bold">@</span>
                    <span className="truncate">vidalrenao.lab@outlook.com</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#00A3E0] font-bold">www</span>
                    <span className="truncate">vidal-pro-portfolio.vercel.app</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#00A3E0] font-bold">in</span>
                    <span className="truncate">linkedin.com/in/vidalrenao</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Centered Slogan */}
            <div className="text-[6.5px] font-bold text-gray-400 tracking-[0.4em] text-center uppercase border-t border-gray-800/80 pt-2">
              Secure. Automate. Scale.
            </div>
          </div>
        )}
      </div>

      {/* Print styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          html, body {
            background: transparent !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .min-h-screen {
            min-height: 0 !important;
            background: transparent !important;
            padding: 0 !important;
          }
          @page {
            size: 85mm 55mm;
            margin: 0;
          }
          .card-print-page {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            width: 85mm !important;
            height: 55mm !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            break-after: page !important;
          }
          .card-print-page:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
        }
      `}} />
    </>
  );
}
