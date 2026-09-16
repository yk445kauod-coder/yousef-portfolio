import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

const milestones = [
  { id: "top", label: "BOOT", title: "Portfolio initialized" },
  { id: "about", label: "01", title: "Context unlocked" },
  { id: "work", label: "02", title: "Projects discovered" },
  { id: "toolkit", label: "03", title: "Toolkit scanned" },
  { id: "contact", label: "XP", title: "Connection ready" },
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
          setNotice(milestones[current].title);
          window.setTimeout(() => setNotice(""), 1700);
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
      <aside className="scroll-quest" aria-label="Portfolio progression milestones">
        <div className="quest-head"><Trophy size={12} /><span>QUEST</span></div>
        <div className="quest-track" aria-hidden="true"><span style={{ height: `${((active + 1) / milestones.length) * 100}%` }} /></div>
        <div className="quest-points">
          {milestones.map((milestone, index) => (
            <button
              key={milestone.id}
              className={index <= active ? "is-active" : ""}
              onClick={() => document.getElementById(milestone.id)?.scrollIntoView({ behavior: "smooth" })}
              aria-label={`Jump to milestone ${milestone.title}`}
            >
              <span>{milestone.label}</span>
            </button>
          ))}
        </div>
      </aside>
      <div className={`quest-notice ${notice ? "is-visible" : ""}`} role="status" aria-live="polite">
        <span className="quest-notice-icon">+XP</span><span>MILESTONE UNLOCKED: {notice}</span>
      </div>
    </>
  );
}
