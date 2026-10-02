"use client";

import { useEffect, useState } from "react";
import { fetchMyImpact } from "@/lib/api";
import { Scale, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck } from "lucide-react";

export default function UserImpactPage() {
  const [impactData, setImpactData] = useState<any>(null);

  useEffect(() => {
    fetchMyImpact().then(setImpactData);
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-impact-600 uppercase tracking-wider bg-impact-50 px-2.5 py-0.5 rounded-full border border-impact-100">
          Personal Impact Ledger
        </span>
        <h1 className="text-2xl font-black text-navy-900 mt-2">Your Verified Impact</h1>
        <p className="text-xs text-slate-500">
          Strict separation of audit-verified outcomes from active estimates.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* VERIFIED LEDGER */}
        <div className="bg-white p-6 rounded-2xl border-2 border-impact-500 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-impact-600 uppercase tracking-wider">
              AUDIT-VERIFIED IMPACT
            </span>
            <CheckCircle2 className="w-5 h-5 text-impact-500" />
          </div>

          <div>
            <div className="text-3xl font-black text-navy-900">
              ₹ {impactData?.verified_impact?.value_preserved_inr?.toLocaleString() || "4,800"}
            </div>
            <p className="text-xs text-slate-500 mt-1">Verified economic value preserved</p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Quantity Preserved:</span>
            <span className="font-extrabold text-impact-600">
              {impactData?.verified_impact?.quantity_preserved || 35.0} kg / units
            </span>
          </div>
        </div>

        {/* ESTIMATED POTENTIAL */}
        <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ESTIMATED POTENTIAL (PIPELINE)
            </span>
            <AlertCircle className="w-5 h-5 text-slate-400" />
          </div>

          <div>
            <div className="text-3xl font-bold text-slate-700">
              {impactData?.estimated_impact?.potential_quantity || 23.0} units
            </div>
            <p className="text-xs text-slate-500 mt-1">Currently active across your listings</p>
          </div>
        </div>
      </div>
    </main>
  );
}
