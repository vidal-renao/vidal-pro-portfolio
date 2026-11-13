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
  title: "Vidal Reñao | IT Systems Administrator & Full-Stack Developer",
  description: "Reliable IT today. AI-ready tomorrow. IT systems administration, full-stack development and AI automation in Basel, for Switzerland and Liechtenstein.",
  icons: {
    icon: [{ url: "/icons/ve-mark.svg", type: "image/svg+xml" }, { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Vidal Reñao | IT Systems Administrator & Full-Stack Developer",
    description:
      "Reliable IT today. AI-ready tomorrow. Microsoft 365, Entra ID and IT infrastructure, plus web applications and AI automation in Basel.",
    images: [
      {
        url: "/Photo.jpg",
        width: 872,
        height: 927,
        alt: "Vidal Reñao | IT Systems Administrator & Full-Stack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidal Reñao | IT Systems Administrator & Full-Stack Developer",
    description:
      "Reliable IT today. AI-ready tomorrow. IT systems administration and full-stack development in Basel, Switzerland.",
    images: ["/Photo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
