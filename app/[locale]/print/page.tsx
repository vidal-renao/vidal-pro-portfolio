import { getTranslations } from "next-intl/server";
import PrintTrigger from "@/components/ui/PrintTrigger";

export default async function PrintPage() {
  const t = await getTranslations();

  const roles = t.raw("experience.roles") as Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
  }>;

  const projects = t.raw("projects.items") as Array<{
    title: string;
    description: string;
    tags: string[];
    metrics: string[];
    status: string;
  }>;

  return (
    <>
      <PrintTrigger />
      <div className="print-profile">
        {/* ── HEADER ── */}
        <header>
          <h1>Vidal Reñao Lopelo</h1>
          <p className="role">IT Infrastructure &amp; AI Solutions Engineer</p>
          <div className="meta">
            <span>Basel, Switzerland 🇨🇭</span>
            <span>vidalrenao.lab@outlook.com</span>
            <span>+41 77 972 62 99</span>
            <span>linkedin.com/in/vidalrenao</span>
          </div>
          <div className="meta">
            <span>github.com/vidal-renao</span>
            <span>vidal-pro-portfolio.vercel.app</span>
          </div>
          <div className="meta">
            <span>English C1</span>
            <span>German B2</span>
            <span>Spanish Native</span>
            <span>Immediate availability</span>
          </div>
        </header>

        <hr />

        {/* ── SUMMARY ── */}
        <section>
          <h2>Professional Summary</h2>
          <p>
            Senior IT Infrastructure &amp; AI Solutions Engineer with 7+ years delivering
            enterprise-grade systems across Cloud Transformation, Active Directory,
            Microsoft 365, and AI-powered SaaS development. Specialization:
            AI-Powered SaaS Infrastructure for Swiss &amp; DACH SMEs.
          </p>
        </section>

        <hr />

        {/* ── PROJECTS ── */}
        <section>
          <h2>Projects in Production</h2>
          {projects.map((p) => (
            <div key={p.title} className="entry">
              <div className="entry-header">
                <strong>{p.title}</strong>
                <span className="status">{p.status}</span>
              </div>
              <p>{p.description}</p>
              <div className="tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
                {p.metrics.map((m) => (
                  <span key={m} className="metric">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <hr />

        {/* ── EXPERIENCE ── */}
        <section>
          <h2>Professional Experience</h2>
          {roles.map((r) => (
            <div key={r.company} className="entry">
              <div className="entry-header">
                <strong>{r.title}</strong>
                <span className="period">{r.period}</span>
              </div>
              <p className="company">{r.company} · {r.location}</p>
              <ul>
                {r.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <hr />

        {/* ── TECH STACK ── */}
        <section>
          <h2>Core Skills</h2>
          <div className="skills-grid">
            <div>
              <h3>Cloud &amp; Identity</h3>
              <p>Microsoft Azure · Microsoft 365 · Entra ID · Intune · Autopilot · Azure Arc</p>
            </div>
            <div>
              <h3>Infrastructure</h3>
              <p>Windows Server 2025 · Active Directory · Group Policy · VMware vSphere · Hyper-V · Linux/Debian</p>
            </div>
            <div>
              <h3>Networking</h3>
              <p>CCNA · TCP/IP · DNS/DHCP · VLAN · VPN · Firewall (nftables)</p>
            </div>
            <div>
              <h3>Development &amp; AI</h3>
              <p>Next.js · TypeScript · Supabase · Claude API · PowerShell · Tailwind CSS · Framer Motion</p>
            </div>
          </div>
        </section>

        <hr />

        {/* ── CERTIFICATIONS ── */}
        <section>
          <h2>Certifications</h2>
          <div className="entry">
            <strong>CCNA Discovery: Routing &amp; Switching in the Enterprise</strong>
            <p>Cisco Networking Academy · Routing, Switching, VLANs, VPN, Network Security</p>
          </div>
          <div className="entry">
            <strong>AI Development: From 0 to Production</strong>
            <p>BIG School (Brais Moure &amp; Romuald Fons) · LLM Tooling, AI Automation, Fullstack</p>
          </div>
          <div className="entry">
            <strong>Técnico Superior en Administración de Sistemas Informáticos en Red (ASIR)</strong>
            <p>Spain MEC · 2012 · Systems Administration, Networking, Linux/Windows Server</p>
          </div>
          <div className="entry">
            <strong>Técnico Superior en Desarrollo de Aplicaciones y Sistemas</strong>
            <p>Spain MEC · Software Development &amp; Systems Engineering</p>
          </div>
          <div className="entry">
            <strong>E-commerce &amp; Digital Marketing Specialist</strong>
            <p>PrestaShop · Joomla · MySQL · SEO/CRO</p>
          </div>
        </section>

        <hr />

        <footer>
          <p>vidalrenao.lab@outlook.com · +41 77 972 62 99 · linkedin.com/in/vidalrenao · github.com/vidal-renao</p>
        </footer>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, Helvetica, sans-serif; font-size: 11pt; color: #111; background: white; }
        .print-profile { max-width: 800px; margin: 0 auto; padding: 32px 40px; }

        header { margin-bottom: 16px; }
        header h1 { font-size: 22pt; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
        header .role { font-size: 13pt; color: #3b82f6; font-weight: 600; margin-bottom: 8px; }
        header .meta { display: flex; flex-wrap: wrap; gap: 4px 16px; font-size: 9pt; color: #555; margin-bottom: 4px; }

        hr { border: none; border-top: 1px solid #e2e8f0; margin: 14px 0; }

        section { margin-bottom: 4px; }
        h2 { font-size: 11pt; font-weight: 700; color: #1e3a5f; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
        h3 { font-size: 10pt; font-weight: 700; color: #334155; margin-bottom: 3px; }

        .entry { margin-bottom: 12px; }
        .entry-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
        .entry strong { font-size: 11pt; color: #0f172a; }
        .status { font-size: 8.5pt; color: #3b82f6; font-weight: 600; }
        .period { font-size: 9pt; color: #64748b; }
        .company { font-size: 9.5pt; color: #3b82f6; margin-bottom: 4px; }
        p { font-size: 9.5pt; color: #475569; line-height: 1.5; margin-top: 3px; }
        ul { padding-left: 16px; margin-top: 4px; }
        li { font-size: 9.5pt; color: #475569; line-height: 1.55; }

        .tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
        .tag { font-size: 8pt; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 99px; padding: 1px 8px; }
        .metric { font-size: 8pt; background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; border-radius: 99px; padding: 1px 8px; }

        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        footer { margin-top: 16px; text-align: center; font-size: 8.5pt; color: #94a3b8; }

        @media print {
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .print-profile { padding: 0; }
          @page { margin: 18mm 20mm; size: A4; }
        }

        @media screen {
          body { background: #f8fafc; }
          .print-profile { box-shadow: 0 4px 24px rgba(0,0,0,0.1); border-radius: 8px; margin: 32px auto; background: white; }
        }
      `}</style>
    </>
  );
}
