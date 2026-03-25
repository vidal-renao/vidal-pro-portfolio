import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://vidal-renao.dev"),
  title: "Vidal Reñao — Cloud Infrastructure Consultant | Switzerland & Liechtenstein",
  description:
    "Cloud Infrastructure Consultant & Modern Workplace Engineer in Basel, Switzerland. Immediate availability across Switzerland and Liechtenstein. Azure · M365 · Entra ID · Intune · CCNA · PowerShell.",
  keywords: [
    "Cloud Infrastructure Consultant Switzerland",
    "Modern Workplace Engineer Switzerland",
    "Azure Consultant Basel",
    "Microsoft 365 Spezialist Schweiz",
    "Entra ID Intune Liechtenstein",
    "IT Engineer Basel Switzerland",
    "Cloud Engineer Schweiz Liechtenstein",
    "CCNA Network Engineer Switzerland",
    "PowerShell Automatisierung Schweiz",
    "Hybrid Identity Azure AD Switzerland",
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
    title: "Vidal Reñao — Cloud Infrastructure Consultant | Switzerland & Liechtenstein",
    description:
      "Cloud Infrastructure & Modern Workplace Engineer in Basel — immediate availability across Switzerland and Liechtenstein. Azure · M365 · Entra ID · Intune.",
    images: [
      {
        url: "/Photo.jpg",
        width: 872,
        height: 927,
        alt: "Vidal Reñao — Cloud Infrastructure Consultant",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidal Reñao — Cloud Infrastructure Consultant",
    description:
      "Cloud Infrastructure & Modern Workplace Engineer in Basel, Switzerland.",
    images: ["/Photo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#060606] text-white antialiased">{children}</body>
    </html>
  );
}
