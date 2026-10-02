"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchMatchSuggestions } from "@/lib/api";
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

export default function MatchDecisionPage() {
  const params = useParams();
  const router = useRouter();
  const [suggestion, setSuggestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const offerId = params.id as string;
    fetchMatchSuggestions(offerId).then((list) => {
      if (list && list.length > 0) {
        setSuggestion(list[0]);
      }
      setLoading(false);
    });
  }, [params]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 text-center text-slate-500">
        Evaluating feasibility decision...
      </main>
    );
  }

  const isDoNotTransfer = suggestion?.decision === "ALTERNATIVE" || suggestion?.decision === "NO_TRANSFER";

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-navy-900 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div>
        <span className="text-xs font-bold text-navy-800 uppercase tracking-wider bg-navy-50 px-2.5 py-0.5 rounded-full border border-navy-100">
          Smart Match Decision Engine
        </span>
        <h1 className="text-2xl font-black text-navy-900 mt-2">Feasibility Evaluation Result</h1>
      </div>

      {/* Side-by-Side Offer vs Need Box (Matches Figure 7 Prototype in Spec!) */}
      <div className="bg-amberCustom-50/50 p-6 rounded-2xl border border-amberCustom-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-impact-600 uppercase tracking-wider">Provider Offer</span>
          <h3 className="font-extrabold text-navy-900 text-base">Asha Household</h3>
          <p className="text-xs text-slate-600">3 kg Milk • Indiranagar 100ft Rd (1.0 km away)</p>
        </div>

        <div className="hidden md:block w-px h-10 bg-amberCustom-500/20"></div>

        <div className="space-y-1 text-right">
          <span className="text-[10px] font-bold text-route-600 uppercase tracking-wider">Requester Need</span>
          <h3 className="font-extrabold text-navy-900 text-base">Golden Grain Bakery</h3>
          <p className="text-xs text-slate-600">Needs 3 kg Milk • Deadline 5:00 PM</p>
        </div>
      </div>

      {/* Decision Banner (Matches Figure 7 Prototype in Spec!) */}
      <div className={`p-8 rounded-2xl border-2 shadow-soft space-y-6 ${
        isDoNotTransfer
          ? "bg-white border-alertCustom-500"
          : "bg-white border-impact-500"
      }`}>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            {isDoNotTransfer ? (
              <XCircle className="w-8 h-8 text-alertCustom-500" />
            ) : (
              <CheckCircle2 className="w-8 h-8 text-impact-500" />
            )}
            <div>
              <h2 className={`text-2xl font-black ${
                isDoNotTransfer ? "text-alertCustom-500" : "text-impact-600"
              }`}>
                {isDoNotTransfer ? "Decision: DO NOT TRANSFER" : "Decision: RECOMMENDED MATCH"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Feasibility Score: {suggestion?.score || 45.0} / 100</p>
            </div>
          </div>
        </div>

        {/* Bulleted Reasons */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Decision Reasons:</h4>
          {(suggestion?.reasons || [
            "Bakery has a verified local milk shop at 300 m.",
            "Family route would add unnecessary vehicle travel.",
            "Preserving the resource does not require this transfer."
          ]).map((r: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-impact-500 mt-1.5 shrink-0"></span>
              <p className="text-sm font-medium text-navy-900 leading-relaxed">{r}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Next Action Box */}
      <div className="bg-impact-50/60 p-5 rounded-2xl border border-impact-500/30 text-xs space-y-1.5">
        <span className="font-bold text-navy-900 block uppercase tracking-wider">Next Action for Seller:</span>
        <p className="text-impact-600 font-bold text-sm">
          Search another nearby buyer or community distribution drive.
        </p>
      </div>
    </main>
  );
}
