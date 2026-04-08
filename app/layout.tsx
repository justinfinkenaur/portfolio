import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Justin Finkenaur — Product Designer",
  description: "Product designer with 9+ years of experience at Capital One, Amazon, and Google — simplifying complex systems across smart home, e-commerce, and agentic AI.",
  metadataBase: new URL("https://finkenaur.design"),
  openGraph: {
    title: "Justin Finkenaur — Product Designer",
    description: "Product designer with 9+ years of experience at Capital One, Amazon, and Google — simplifying complex systems across smart home, e-commerce, and agentic AI.",
    url: "https://finkenaur.design",
    siteName: "Justin Finkenaur",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Finkenaur — Product Designer",
    description: "Product designer with 9+ years of experience at Capital One, Amazon, and Google.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
