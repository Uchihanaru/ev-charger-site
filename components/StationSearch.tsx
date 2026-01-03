"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Station = {
  ID: string;
  'Station Name': string;
  City: string;
  State: string;
  'EV Network': string;
};

export default function StationSearch({ stations }: { stations: Station[] }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredStations = stations.filter((station) => {
    const searchContent = (station['Station Name'] + station.City + station.State).toLowerCase();
    return searchContent.includes(query.toLowerCase());
  });

  const visibleStations = filteredStations.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(24);
  }, [query]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 24);
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div className="bg-slate-900 text-white py-12 px-4 md:py-20 md:px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/20 to-slate-900 z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-emerald-400 font-bold tracking-wider text-xs md:text-sm uppercase mb-2 block">
            The #1 EV Directory
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight">
            Power Up Your Journey.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Instantly locate {stations.length}+ verified charging stations.
          </p>
          
          {/* SEARCH BAR */}
          <div className="bg-white p-1.5 rounded-full max-w-lg mx-auto flex shadow-xl mb-8">
            <input 
              type="text" 
              placeholder="City (e.g. Austin)..." 
              className="flex-1 px-4 py-3 rounded-full text-slate-900 outline-none text-base" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-bold transition text-sm md:text-base">
              Search
            </button>
          </div>

          {/* 👇👇👇 STEP 4: THE DOWNLOAD BUTTON 👇👇👇 */}
                    {/* 👆👆👆 END BUTTON 👆👆👆 */}

        </div>
      </div>

      {/* RESULTS LIST */}
      <div id="locations" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            {query ? `Results for "${query}"` : "Nearby Locations"}
          </h2>
          <span className="text-xs md:text-sm text-slate-500">
            Showing {visibleStations.length} of {filteredStations.length}
          </span>
        </div>

        {filteredStations.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No stations found.</p>
            <button onClick={() => setQuery("")} className="text-emerald-600 font-bold mt-2">Clear Search</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleStations.map((station) => (
                <Link 
                  key={station.ID}
                  href={`/company/${station.ID}`}
                  className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg active:scale-95 transition duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg">⚡</div>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase">
                        {station['EV Network']?.slice(0, 10) || 'Public'}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1 leading-tight">
                      {station['Station Name']}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {station.City}, {station.State}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-sm text-emerald-600 font-bold">
                    Tap for Details →
                  </div>
                </Link>
              ))}
            </div>

            {visibleCount < filteredStations.length && (
              <div className="mt-12 text-center">
                <button 
                  onClick={handleLoadMore}
                  className="bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 font-bold py-3 px-8 rounded-full transition shadow-sm"
                >
                  Load More Stations ↓
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}