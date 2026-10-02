"use client";

import { useState } from "react";
import { Truck, CheckCircle2, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function TransfersPage() {
  const [transferState, setTransferState] = useState("IN_TRANSIT");
  const [verifying, setVerifying] = useState(false);

  const handleConfirmReceipt = () => {
    setVerifying(true);
    setTimeout(() => {
      setTransferState("COMPLETED");
      setVerifying(false);
    }, 600);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-route-600 uppercase tracking-wider bg-route-50 px-2.5 py-0.5 rounded-full border border-route-100">
          Transfer & Verification Lifecycle
        </span>
        <h1 className="text-2xl font-black text-navy-900 mt-2">Active Transfers Tracking</h1>
        <p className="text-xs text-slate-500">
          Separate verification events: Pickup confirmation (Step 1) and Receipt confirmation (Step 2).
        </p>
      </div>

      {/* Active Transfer Card */}
      <div className="bg-white p-6 rounded-2xl border border-borderCustom shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-slate-400">TRANSFER ID: TR-8841</span>
            <h3 className="text-xl font-extrabold text-navy-900 mt-0.5">20 Warm Clothes</h3>
            <p className="text-xs text-slate-500">Provider: Asha Household → Requester: Hope Foundation NGO</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-extrabold border ${
            transferState === "COMPLETED"
              ? "bg-impact-50 text-impact-600 border-impact-500/30"
              : "bg-route-50 text-route-600 border-route-500/30"
          }`}>
            {transferState === "COMPLETED" ? "COMPLETED & VERIFIED" : "IN TRANSIT"}
          </span>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-impact-500 text-white rounded-full"><CheckCircle2 className="w-4 h-4" /></div>
            <div>
              <h4 className="font-bold text-navy-900 text-sm">Match Accepted</h4>
              <p className="text-xs text-slate-500">Task generated for 20 clothes at low price offer mode.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-impact-500 text-white rounded-full"><CheckCircle2 className="w-4 h-4" /></div>
            <div>
              <h4 className="font-bold text-navy-900 text-sm">Pickup Confirmed (Step 1)</h4>
              <p className="text-xs text-slate-500">Provider verified 20 pieces in good condition at pickup.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full text-white ${transferState === "COMPLETED" ? "bg-impact-500" : "bg-route-500"}`}>
              {transferState === "COMPLETED" ? <CheckCircle2 className="w-4 h-4" /> : <Truck className="w-4 h-4 animate-pulse" />}
            </div>
            <div>
              <h4 className="font-bold text-navy-900 text-sm">In Transit</h4>
              <p className="text-xs text-slate-500">Courier en route to Koramangala 5th Block Shelter.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full text-white ${transferState === "COMPLETED" ? "bg-impact-500" : "bg-slate-300"}`}>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-navy-900 text-sm">Receipt Confirmed (Step 2 — Impact Entry)</h4>
              <p className="text-xs text-slate-500">Receiver confirms quantity received and condition.</p>
            </div>
          </div>
        </div>

        {/* Verification Action Button */}
        {transferState === "IN_TRANSIT" ? (
          <button
            onClick={handleConfirmReceipt}
            disabled={verifying}
            className="w-full py-3.5 bg-impact-500 hover:bg-impact-600 text-white font-extrabold text-sm rounded-xl shadow-md transition"
          >
            {verifying ? "Recording Verification..." : "Confirm Receipt & Verify Impact"}
          </button>
        ) : (
          <div className="p-4 bg-impact-50 border border-impact-500/30 rounded-xl text-center text-xs font-extrabold text-impact-600">
            ✓ Handover Completed & Audit-Verified in Impact Ledger (₹4,500 value added)
          </div>
        )}
      </div>
    </main>
  );
}
