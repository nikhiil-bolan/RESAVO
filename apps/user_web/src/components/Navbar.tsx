"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "./RoleContext";
import {
  Store,
  ShoppingBag,
  PlusCircle,
  Truck,
  TrendingUp,
  ExternalLink,
  Sparkles,
  ArrowRightLeft
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { role, setRole } = useRole();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-borderCustom shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-impact-500 to-impact-600 flex items-center justify-center text-white font-black text-xl shadow-glowGreen group-hover:scale-105 transition-transform">
              R
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-navy-900 block leading-none">
                RESAVO
              </span>
              <span className="text-[10px] font-semibold text-impact-600 tracking-wider uppercase">
                Resource Preservation Network
              </span>
            </div>
          </Link>

          {/* Role Switcher Pills (Seller <-> Buyer) */}
          <div className="bg-canvas border border-borderCustom p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setRole("SELLER")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === "SELLER"
                  ? "bg-navy-800 text-white shadow-card"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <Store className="w-3.5 h-3.5 text-impact-500" />
              <span>Seller Portal</span>
            </button>
            <button
              onClick={() => setRole("BUYER")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === "BUYER"
                  ? "bg-route-500 text-white shadow-card"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-sky-200" />
              <span>Buyer Portal</span>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              pathname === "/" ? "bg-navy-50 text-navy-800" : "text-slate-600 hover:bg-canvas"
            }`}
          >
            Dashboard
          </Link>

          {role === "SELLER" ? (
            <Link
              href="/create-offer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-impact-500 hover:bg-impact-600 text-white shadow-sm transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Post Offer
            </Link>
          ) : (
            <Link
              href="/create-need"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-route-500 hover:bg-route-600 text-white shadow-sm transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Post Need
            </Link>
          )}

          <Link
            href="/compare-sources"
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              pathname === "/compare-sources" ? "bg-navy-50 text-navy-800" : "text-slate-600 hover:bg-canvas"
            }`}
          >
            Source Comparison
          </Link>

          <Link
            href="/transfers"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              pathname === "/transfers" ? "bg-navy-50 text-navy-800" : "text-slate-600 hover:bg-canvas"
            }`}
          >
            <Truck className="w-3.5 h-3.5" /> Transfers
          </Link>

          <Link
            href="/impact"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              pathname === "/impact" ? "bg-impact-50 text-impact-600 font-extrabold" : "text-slate-600 hover:bg-canvas"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> My Impact
          </Link>

          <div className="h-5 w-px bg-borderCustom mx-1"></div>

          {/* Quick link to Admin Console */}
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold bg-amberCustom-50 text-amberCustom-600 border border-amberCustom-500/30 hover:bg-amberCustom-100 transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> Admin Console <ExternalLink className="w-3 h-3" />
          </a>
        </nav>
      </div>
    </header>
  );
}
