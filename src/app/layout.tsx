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
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#07090e"
};

export const metadata: Metadata = {
  title: "Shahriar Hossain // Product Designer & Creative Technologist",
  description:
    "Interactive Portfolio & Cyber Web OS of Shahriar Hossain — Product Designer & Creative Technologist specializing in Design Systems, Spatial UI, and Generative AI Canvases.",
  keywords: [
    "Shahriar Hossain",
    "Product Designer",
    "Creative Technologist",
    "Design Systems",
    "Spatial UI",
    "Three.js",
    "Next.js",
    "Figma"
  ],
  authors: [{ name: "Shahriar Hossain" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="h-full w-full overflow-hidden bg-[#07090e] text-slate-100 select-none">
        {children}
      </body>
    </html>
  );
}
