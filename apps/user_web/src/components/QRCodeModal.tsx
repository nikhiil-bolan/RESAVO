"use client";

import React, { useState } from "react";
import { QrCode, ShieldCheck, CheckCircle2, X, Lock } from "lucide-react";

interface QRCodeModalProps {
  itemTitle: string;
  amount: number;
  onSuccess: (otp: string) => void;
  onClose: () => void;
}

export default function QRCodeModal({ itemTitle, amount, onSuccess, onClose }: QRCodeModalProps) {
  const [step, setStep] = useState<"PAYMENT" | "OTP">("PAYMENT");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handlePaymentConfirm = () => {
    setStep("OTP");
  };

  const handleOtpVerify = () => {
    if (otp.length !== 6) {
      setError("Please enter valid 6-digit OTP (Try 123456)");
      return;
    }
    onSuccess(otp);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 relative border border-borderCustom animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-navy-900 rounded-full hover:bg-canvas transition"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "PAYMENT" ? (
          <div className="text-center space-y-5">
            <div className="inline-flex p-3 rounded-2xl bg-impact-50 text-impact-600 border border-impact-100">
              <QrCode className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-impact-600 uppercase tracking-wider bg-impact-50 px-2.5 py-0.5 rounded-full border border-impact-100">
                Secure Online Payment
              </span>
              <h3 className="text-xl font-black text-navy-900 mt-1">Scan QR Code to Pay</h3>
              <p className="text-xs text-slate-500 mt-1">{itemTitle}</p>
            </div>

            {/* Generated UPI QR Code Visual */}
            <div className="p-4 bg-canvasWarm rounded-2xl border-2 border-dashed border-impact-500/30 inline-block mx-auto shadow-inner">
              <div className="bg-white p-3 rounded-xl shadow-md border border-borderCustom inline-block">
                {/* SVG UPI QR Code Pattern */}
                <svg className="w-48 h-48" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="white" />
                  <rect x="5" y="5" width="30" height="30" fill="#16324F" />
                  <rect x="10" y="10" width="20" height="20" fill="white" />
                  <rect x="15" y="15" width="10" height="10" fill="#16324F" />
                  
                  <rect x="65" y="5" width="30" height="30" fill="#16324F" />
                  <rect x="70" y="10" width="20" height="20" fill="white" />
                  <rect x="75" y="15" width="10" height="10" fill="#16324F" />

                  <rect x="5" y="65" width="30" height="30" fill="#16324F" />
                  <rect x="10" y="70" width="20" height="20" fill="white" />
                  <rect x="15" y="75" width="10" height="10" fill="#16324F" />

                  <circle cx="50" cy="50" r="12" fill="#2C8A63" />
                  <text x="50" y="54" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">R</text>

                  <rect x="40" y="10" width="15" height="15" fill="#16324F" />
                  <rect x="45" y="65" width="18" height="18" fill="#16324F" />
                  <rect x="70" y="45" width="20" height="20" fill="#16324F" />
                  <rect x="75" y="75" width="15" height="15" fill="#2C8A63" />
                </svg>
              </div>
              <div className="mt-2 text-xs font-black text-navy-900">
                Amount to Pay: <span className="text-impact-600 text-lg">₹ {amount > 0 ? amount : 0}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500">Scan using Google Pay, PhonePe, Paytm, or UPI App</p>

            <button
              onClick={handlePaymentConfirm}
              className="w-full py-3.5 bg-impact-500 hover:bg-impact-600 text-white font-extrabold text-sm rounded-xl shadow-md transition"
            >
              Payment Completed — Proceed to Verification
            </button>
          </div>
        ) : (
          /* OTP VERIFICATION STEP */
          <div className="space-y-5 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-navy-50 text-navy-800 border border-navy-100">
              <Lock className="w-8 h-8 text-impact-600" />
            </div>

            <div>
              <span className="text-xs font-bold text-impact-600 uppercase tracking-wider bg-impact-50 px-2.5 py-0.5 rounded-full border border-impact-100">
                Handover OTP Verification
              </span>
              <h3 className="text-xl font-black text-navy-900 mt-1">Enter 6-Digit Verification OTP</h3>
              <p className="text-xs text-slate-500 mt-1">
                OTP sent to your registered phone number to confirm delivery handover.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setError("");
                }}
                placeholder="1 2 3 4 5 6"
                className="w-full text-center tracking-[0.5em] text-2xl font-black p-3.5 rounded-2xl border-2 border-borderCustom focus:border-impact-500 focus:outline-none bg-canvas/40"
              />
              {error ? (
                <p className="text-xs text-alertCustom-500 font-bold">{error}</p>
              ) : (
                <p className="text-[11px] text-slate-400">Default Demo OTP: <strong className="text-navy-900">123456</strong></p>
              )}
            </div>

            <button
              onClick={handleOtpVerify}
              className="w-full py-3.5 bg-impact-500 hover:bg-impact-600 text-white font-extrabold text-sm rounded-xl shadow-md transition"
            >
              Verify OTP & Complete Transfer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
