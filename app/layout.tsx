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
  title: "Vidal Reñao | Fullstack AI Developer & Systems Administrator",
  description: "VIDAL ECOSYSTEM in Basel: Fullstack development, AI Solutions, business automation and enterprise IT systems administration across Switzerland and Liechtenstein.",
  icons: {
    icon: [{ url: "/icons/ve-mark.svg", type: "image/svg+xml" }, { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Vidal Reñao | AI Solutions, Fullstack & IT Systems",
    description:
      "VIDAL ECOSYSTEM: AI Solutions, business automation and Fullstack development, plus Microsoft 365, Entra ID and IT infrastructure in Basel.",
    images: [
      {
        url: "/Photo.jpg",
        width: 872,
        height: 927,
        alt: "Vidal Reñao | Fullstack AI Developer & Systems Administrator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidal Reñao | Fullstack AI Developer & Systems Administrator",
    description:
      "Fullstack AI development, SaaS automation and enterprise systems administration in Basel, Switzerland.",
    images: ["/Photo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
