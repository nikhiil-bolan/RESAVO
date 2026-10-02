"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Info, Store, ShoppingBag, ShieldCheck } from "lucide-react";

export default function SourceComparisonPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-route-600 uppercase tracking-wider bg-route-50 px-2.5 py-0.5 rounded-full border border-route-100">
          Source Comparison & Feasibility Evaluation
        </span>
        <h1 className="text-2xl font-black text-navy-900 mt-2">Compare Supply Sources</h1>
        <p className="text-xs text-slate-500">
          Need: <strong>3 kg Milk by 5:00 PM</strong> • Requester: <strong>Golden Grain Bakery</strong>
        </p>
      </div>

      {/* Notice Banner */}
      <div className="bg-white p-5 rounded-2xl border border-route-500/30 shadow-card flex items-start gap-3">
        <Info className="w-5 h-5 text-route-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-navy-900 block">Explainable Feasibility Reasoning:</strong>
          RESAVO ranks options based on need fit, time constraints, route burden, and existing local supply chains.
          A match does not automatically force a transfer when a local store can serve you better.
        </div>
      </div>

      {/* Option Cards List (Section 15 in Spec!) */}
      <div className="space-y-6">
        {/* OPTION A — RECOMMENDED SOURCE */}
        <div className="bg-white p-6 rounded-2xl border-2 border-impact-500 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-impact-600 bg-impact-50 border border-impact-100 px-3 py-1 rounded-full uppercase tracking-wider">
              OPTION A — RECOMMENDED SOURCE
            </span>
            <span className="text-xs font-bold text-impact-600 bg-impact-50 px-2.5 py-0.5 rounded">
              0.3 km away
            </span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-navy-900">Local Milk Shop</h3>
              <p className="text-xs text-slate-500 mt-0.5">300 m from Bakery • Buyer Pickup • Available before 5 PM</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-navy-900">₹ 180</div>
              <span className="text-[10px] text-slate-400">Store price</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-impact-50/40 border border-impact-500/20 text-xs text-navy-900 space-y-1">
            <span className="font-bold text-impact-600 block">Feasibility Reason:</span>
            <p className="text-slate-700 leading-relaxed">
              Recommended because the quantity matches your need and the verified local supplier satisfies your requirement without creating an extra vehicle transfer trip.
            </p>
          </div>
        </div>

        {/* OPTION B — FAMILY ALTERNATIVE */}
        <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-route-600 bg-route-50 border border-route-100 px-3 py-1 rounded-full uppercase tracking-wider">
              OPTION B — FAMILY OFFER
            </span>
            <span className="text-xs font-semibold text-slate-500">
              1.0 km away
            </span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-navy-900">Family Asha Offer</h3>
              <p className="text-xs text-slate-500 mt-0.5">3 kg milk • Indiranagar 100ft Rd • Buyer Pickup</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-navy-900">₹ 165</div>
              <span className="text-[10px] text-slate-400">Offer price</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-canvas border border-borderCustom text-xs text-navy-900 space-y-1">
            <span className="font-bold text-slate-600 block">Feasibility Reason:</span>
            <p className="text-slate-600 leading-relaxed">
              Alternative — lower item price (₹165 vs ₹180), but creates a 1.0 km transit route burden compared to the 300m local shop.
            </p>
          </div>
        </div>

        {/* OPTION C — PRODUCER B */}
        <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card opacity-70 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
              OPTION C — PRODUCER B
            </span>
            <span className="text-xs text-slate-400">2.1 km away</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-700">Producer B</h3>
              <p className="text-xs text-slate-400 mt-0.5">Seller Drop • Estimated arrival 6:30 PM</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-slate-500">₹ 150</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-canvas border border-borderCustom text-xs text-slate-500 space-y-1">
            <span className="font-bold text-slate-600 block">Feasibility Reason:</span>
            <p className="text-slate-500">Not feasible in requested time window (arrives after 5:00 PM deadline).</p>
          </div>
        </div>
      </div>
    </main>
  );
}
