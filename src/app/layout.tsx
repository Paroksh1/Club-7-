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
  title: "CourtPlay — Play Is Only Half the Story",
  description:
    "CourtPlay brings together pickleball, competition, people and experiences in Gurgaon.",
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
