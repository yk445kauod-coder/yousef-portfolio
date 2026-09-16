import React, { useState, useEffect } from "react";
import { Award, Zap, ChevronUp } from "lucide-react";
import { playClickSound, playHoverSound } from "../lib/audio";

interface Milestone {
  id: string;
  lvl: number;
  label: string;
  labelAr: string;
  threshold: number; // percentage of scroll
}

const MILESTONES: Milestone[] = [
  { id: "top", lvl: 1, label: "LVL 1: HERO", labelAr: "البداية", threshold: 0 },
  { id: "about", lvl: 2, label: "LVL 2: BIO", labelAr: "عن يوسف", threshold: 20 },
  { id: "work", lvl: 3, label: "LVL 3: PROJECTS", labelAr: "المشاريع", threshold: 45 },
  { id: "toolkit", lvl: 4, label: "LVL 4: SKILLS", labelAr: "التقنيات", threshold: 75 },
  { id: "contact", lvl: 5, label: "LVL 5: CONTACT", labelAr: "التواصل", threshold: 90 },
];

export const PixelScrollMilestones: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentLvl, setCurrentLvl] = useState(1);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  useEffect(() => {
    let prevLvl = 1;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setScrollPercent(Math.round(progress));

      // Calculate current active milestone
      let active = 1;
      for (const m of MILESTONES) {
        if (progress >= m.threshold) {
          active = m.lvl;
        }
      }

      if (active !== prevLvl) {
        prevLvl = active;
        setCurrentLvl(active);
        const milestoneObj = MILESTONES.find(m => m.lvl === active);
        if (milestoneObj) {
          setActiveToast(`${milestoneObj.label} UNLOCKED! 🎯`);
          setTimeout(() => setActiveToast(null), 3000);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-2 select-none pointer-events-auto">
      {/* Active Milestone Notification Toast */}
      {activeToast && (
        <div className="animate-bounce bg-[#111315]/95 border border-[#FFA500] text-[#FFA500] px-3 py-1.5 rounded-lg text-xs font-en-pixel shadow-[0_0_20px_rgba(255,165,0,0.4)] flex items-center gap-1.5">
          <Zap size={14} className="animate-spin text-[#00FFCC]" />
          <span>{activeToast}</span>
        </div>
      )}

      {/* Retro Pixel Progress Bar & Milestone Tracker */}
      <div className="bg-[#111315]/90 border border-[#36A3FF]/40 rounded-xl p-2.5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.7)] flex flex-col gap-2 w-44">
        <div className="flex items-center justify-between text-[11px] font-en-pixel text-gray-300">
          <div className="flex items-center gap-1 text-[#FFA500]">
            <Award size={13} />
            <span>LVL {currentLvl}/5</span>
          </div>
          <span className="text-[#00FFCC]">{scrollPercent}%</span>
        </div>

        {/* Health / Progress Bar */}
        <div className="w-full bg-[#181A1D] h-2 rounded-full overflow-hidden border border-gray-800 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#FF754D] via-[#FFA500] to-[#00FFCC] rounded-full transition-all duration-300"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>

        {/* Milestone Steps */}
        <div className="flex justify-between items-center text-[9px] font-en-pixel text-gray-400 px-0.5">
          {MILESTONES.map(m => (
            <span
              key={m.id}
              className={`transition-colors ${
                currentLvl >= m.lvl ? "text-[#FFA500] font-bold" : "text-gray-600"
              }`}
            >
              L{m.lvl}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Return to Top Button */}
      {scrollPercent > 15 && (
        <button
          onClick={scrollToTop}
          onMouseEnter={playHoverSound}
          aria-label="Back to top"
          className="p-2 rounded-lg bg-[#111315]/90 hover:bg-[#FF754D]/20 border border-[#36A3FF]/40 hover:border-[#FF754D] text-[#36A3FF] hover:text-[#FF754D] transition-all shadow-md flex items-center gap-1 text-xs font-en-pixel"
        >
          <ChevronUp size={14} />
          <span>TOP</span>
        </button>
      )}
    </div>
  );
};
