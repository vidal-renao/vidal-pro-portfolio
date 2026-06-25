"use client";
import React from "react";
import BrandLogo from "@/components/BrandLogo";
import NetworkMesh from "@/components/NetworkMesh";
import VectorQR from "@/components/VectorQR";
import PrintTrigger from "@/components/ui/PrintTrigger";

// Inline SVG Icons for core services (matching visual dashboard)
const ShieldIcon = () => (
  <svg className="w-8 h-8 text-[#00A3E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const AutomationIcon = () => (
  <svg className="w-8 h-8 text-[#00A3E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-1.41m12.095-4.95l1.414-1.414M12 17.25V21m0-21v3.75m-3.077 8.457l-1.41 1.41m12.096 4.95l-1.414 1.414" />
  </svg>
);

const WorkplaceIcon = () => (
  <svg className="w-8 h-8 text-[#00A3E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const SaaSIcon = () => (
  <svg className="w-8 h-8 text-[#00A3E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const PinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} text-[#00A3E0]`} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742c1.002-.722 2.607-2.037 3.864-4.19C19.12 14.545 20 12.003 20 9.5a8.001 8.001 0 00-16 0c0 2.503.88 5.045 2.535 7.91 1.257 2.153 2.862 3.468 3.864 4.19a16.975 16.975 0 001.14-.742zM12 12.75a3.25 3.25 0 100-6.5 3.25 3.25 0 000 6.5z" clipRule="evenodd" />
  </svg>
);

export default function PrintFlyerPage() {
  return (
    <>
      <PrintTrigger />
      <div className="min-h-screen bg-[#2c313c] print:bg-transparent flex flex-col items-center justify-center p-8 gap-8 print:p-0 print:gap-0 select-none">
        {/* Floating Print Command Help */}
        <div className="print:hidden text-center max-w-md bg-[#111827]/90 text-white rounded-lg p-5 border border-gray-800 shadow-xl space-y-3">
          <h2 className="font-extrabold text-[#00A3E0] uppercase tracking-wide">
            Flyer Print Preview
          </h2>
          <p className="text-xs text-gray-400">
            A print command has been triggered automatically. If blocked, press <kbd className="bg-gray-800 px-1 py-0.5 rounded text-white border border-gray-700">Ctrl + P</kbd> or <kbd className="bg-gray-800 px-1 py-0.5 rounded text-white border border-gray-700">Cmd + P</kbd> to save the A4 Flyer as PDF.
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-[#00A3E0] hover:bg-[#0082b3] rounded text-xs font-bold transition-all"
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

        {/* FLYER CONTAINER */}
        <div className="flyer-print-page w-[210mm] h-[297mm] bg-white text-gray-900 shadow-2xl print:shadow-none flex flex-col justify-between relative overflow-hidden select-none">
          
          {/* 1. Header (Deep Anthracite) */}
          <div className="bg-[#111827] text-white p-[5%] relative overflow-hidden flex flex-col justify-between h-[25%] border-b border-[#00A3E0]/20">
            <NetworkMesh className="absolute right-0 top-0 h-full w-[45%] object-cover object-right opacity-30" />
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-[4%] w-full">
                <BrandLogo size="md" className="w-[18%] h-auto max-w-[90px]" />
                <div className="h-12 w-[1px] bg-gray-700/80 mx-3" />
                <div>
                  <h1 className="text-[26px] font-black tracking-tight text-white leading-none">
                    Vidal Reñao Lopelo
                  </h1>
                  <div className="w-16 h-0.5 bg-[#00A3E0] my-2.5" />
                  <div className="text-xs font-black tracking-widest text-[#00A3E0] uppercase leading-none">
                    AI-POWERED INFRASTRUCTURE ARCHITECT
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 max-w-[75%] relative z-10">
              <p className="text-[12px] text-gray-300 leading-relaxed font-medium">
                I design secure AI-powered infrastructure, automation workflows and SaaS systems for Swiss and DACH SMEs.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-4 relative z-10">
              <PinIcon className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Basel • Switzerland • DACH</span>
            </div>
          </div>

          {/* 2. Core Pillars Bar (Dark Grey) */}
          <div className="bg-[#1f2937] text-white py-3 px-[5%] grid grid-cols-4 gap-2 border-b border-gray-800 text-center items-center h-[9%]">
            <div className="flex flex-col items-center px-1">
              <ShieldIcon />
              <span className="text-[9px] font-bold text-white mt-1 leading-none">SECURE</span>
              <span className="text-[6.5px] text-gray-400 mt-1 leading-tight">Enterprise-grade systems with compliance at the core.</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-700/50 justify-self-end" />
            <div className="flex flex-col items-center px-1">
              <AutomationIcon />
              <span className="text-[9px] font-bold text-white mt-1 leading-none">AUTOMATE</span>
              <span className="text-[6.5px] text-gray-400 mt-1 leading-tight">AI workflows that reduce manual work.</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-700/50 justify-self-end" />
            <div className="flex flex-col items-center px-1">
              <SaaSIcon />
              <span className="text-[9px] font-bold text-white mt-1 leading-none">SCALE</span>
              <span className="text-[6.5px] text-gray-400 mt-1 leading-tight">Architecture designed to grow.</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-700/50 justify-self-end" />
            <div className="flex flex-col items-center px-1">
              <WorkplaceIcon />
              <span className="text-[9px] font-bold text-white mt-1 leading-none">TRUSTED</span>
              <span className="text-[6.5px] text-gray-400 mt-1 leading-tight">Reliable solutions with measurable impact.</span>
            </div>
          </div>

          {/* 3. Main Content (White Background) */}
          <div className="flex-1 p-[5%] bg-white grid grid-cols-[55%_45%] gap-[5%] items-start h-[38%]">
            {/* Left Column: Core Services Grid */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b-2 border-[#00A3E0] pb-1 inline-block">
                  Core Services
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#111827] text-white p-3 rounded-lg border border-gray-800 flex flex-col justify-between min-h-[96px]">
                  <ShieldIcon />
                  <span className="text-[9px] font-extrabold text-white mt-2 leading-none">ENTERPRISE INFRASTRUCTURE</span>
                  <span className="text-[7.5px] text-gray-400 mt-1 leading-normal">Secure, scalable and high-availability infrastructure on-prem or in the cloud.</span>
                </div>
                <div className="bg-[#111827] text-white p-3 rounded-lg border border-gray-800 flex flex-col justify-between min-h-[96px]">
                  <WorkplaceIcon />
                  <span className="text-[9px] font-extrabold text-white mt-2 leading-none">MODERN WORKPLACE</span>
                  <span className="text-[7.5px] text-gray-400 mt-1 leading-normal">Microsoft 365, Entra ID, Intune and cloud solutions for secure collaboration.</span>
                </div>
                <div className="bg-[#111827] text-white p-3 rounded-lg border border-gray-800 flex flex-col justify-between min-h-[96px]">
                  <AutomationIcon />
                  <span className="text-[9px] font-extrabold text-white mt-2 leading-none">INTELLIGENT AUTOMATION</span>
                  <span className="text-[7.5px] text-gray-400 mt-1 leading-normal">AI-powered workflows and integrations that remove repetitive tasks.</span>
                </div>
                <div className="bg-[#111827] text-white p-3 rounded-lg border border-gray-800 flex flex-col justify-between min-h-[96px]">
                  <SaaSIcon />
                  <span className="text-[9px] font-extrabold text-white mt-2 leading-none">SAAS ARCHITECTURE</span>
                  <span className="text-[7.5px] text-gray-400 mt-1 leading-normal">Design and build modern platforms and applications from idea to production.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Value Statement & Location */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b-2 border-[#00A3E0] pb-1 inline-block">
                  I Help Businesses
                </h2>
              </div>
              <ul className="space-y-3 mt-2">
                <li className="flex items-start gap-2">
                  <svg className="w-4.5 h-4.5 text-[#00A3E0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] text-gray-700 font-semibold leading-tight">Build secure and future-proof infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4.5 h-4.5 text-[#00A3E0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] text-gray-700 font-semibold leading-tight">Automate processes and save time</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4.5 h-4.5 text-[#00A3E0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] text-gray-700 font-semibold leading-tight">Adopt modern cloud collaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4.5 h-4.5 text-[#00A3E0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] text-gray-700 font-semibold leading-tight">Scale products and systems efficiently</span>
                </li>
              </ul>

              <div className="pt-4">
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex items-center justify-center gap-2">
                  <PinIcon className="w-4.5 h-4.5 text-[#00A3E0]" />
                  <span className="text-[9.5px] font-extrabold text-gray-700 tracking-wider uppercase">
                    Basel • Switzerland • DACH
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Experience Metrics (Deep Anthracite) */}
          <div className="bg-[#111827] text-white p-[5%] border-t border-b border-gray-800 h-[15%] flex flex-col justify-center">
            <span className="text-[9.5px] font-bold text-[#00A3E0] tracking-widest uppercase block mb-3 leading-none">
              Experience That Delivers
            </span>
            <div className="grid grid-cols-4 gap-2 text-left items-center">
              <div className="pr-2">
                <div className="text-2xl font-extrabold text-[#00A3E0] leading-none">+7</div>
                <div className="text-[8px] font-black text-white mt-1 uppercase tracking-wider leading-none">Years</div>
                <div className="text-[7px] text-gray-400 mt-1 leading-tight">IT infrastructure and automation</div>
              </div>
              <div className="h-10 w-[1px] bg-gray-800 justify-self-end" />
              <div className="pr-2 pl-2">
                <div className="text-2xl font-extrabold text-[#00A3E0] leading-none">20+</div>
                <div className="text-[8px] font-black text-white mt-1 uppercase tracking-wider leading-none">Projects</div>
                <div className="text-[7px] text-gray-400 mt-1 leading-tight">for startups, SMEs and enterprise</div>
              </div>
              <div className="h-10 w-[1px] bg-gray-800 justify-self-end" />
              <div className="pr-2 pl-2">
                <div className="text-2xl font-extrabold text-[#00A3E0] leading-none">100%</div>
                <div className="text-[8px] font-black text-white mt-1 uppercase tracking-wider leading-none">Focus</div>
                <div className="text-[7px] text-gray-400 mt-1 leading-tight">security, quality and long-term impact</div>
              </div>
              <div className="h-10 w-[1px] bg-gray-800 justify-self-end" />
              <div className="pl-2">
                <div className="text-2xl font-extrabold text-[#00A3E0] leading-none">GLOBAL</div>
                <div className="text-[8px] font-black text-white mt-1 uppercase tracking-wider leading-none">Mindset</div>
                <div className="text-[7px] text-gray-400 mt-1 leading-tight">European network and trusted partners</div>
              </div>
            </div>
          </div>

          {/* 5. Footer (Deep Anthracite) */}
          <div className="bg-[#111827] text-white p-[5%] grid grid-cols-[45%_35%_20%] gap-4 items-center h-[13%]">
            {/* QR and CTA */}
            <div className="flex items-center gap-3">
              <VectorQR size={72} className="p-1 shrink-0 bg-gray-900 border-gray-800" />
              <div className="flex flex-col justify-center">
                <span className="text-[9.5px] font-extrabold text-[#00A3E0] tracking-wider uppercase leading-none mb-1">
                  Portfolio & Case Studies
                </span>
                <span className="text-[7.5px] text-gray-400 leading-normal">
                  Scan to explore projects, case studies and contact.
                </span>
              </div>
            </div>

            {/* Direct Info */}
            <div className="text-[8.5px] font-bold text-gray-300 space-y-1 self-center justify-self-center">
              <div>+41 77 972 62 99</div>
              <div>vidalrenao.lab@outlook.com</div>
              <div>vidal-pro-portfolio.vercel.app</div>
              <div>linkedin.com/in/vidalrenao</div>
            </div>

            {/* Logo & Slogan */}
            <div className="flex flex-col items-end justify-center">
              <BrandLogo size="sm" className="w-[85%] h-auto max-w-[65px] mb-2" />
              <span className="text-[6px] font-extrabold text-gray-400 tracking-[0.2em] uppercase text-right leading-none">
                Secure. Automate. Scale.
              </span>
            </div>
          </div>
        </div>
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
            size: A4;
            margin: 0;
          }
          .flyer-print-page {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}} />
    </>
  );
}
