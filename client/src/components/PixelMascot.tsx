import React, { useState, useEffect, useRef } from "react";
import { playClickSound, playHoverSound } from "../lib/audio";

interface PixelMascotProps {
  onOpenChat: () => void;
}

export const PixelMascot: React.FC<PixelMascotProps> = ({ onOpenChat }) => {
  const [pos, setPos] = useState({ x: 120, y: 120 });
  const [targetPos, setTargetPos] = useState({ x: 120, y: 120 });
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState(false);
  const [speech, setSpeech] = useState<string>("اسألني أي شيء عن يوسف! 🤖");
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset slightly to follow smooth cursor
      const offset = 45;
      const newX = Math.min(Math.max(20, e.clientX + offset), window.innerWidth - 80);
      const newY = Math.min(Math.max(20, e.clientY + offset), window.innerHeight - 80);

      setTargetPos((prev) => {
        if (newX < prev.x - 5) setDirection("left");
        else if (newX > prev.x + 5) setDirection("right");
        return { x: newX, y: newY };
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth lerp movement loop
  useEffect(() => {
    const updatePhysics = () => {
      setPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return prev;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetPos]);

  // Dynamic status messages
  useEffect(() => {
    const speechOptions = [
      "انقر للتحدث مع مساعد يوسف الذكي! 💬",
      "أنا هنا لمساعدتك بالذكاء الاصطناعي ✨",
      "اسألني عن مشاريع يوسف: SmartBoard AI & Egytronic!",
      "مطور برمجيات وذكاء اصطناعي 🚀",
    ];

    const interval = setInterval(() => {
      if (!isHovered) {
        const randomSpeech = speechOptions[Math.floor(Math.random() * speechOptions.length)];
        setSpeech(randomSpeech);
      }
    }, 9000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleClick = () => {
    playClickSound();
    onOpenChat();
  };

  return (
    <div
      className="fixed z-50 transition-transform duration-75 select-none pointer-events-auto cursor-pointer group"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        playHoverSound();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Speech Bubble */}
      <div
        className={`absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#111315]/95 border border-[#36A3FF]/60 text-[#F5F3EE] text-[11px] font-ar-pixel px-3 py-1 rounded-md shadow-[0_0_15px_rgba(54,163,255,0.3)] transition-all duration-300 pointer-events-none ${
          isHovered ? "scale-105 border-[#FF754D] text-[#FF754D]" : "scale-100 opacity-90"
        }`}
      >
        <span>{isHovered ? "اضغط لفتح الشات الذكي ⚡" : speech}</span>
        {/* Bubble Tail */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#36A3FF]" />
      </div>

      {/* Pixel Art Boy Mascot Render */}
      <div className="relative w-12 h-14 flex items-center justify-center animate-bounce duration-1000">
        <svg
          width="48"
          height="52"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_0_10px_rgba(54,163,255,0.8)] transition-transform duration-200 ${
            direction === "left" ? "scale-x-[-1]" : "scale-x-1"
          }`}
        >
          {/* Hair - Pixel Dark Brown/Black */}
          <path d="M6 3H18V6H20V9H4V6H6V3Z" fill="#1A1C1E" />
          <path d="M8 2H16V3H8V2Z" fill="#FF754D" />

          {/* Head & Face - Pixel Skin Tone */}
          <path d="M5 8H19V15H5V8Z" fill="#F4C29D" />

          {/* Eyes - Pixel Bright Blue */}
          <path d="M7 10H9V12H7V10Z" fill="#36A3FF" />
          <path d="M15 10H17V12H15V10Z" fill="#36A3FF" />
          <path d="M8 10H9V11H8V10Z" fill="#FFFFFF" />
          <path d="M16 10H17V11H16V10Z" fill="#FFFFFF" />

          {/* Glasses Frame Accent */}
          <path d="M6 9H10V10H6V9Z" fill="#111315" />
          <path d="M14 9H18V10H14V9Z" fill="#111315" />
          <path d="M10 10H14V11H10V10Z" fill="#111315" />

          {/* Smile / Mouth */}
          <path d="M10 13H14V14H10V13Z" fill="#B84A39" />

          {/* Hoodie / Body - Charcoal & Orange Highlight */}
          <path d="M4 15H20V23H4V15Z" fill="#1D2125" />
          <path d="M9 15H15V23H9V15Z" fill="#FF754D" />

          {/* Code Emblem / Laptop Badge */}
          <path d="M10 17H14V19H10V17Z" fill="#36A3FF" />

          {/* Hands */}
          <path d="M2 17H4V20H2V17Z" fill="#F4C29D" />
          <path d="M20 17H22V20H20V17Z" fill="#F4C29D" />

          {/* Pixel Feet */}
          <path d="M6 23H10V25H6V23Z" fill="#111315" />
          <path d="M14 23H18V25H14V23Z" fill="#111315" />
        </svg>

        {/* Glow Ring under Mascot */}
        <div className="absolute -bottom-1 w-8 h-2 bg-[#36A3FF]/40 rounded-full blur-[3px] group-hover:bg-[#FF754D]/60 group-hover:w-10 transition-all duration-300" />
      </div>
    </div>
  );
};
