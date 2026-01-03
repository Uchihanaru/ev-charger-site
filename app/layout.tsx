import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AdSenseScript from "@/components/AdSenseScript"; // <--- Importing your ID script

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChargeFinder US | EV Station Directory",
  description: "Find electric vehicle charging stations across the USA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <AdSenseScript /> {/* <--- Activating your ID here */}
        <Navbar />
        {children}
        <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="mb-4">© 2026 ChargeFinder US. All rights reserved.</p>
            <p className="text-xs text-slate-600">
              Data provided by NREL. Not affiliated with any charging network.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}