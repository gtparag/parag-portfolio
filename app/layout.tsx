import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-matrix",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parag Ambildhuke | Software Engineer & ML Researcher",
  description:
    "Software Engineer and ML Researcher at Georgia Tech, passionate about building intelligent systems at the intersection of cutting-edge research and real-world applications.",
  keywords: [
    "Software Engineer",
    "ML Researcher",
    "Machine Learning",
    "AI",
    "Georgia Tech",
    "NLP",
    "Deep Learning",
    "Full Stack Developer",
  ],
  authors: [{ name: "Parag Ambildhuke" }],
  openGraph: {
    title: "Parag Ambildhuke | Software Engineer & ML Researcher",
    description:
      "Building intelligent systems at the intersection of software engineering and machine learning research.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parag Ambildhuke | Software Engineer & ML Researcher",
    description:
      "Building intelligent systems at the intersection of software engineering and machine learning research.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${shareTechMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
