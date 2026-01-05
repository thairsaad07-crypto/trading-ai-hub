import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
  icon?: React.ReactNode;
  borderColor?: "cyan" | "purple" | "lime" | "red";
  className?: string;
}

const borderColorMap = {
  cyan: "neon-border",
  purple: "neon-border-purple",
  lime: "neon-border-lime",
  red: "border-red-500",
};

const textColorMap = {
  cyan: "text-cyan-400",
  purple: "text-purple-400",
  lime: "text-lime-400",
  red: "text-red-500",
};

export default function StatCard({
  title,
  value,
  change,
  unit,
  icon,
  borderColor = "cyan",
  className = "",
}: StatCardProps) {
  const isPositive = change && change > 0;

  return (
    <div
      className={`cyber-card p-6 ${borderColorMap[borderColor]} ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-widest">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-3xl font-bold ${textColorMap[borderColor]} data-text`}>
              {value}
            </h3>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
        </div>
        {icon && <div className={`${textColorMap[borderColor]} opacity-50`}>{icon}</div>}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp size={16} className="text-lime-400" />
          ) : (
            <TrendingDown size={16} className="text-red-500" />
          )}
          <span
            className={`text-sm font-bold ${
              isPositive ? "text-lime-400" : "text-red-500"
            }`}
          >
            {isPositive ? "+" : ""}{change}%
          </span>
        </div>
      )}
    </div>
  );
}
