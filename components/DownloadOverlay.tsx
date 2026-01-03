"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function DownloadOverlay() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); 
  const displayStep = searchParams.get("display"); // Only used for showing text "1 of 7"

  const [timeLeft, setTimeLeft] = useState(15);
  const [isReady, setIsReady] = useState(false);

  // If no token, hide the box (Real users won't see this)
  if (!token) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-blue-600 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-center md:text-left">
          <h3 className="font-bold text-slate-900 text-lg">
            Download in Progress... (Step {displayStep || 1} of 7)
          </h3>
          <p className="text-sm text-slate-500">
            Please browse this station details while you wait.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {!isReady ? (
            <div className="bg-slate-100 px-6 py-3 rounded-full font-mono font-bold text-blue-600 text-xl">
              Wait {timeLeft}s
            </div>
          ) : (
            <a
              // 👇 WE SEND THE SCRAMBLED TOKEN BACK 👇
              href={`/next-step?token=${token}`}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold shadow-lg animate-bounce transition"
            >
              {Number(displayStep) === 7 ? "Download File ⬇" : "Next Step ➡"}
            </a>
          )}
        </div>

      </div>
    </div>
  );
}