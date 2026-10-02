"use client";

import Header from "@/components/Header";
import { Users, Building2, HeartHandshake, GraduationCap } from "lucide-react";

export default function NetworkGrowthPage() {
  const regions = [
    { name: "Indiranagar / East Bangalore", users: 34200, activeOffers: 480, verifiedImpactINR: "₹4.8L" },
    { name: "Koramangala / South Bangalore", users: 28900, activeOffers: 390, verifiedImpactINR: "₹4.2L" },
    { name: "Central Business District", users: 21500, activeOffers: 210, verifiedImpactINR: "₹3.5L" },
    { name: "Whitefield Tech Belt", users: 19400, activeOffers: 160, verifiedImpactINR: "₹2.9L" },
    { name: "Jayanagar Residential Zone", users: 20800, activeOffers: 290, verifiedImpactINR: "₹3.2L" },
  ];

  return (
    <div className="flex-1 pb-12">
      <Header title="Network Growth & Participant Composition" />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Participant Types Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl border border-borderCustom shadow-sm">
            <div className="flex items-center gap-3 text-navy-900 font-bold text-sm mb-2">
              <div className="p-2 rounded-lg bg-navy-900/5 text-navy-900"><Users className="w-5 h-5" /></div>
              Households & Families
            </div>
            <div className="text-2xl font-extrabold text-navy-900">54%</div>
            <p className="text-xs text-slate-500 mt-1">67,392 active users</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-borderCustom shadow-sm">
            <div className="flex items-center gap-3 text-route-500 font-bold text-sm mb-2">
              <div className="p-2 rounded-lg bg-route-50 text-route-500"><Building2 className="w-5 h-5" /></div>
              Local Businesses & Bakeries
            </div>
            <div className="text-2xl font-extrabold text-navy-900">27%</div>
            <p className="text-xs text-slate-500 mt-1">33,696 active shops</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-borderCustom shadow-sm">
            <div className="flex items-center gap-3 text-impact-500 font-bold text-sm mb-2">
              <div className="p-2 rounded-lg bg-impact-50 text-impact-500"><HeartHandshake className="w-5 h-5" /></div>
              NGOs & Shelters
            </div>
            <div className="text-2xl font-extrabold text-navy-900">13%</div>
            <p className="text-xs text-slate-500 mt-1">16,224 verified organizations</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-borderCustom shadow-sm">
            <div className="flex items-center gap-3 text-amberCustom-500 font-bold text-sm mb-2">
              <div className="p-2 rounded-lg bg-amberCustom-50 text-amberCustom-500"><GraduationCap className="w-5 h-5" /></div>
              Schools & Hostels
            </div>
            <div className="text-2xl font-extrabold text-navy-900">6%</div>
            <p className="text-xs text-slate-500 mt-1">7,488 institutional kitchens</p>
          </div>
        </div>

        {/* Geographic Region Table */}
        <div className="bg-white rounded-xl border border-borderCustom shadow-sm overflow-hidden">
          <div className="p-6 border-b border-borderCustom flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy-900">Geographic Coverage & Zone Activity</h3>
              <p className="text-xs text-slate-500">Live participant activity grouped by urban hub</p>
            </div>
            <span className="text-xs font-semibold bg-canvas px-3 py-1 rounded-full border border-borderCustom text-slate-600">
              5 Primary Clusters
            </span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-borderCustom text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 pl-6">Urban Zone</th>
                <th className="p-4">Active Participants</th>
                <th className="p-4">Active Listings</th>
                <th className="p-4">Verified Impact Value</th>
                <th className="p-4 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderCustom text-sm">
              {regions.map((reg, idx) => (
                <tr key={idx} className="hover:bg-canvas/50 transition">
                  <td className="p-4 pl-6 font-semibold text-navy-900">{reg.name}</td>
                  <td className="p-4 text-slate-700">{reg.users.toLocaleString()}</td>
                  <td className="p-4 text-slate-700">{reg.activeOffers}</td>
                  <td className="p-4 font-bold text-impact-500">{reg.verifiedImpactINR}</td>
                  <td className="p-4 pr-6">
                    <span className="bg-impact-50 text-impact-500 border border-impact-500/20 text-xs px-2.5 py-0.5 rounded-full font-medium">
                      High Density
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
