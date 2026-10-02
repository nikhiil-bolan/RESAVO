"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { fetchDisputes, resolveDisputeApi } from "@/lib/api";
import { AlertTriangle, CheckCircle, Scale } from "lucide-react";

export default function DisputesPage() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [resolutionText, setResolutionText] = useState("");
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await fetchDisputes();
    setDisputes(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleResolve = async (id: string) => {
    if (!resolutionText) return;
    await resolveDisputeApi(id, resolutionText);
    setSelectedDisputeId(null);
    setResolutionText("");
    await loadData();
  };

  return (
    <div className="flex-1 pb-12">
      <Header title="Transfer Disputes & Audit Trail" />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl border border-borderCustom shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-borderCustom pb-4">
            <div>
              <h3 className="text-base font-bold text-navy-900">Active Handover Disputes</h3>
              <p className="text-xs text-slate-500">Investigate condition mismatches or transport claims with complete evidence trail</p>
            </div>
            <span className="text-xs font-bold text-alertCustom-500 bg-alertCustom-50 border border-alertCustom-500/20 px-3 py-1 rounded-full">
              {disputes.filter(d => d.status === "OPEN").length} Open Cases
            </span>
          </div>

          <div className="space-y-4">
            {disputes.map((d) => (
              <div key={d.id} className="p-5 rounded-xl border border-borderCustom bg-canvas/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-alertCustom-50 text-alertCustom-500"><AlertTriangle className="w-5 h-5" /></div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400">Case ID: {d.id}</span>
                      <h4 className="font-bold text-navy-900 text-sm">{d.reason}</h4>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                    d.status === "OPEN"
                      ? "bg-amberCustom-50 text-amberCustom-500 border-amberCustom-500/20"
                      : "bg-impact-50 text-impact-500 border-impact-500/20"
                  }`}>
                    {d.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-borderCustom">
                  <span className="font-bold text-slate-700">Evidence & Reporter Notes: </span>
                  {d.evidence_notes}
                </div>

                {d.resolution && (
                  <div className="text-xs text-impact-500 bg-impact-50 p-3 rounded-lg border border-impact-500/20 font-medium">
                    <span className="font-bold">Resolution Action: </span> {d.resolution}
                  </div>
                )}

                {d.status === "OPEN" && (
                  <div className="pt-2 border-t border-borderCustom space-y-3">
                    <input
                      type="text"
                      placeholder="Type admin resolution action (e.g. Issue warning to courier & mark item verified)..."
                      value={selectedDisputeId === d.id ? resolutionText : ""}
                      onChange={(e) => {
                        setSelectedDisputeId(d.id);
                        setResolutionText(e.target.value);
                      }}
                      className="w-full text-xs p-2.5 rounded-lg border border-borderCustom focus:outline-none focus:border-navy-900"
                    />
                    <button
                      onClick={() => handleResolve(d.id)}
                      className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-lg transition"
                    >
                      Submit Official Resolution
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
