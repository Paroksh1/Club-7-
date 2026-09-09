import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import SiteHeader from "@/components/site/SiteHeader";
import "./globals.css";

// DISPLAY — condensed, athletic, poster/stadium-signage weight.
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// BODY/UI — clean grotesk, carries anything that needs to be read.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Club 7 Arena — Sector 89, Faridabad",
  description:
    "Box cricket, 7-a-side football, pickleball, cricket academy and cafe. Open 24 hours in Sector 89, Faridabad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-c7-bg-1 text-c7-ink font-body">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
