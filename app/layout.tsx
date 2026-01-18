import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Noema — Language Mentor",
  description: "Minimalist advanced-vocabulary mentor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* UK Flag background - exactly as in screenshot */}
        <div 
          className="fixed inset-0 -z-20"
          style={{
            backgroundImage: 'url(/uk-flag-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* White overlay - semi-transparent as in screenshot; keep below route-specific backgrounds */}
        <div className="fixed inset-0 bg-white/85 -z-30" />
        
        {/* App content */}
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}
