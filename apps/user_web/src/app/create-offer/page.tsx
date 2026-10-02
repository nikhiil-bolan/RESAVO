"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOfferApi, classifyImageApi } from "@/lib/api";
import CameraCapture from "@/components/CameraCapture";
import { Sparkles, ArrowLeft, Check, Info } from "lucide-react";

export default function CreateOfferPage() {
  const router = useRouter();
  const [category, setCategory] = useState("FRESH_FOOD");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("5");
  const [unit, setUnit] = useState("kg");
  const [offerMode, setOfferMode] = useState("FREE");
  const [expectedPrice, setExpectedPrice] = useState("0");
  const [availableHours, setAvailableHours] = useState(24);
  const [photoUrl, setPhotoUrl] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const handlePhotoCaptured = async (imageDataUrl: string) => {
    setPhotoUrl(imageDataUrl);
    // Trigger AI classification on captured photo
    const res = await classifyImageApi(imageDataUrl);
    setAiSuggestion(res);
    if (res && res.suggested_category) {
      setCategory(res.suggested_category);
      setItemName(res.canonical_name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await createOfferApi({
      category,
      item_name: itemName || "Fresh Resource Item",
      quantity: parseFloat(quantity) || 1.0,
      unit,
      condition: "Good",
      offer_mode: offerMode,
      expected_price: offerMode === "SELL" ? parseFloat(expectedPrice) : 0.0,
      available_hours: availableHours,
      pickup_preference: "Buyer Pickup",
      latitude: 12.9716,
      longitude: 77.6412,
      address_approx: "Indiranagar 100ft Rd, Bangalore",
      photo_url: photoUrl
    });
    setSubmitting(false);
    router.push("/");
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-navy-900 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="bg-white p-8 rounded-2xl border border-borderCustom shadow-card space-y-6">
        <div>
          <span className="text-xs font-bold text-impact-600 uppercase tracking-wider bg-impact-50 px-2.5 py-0.5 rounded-full border border-impact-100">
            Smart Dynamic Form
          </span>
          <h1 className="text-2xl font-black text-navy-900 mt-2">Publish Resource Offer</h1>
          <p className="text-xs text-slate-500">
            Offer useful surplus items to families, NGOs, bakeries, or schools in your community.
          </p>
        </div>

        {/* Real Live HTML5 Web Camera & Photo Picker */}
        <CameraCapture onCapture={handlePhotoCaptured} />

        {aiSuggestion && (
          <div className="p-4 rounded-xl bg-amberCustom-50 border border-amberCustom-500/30 text-xs text-navy-900 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amberCustom-600 shrink-0" />
              <span>{aiSuggestion.explanation} (Confidence: {Math.round(aiSuggestion.confidence * 100)}%)</span>
            </div>
            <span className="font-extrabold text-impact-600 bg-impact-50 px-2.5 py-1 rounded-full border border-impact-100">
              Auto-Filled
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Item Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-navy-800"
            >
              <option value="FRESH_FOOD">Fresh Food / Vegetables</option>
              <option value="DAIRY">Milk / Dairy</option>
              <option value="BAKERY_PACKAGED">Bakery / Packaged Food</option>
              <option value="CLOTHING">Clothing & Apparel</option>
              <option value="EDUCATION">Books & School Supplies</option>
              <option value="HOUSEHOLD_REUSABLE">Household Reusable Goods</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Resource Name
            </label>
            <input
              type="text"
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. 3 kg Fresh Farm Milk, Warm Sweaters"
              className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-navy-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                Quantity
              </label>
              <input
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-navy-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                Unit
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="kg, piece, L, box"
                className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-navy-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Offer Mode
            </label>
            <select
              value={offerMode}
              onChange={(e) => setOfferMode(e.target.value)}
              className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-navy-800"
            >
              <option value="FREE">FREE (Giveaway)</option>
              <option value="SELL">SELL (Standard Price)</option>
              <option value="LOW_PRICE">LOW PRICE (Subsidized Redistribution)</option>
              <option value="DONATE">DONATE (NGO Priority)</option>
              <option value="EXCHANGE">EXCHANGE (Community Barter)</option>
            </select>
          </div>

          {offerMode === "SELL" && (
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                Expected Price (₹)
              </label>
              <input
                type="number"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-navy-800"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Available Until (Next {availableHours} Hours)
            </label>
            <input
              type="range"
              min="2"
              max="72"
              value={availableHours}
              onChange={(e) => setAvailableHours(parseInt(e.target.value))}
              className="w-full accent-impact-500"
            />
            <span className="text-xs text-slate-500">Time window active for next {availableHours} hours</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-impact-500 hover:bg-impact-600 text-white font-extrabold text-sm shadow-md transition"
          >
            {submitting ? "Publishing Offer..." : "Publish Resource Offer"}
          </button>
        </form>
      </div>
    </main>
  );
}
