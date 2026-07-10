import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import "@/app/styles/design-system.css";

export const viewport: Viewport = {
  themeColor: "#060606",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vidal-pro-portfolio.vercel.app"),
  title: "Vidal Reñao — Senior Fullstack & AI Developer | Switzerland & Liechtenstein",
  description:
    "Senior Fullstack & AI Developer in Basel, Switzerland. Building AI-powered SaaS with Claude, Next.js, TypeScript & Supabase — plus digital personal branding and HR-tech. Immediately available across Switzerland and Liechtenstein.",
  keywords: [
    "Fullstack Developer Switzerland",
    "Full Stack Developer Basel",
    "AI Developer Switzerland",
    "AI Agents Developer",
    "Next.js Developer Switzerland",
    "TypeScript Developer Basel",
    "Claude AI Developer",
    "Supabase Developer Switzerland",
    "Digital Personal Branding",
    "HR-Tech Developer",
    "RAG MCP Developer",
    "CCNA Network Engineer Switzerland",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vidal Reñao",
  },
  openGraph: {
    title: "Vidal Reñao — Senior Fullstack & AI Developer | Switzerland & Liechtenstein",
    description:
      "Senior Fullstack & AI Developer in Basel — immediately available across Switzerland and Liechtenstein. Next.js · TypeScript · Supabase · Claude AI · AI Agents · CCNA.",
    images: [
      {
        url: "/Photo.jpg",
        width: 872,
        height: 927,
        alt: "Vidal Reñao — Senior Fullstack & AI Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidal Reñao — Senior Fullstack & AI Developer",
    description:
      "Senior Fullstack & AI Developer in Basel, Switzerland. Next.js · TypeScript · Supabase · Claude AI.",
    images: ["/Photo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
