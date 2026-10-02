import React, { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

// ============================================================================
// LuxuryPanel: Base surface with 1px border, subtle inner highlight, and backdrop
// ============================================================================
interface LuxuryPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevated?: boolean;
  highlight?: boolean;
  className?: string;
}

export const LuxuryPanel: React.FC<LuxuryPanelProps> = ({
  children,
  elevated = false,
  highlight = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`relative rounded-xl transition-all duration-200 ${
        elevated
          ? "bg-white dark:bg-[#11151A] border border-slate-200/80 dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          : "bg-white/80 dark:bg-[#0C0F13]/90 border border-slate-200/70 dark:border-white/[0.06] shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-md"
      } ${
        highlight
          ? "ring-1 ring-blue-500/20 dark:ring-[#6F9BFF]/25 border-blue-500/30 dark:border-[#6F9BFF]/30"
          : ""
      } ${className}`}
      {...props}
    >
      {/* Subtle Top Specular Edge Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none rounded-t-xl" />
      {children}
    </div>
  );
};

// ============================================================================
// IntelligenceCard: Editorial container with header, kicker, and action slot
// ============================================================================
interface IntelligenceCardProps {
  title: string;
  kicker?: string;
  badge?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

export const IntelligenceCard: React.FC<IntelligenceCardProps> = ({
  title,
  kicker,
  badge,
  action,
  children,
  className = "",
  footer
}) => {
  return (
    <LuxuryPanel className={`flex flex-col p-5 ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-white/[0.05]">
        <div>
          {kicker && (
            <div className="text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-[#A5A8AE] mb-1">
              {kicker}
            </div>
          )}
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-[#F5F5F0]">
              {title}
            </h3>
            {badge}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="flex-1">{children}</div>
      {footer && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.05] text-xs text-slate-500 dark:text-[#A5A8AE]">
          {footer}
        </div>
      )}
    </LuxuryPanel>
  );
};

// ============================================================================
// MetricDisplay: Monospaced high-precision institutional metric renderer
// ============================================================================
interface MetricDisplayProps {
  label: string;
  value: string | number;
  change?: string | number;
  changeType?: "positive" | "negative" | "neutral";
  prefix?: string;
  suffix?: string;
  subtext?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  label,
  value,
  change,
  changeType = "neutral",
  prefix,
  suffix,
  subtext,
  size = "md",
  className = ""
}) => {
  const sizeClasses = {
    sm: "text-lg font-semibold",
    md: "text-2xl font-semibold tracking-tight",
    lg: "text-3xl font-bold tracking-tight",
    xl: "text-4xl font-extrabold tracking-tight"
  }[size];

  const changeColor = {
    positive: "text-emerald-600 dark:text-[#6EE7B7]",
    negative: "text-rose-600 dark:text-[#FF7B86]",
    neutral: "text-slate-500 dark:text-[#A5A8AE]"
  }[changeType];

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#686C73] mb-1">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className={`font-mono text-slate-900 dark:text-[#F5F5F0] num-tabular ${sizeClasses}`}>
          {prefix}{value}{suffix}
        </span>
        {change !== undefined && (
          <span className={`inline-flex items-center text-xs font-mono font-medium ${changeColor}`}>
            {changeType === "positive" && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
            {changeType === "negative" && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {changeType === "neutral" && <Minus className="w-3 h-3 mr-0.5" />}
            {change}
          </span>
        )}
      </div>
      {subtext && (
        <span className="text-xs text-slate-500 dark:text-[#A5A8AE] mt-1 font-sans">
          {subtext}
        </span>
      )}
    </div>
  );
};

// ============================================================================
// MarketIndicator: Visual market signal status (Bullish / Neutral / Bearish)
// ============================================================================
export const MarketIndicator: React.FC<{
  status: "active" | "online" | "warning" | "error" | "neutral";
  label?: string;
  pulse?: boolean;
}> = ({ status, label, pulse = true }) => {
  const colors = {
    active: "bg-emerald-500 dark:bg-[#6EE7B7]",
    online: "bg-blue-500 dark:bg-[#6F9BFF]",
    warning: "bg-amber-500 dark:bg-[#F5C76B]",
    error: "bg-rose-500 dark:bg-[#FF7B86]",
    neutral: "bg-slate-400 dark:bg-[#686C73]"
  }[status];

  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-slate-600 dark:text-[#A5A8AE]">
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colors}`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${colors}`} />
      </span>
      {label && <span>{label}</span>}
    </div>
  );
};

// ============================================================================
// SectionHeader: Editorial heading with monospace kicker and action
// ============================================================================
interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  description,
  action,
  className = ""
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 ${className}`}>
      <div>
        {kicker && (
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-blue-600 dark:text-[#6F9BFF] mb-1.5 font-medium">
            <span className="inline-block w-1.5 h-1.5 bg-blue-500 dark:bg-[#6F9BFF] rounded-full" />
            {kicker}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F5F5F0]">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-600 dark:text-[#A5A8AE] max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

// ============================================================================
// PrecisionButton: Tactile terminal button with crisp border & micro-interaction
// ============================================================================
interface PrecisionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "subtle" | "danger" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: ReactNode;
}

export const PrecisionButton: React.FC<PrecisionButtonProps> = ({
  children,
  variant = "secondary",
  size = "md",
  icon,
  className = "",
  ...props
}) => {
  const sizeStyles = {
    xs: "px-2.5 py-1 text-[11px] gap-1.5 rounded-md",
    sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
    md: "px-4 py-2 text-sm gap-2 rounded-lg",
    lg: "px-5 py-2.5 text-base gap-2.5 rounded-xl"
  }[size];

  const variantStyles = {
    primary:
      "bg-slate-900 dark:bg-[#F5F5F0] text-white dark:text-[#050607] font-semibold hover:bg-slate-800 dark:hover:bg-white shadow-sm hover:shadow dark:shadow-[0_2px_16px_rgba(245,245,240,0.15)] active:translate-y-px",
    secondary:
      "bg-white dark:bg-[#11151A] text-slate-800 dark:text-[#F5F5F0] border border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-[#15191F] hover:border-slate-300 dark:hover:border-white/[0.14] active:translate-y-px shadow-sm",
    subtle:
      "bg-slate-100/80 dark:bg-white/[0.05] text-slate-700 dark:text-[#A5A8AE] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white border border-transparent",
    danger:
      "bg-rose-500/10 text-rose-600 dark:text-[#FF7B86] border border-rose-500/20 hover:bg-rose-500/20",
    ghost:
      "text-slate-600 dark:text-[#A5A8AE] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]"
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

// ============================================================================
// ChartContainer: Professional research wrapper with timeframe & indicator slots
// ============================================================================
interface ChartContainerProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  controls?: ReactNode;
  stats?: ReactNode;
  children: ReactNode;
  className?: string;
  heightClass?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  badge,
  controls,
  stats,
  children,
  className = "",
  heightClass = "h-80"
}) => {
  return (
    <LuxuryPanel className={`p-5 flex flex-col ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-3 border-b border-slate-100 dark:border-white/[0.05]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-[#F5F5F0]">
              {title}
            </h3>
            {badge}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-[#A5A8AE] font-mono mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {controls && <div className="flex items-center gap-2">{controls}</div>}
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 mb-3 border-b border-slate-100 dark:border-white/[0.05]">
          {stats}
        </div>
      )}

      <div className={`w-full ${heightClass} relative`}>
        {children}
      </div>
    </LuxuryPanel>
  );
};
