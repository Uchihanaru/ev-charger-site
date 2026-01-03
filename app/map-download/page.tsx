import Link from "next/link";
import AdBanner from "@/components/AdBanner"; // This shows your manual ad box

export default function MapDownloadLanding() {
  return (
    <main className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center">
        
        {/* ICON & TITLE */}
        <div className="text-6xl mb-4">🗺️</div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Download Offline Map
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Get the complete PDF database of all 50,000+ charging stations. 
          <br />
          <span className="text-emerald-600 font-bold">Updated for 2026.</span>
        </p>

        {/* AD SPACE (Money Maker) */}
        <div className="mb-8 min-h-[100px] bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-300">
           <AdBanner />
        </div>

        {/* THE START BUTTON */}
        {/* This links to /next-step which generates the first SECRET TOKEN */}
        <a 
          href="/next-step" 
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95"
        >
          Start Download ⬇
        </a>

        {/* TRUST BADGES */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs text-slate-400">
          <div className="flex flex-col items-center">
            <span className="text-lg mb-1">🔒</span>
            <span>Secure</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg mb-1">⚡</span>
            <span>Fast</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg mb-1">🛡️</span>
            <span>Virus Free</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-300 mt-4">
          File size: 45MB • PDF Format
        </p>
      </div>

    </main>
  );
}