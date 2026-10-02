"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Truck,
  ShieldCheck,
  AlertTriangle,
  Sliders,
  FileText,
  Activity
} from "lucide-react";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/network", label: "Network Growth", icon: Users },
  { href: "/impact", label: "Verified Impact", icon: TrendingUp },
  { href: "/operations", label: "Operations", icon: Truck },
  { href: "/verification", label: "Trust & Verification", icon: ShieldCheck },
  { href: "/disputes", label: "Disputes & Audit", icon: AlertTriangle },
  { href: "/rules", label: "Taxonomy & Rules", icon: Sliders },
  { href: "/reports", label: "Reports & Export", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-900 text-white flex flex-col min-h-screen border-r border-navy-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-navy-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-impact-500 flex items-center justify-center font-bold text-white text-xl tracking-wider">
          R
        </div>
        <div>
          <h1 className="font-extrabold text-lg tracking-wide text-white">RESAVO</h1>
          <p className="text-xs text-slate-300">Admin & Impact Console</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-impact-500 text-white shadow-sm"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Network Status Footer */}
      <div className="p-4 mx-3 mb-6 bg-navy-800/80 rounded-lg border border-navy-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-impact-500 animate-pulse" />
          <span className="text-slate-200 font-medium">System Health</span>
        </div>
        <span className="bg-impact-500/20 text-impact-500 font-semibold px-2 py-0.5 rounded border border-impact-500/30">
          98.5%
        </span>
      </div>
    </aside>
  );
}
