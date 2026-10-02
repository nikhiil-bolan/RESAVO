"use client";

import { Bell, ShieldCheck, User } from "lucide-react";

export default function Header({ title }: { title: string }) {
  return (
    <header className="h-16 bg-white border-b border-borderCustom px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-navy-900">{title}</h2>
        <span className="bg-impact-50 text-impact-500 border border-impact-500/20 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> Public-Benefit Verified
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 text-slate-500 hover:text-navy-900 hover:bg-canvas rounded-lg transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-alertCustom-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-borderCustom"></div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-navy-900 leading-tight">Admin Console</div>
            <div className="text-xs text-slate-500">ops.lead@resavo.org</div>
          </div>
        </div>
      </div>
    </header>
  );
}
