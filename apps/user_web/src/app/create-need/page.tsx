"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNeedApi } from "@/lib/api";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CreateNeedPage() {
  const router = useRouter();
  const [category, setCategory] = useState("DAIRY");
  const [itemName, setItemName] = useState("Milk");
  const [quantity, setQuantity] = useState("3");
  const [unit, setUnit] = useState("kg");
  const [purpose, setPurpose] = useState("Bakery production");
  const [address, setAddress] = useState("12th Main Indiranagar Bakery");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await createNeedApi({
      category,
      item_name: itemName,
      quantity: parseFloat(quantity) || 1.0,
      unit,
      needed_within_hours: 12,
      purpose,
      preferred_mode: "FREE",
      fulfillment_preference: "Either",
      latitude: 12.9780,
      longitude: 77.6440,
      address
    });
    setSubmitting(false);
    router.push("/compare-sources");
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
          <span className="text-xs font-bold text-route-600 uppercase tracking-wider bg-route-50 px-2.5 py-0.5 rounded-full border border-route-100">
            Buyer Need Request
          </span>
          <h1 className="text-2xl font-black text-navy-900 mt-2">Post Resource Need</h1>
          <p className="text-xs text-slate-500">
            Specify required item, quantity, deadline, and recipient purpose (Bakery, NGO, Family, School).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Item Required
            </label>
            <input
              type="text"
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Milk, Clothes, Vegetables, Books"
              className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-route-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                Quantity Required
              </label>
              <input
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-route-500"
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
                placeholder="kg, piece, L"
                className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-route-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Recipient Purpose
            </label>
            <input
              type="text"
              required
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Bakery production, NGO community distribution, Primary school hostel"
              className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-route-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Delivery / Pickup Address
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-sm p-3 rounded-xl border border-borderCustom bg-canvas/30 focus:outline-none focus:border-route-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-route-500 hover:bg-route-600 text-white font-extrabold text-sm shadow-md transition"
          >
            {submitting ? "Evaluating Supply Options..." : "Find & Compare Supply Options"}
          </button>
        </form>
      </div>
    </main>
  );
}
