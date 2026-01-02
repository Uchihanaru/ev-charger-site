"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="text-emerald-400 text-2xl">⚡</span> 
          ChargeFinder<span className="text-emerald-400">US</span>
        </Link>
        
        {/* DESKTOP MENU (Hidden on Mobile) */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <a href="#locations" className="hover:text-white transition">Locations</a>
          <a href="https://www.google.com/maps/search/electric+vehicle+charging+station" target="_blank" className="hover:text-white transition">Map</a>
        </div>

        {/* GET APP BUTTON (Desktop) */}
        <button 
          onClick={() => alert("Mobile App Coming Soon!")}
          className="hidden md:block bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold transition"
        >
          Get App
        </button>

        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white focus:outline-none"
        >
          {/* Hamburger Icon SVG */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="flex flex-col p-4 space-y-4">
            <Link href="/" className="text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
            <a href="#locations" className="text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Locations</a>
            <a href="https://www.google.com/maps/search/ev+charging" target="_blank" className="text-slate-300 hover:text-white">Open Map App</a>
            <button className="bg-emerald-500 text-white py-3 rounded-lg font-bold w-full">
              Download App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}