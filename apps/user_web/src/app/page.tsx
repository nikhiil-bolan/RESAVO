"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRole } from "@/components/RoleContext";
import { fetchMyOffers } from "@/lib/api";
import AuthModal from "@/components/AuthModal";
import {
  Store,
  ShoppingBag,
  Plus,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  MapPin,
  Tag,
  UserCheck,
  ShieldCheck
} from "lucide-react";

export default function UserDashboardPage() {
  const { role } = useRole();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: "Asha Sharma",
    email: "asha.sharma@resavo.org"
  });

  useEffect(() => {
    fetchMyOffers().then((data) => {
      setOffers(data);
      setLoading(false);
    });
  }, []);

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  if (role === "SELLER") {
    return (
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {showAuthModal && (
          <AuthModal
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setShowAuthModal(false)}
          />
        )}

        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-borderCustom shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-impact-500 to-impact-600 text-white flex items-center justify-center text-2xl font-black shadow-glowGreen">
              {user ? user.name.substring(0, 2).toUpperCase() : "AS"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-impact-600 uppercase tracking-wider bg-impact-50 px-2.5 py-0.5 rounded-full border border-impact-100">
                  Verified Seller & Provider
                </span>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-xs font-bold text-navy-800 hover:underline flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5 text-impact-600" /> Switch User Account
                </button>
              </div>
              <h1 className="text-2xl font-black text-navy-900 mt-1">Good morning, {user?.name || "Asha"}</h1>
              <p className="text-xs text-slate-500">3 active resource offers need your attention</p>
            </div>
          </div>
          <Link
            href="/create-offer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-impact-500 hover:bg-impact-600 text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Post New Resource Offer
          </Link>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Offers</span>
              <div className="text-3xl font-black text-navy-900 mt-1">{offers.length.toString().padStart(2, "0")}</div>
              <p className="text-xs text-slate-500 mt-1">Listed in local network</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-navy-50 text-navy-800">
              <Store className="w-7 h-7" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matches Today</span>
              <div className="text-3xl font-black text-route-500 mt-1">03</div>
              <p className="text-xs text-slate-500 mt-1">Evaluated by decision engine</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-route-50 text-route-500">
              <Sparkles className="w-7 h-7" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Value Preserved</span>
              <div className="text-3xl font-black text-impact-500 mt-1">₹ 1,240</div>
              <p className="text-xs text-slate-500 mt-1">Audit-verified impact</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-impact-50 text-impact-500">
              <CheckCircle className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Featured Priority Offer Card */}
        <div className="bg-white p-6 rounded-2xl border-2 border-impact-500/40 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-extrabold text-impact-600 bg-impact-50 border border-impact-100 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Your Highest-Priority Offer
            </span>
            <span className="text-xs font-semibold text-slate-400">Time Sensitive</span>
          </div>

          <div className="p-4 rounded-xl bg-canvasWarm border border-borderCustom flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-impact-500/15 text-impact-600 font-extrabold text-sm flex items-center justify-center border border-impact-500/20">
                MILK
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-navy-900">3 kg Milk</h3>
                <p className="text-xs text-slate-500">
                  Available until 6:00 PM • Freshness verified by user declaration
                </p>
              </div>
            </div>

            <Link
              href="/match-decision/match-bakery-1"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-impact-500 hover:bg-impact-600 text-white text-xs font-bold shadow-sm transition"
            >
              Find Best Match <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-canvas p-3.5 rounded-xl border border-borderCustom text-xs space-y-1">
            <span className="font-bold text-navy-900 block">Why this is priority:</span>
            <p className="text-slate-600">High time sensitivity + no confirmed use at home within the next 4 hours.</p>
          </div>
        </div>

        {/* Active Listings Grid */}
        <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card space-y-4">
          <h2 className="text-base font-bold text-navy-900">Your Active Resource Listings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-borderCustom bg-canvas/30 hover:border-navy-800/30 transition space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.address_approx}</p>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase ${
                      item.at_risk
                        ? "bg-amberCustom-50 text-amberCustom-600 border-amberCustom-500/30"
                        : "bg-impact-50 text-impact-600 border-impact-500/20"
                    }`}
                  >
                    {item.at_risk ? "AT RISK" : "ACTIVE"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <span>Mode: <strong>{item.offer_mode}</strong></span>
                  <Link
                    href={`/offers/${item.id}`}
                    className="text-impact-600 font-bold hover:underline flex items-center gap-1"
                  >
                    View Details & Location <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // BUYER DASHBOARD VIEW WITH RECENT MARKETPLACE FEED
  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {showAuthModal && (
        <AuthModal
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-borderCustom shadow-card">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-route-500 to-route-600 text-white flex items-center justify-center text-2xl font-black shadow-glowBlue">
            GG
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-route-600 uppercase tracking-wider bg-route-50 px-2.5 py-0.5 rounded-full border border-route-100">
                Verified Commercial Buyer
              </span>
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-xs font-bold text-navy-800 hover:underline flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5 text-route-600" /> Switch Account
              </button>
            </div>
            <h1 className="text-2xl font-black text-navy-900 mt-1">Golden Grain Bakery</h1>
            <p className="text-xs text-slate-500">12th Main Indiranagar • Bakery Production</p>
          </div>
        </div>
        <Link
          href="/create-need"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-route-500 hover:bg-route-600 text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" /> Post Resource Need
        </Link>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card space-y-4">
        <h2 className="text-xl font-extrabold text-navy-900">What do you need?</h2>
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search milk, clothes, vegetables, books..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-borderCustom text-sm focus:outline-none focus:border-route-500 bg-canvas/30"
          />
        </div>
      </div>

      {/* Active Need Card */}
      <div className="bg-navy-900 text-white p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-navy-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amberCustom-500 animate-pulse"></span>
            <h3 className="font-extrabold text-base tracking-wide uppercase text-white">
              NEED: 3 kg milk by 5:00 PM
            </h3>
          </div>
          <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amberCustom-500" /> Deadline Active
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Best available option is not always the nearest seller. RESAVO checks local suppliers and route feasibility.
        </p>

        <Link
          href="/compare-sources"
          className="w-full flex items-center justify-center gap-2 py-3 bg-route-500 hover:bg-route-600 text-white font-bold text-sm rounded-xl transition shadow-md"
        >
          Compare Supply Sources <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* RECENT MARKETPLACE FEED (SHOWS CREATED SELLER OFFERS TO BUYERS!) */}
      <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-navy-900">Recent Live Available Offers</h3>
            <p className="text-xs text-slate-500">Latest surplus offers posted by nearby sellers & families</p>
          </div>
          <span className="text-xs font-bold text-impact-600 bg-impact-50 px-2.5 py-0.5 rounded-full border border-impact-100">
            {offers.length} Live Items
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-borderCustom bg-canvas/40 hover:border-impact-500/50 transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Category: {item.category}
                  </span>
                  <h4 className="font-extrabold text-navy-900 text-base mt-0.5">{item.title}</h4>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-impact-600">
                    {item.expected_price > 0 ? `₹ ${item.expected_price}` : "FREE"}
                  </div>
                  <span className="text-[10px] text-slate-400">{item.offer_mode}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {item.address_approx}
              </p>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Provider: Asha Household</span>
                <Link
                  href={`/offers/${item.id}`}
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-extrabold rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  View Details & Location <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
