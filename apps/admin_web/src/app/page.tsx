"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import KPICard from "@/components/KPICard";
import { fetchAdminMetrics } from "@/lib/api";
import { Users, TrendingUp, CheckCircle, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminMetrics();
    setMetrics(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex-1 pb-12">
      <Header title="Overview & Network Health" />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Banner Alert */}
        <div className="bg-white p-5 rounded-xl border border-impact-500/20 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-impact-50 text-impact-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-sm">Decision Engine Operating Efficiently</h3>
              <p className="text-xs text-slate-500">
                Preventing unnecessary transfers by evaluating hyper-local alternatives and route feasibility.
              </p>
            </div>
          </div>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-navy-900 bg-canvas border border-borderCustom rounded-lg hover:bg-slate-100 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Metrics
          </button>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Active Participants"
            value={metrics ? metrics.active_users.toLocaleString() : "..."}
            subtitle={`${metrics?.active_sellers || 0} Sellers • ${metrics?.active_buyers || 0} Buyers`}
            icon={Users}
            badgeColor="route"
          />
          <KPICard
            title="Verified Value Preserved"
            value={metrics ? `₹${(metrics.verified_value_preserved_inr / 100000).toFixed(1)}L` : "..."}
            subtitle="Strictly verified outcomes only"
            trend="+12.4% this month"
            icon={TrendingUp}
            badgeColor="impact"
          />
          <KPICard
            title="Successful Match Rate"
            value={metrics ? `${metrics.successful_match_rate}%` : "..."}
            subtitle="Matches reaching confirmed handover"
            icon={CheckCircle}
            badgeColor="impact"
          />
          <KPICard
            title="System Health & Safety"
            value={metrics ? `${metrics.system_health_pct}%` : "..."}
            subtitle={`${metrics?.unresolved_disputes || 0} open disputes pending`}
            icon={ShieldAlert}
            badgeColor="amber"
          />
        </div>

        {/* Priority Case Walkthrough Card (Section 1 in Spec) */}
        <div className="bg-white p-6 rounded-xl border border-borderCustom shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-navy-900">Featured Feasibility Decision Case</h3>
              <p className="text-xs text-slate-500">Real-world practical supply check vs naive transfer match</p>
            </div>
            <span className="bg-route-50 text-route-500 text-xs font-semibold px-3 py-1 rounded-full border border-route-500/20">
              ALTERNATIVE DECISION ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-lg bg-canvas border border-borderCustom">
              <span className="text-xs font-bold text-slate-400 uppercase">Provider Offer</span>
              <div className="font-bold text-navy-900 text-sm mt-1">Asha Family Household</div>
              <p className="text-xs text-slate-500 mt-1">3 kg Milk • 1.0 km away from Bakery</p>
            </div>

            <div className="p-4 rounded-lg bg-canvas border border-borderCustom">
              <span className="text-xs font-bold text-slate-400 uppercase">Requester Need</span>
              <div className="font-bold text-navy-900 text-sm mt-1">Golden Grain Bakery</div>
              <p className="text-xs text-slate-500 mt-1">Needs 3 kg Milk by 5:00 PM</p>
            </div>

            <div className="p-4 rounded-lg bg-impact-50 border border-impact-500/30">
              <span className="text-xs font-bold text-impact-500 uppercase">RESAVO Output</span>
              <div className="font-bold text-impact-500 text-sm mt-1">DO NOT TRANSFER</div>
              <p className="text-xs text-slate-600 mt-1">
                Verified local milk shop is 300 m from bakery. Unnecessary vehicle trip avoided.
              </p>
            </div>
          </div>
        </div>

        {/* Live Activity Timeline */}
        <div className="bg-white p-6 rounded-xl border border-borderCustom shadow-sm">
          <h3 className="text-base font-bold text-navy-900 mb-4">Live System Verification Feed</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-canvas transition">
              <div className="w-2.5 h-2.5 rounded-full bg-impact-500 mt-1.5"></div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-navy-900">
                  Receipt Confirmed: 20 Warm Clothes delivered to Hope Foundation NGO
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Verified by Anita Roy • ₹4,500 value added to Verified Impact Ledger</div>
              </div>
              <span className="text-xs font-medium text-slate-400">5 min ago</span>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-canvas transition">
              <div className="w-2.5 h-2.5 rounded-full bg-route-500 mt-1.5"></div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-navy-900">
                  Alternative Supply Recommended: 8 kg Vegetables at MG Road Kitchen
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Local supplier 250m away satisfied requirement</div>
              </div>
              <span className="text-xs font-medium text-slate-400">18 min ago</span>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-canvas transition">
              <div className="w-2.5 h-2.5 rounded-full bg-amberCustom-500 mt-1.5"></div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-navy-900">
                  Organization Verification Submitted: Vidya Niketan Primary School
                </div>
                <div className="text-xs text-slate-500 mt-0.5">350 students capacity declaration pending admin review</div>
              </div>
              <span className="text-xs font-medium text-slate-400">42 min ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
