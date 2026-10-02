"use client";

import Header from "@/components/Header";
import { Truck, Clock, CheckCircle2, AlertOctagon, Filter } from "lucide-react";

export default function OperationsPage() {
  const transfers = [
    {
      id: "TR-8841",
      offer: "20 Usable Warm Clothes",
      provider: "Asha Household (Indiranagar)",
      requester: "Hope Foundation NGO (Koramangala)",
      mode: "Buyer Pickup",
      status: "IN_TRANSIT",
      statusLabel: "In Transit",
      statusColor: "bg-route-50 text-route-500 border-route-500/20",
      time: "20 min ago"
    },
    {
      id: "TR-8842",
      offer: "8 kg Fresh Vegetables",
      provider: "Green Valley Kitchen (MG Road)",
      requester: "Community Kitchen",
      mode: "Seller Drop",
      status: "PICKED_UP",
      statusLabel: "Picked Up",
      statusColor: "bg-amberCustom-50 text-amberCustom-500 border-amberCustom-500/20",
      time: "45 min ago"
    },
    {
      id: "TR-8840",
      offer: "15 Textbooks & Books",
      provider: "Patel Family",
      requester: "Vidya Niketan Primary School",
      mode: "Buyer Pickup",
      status: "COMPLETED",
      statusLabel: "Completed & Verified",
      statusColor: "bg-impact-50 text-impact-500 border-impact-500/20",
      time: "2 hours ago"
    },
  ];

  return (
    <div className="flex-1 pb-12">
      <Header title="Live Operations & Transfer Lifecycle" />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Operations Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl border border-borderCustom shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Assigned Transfers</span>
            <div className="text-2xl font-extrabold text-navy-900 mt-1">14</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-borderCustom shadow-sm">
            <span className="text-xs font-semibold text-route-500 uppercase">In Transit / Pickup</span>
            <div className="text-2xl font-extrabold text-route-500 mt-1">28</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-borderCustom shadow-sm">
            <span className="text-xs font-semibold text-impact-500 uppercase">Completed Today</span>
            <div className="text-2xl font-extrabold text-impact-500 mt-1">142</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-borderCustom shadow-sm">
            <span className="text-xs font-semibold text-amberCustom-500 uppercase">Delayed / Alert</span>
            <div className="text-2xl font-extrabold text-amberCustom-500 mt-1">2</div>
          </div>
        </div>

        {/* Live Transfer Lifecycle Table */}
        <div className="bg-white rounded-xl border border-borderCustom shadow-sm overflow-hidden">
          <div className="p-6 border-b border-borderCustom flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy-900">Active Transfer Tracking</h3>
              <p className="text-xs text-slate-500">Real-time status of resource transfers across the network</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-canvas border border-borderCustom rounded-lg text-slate-600 hover:bg-slate-100 transition">
                <Filter className="w-3.5 h-3.5" /> Filter Status
              </button>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-borderCustom text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 pl-6">Transfer ID</th>
                <th className="p-4">Resource Item</th>
                <th className="p-4">Provider (Source)</th>
                <th className="p-4">Requester (Destination)</th>
                <th className="p-4">Fulfillment Mode</th>
                <th className="p-4 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderCustom text-sm">
              {transfers.map((t) => (
                <tr key={t.id} className="hover:bg-canvas/50 transition">
                  <td className="p-4 pl-6 font-mono font-bold text-navy-900 text-xs">{t.id}</td>
                  <td className="p-4 font-semibold text-navy-900">{t.offer}</td>
                  <td className="p-4 text-slate-600">{t.provider}</td>
                  <td className="p-4 text-slate-600">{t.requester}</td>
                  <td className="p-4 text-slate-500 text-xs font-medium">{t.mode}</td>
                  <td className="p-4 pr-6">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${t.statusColor}`}>
                      {t.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
