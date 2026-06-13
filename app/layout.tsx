import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BrightnessControl } from "@/components/ui/BrightnessControl";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#060606",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vidal-pro-portfolio.vercel.app"),
  title: "Vidal Reñao — IT Infrastructure & AI Solutions Engineer | Switzerland & Liechtenstein",
  description:
    "IT Infrastructure & AI Solutions Engineer in Basel, Switzerland. Building SaaS apps with Claude AI + Next.js while managing enterprise M365, Azure, Entra ID & Intune. Immediately available across Switzerland and Liechtenstein.",
  keywords: [
    "IT Infrastructure Engineer Switzerland",
    "AI Solutions Engineer Basel",
    "AI-Powered SaaS Infrastructure",
    "Fullstack Developer Switzerland",
    "Full Stack Developer Switzerland",
    "Azure Consultant Basel",
    "Microsoft 365 Spezialist Schweiz",
    "Entra ID Intune Liechtenstein",
    "Next.js Developer Switzerland",
    "Claude AI Developer",
    "CCNA Network Engineer Switzerland",
    "Modern Workplace Engineer Schweiz",
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
    title: "Vidal Reñao — IT Infrastructure & AI Solutions Engineer | Switzerland & Liechtenstein",
    description:
      "IT Infrastructure & AI Solutions Engineer in Basel — immediately available across Switzerland and Liechtenstein. Azure · M365 · Next.js · Claude AI · CCNA.",
    images: [
      {
        url: "/Photo.jpg",
        width: 872,
        height: 927,
        alt: "Vidal Reñao — IT Infrastructure & AI Solutions Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidal Reñao — IT Infrastructure & AI Solutions Engineer",
    description:
      "IT Infrastructure & AI Solutions Engineer in Basel, Switzerland. Azure · M365 · Next.js · Claude AI.",
    images: ["/Photo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#060606] text-white antialiased">
        {children}
        <BrightnessControl />
      </body>
    </html>
  );
}
