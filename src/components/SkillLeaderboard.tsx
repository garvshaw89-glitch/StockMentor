import React from "react";
import { UserProfile } from "../types";
import { 
  Trophy, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  BarChart2, 
  CheckCircle2, 
  Zap,
  Star
} from "lucide-react";

interface SkillLeaderboardProps {
  profile: UserProfile;
}

export const LEADERBOARD_USERS = [
  {
    rank: 1,
    name: "Vikram Sharma (User C)",
    stockMentorScore: 96,
    returnPercent: 14.2,
    maxDrawdownPercent: 4.8,
    researchScore: 96,
    disciplineScore: 98,
    badge: "Master Risk Strategist"
  },
  {
    rank: 2,
    name: "Ananya Roy (User A)",
    stockMentorScore: 94,
    returnPercent: 18.5,
    maxDrawdownPercent: 7.2,
    researchScore: 94,
    disciplineScore: 92,
    badge: "Disciplined Value Investor"
  },
  {
    rank: 3,
    name: "Your Profile (You)",
    stockMentorScore: 84,
    returnPercent: 12.8,
    maxDrawdownPercent: 6.5,
    researchScore: 86,
    disciplineScore: 78,
    badge: "Market Explorer Level 7"
  },
  {
    rank: 4,
    name: "Rohan Patel (User B)",
    stockMentorScore: 81,
    returnPercent: 22.4,
    maxDrawdownPercent: 19.2,
    researchScore: 78,
    disciplineScore: 68,
    badge: "High Risk Momentum Trader"
  }
];

export const SkillLeaderboard: React.FC<SkillLeaderboardProps> = ({ profile }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Skill-Based Ranking Leaderboard</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            StockMentor Global Skill Leaderboard
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Rankings are determined by risk-adjusted decision quality, discipline, and research depth — NOT reckless P&L gambling.
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
          <Star className="w-6 h-6 text-amber-400" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Your Global Rank</p>
            <p className="text-base font-extrabold text-white">Rank #3 globally</p>
          </div>
        </div>
      </div>

      {/* Score Formula Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <p className="text-slate-400 font-semibold">Knowledge & Research</p>
          <p className="text-sm font-bold text-white mt-0.5">35% Weight</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <p className="text-slate-400 font-semibold">Risk Management & Drawdown</p>
          <p className="text-sm font-bold text-emerald-400 mt-0.5">30% Weight</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <p className="text-slate-400 font-semibold">Discipline & Consistency</p>
          <p className="text-sm font-bold text-indigo-400 mt-0.5">25% Weight</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <p className="text-slate-400 font-semibold">Net Returns</p>
          <p className="text-sm font-bold text-amber-400 mt-0.5">10% Weight</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Rank</th>
              <th className="py-3 px-3">Trader / Investor</th>
              <th className="py-3 px-3 text-right">StockMentor Score</th>
              <th className="py-3 px-3 text-right">Return</th>
              <th className="py-3 px-3 text-right">Max Drawdown</th>
              <th className="py-3 px-3 text-right">Research Depth</th>
              <th className="py-3 px-3 text-right">Discipline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {LEADERBOARD_USERS.map((usr) => {
              const isUser = usr.name.includes("You");
              return (
                <tr 
                  key={usr.rank}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    isUser ? "bg-emerald-500/10 font-bold" : ""
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-black text-xs ${
                      usr.rank === 1 ? "bg-amber-400 text-black" : usr.rank === 2 ? "bg-slate-300 text-black" : usr.rank === 3 ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-400"
                    }`}>
                      {usr.rank}
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <p className="text-white font-bold">{usr.name}</p>
                    <p className="text-[10px] text-slate-400">{usr.badge}</p>
                  </td>

                  <td className="py-3.5 px-3 text-right font-black text-sm text-emerald-400">
                    {usr.stockMentorScore} / 100
                  </td>

                  <td className="py-3.5 px-3 text-right font-bold text-slate-200">
                    +{usr.returnPercent}%
                  </td>

                  <td className={`py-3.5 px-3 text-right font-bold ${
                    usr.maxDrawdownPercent > 15 ? "text-rose-400" : "text-emerald-400"
                  }`}>
                    -{usr.maxDrawdownPercent}%
                  </td>

                  <td className="py-3.5 px-3 text-right text-slate-300">
                    {usr.researchScore}
                  </td>

                  <td className="py-3.5 px-3 text-right text-slate-300">
                    {usr.disciplineScore}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
