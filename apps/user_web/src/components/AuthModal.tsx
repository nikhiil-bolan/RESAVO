"use client";

import React, { useState } from "react";
import { User, Lock, Mail, Phone, ArrowRight, ShieldCheck, X } from "lucide-react";

interface AuthModalProps {
  onLoginSuccess: (userData: { name: string; email: string }) => void;
  onClose: () => void;
}

export default function AuthModal({ onLoginSuccess, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("asha.sharma@resavo.org");
  const [password, setPassword] = useState("123456");
  const [fullName, setFullName] = useState("Asha Sharma");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: isSignUp ? fullName : (emailOrPhone.includes("asha") ? "Asha Sharma" : "Golden Grain Bakery"),
      email: emailOrPhone
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 relative border border-borderCustom">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-navy-900 rounded-full hover:bg-canvas transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-impact-500 to-impact-600 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-glowGreen">
            R
          </div>
          <h2 className="text-2xl font-black text-navy-900">
            {isSignUp ? "Create RESAVO Account" : "Sign In to RESAVO"}
          </h2>
          <p className="text-xs text-slate-500">
            {isSignUp ? "Join the public-benefit resource preservation network" : "Welcome back! Enter your email/phone to continue."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                Full Name / Organization Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Asha Sharma / Golden Grain Bakery"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderCustom text-sm focus:outline-none focus:border-navy-900 bg-canvas/30"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
              Email Address or Phone Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="e.g. user@resavo.org or 9876543210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderCustom text-sm focus:outline-none focus:border-navy-900 bg-canvas/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
              Password / OTP
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderCustom text-sm focus:outline-none focus:border-navy-900 bg-canvas/30"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? "Sign Up & Start" : "Sign In to Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-borderCustom">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-bold text-impact-600 hover:underline"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
