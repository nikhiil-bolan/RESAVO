"use client";

import Header from "@/components/Header";
import { CheckCircle2, AlertCircle, ArrowUpRight, Scale } from "lucide-react";

export default function ImpactLedgerPage() {
  return (
    <div className="flex-1 pb-12">
      <Header title="Public-Benefit Verified Impact Ledger" />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Core Principle Notice */}
        <div className="bg-white p-6 rounded-xl border border-impact-500/30 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-impact-500 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" /> Verified Outcome Audit Standard
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            RESAVO strictly counts impact only after explicit receipt verification by the recipient or institutional administrator.
            Estimated availability and active listings are tracked separately to maintain public transparency and auditability.
          </p>
        </div>

        {/* Verified vs Estimated Side-by-Side Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* VERIFIED LEDGER */}
          <div className="bg-white p-6 rounded-xl border-2 border-impact-500 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-impact-500 uppercase tracking-wider">Audit Confirmed</span>
                <h3 className="text-xl font-extrabold text-navy-900">VERIFIED IMPACT LEDGER</h3>
              </div>
              <div className="p-2 bg-impact-50 text-impact-500 rounded-lg"><Scale className="w-6 h-6" /></div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-canvas">
                <span className="text-xs font-semibold text-slate-600">Total Quantity Preserved</span>
                <span className="text-lg font-black text-navy-900">86,400 kg / units</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-canvas">
                <span className="text-xs font-semibold text-slate-600">Verified Economic Value Preserved</span>
                <span className="text-lg font-black text-impact-500">₹18,60,000</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-canvas">
                <span className="text-xs font-semibold text-slate-600">Unnecessary Transfers Avoided</span>
                <span className="text-lg font-black text-route-500">1,240 trips</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-canvas">
                <span className="text-xs font-semibold text-slate-600">Completed Verified Handovers</span>
                <span className="text-lg font-black text-navy-900">8,640 handovers</span>
              </div>
            </div>
          </div>

          {/* ESTIMATED POTENTIAL */}
          <div className="bg-white p-6 rounded-xl border border-borderCustom shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unverified Pipeline</span>
                <h3 className="text-xl font-extrabold text-slate-700">ESTIMATED POTENTIAL</h3>
              </div>
              <div className="p-2 bg-slate-100 text-slate-500 rounded-lg"><AlertCircle className="w-6 h-6" /></div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-canvas">
                <span className="text-xs font-semibold text-slate-500">Active Offers Available</span>
                <span className="text-lg font-bold text-slate-700">12,400 kg / units</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-canvas">
                <span className="text-xs font-semibold text-slate-500">Estimated Potential Value</span>
                <span className="text-lg font-bold text-slate-700">₹2,40,000</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-canvas">
                <span className="text-xs font-semibold text-slate-500">Pending Handover Verifications</span>
                <span className="text-lg font-bold text-amberCustom-500">42 handovers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Table */}
        <div className="bg-white rounded-xl border border-borderCustom shadow-sm overflow-hidden">
          <div className="p-6 border-b border-borderCustom">
            <h3 className="text-base font-bold text-navy-900">Resource Preservation by Item Family</h3>
            <p className="text-xs text-slate-500">Verified quantities and preserved value grouped by item category</p>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-borderCustom text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 pl-6">Item Category</th>
                <th className="p-4">Verified Quantity</th>
                <th className="p-4">Unit Value (Est. Avg)</th>
                <th className="p-4">Total Verified Value (INR)</th>
                <th className="p-4 pr-6">Primary Recipients</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderCustom text-sm">
              <tr className="hover:bg-canvas/50">
                <td className="p-4 pl-6 font-semibold text-navy-900">Clothing & Apparel</td>
                <td className="p-4 text-slate-700">32,100 pieces</td>
                <td className="p-4 text-slate-500">₹300 / piece</td>
                <td className="p-4 font-bold text-impact-500">₹9,63,000</td>
                <td className="p-4 pr-6 text-slate-600">NGO Shelters, Community Drives</td>
              </tr>
              <tr className="hover:bg-canvas/50">
                <td className="p-4 pl-6 font-semibold text-navy-900">Fresh Food & Produce</td>
                <td className="p-4 text-slate-700">28,400 kg</td>
                <td className="p-4 text-slate-500">₹40 / kg</td>
                <td className="p-4 font-bold text-impact-500">₹1,13,600</td>
                <td className="p-4 pr-6 text-slate-600">Community Kitchens, Families</td>
              </tr>
              <tr className="hover:bg-canvas/50">
                <td className="p-4 pl-6 font-semibold text-navy-900">Dairy & Milk</td>
                <td className="p-4 text-slate-700">14,200 kg</td>
                <td className="p-4 text-slate-500">₹60 / kg</td>
                <td className="p-4 font-bold text-impact-500">₹8,52,000</td>
                <td className="p-4 pr-6 text-slate-600">Local Bakeries, Institutional Kitchens</td>
              </tr>
              <tr className="hover:bg-canvas/50">
                <td className="p-4 pl-6 font-semibold text-navy-900">Education & Textbooks</td>
                <td className="p-4 text-slate-700">11,700 books</td>
                <td className="p-4 text-slate-500">₹150 / book</td>
                <td className="p-4 font-bold text-impact-500">₹1,75,500</td>
                <td className="p-4 pr-6 text-slate-600">Primary Schools, Student NGOs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
