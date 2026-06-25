import React from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import NetworkMesh from "@/components/NetworkMesh";
import VectorQR from "@/components/VectorQR";

// Inline SVG Icons for core services (back card / flyer)
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

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#00A3E0]/30 selection:text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00A3E0]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-12 border-b border-gray-800 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-xs font-semibold text-[#00A3E0] uppercase tracking-wider mb-3">
              Corporate Identity
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Brand Identity Kit
            </h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              High-fidelity components for Vidal Reñao Lopelo. Optimized for digital viewing and professional print processes (Print-Ready, Swiss standard bleed & sizing).
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}`}
              className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </header>

        {/* SECTION 1: BUSINESS CARDS */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Business Card</h2>
              <p className="text-sm text-gray-400">Swiss/European Standard: 85mm × 55mm</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/${locale}/brand/print-card?side=front`}
                target="_blank"
                className="px-3.5 py-1.5 rounded bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-gray-300 transition-all flex items-center gap-1.5"
              >
                <span>🖨️ Print Front</span>
              </Link>
              <Link
                href={`/${locale}/brand/print-card?side=back`}
                target="_blank"
                className="px-3.5 py-1.5 rounded bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-gray-300 transition-all flex items-center gap-1.5"
              >
                <span>🖨️ Print Back</span>
              </Link>
              <Link
                href={`/${locale}/brand/print-card?side=both`}
                target="_blank"
                className="px-4 py-2 rounded bg-[#00A3E0] hover:bg-[#0082b3] text-xs font-semibold text-white transition-all flex items-center gap-2 shadow-lg shadow-[#00A3E0]/20"
              >
                <span>🖨️ Print Full Card (2 Pages)</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
            {/* FRONT SIDE PREVIEW */}
            <div className="w-full max-w-[425px]">
              <div className="text-xs text-gray-400 font-semibold mb-2 flex justify-between px-1">
                <span>FRONT SIDE PREVIEW</span>
                <span>85mm × 55mm</span>
              </div>
              {/* Business Card Container */}
              <div className="w-full aspect-[85/55] bg-[#111827] rounded-lg border border-gray-800 shadow-2xl relative overflow-hidden flex flex-col justify-between p-[6%] select-none">
                {/* Network Mesh background overlay */}
                <NetworkMesh className="absolute right-[-5%] top-0 h-full w-[45%] object-cover object-right opacity-40" />

                {/* Main Card Content Grid */}
                <div className="flex-1 grid grid-cols-[30%_1px_69%] items-center relative z-10">
                  {/* Left Column: Logo */}
                  <div className="pr-4 flex justify-start">
                    <BrandLogo size="md" className="w-full h-auto max-w-[80px]" />
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-[75%] bg-gray-700/80" />

                  {/* Right Column: Name & Title */}
                  <div className="pl-6 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none mb-1">
                      Vidal Reñao Lopelo
                    </h3>
                    <div className="w-10 h-0.5 bg-[#00A3E0] mb-2.5" />
                    <div className="text-[9px] sm:text-[10px] font-extrabold text-[#00A3E0] tracking-wider uppercase mb-0.5">
                      AI-Powered
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-gray-200 tracking-widest uppercase mb-2">
                      Infrastructure Architect
                    </div>
                    <div className="text-[7.5px] sm:text-[8px] font-medium text-gray-400 tracking-wide">
                      Modern Workplace • Enterprise Automation • SaaS
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800/80 pt-2 flex items-center justify-between text-[8px] font-semibold text-gray-400 tracking-widest uppercase relative z-10">
                  <div className="flex items-center gap-1">
                    <PinIcon className="w-2.5 h-2.5" />
                    <span>Basel • Switzerland • DACH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK SIDE PREVIEW */}
            <div className="w-full max-w-[425px]">
              <div className="text-xs text-gray-400 font-semibold mb-2 flex justify-between px-1">
                <span>BACK SIDE PREVIEW</span>
                <span>85mm × 55mm</span>
              </div>
              {/* Business Card Container */}
              <div className="w-full aspect-[85/55] bg-[#111827] rounded-lg border border-gray-800 shadow-2xl relative overflow-hidden flex flex-col justify-between p-[6%] select-none">
                {/* Tiny mesh corner decoration */}
                <NetworkMesh className="absolute right-[33%] top-[-20%] h-[60%] w-auto opacity-20 rotate-45" />

                {/* Main Card Content */}
                <div className="flex-1 grid grid-cols-[68%_1px_31%] items-center mb-2">
                  {/* Left Column: Services */}
                  <div className="pr-4">
                    <div className="mb-3">
                      <span className="text-[9px] font-bold text-[#00A3E0] tracking-widest uppercase">
                        Core Services
                      </span>
                      <div className="w-8 h-0.5 bg-[#00A3E0] mt-0.5" />
                    </div>

                    {/* Services Grid (4 columns) */}
                    <div className="grid grid-cols-4 gap-2">
                      <div className="flex flex-col items-center text-center">
                        <ShieldIcon />
                        <span className="text-[6px] font-bold text-white mt-1 leading-tight">ENTERPRISE INFRASTRUCTURE</span>
                        <span className="text-[4.5px] text-gray-400 mt-0.5 leading-tight">Secure, scalable business systems.</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <AutomationIcon />
                        <span className="text-[6px] font-bold text-white mt-1 leading-tight">AI AUTOMATION</span>
                        <span className="text-[4.5px] text-gray-400 mt-0.5 leading-tight">Efficient workflows, less manual work.</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <WorkplaceIcon />
                        <span className="text-[6px] font-bold text-white mt-1 leading-tight">MODERN WORKPLACE</span>
                        <span className="text-[4.5px] text-gray-400 mt-0.5 leading-tight">Secure teams, cloud collaboration.</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <SaaSIcon />
                        <span className="text-[6px] font-bold text-white mt-1 leading-tight">SAAS ARCHITECTURE</span>
                        <span className="text-[4.5px] text-gray-400 mt-0.5 leading-tight">Platforms from idea to production.</span>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-[80%] bg-gray-700/80" />

                  {/* Right Column: Contact & QR */}
                  <div className="pl-4 flex flex-col items-center justify-center">
                    <VectorQR size={60} className="mb-2 p-1" />
                    <div className="w-full text-[5.5px] font-medium text-gray-300 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-[#00A3E0] font-bold">+</span>
                        <span>+41 77 972 62 99</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#00A3E0] font-bold">@</span>
                        <span className="truncate">vidalrenao.lab@outlook.com</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#00A3E0] font-bold">www</span>
                        <span className="truncate">vidal-pro-portfolio.vercel.app</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#00A3E0] font-bold">in</span>
                        <span className="truncate">linkedin.com/in/vidalrenao</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Centered Slogan */}
                <div className="text-[7px] font-extrabold text-gray-400 tracking-[0.4em] text-center uppercase border-t border-gray-800/80 pt-2">
                  Secure. Automate. Scale.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: A4 FLYER */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Corporate Flyer</h2>
              <p className="text-sm text-gray-400">Swiss/A4 Standard: 210mm × 297mm</p>
            </div>
            <Link
              href={`/${locale}/brand/print-flyer`}
              target="_blank"
              className="px-5 py-2.5 rounded bg-[#00A3E0] hover:bg-[#0082b3] text-sm font-semibold text-white transition-all flex items-center gap-2 shadow-lg shadow-[#00A3E0]/20"
            >
              <span>🖨️ Print Corporate Flyer (A4)</span>
            </Link>
          </div>

          {/* Interactive Screen Preview Container with scaled dimensions */}
          <div className="w-full max-w-[700px] mx-auto bg-white text-gray-900 border border-gray-200 rounded-xl shadow-2xl overflow-hidden aspect-[210/297] flex flex-col justify-between relative selection:bg-[#00A3E0]/20 selection:text-[#00A3E0]">
            {/* 1. Header (Deep Anthracite) */}
            <div className="bg-[#111827] text-white p-[5%] relative overflow-hidden flex flex-col justify-between h-[25%] border-b border-[#00A3E0]/20">
              <NetworkMesh className="absolute right-0 top-0 h-full w-[45%] object-cover object-right opacity-30" />
              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-[4%] w-full">
                  <BrandLogo size="md" className="w-[18%] h-auto max-w-[90px]" />
                  <div className="h-10 w-[1px] bg-gray-700/80 mx-2" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
                      Vidal Reñao Lopelo
                    </h3>
                    <div className="w-12 h-0.5 bg-[#00A3E0] my-2" />
                    <div className="text-[10px] sm:text-xs font-black tracking-widest text-[#00A3E0] uppercase leading-none">
                      AI-POWERED INFRASTRUCTURE ARCHITECT
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 max-w-[75%] relative z-10">
                <p className="text-[10px] sm:text-xs text-gray-300 leading-relaxed font-medium">
                  I design secure AI-powered infrastructure, automation workflows and SaaS systems for Swiss and DACH SMEs.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-4 relative z-10">
                <PinIcon className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>Basel • Switzerland • DACH</span>
              </div>
            </div>

            {/* 2. Core Pillars Bar (Dark Grey) */}
            <div className="bg-[#1f2937] text-white py-3 px-[5%] grid grid-cols-4 gap-2 border-b border-gray-800 text-center">
              <div className="flex flex-col items-center px-1">
                <ShieldIcon />
                <span className="text-[9px] font-bold text-white mt-1 leading-none">SECURE</span>
                <span className="text-[6.5px] text-gray-400 mt-1 leading-tight">Enterprise-grade systems with compliance at the core.</span>
              </div>
              <div className="h-8 w-[1px] bg-gray-700/50 self-center justify-self-end" />
              <div className="flex flex-col items-center px-1">
                <AutomationIcon />
                <span className="text-[9px] font-bold text-white mt-1 leading-none">AUTOMATE</span>
                <span className="text-[6.5px] text-gray-400 mt-1 leading-tight">AI workflows that reduce manual work.</span>
              </div>
              <div className="h-8 w-[1px] bg-gray-700/50 self-center justify-self-end" />
              <div className="flex flex-col items-center px-1">
                <SaaSIcon />
                <span className="text-[9px] font-bold text-white mt-1 leading-none">SCALE</span>
                <span className="text-[6.5px] text-gray-400 mt-1 leading-tight">Architecture designed to grow.</span>
              </div>
              <div className="h-8 w-[1px] bg-gray-700/50 self-center justify-self-end" />
              <div className="flex flex-col items-center px-1">
                <WorkplaceIcon />
                <span className="text-[9px] font-bold text-white mt-1 leading-none">TRUSTED</span>
                <span className="text-[6.5px] text-gray-400 mt-1 leading-tight">Reliable solutions with measurable impact.</span>
              </div>
            </div>

            {/* 3. Main Content (White Background) */}
            <div className="flex-1 p-[5%] bg-white grid grid-cols-[55%_45%] gap-[5%] items-start">
              {/* Left Column: Core Services Grid */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b-2 border-[#00A3E0] pb-1 inline-block">
                    Core Services
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#111827] text-white p-3 rounded-lg border border-gray-800 flex flex-col justify-between">
                    <ShieldIcon />
                    <span className="text-[9px] font-extrabold text-white mt-2 leading-none">ENTERPRISE INFRASTRUCTURE</span>
                    <span className="text-[7.5px] text-gray-400 mt-1 leading-normal">Secure, scalable and high-availability infrastructure on-prem or in the cloud.</span>
                  </div>
                  <div className="bg-[#111827] text-white p-3 rounded-lg border border-gray-800 flex flex-col justify-between">
                    <WorkplaceIcon />
                    <span className="text-[9px] font-extrabold text-white mt-2 leading-none">MODERN WORKPLACE</span>
                    <span className="text-[7.5px] text-gray-400 mt-1 leading-normal">Microsoft 365, Entra ID, Intune and cloud solutions for secure collaboration.</span>
                  </div>
                  <div className="bg-[#111827] text-white p-3 rounded-lg border border-gray-800 flex flex-col justify-between">
                    <AutomationIcon />
                    <span className="text-[9px] font-extrabold text-white mt-2 leading-none">INTELLIGENT AUTOMATION</span>
                    <span className="text-[7.5px] text-gray-400 mt-1 leading-normal">AI-powered workflows and integrations that remove repetitive tasks.</span>
                  </div>
                  <div className="bg-[#111827] text-white p-3 rounded-lg border border-gray-800 flex flex-col justify-between">
                    <SaaSIcon />
                    <span className="text-[9px] font-extrabold text-white mt-2 leading-none">SAAS ARCHITECTURE</span>
                    <span className="text-[7.5px] text-gray-400 mt-1 leading-normal">Design and build modern platforms and applications from idea to production.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Value Statement & Location */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b-2 border-[#00A3E0] pb-1 inline-block">
                    I Help Businesses
                  </h4>
                </div>
                <ul className="space-y-3 mt-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[9.5px] text-gray-700 font-semibold leading-tight">Build secure and future-proof infrastructure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[9.5px] text-gray-700 font-semibold leading-tight">Automate processes and save time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[9.5px] text-gray-700 font-semibold leading-tight">Adopt modern cloud collaboration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[9.5px] text-gray-700 font-semibold leading-tight">Scale products and systems efficiently</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex items-center justify-center gap-2">
                    <PinIcon className="w-4 h-4 text-[#00A3E0]" />
                    <span className="text-[9px] font-extrabold text-gray-700 tracking-wider uppercase">
                      Basel • Switzerland • DACH
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Experience Metrics (Deep Anthracite) */}
            <div className="bg-[#111827] text-white p-[5%] border-t border-b border-gray-800">
              <span className="text-[9px] font-bold text-[#00A3E0] tracking-widest uppercase block mb-3">
                Experience That Delivers
              </span>
              <div className="grid grid-cols-4 gap-2 text-left">
                <div className="pr-2">
                  <div className="text-xl font-extrabold text-[#00A3E0] leading-none">+7</div>
                  <div className="text-[7.5px] font-black text-white mt-1 uppercase tracking-wider leading-none">Years</div>
                  <div className="text-[6.5px] text-gray-400 mt-1 leading-tight">IT infrastructure and automation</div>
                </div>
                <div className="h-10 w-[1px] bg-gray-800 self-center justify-self-end" />
                <div className="pr-2 pl-2">
                  <div className="text-xl font-extrabold text-[#00A3E0] leading-none">20+</div>
                  <div className="text-[7.5px] font-black text-white mt-1 uppercase tracking-wider leading-none">Projects</div>
                  <div className="text-[6.5px] text-gray-400 mt-1 leading-tight">for startups, SMEs and enterprise</div>
                </div>
                <div className="h-10 w-[1px] bg-gray-800 self-center justify-self-end" />
                <div className="pr-2 pl-2">
                  <div className="text-xl font-extrabold text-[#00A3E0] leading-none">100%</div>
                  <div className="text-[7.5px] font-black text-white mt-1 uppercase tracking-wider leading-none">Focus</div>
                  <div className="text-[6.5px] text-gray-400 mt-1 leading-tight">security, quality and long-term impact</div>
                </div>
                <div className="h-10 w-[1px] bg-gray-800 self-center justify-self-end" />
                <div className="pl-2">
                  <div className="text-xl font-extrabold text-[#00A3E0] leading-none">GLOBAL</div>
                  <div className="text-[7.5px] font-black text-white mt-1 uppercase tracking-wider leading-none">Mindset</div>
                  <div className="text-[6.5px] text-gray-400 mt-1 leading-tight">European network and trusted partners</div>
                </div>
              </div>
            </div>

            {/* 5. Footer (Deep Anthracite) */}
            <div className="bg-[#111827] text-white p-[5%] grid grid-cols-[45%_35%_20%] gap-4 items-center h-[18%]">
              {/* QR and CTA */}
              <div className="flex items-center gap-3">
                <VectorQR size={70} className="p-1 shrink-0 bg-gray-900 border-gray-800" />
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] font-extrabold text-[#00A3E0] tracking-wider uppercase leading-none mb-1">
                    Portfolio & Case Studies
                  </span>
                  <span className="text-[7px] text-gray-400 leading-normal">
                    Scan to explore projects, case studies and contact.
                  </span>
                </div>
              </div>

              {/* Direct Info */}
              <div className="text-[8px] font-bold text-gray-300 space-y-1 self-center justify-self-center">
                <div>+41 77 972 62 99</div>
                <div>vidalrenao.lab@outlook.com</div>
                <div>vidal-pro-portfolio.vercel.app</div>
                <div>linkedin.com/in/vidalrenao</div>
              </div>

              {/* Logo & Slogan */}
              <div className="flex flex-col items-end justify-center">
                <BrandLogo size="sm" className="w-[85%] h-auto max-w-[65px] mb-2" />
                <span className="text-[5.5px] font-extrabold text-gray-400 tracking-[0.2em] uppercase text-right leading-none">
                  Secure. Automate. Scale.
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
