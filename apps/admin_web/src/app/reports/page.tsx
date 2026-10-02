"use client";

import Header from "@/components/Header";
import { Download, FileText, Calendar, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ReportsPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = (type: string) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`RESAVO Public-Benefit ${type} Impact Audit Report downloaded successfully.`);
    }, 1000);
  };

  return (
    <div className="flex-1 pb-12">
      <Header title="Impact Audit Reports & Data Export" />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl border border-borderCustom shadow-sm space-y-6">
          <div className="border-b border-borderCustom pb-4">
            <h3 className="text-base font-bold text-navy-900">Generate Public Impact Audit Reports</h3>
            <p className="text-xs text-slate-500">Download verified outcome records for municipal, NGO, and public transparency compliance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-borderCustom bg-canvas/40 space-y-4">
              <div className="p-3 bg-navy-900 text-white rounded-lg w-fit"><FileText className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-navy-900 text-base">Monthly Verified Impact Audit</h4>
                <p className="text-xs text-slate-500 mt-1">Full audit ledger of preserved resources, INR value, and avoided trips for current month</p>
              </div>
              <button
                onClick={() => handleDownload("Monthly")}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-lg transition"
              >
                <Download className="w-4 h-4" /> Download Monthly CSV / JSON
              </button>
            </div>

            <div className="p-6 rounded-xl border border-borderCustom bg-canvas/40 space-y-4">
              <div className="p-3 bg-impact-500 text-white rounded-lg w-fit"><Calendar className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-navy-900 text-base">Annual Public Benefit Summary</h4>
                <p className="text-xs text-slate-500 mt-1">High-level executive summary report formatted for public governance stakeholders</p>
              </div>
              <button
                onClick={() => handleDownload("Annual Summary")}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-impact-500 hover:bg-impact-600 text-white text-xs font-bold rounded-lg transition"
              >
                <Download className="w-4 h-4" /> Download Annual PDF Report
              </button>
            </div>

            <div className="p-6 rounded-xl border border-borderCustom bg-canvas/40 space-y-4">
              <div className="p-3 bg-route-500 text-white rounded-lg w-fit"><CheckCircle2 className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-navy-900 text-base">Transfer Feasibility Audit</h4>
                <p className="text-xs text-slate-500 mt-1">Detailed log of decision engine local-alternative checks and avoided transfers</p>
              </div>
              <button
                onClick={() => handleDownload("Transfer Feasibility")}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-route-500 hover:bg-route-600 text-white text-xs font-bold rounded-lg transition"
              >
                <Download className="w-4 h-4" /> Download Feasibility Audit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
