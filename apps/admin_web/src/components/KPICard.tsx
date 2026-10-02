import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  icon: LucideIcon;
  badgeColor?: "impact" | "route" | "amber" | "navy";
}

export default function KPICard({ title, value, subtitle, trend, icon: Icon, badgeColor = "navy" }: KPICardProps) {
  const colorStyles = {
    navy: "bg-navy-900/5 text-navy-900 border-navy-900/10",
    impact: "bg-impact-50 text-impact-500 border-impact-500/20",
    route: "bg-route-50 text-route-500 border-route-500/20",
    amber: "bg-amberCustom-50 text-amberCustom-500 border-amberCustom-500/20",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-borderCustom shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        <div className={`p-2.5 rounded-lg border ${colorStyles[badgeColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-extrabold text-navy-900 tracking-tight">{value}</div>
      {subtitle && <p className="text-xs text-slate-500 mt-1.5">{subtitle}</p>}
      {trend && (
        <span className="inline-block text-xs font-semibold text-impact-500 bg-impact-50 px-2 py-0.5 rounded mt-2">
          {trend}
        </span>
      )}
    </div>
  );
}
