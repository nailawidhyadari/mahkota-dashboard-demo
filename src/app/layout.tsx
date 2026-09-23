import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "AI Sales Agent · Mahkota Cileunyi",
  description: "Prototipe dashboard AI Sales Agent untuk Mahkota Cileunyi: iklan Meta dan Google, percakapan WhatsApp, lead scoring, survei, dan fee per closing.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#14213d" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} ${bricolage.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
