import React from "react";

const colorMap = {
  indigo: "from-indigo-500/20 to-indigo-500/5 text-indigo-300",
  purple: "from-purple-500/20 to-purple-500/5 text-purple-300",
  emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-300",
  blue: "from-sky-500/20 to-sky-500/5 text-sky-300",
};

const DashboardCard = ({ title, value, icon, color = "indigo" }) => {
  const gradientClass = colorMap[color] || colorMap.indigo;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
            {title}
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-tight text-white">
            {value}
          </h3>
        </div>

        <div
          className={`rounded-2xl bg-gradient-to-br ${gradientClass} px-3 py-2 text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
