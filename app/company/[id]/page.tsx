import { getStations, getStationById } from '../../../lib/companies';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// --- AI CONTENT ENGINE ---
function generateArticle(station: any) {
  const city = station.City;
  const state = station.State;
  const name = station['Station Name'];
  const network = station['EV Network'] || "local charging networks";
  const address = station['Street Address'];

  const intros = [
    `As electric vehicle adoption continues to rise in ${city}, finding reliable charging infrastructure has never been more important.`,
    `For EV drivers traveling through ${state}, knowing where to stop is crucial. ${city} is becoming a key hub for green transportation.`,
    `Whether you are a local resident of ${city} or just passing through, keeping your battery full is essential.`
  ];
  const randomIntro = intros[name.length % intros.length];

  return (
    <article className="prose prose-slate lg:prose-lg mt-12 max-w-none mb-20">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="text-emerald-500">📖</span> Guide to Charging
      </h2>
      <p className="mb-6 text-slate-600 leading-relaxed">
        {randomIntro} This location at <b>{address}</b> is a vital link in the {state} EV corridor. 
        As part of the <b>{network}</b>, it offers drivers a dependable place to recharge.
      </p>
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 my-8">
        <p className="text-emerald-800 font-medium text-sm">
          <strong>Travel Tip:</strong> Always check your EV app for real-time availability before heading to {address}.
        </p>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const stations = await getStations();
  return stations.map((station) => ({
    id: station.ID,
  }));
}

export default async function StationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const station = await getStationById(id);

  if (!station) {
    return notFound();
  }

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station['Street Address'] + " " + station.City + " " + station.State)}`;

  return (
    <main className="bg-slate-50 min-h-screen pb-24"> {/* Extra padding at bottom for sticky bar */}
      
      {/* HEADER BACKGROUND */}
      <div className="bg-slate-900 h-40 w-full absolute top-16 left-0 z-0"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 pt-6">
        <Link href="/" className="text-slate-300 hover:text-white text-sm font-medium mb-4 inline-block">
          ← Back to Directory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: MAIN INFO */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                  Verified
                </span>
                <span className="text-slate-500 text-xs">{station['EV Network']}</span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
                {station['Station Name']}
              </h1>
              
              <div className="flex items-start text-slate-500 mb-6 text-sm">
                <span className="mr-2 mt-1">📍</span>
                {station['Street Address']}, {station.City}, {station.State} {station.ZIP}
              </div>

              {/* DESKTOP BUTTONS (Hidden on Mobile) */}
              <div className="hidden md:flex gap-4 mb-8">
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md text-center"
                >
                  Get Directions
                </a>
                <button className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 px-6 rounded-lg transition">
                  Report Issue
                </button>
              </div>

              {/* DATA GRID */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">City</p>
                  <p className="text-slate-900 font-medium text-sm">{station.City}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Network</p>
                  <p className="text-slate-900 font-medium text-sm">{station['EV Network'] || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* AI ARTICLE */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
              {generateArticle(station)}
            </div>
          </div>

          {/* RIGHT COLUMN: AD SPACE */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">Sponsored</p>
              <div className="h-40 bg-slate-200 rounded flex items-center justify-center text-slate-400 text-sm">
                AdSense / Amazon
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- STICKY MOBILE DRIVER BAR --- */}
      {/* This only shows on mobile screens at the bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex gap-3">
        <a 
          href={googleMapsUrl}
          target="_blank"
          className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-lg text-center shadow-lg active:bg-emerald-700"
        >
          Navigate ↗
        </a>
        <button className="bg-slate-100 text-slate-600 font-bold py-3 px-4 rounded-lg border border-slate-200">
          Share
        </button>
      </div>

    </main>
  );
}