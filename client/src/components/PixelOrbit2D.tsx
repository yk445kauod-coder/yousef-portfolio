import { useEffect, useRef } from "react";

export function PixelOrbit2D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", resize);

    // Generate retro 2D particles
    const particleCount = 120;
    const particles = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 60 + Math.random() * 140,
      speed: (0.003 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() > 0.7 ? 3 : 2,
      color: Math.random() > 0.4 ? "#36A3FF" : Math.random() > 0.5 ? "#FF754D" : "#ECEAE3",
      opacity: 0.3 + Math.random() * 0.7,
      orbitIndex: Math.floor(Math.random() * 3),
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    canvas.parentElement?.addEventListener("mousemove", onPointerMove);

    let time = 0;

    const render = () => {
      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + (mouseX - width / 2) * 0.08;
      const centerY = height / 2 + (mouseY - height / 2) * 0.08;

      // Draw outer glowing pixel ring
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1 - Bright Blue Orbit
      ctx.strokeStyle = "rgba(54, 163, 255, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.ellipse(0, 0, 160, 90, time * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 2 - Orange Orbit
      ctx.strokeStyle = "rgba(255, 117, 77, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.ellipse(0, 0, 120, 150, -time * 0.15, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 3 - Gold / Accent Orbit
      ctx.strokeStyle = "rgba(236, 234, 227, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(0, 0, 85, 0, Math.PI * 2);
      ctx.stroke();

      // Center Pixel Core
      ctx.fillStyle = "#36A3FF";
      ctx.shadowColor = "#36A3FF";
      ctx.shadowBlur = 12;
      ctx.fillRect(-12, -12, 24, 24);

      ctx.fillStyle = "#ECEAE3";
      ctx.fillRect(-6, -6, 12, 12);

      // Draw Orbiting Pixel Particles
      particles.forEach((p) => {
        p.angle += p.speed;
        let px = 0;
        let py = 0;

        if (p.orbitIndex === 0) {
          px = Math.cos(p.angle) * (p.radius * 1.1);
          py = Math.sin(p.angle) * (p.radius * 0.65);
        } else if (p.orbitIndex === 1) {
          px = Math.cos(p.angle) * (p.radius * 0.7);
          py = Math.sin(p.angle) * (p.radius * 1.15);
        } else {
          px = Math.cos(p.angle) * p.radius;
          py = Math.sin(p.angle) * p.radius;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(Math.floor(px - p.size / 2), Math.floor(py - p.size / 2), p.size, p.size);
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onPointerMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" aria-label="Interactive 2D Retro Pixel Orbit visual display" />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="border border-[rgba(54,163,255,0.3)] bg-[rgba(17,19,21,0.6)] backdrop-blur-xs px-3 py-1 font-['Pixelify_Sans'] text-[10px] tracking-widest text-[#36A3FF]">
          EGYTRONIC_2D_CORE // ONLINE
        </div>
      </div>
    </div>
  );
}
