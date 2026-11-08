import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#080e1c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vidal-pro-portfolio.vercel.app"),
  title: "Vidal Reñao — Fullstack AI Engineer & Systems Administrator | Switzerland & Liechtenstein",
  description:
    "Fullstack AI engineering and enterprise systems administration in Basel, Switzerland. SaaS applications, AI automation, Microsoft 365, Windows Server, Entra ID and networking.",
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
      "Fullstack AI applications, automation and enterprise IT infrastructure in Basel, Switzerland. Software and systems expertise for Swiss and DACH businesses.",
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
      "Fullstack AI development, SaaS automation and enterprise systems administration in Basel, Switzerland.",
    images: ["/Photo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
