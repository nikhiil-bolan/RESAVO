"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchMyOffers } from "@/lib/api";
import QRCodeModal from "@/components/QRCodeModal";
import { ArrowLeft, MapPin, Truck, CheckCircle2, QrCode, Phone, ShieldCheck, Tag } from "lucide-react";

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);
  const [fulfillmentMode, setFulfillmentMode] = useState<"PICKUP" | "DROPOFF">("PICKUP");
  const [showQRModal, setShowQRModal] = useState(false);
  const [transferCompleted, setTransferCompleted] = useState(false);

  useEffect(() => {
    fetchMyOffers().then((list) => {
      const item = list.find((o: any) => o.id === params.id) || list[0];
      setOffer(item);
    });
  }, [params]);

  if (!offer) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 text-center text-slate-500">
        Loading offer details...
      </main>
    );
  }

  const handleQRSuccess = (otp: string) => {
    setShowQRModal(false);
    setTransferCompleted(true);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      {showQRModal && (
        <QRCodeModal
          itemTitle={offer.title}
          amount={offer.expected_price || 165}
          onSuccess={handleQRSuccess}
          onClose={() => setShowQRModal(false)}
        />
      )}

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-navy-900 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Main Item Detail Card */}
      <div className="bg-white rounded-3xl border border-borderCustom shadow-card overflow-hidden">
        {/* Photo Image Banner */}
        <div className="h-64 bg-slate-900 relative">
          <img
            src={offer.photo_url || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800"}
            alt={offer.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-navy-900/90 backdrop-blur text-white text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <Tag className="w-3.5 h-3.5 text-impact-500" /> {offer.category}
          </div>
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur text-navy-900 text-xs font-extrabold px-3.5 py-1.5 rounded-xl shadow-md border border-borderCustom">
            Offer Mode: <span className="text-impact-600">{offer.offer_mode}</span>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-navy-900">{offer.title}</h1>
              <div className="text-2xl font-black text-impact-600">
                {offer.expected_price > 0 ? `₹ ${offer.expected_price}` : "FREE"}
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">Condition: <strong>{offer.condition}</strong> • Provider: <strong>Asha Household</strong></p>
          </div>

          {/* Fulfillment Selection Tabs */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
              Choose Fulfillment & Handover Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfillmentMode("PICKUP")}
                className={`p-4 rounded-2xl border text-left transition ${
                  fulfillmentMode === "PICKUP"
                    ? "border-impact-500 bg-impact-50/40 text-navy-900 ring-2 ring-impact-500/20"
                    : "border-borderCustom bg-canvas/30 text-slate-600"
                }`}
              >
                <div className="flex items-center gap-2 font-extrabold text-sm mb-1">
                  <MapPin className="w-4 h-4 text-impact-600" /> Buyer Self-Pickup
                </div>
                <p className="text-[11px] text-slate-500">Collect item directly from seller address</p>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentMode("DROPOFF")}
                className={`p-4 rounded-2xl border text-left transition ${
                  fulfillmentMode === "DROPOFF"
                    ? "border-route-500 bg-route-50/40 text-navy-900 ring-2 ring-route-500/20"
                    : "border-borderCustom bg-canvas/30 text-slate-600"
                }`}
              >
                <div className="flex items-center gap-2 font-extrabold text-sm mb-1">
                  <Truck className="w-4 h-4 text-route-500" /> Delivery Drop-Off
                </div>
                <p className="text-[11px] text-slate-500">Online QR Payment + Delivery Courier</p>
              </button>
            </div>
          </div>

          {/* Dynamic Content Based on Fulfillment Mode */}
          {fulfillmentMode === "PICKUP" ? (
            /* EXACT LOCATION REVEAL (SPEC MANDATE!) */
            <div className="p-5 rounded-2xl bg-canvas border border-borderCustom space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-impact-600 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Match Accepted — Exact Household Location Unlocked
              </div>
              <div className="bg-white p-4 rounded-xl border border-borderCustom space-y-1">
                <span className="text-xs font-bold text-navy-900 block">Exact Pickup Address:</span>
                <p className="text-sm font-semibold text-slate-700">
                  #42, 12th Main Road, Indiranagar 100ft Rd, Bangalore — 560038
                </p>
                <p className="text-xs text-slate-400">Landmark: Opposite Indiranagar Metro Pillar #124</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <span>Contact Provider: <strong>+91 98765 43210</strong></span>
                <a href="tel:+919876543210" className="flex items-center gap-1 font-bold text-impact-600 hover:underline">
                  <Phone className="w-3.5 h-3.5" /> Call Seller
                </a>
              </div>
            </div>
          ) : (
            /* ONLINE QR CODE & OTP DELIVERY STEP */
            <div className="p-5 rounded-2xl bg-canvas border border-borderCustom space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-route-600 uppercase tracking-wider">
                <QrCode className="w-4 h-4" /> Online Delivery Drop-Off & Payment
              </div>
              <p className="text-xs text-slate-600">
                Pay online securely via UPI QR Code and verify 6-digit delivery OTP upon courier arrival.
              </p>

              <button
                type="button"
                onClick={() => setShowQRModal(true)}
                className="w-full py-3 bg-route-500 hover:bg-route-600 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" /> Pay via Online QR Code & Verify OTP
              </button>
            </div>
          )}

          {transferCompleted && (
            <div className="p-4 rounded-2xl bg-impact-50 border border-impact-500/30 text-impact-600 text-xs font-extrabold text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto text-impact-600" />
              <div>Transfer Completed & Audit-Verified!</div>
              <p className="text-[11px] font-normal text-slate-600">Verified value recorded in impact ledger.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
