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
  title: "Vidal Reñao — Cloud Infrastructure Consultant",
  description:
    "Cloud Infrastructure Consultant & Modern Workplace Engineer in Basel, Switzerland. Azure · M365 · Entra ID · Intune · CCNA · PowerShell.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vidal Reñao",
  },
  openGraph: {
    title: "Vidal Reñao — Cloud Infrastructure Consultant",
    description:
      "Cloud Infrastructure & Modern Workplace Engineer in Basel, Switzerland. Azure · M365 · Entra ID · Intune.",
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
