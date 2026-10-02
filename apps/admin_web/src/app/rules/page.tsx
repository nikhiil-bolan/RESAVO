"use client";

import Header from "@/components/Header";
import { Sliders, ShieldCheck, Clock, Save } from "lucide-react";
import { useState } from "react";

export default function RulesPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 pb-12">
      <Header title="Taxonomy & Safety Rules Engine" />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl border border-borderCustom shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-borderCustom pb-4">
            <div>
              <h3 className="text-base font-bold text-navy-900">Perishable Safety Windows & Rules</h3>
              <p className="text-xs text-slate-500">Configure decision threshold parameters for matching feasibility and safety declarations</p>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-impact-500 hover:bg-impact-600 text-white text-xs font-bold rounded-lg transition"
            >
              <Save className="w-4 h-4" /> {saved ? "Rules Saved!" : "Save Rule Updates"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-borderCustom bg-canvas/30 space-y-3">
              <label className="text-xs font-bold text-navy-900 uppercase tracking-wider block">
                Fresh Cooked Surplus Window (Hours)
              </label>
              <input type="number" defaultValue={4} className="w-full text-sm p-2.5 rounded-lg border border-borderCustom" />
              <p className="text-xs text-slate-500">Maximum allowed listing window for cooked meals from institutional kitchens</p>
            </div>

            <div className="p-5 rounded-xl border border-borderCustom bg-canvas/30 space-y-3">
              <label className="text-xs font-bold text-navy-900 uppercase tracking-wider block">
                Dairy & Milk Perishable Threshold (Hours)
              </label>
              <input type="number" defaultValue={8} className="w-full text-sm p-2.5 rounded-lg border border-borderCustom" />
              <p className="text-xs text-slate-500">Maximum shelf life threshold before at-risk alert is triggered</p>
            </div>

            <div className="p-5 rounded-xl border border-borderCustom bg-canvas/30 space-y-3">
              <label className="text-xs font-bold text-navy-900 uppercase tracking-wider block">
                Local Shop Alternative Radius (Meters)
              </label>
              <input type="number" defaultValue={500} className="w-full text-sm p-2.5 rounded-lg border border-borderCustom" />
              <p className="text-xs text-slate-500">Maximum distance to a verified local store before recommending local purchase over family transfer</p>
            </div>

            <div className="p-5 rounded-xl border border-borderCustom bg-canvas/30 space-y-3">
              <label className="text-xs font-bold text-navy-900 uppercase tracking-wider block">
                NGO Purpose Priority Boost (Score Points)
              </label>
              <input type="number" defaultValue={15} className="w-full text-sm p-2.5 rounded-lg border border-borderCustom" />
              <p className="text-xs text-slate-500">Match score bonus applied when recipient is a verified NGO shelter</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
