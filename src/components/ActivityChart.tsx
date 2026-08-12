import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from "recharts";
import { Flame, Trophy, Calendar, CheckCircle, Zap } from "lucide-react";

export interface ActivityDay {
  day: string;
  fullDate: string;
  lessons: number;
  quizzes: number;
  trades: number;
  totalActivities: number;
  studyMins: number;
  isToday?: boolean;
}

const mockActivityData: ActivityDay[] = [
  { day: "Thu", fullDate: "Aug 6", lessons: 2, quizzes: 2, trades: 1, totalActivities: 5, studyMins: 22 },
  { day: "Fri", fullDate: "Aug 7", lessons: 3, quizzes: 2, trades: 2, totalActivities: 7, studyMins: 35 },
  { day: "Sat", fullDate: "Aug 8", lessons: 1, quizzes: 1, trades: 0, totalActivities: 2, studyMins: 12 },
  { day: "Sun", fullDate: "Aug 9", lessons: 4, quizzes: 3, trades: 1, totalActivities: 8, studyMins: 42 },
  { day: "Mon", fullDate: "Aug 10", lessons: 2, quizzes: 2, trades: 2, totalActivities: 6, studyMins: 28 },
  { day: "Tue", fullDate: "Aug 11", lessons: 3, quizzes: 4, trades: 2, totalActivities: 9, studyMins: 45 },
  { day: "Today", fullDate: "Aug 12", lessons: 3, quizzes: 2, trades: 1, totalActivities: 6, studyMins: 30, isToday: true },
];

export const ActivityChart: React.FC = () => {
  const [metric, setMetric] = useState<"activities" | "mins">("activities");
  const [hoveredDay, setHoveredDay] = useState<ActivityDay | null>(null);

  const totalThisWeek = mockActivityData.reduce(
    (acc, item) => acc + (metric === "activities" ? item.totalActivities : item.studyMins),
    0
  );

  const todayData = mockActivityData.find((d) => d.isToday) || mockActivityData[6];
  const dailyGoal = metric === "activities" ? 5 : 25;
  const todayProgress = Math.min(100, Math.round(((metric === "activities" ? todayData.totalActivities : todayData.studyMins) / dailyGoal) * 100));

  return (
    <div className="bg-white dark:bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              7-Day Activity & Streak Tracker
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/30 uppercase">
              Gamified
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track daily completed modules, quizzes, and paper trades to keep your streak alive.
          </p>
        </div>

        {/* View Metric Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setMetric("activities")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              metric === "activities"
                ? "bg-emerald-500 text-black font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Activities
          </button>
          <button
            onClick={() => setMetric("mins")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              metric === "mins"
                ? "bg-emerald-500 text-black font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Study Mins
          </button>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">
            <Flame className="w-4 h-4 fill-orange-500" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Current Streak</span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">12 Days 🔥</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">7-Day Total</span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              {totalThisWeek} {metric === "activities" ? "Units" : "Mins"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Today's Goal</span>
            <span className="text-sm font-extrabold text-emerald-500 dark:text-emerald-400">
              {todayProgress}% ({metric === "activities" ? todayData.totalActivities : todayData.studyMins}/{dailyGoal})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Streak Bonus</span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">+150 XP Earned</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="h-52 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={mockActivityData} 
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onMouseMove={(state: any) => {
              if (state && state.activePayload && state.activePayload.length) {
                setHoveredDay(state.activePayload[0].payload as ActivityDay);
              }
            }}
            onMouseLeave={() => setHoveredDay(null)}
          >
            <XAxis 
              dataKey="day" 
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: "#64748b", fontSize: 10 }} 
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data: ActivityDay = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1">
                      <div className="flex items-center justify-between gap-4 font-bold border-b border-slate-800 pb-1">
                        <span>{data.fullDate} {data.isToday ? "(Today)" : ""}</span>
                        <span className="text-emerald-400">{data.totalActivities} Activities</span>
                      </div>
                      <div className="text-[11px] text-slate-300 space-y-0.5 pt-0.5">
                        <p>• Lessons Completed: <strong className="text-white">{data.lessons}</strong></p>
                        <p>• Quizzes & Tests: <strong className="text-white">{data.quizzes}</strong></p>
                        <p>• Paper Trades: <strong className="text-white">{data.trades}</strong></p>
                        <p>• Total Time: <strong className="text-emerald-400">{data.studyMins} mins</strong></p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey={metric === "activities" ? "totalActivities" : "studyMins"} 
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            >
              {mockActivityData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.isToday 
                      ? "#10b981" 
                      : hoveredDay?.day === entry.day 
                        ? "#34d399" 
                        : "#334155"
                  } 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gamification Milestone Note */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Complete <strong>2 more activities today</strong> to secure your 13-day streak multiplier!</span>
        </div>
        <span className="hidden md:inline font-mono font-bold text-emerald-500 dark:text-emerald-400 text-[11px]">
          Goal: 5/day
        </span>
      </div>
    </div>
  );
};
