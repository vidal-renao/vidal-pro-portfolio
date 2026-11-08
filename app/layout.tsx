import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vidal-pro-portfolio.vercel.app"),
  title: "Vidal Reñao — Fullstack AI Engineer & Systems Administrator | Switzerland & Liechtenstein",
  description:
    "Websites, apps and AI automation for your business — gyms, restaurants, salons, clinics, shops and agencies. Fullstack AI Engineer and Systems Administrator in Basel: Next.js, AI, Windows, Linux, networks, Microsoft 365, CCNA. Immediately available across Switzerland and Liechtenstein.",
  keywords: [
    "Website for small business Switzerland",
    "Web developer Basel",
    "App developer Switzerland",
    "AI automation for business",
    "Website for gym restaurant salon clinic",
    "Next.js Developer Switzerland",
    "IT support Basel",
    "Systems administrator Windows Linux",
    "Microsoft 365 Switzerland",
    "Chatbot developer Switzerland",
    "CCNA Network Basel",
    "Fullstack Developer Switzerland",
  ],
  icons: {
    icon: [{ url: "/icons/ve-mark.svg", type: "image/svg+xml" }, { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Vidal Reñao — Fullstack AI Engineer & Systems Administrator | Switzerland & Liechtenstein",
    description:
      "Websites, apps and AI automation for your business — gyms, restaurants, salons, clinics, shops. Fullstack AI Engineer and Systems Administrator in Basel. Immediately available across Switzerland and Liechtenstein.",
    images: [
      {
        url: "/Photo.jpg",
        width: 872,
        height: 927,
        alt: "Vidal Reñao — Fullstack AI Engineer & Systems Administrator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidal Reñao — Fullstack AI Engineer & Systems Administrator",
    description:
      "Websites, apps and AI automation for your business — every sector. Fullstack AI Engineer and Systems Administrator in Basel.",
    images: ["/Photo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
