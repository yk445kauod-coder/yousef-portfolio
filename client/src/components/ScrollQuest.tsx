import { useEffect, useState } from "react";
import { Trophy, Sparkles } from "lucide-react";
import { playMilestoneUnlockSound, playClickSound, playHoverSound } from "@/lib/audio";

const milestones = [
  { id: "top", label: "BOOT", title: "Portfolio Initialized" },
  { id: "about", label: "01", title: "Founder Context Unlocked" },
  { id: "work", label: "02", title: "Egytronic Work Discovered" },
  { id: "toolkit", label: "03", title: "Tech Stack Scanned" },
  { id: "contact", label: "XP", title: "Connection Channel Ready" },
];

export function ScrollQuest() {
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const update = () => {
      const viewport = window.innerHeight * 0.42;
      let current = 0;
      milestones.forEach((milestone, index) => {
        const node = document.getElementById(milestone.id);
        if (node && node.getBoundingClientRect().top <= viewport) current = index;
      });
      setActive((previous) => {
        if (current > previous) {
          playMilestoneUnlockSound();
          setNotice(milestones[current].title);
          window.setTimeout(() => setNotice(""), 2200);
        }
        return current;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <aside className="scroll-quest font-['Pixelify_Sans']" aria-label="Portfolio progression milestones">
        <div className="quest-head"><Trophy size={13} className="text-[#36A3FF]" /><span>QUEST</span></div>
        <div className="quest-track" aria-hidden="true">
          <span style={{ height: `${((active + 1) / milestones.length) * 100}%` }} />
        </div>
        <div className="quest-points">
          {milestones.map((milestone, index) => (
            <button
              key={milestone.id}
              className={index <= active ? "is-active" : ""}
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                document.getElementById(milestone.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label={`Jump to milestone ${milestone.title}`}
            >
              <span>{milestone.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className={`quest-notice ${notice ? "is-visible" : ""}`} role="status" aria-live="polite">
        <Sparkles size={14} className="quest-notice-icon text-[#FFA500]" />
        <span>+100 XP // MILESTONE UNLOCKED: {notice}</span>
      </div>
    </>
  );
}
