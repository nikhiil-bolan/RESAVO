"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { fetchOrganizations, verifyOrganizationApi } from "@/lib/api";
import { ShieldCheck, Check, X, Building2 } from "lucide-react";

export default function VerificationQueuePage() {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchOrganizations();
    setOrgs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVerify = async (id: string, approve: boolean) => {
    await verifyOrganizationApi(id, approve);
    await loadData();
  };

  return (
    <div className="flex-1 pb-12">
      <Header title="Trust & Organization Verification Queue" />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl border border-borderCustom shadow-sm">
          <div className="flex items-center justify-between border-b border-borderCustom pb-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-navy-900">Recipient Organizations Queue</h3>
              <p className="text-xs text-slate-500">Verify NGOs, schools, and institutional buyers before high-volume receiving eligibility</p>
            </div>
            <span className="text-xs font-bold text-impact-500 bg-impact-50 border border-impact-500/20 px-3 py-1 rounded-full">
              {orgs.filter(o => o.verification_state === "PENDING").length} Pending Audits
            </span>
          </div>

          <div className="space-y-4">
            {orgs.map((org) => (
              <div key={org.id} className="p-5 rounded-xl border border-borderCustom bg-canvas/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-navy-900 text-white rounded-lg"><Building2 className="w-6 h-6" /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-navy-900 text-base">{org.name}</h4>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">{org.type}</span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                        org.verification_state === "VERIFIED"
                          ? "bg-impact-50 text-impact-500 border-impact-500/20"
                          : "bg-amberCustom-50 text-amberCustom-500 border-amberCustom-500/20"
                      }`}>
                        {org.verification_state}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-mono">Reg #: {org.registration_number || "N/A"}</p>
                    <p className="text-xs text-slate-600 mt-1">{org.capacity_notes}</p>
                    <div className="text-xs text-slate-400 mt-1">Contact: {org.contact_email} • {org.contact_phone}</div>
                  </div>
                </div>

                {org.verification_state === "PENDING" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVerify(org.id, true)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-impact-500 hover:bg-impact-600 text-white text-xs font-bold rounded-lg transition shadow-sm"
                    >
                      <Check className="w-4 h-4" /> Approve Organization
                    </button>
                    <button
                      onClick={() => handleVerify(org.id, false)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-alertCustom-50 text-alertCustom-500 hover:bg-alertCustom-500 hover:text-white text-xs font-bold rounded-lg border border-alertCustom-500/20 transition"
                    >
                      <X className="w-4 h-4" /> Reject
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
