import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Bot, ExternalLink, Github, Heart, Linkedin, Menu, MessageSquare, Play, Send, Sparkles, Terminal, X } from "lucide-react";

const ASSETS = {
  avatar: "/assets/yousef-real-photo.jpg",
  mascot: "/assets/yousef-mascot-sphere.png",
  hero: "/assets/portfolio-hero-pixel.jpg",
  milestone: "/assets/milestone-lab-pixel.jpg",
  azura: "/assets/azura-latest.jpg",
  smartboard: "/assets/smartboard-latest.jpg",
  azuraLogo: "/assets/azura-logo.jpg",
  smartboardLogo: "/assets/smartboard-logo.png",
  chime: "/assets/terminal-chime.mp3",
  pyramidSprites: "/assets/pyramid-build-sprites.png",
  glassTexture: "/assets/liquid-glass-texture.jpg",
  egytronicFrame: "/assets/egytronic-card-frame.png",
  smartboardFrame: "/assets/smartboard-card-frame.png",
  azuraFrame: "/assets/azura-card-frame.png",
};

const projects = [
  { number: "01", kind: "AI / LLM", title: "Egytronic_1.0", text: "Fine-tuned 8B-parameter language model for Egyptian Arabic, local culture, and practical inference workflows.", tags: ["Llama 3.1", "Unsloth", "GGUF"], image: ASSETS.milestone, frame: ASSETS.egytronicFrame, link: "https://huggingface.co/YousefKhamis/Egytronic_1.0", cta: "View on Hugging Face" },
  { number: "02", kind: "EDTECH / AI", title: "SmartBoard AI", text: "An AI-powered classroom whiteboard that turns lesson intent into visual, interactive teaching moments.", tags: ["React", "AI Teacher", "Realtime"], image: ASSETS.smartboard, frame: ASSETS.smartboardFrame, logo: ASSETS.smartboardLogo, link: "https://smartboard-eg.pages.dev", cta: "Open live project" },
  { number: "03", kind: "PRODUCT / WEB", title: "Azura Cafe", text: "A mobile-first restaurant experience with QR access, realtime ordering, and a warm seasonal visual system.", tags: ["Firebase", "Cloudflare", "Framer Motion"], image: ASSETS.azura, frame: ASSETS.azuraFrame, logo: ASSETS.azuraLogo, link: "https://azura-app.pages.dev", cta: "Open live project" },
];

const skills = ["React", "TypeScript", "Tailwind", "Firebase RTDB", "Cloudflare Pages", "PyTorch", "Transformers", "Unsloth", "MCP", "Framer Motion", "GitHub", "Arabic RTL"];
const context = "Yousef Khamis Ebrahim Madbouly is a junior software developer from Alexandria, Egypt and an independent builder with four years of self-directed development. He works across React, TypeScript, Firebase, Cloudflare, AI product development, Llama fine-tuning, PyTorch, Transformers, Unsloth, MCP, and educational technology. Featured work includes Egytronic_1.0, a fine-tuned 8B Llama 3.1 model for Egyptian Arabic on Hugging Face; SmartBoard AI, an AI classroom whiteboard; and Azura Cafe, a deployed mobile-first restaurant web app. GitHub: https://github.com/yk445kauod-coder. Hugging Face: https://huggingface.co/YousefKhamis. Live projects: https://smartboard-eg.pages.dev and https://azura-app.pages.dev.";

function AppLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>;
}

function ChatModal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "أهلاً! أنا YK\'s portfolio agent. اسألني عن مشاريعه، الـstack، أو Egytronic_1.0 — وأنا هجاوب من الـCV والروابط الحقيقية." },
  ]);
  const answer = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes("egytronic") || lower.includes("model") || lower.includes("llm") || lower.includes("نموذج")) return "Egytronic_1.0 هو نموذج 8B مبني على Llama 3.1، تم ضبطه للهجة المصرية والسياقات الثقافية والقانونية. منشور بصيغ F16 وGGUF على Hugging Face، مع توثيق لاستخدام Transformers وllama.cpp.";
    if (lower.includes("smart") || lower.includes("board") || lower.includes("تعليم")) return "SmartBoard AI سبورة تعليمية مدعومة بـAI teacher: تولّد الدروس، تعرضها بصرياً، وتدعم real-time workflows للمدرسين والطلاب. جرّبها من الرابط الحي في قسم المشاريع.";
    if (lower.includes("skill") || lower.includes("stack") || lower.includes("تقنيات")) return "الـcore stack: React + TypeScript + Tailwind + Framer Motion في الواجهة، Firebase Realtime Database وCloudflare في النشر، وTransformers/PyTorch/Unsloth في الـAI.";
    if (lower.includes("contact") || lower.includes("تواصل")) return "تقدر تتواصل مع Yousef عبر البريد yousefkhamismadbouly@googlemail.com أو GitHub، وتقدر تحمل llm.txt لو عايز تدي أي coding agent السياق الكامل عنه.";
    return "أقدر أساعدك في فهم خبرة Yousef، Egytronic_1.0، SmartBoard AI، Azura Cafe، أو اختياراته التقنية. جرّب سؤالاً أكثر تحديداً.";
  };
  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, { from: "user", text: q }, { from: "bot", text: answer(q) }]);
    setInput("");
  };
  return <div className="modal-backdrop" onClick={onClose}><section className="chat-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Chat with YK portfolio agent">
    <header className="chat-head"><div><div className="eyebrow"><span className="status-dot" /> ONLINE / CV CONTEXT LOADED</div><h2>YK_AGENT<span className="cursor">_</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close chat"><X size={18} /></button></header>
    <div className="chat-body">{messages.map((m, i) => <div className={`message ${m.from}`} key={i}><span className="message-label">{m.from === "bot" ? "yk_agent" : "you"}</span><p>{m.text}</p></div>)}</div>
    <div className="chat-input"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about the work... / اسأل عن الشغل" aria-label="Chat message" /><button onClick={send} aria-label="Send message"><Send size={16} /></button></div>
  </section></div>;
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pyramidFrame, setPyramidFrame] = useState(0);
  const [repoCount, setRepoCount] = useState("many");
  const [modelDownloads, setModelDownloads] = useState("28");
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    fetch("https://api.github.com/users/yk445kauod-coder/repos?per_page=100").then((r) => r.json()).then((data) => Array.isArray(data) && setRepoCount(String(data.length))).catch(() => undefined);
    fetch("https://huggingface.co/api/models/YousefKhamis/Egytronic_1.0").then((r) => r.json()).then((data) => data?.downloads && setModelDownloads(String(data.downloads))).catch(() => undefined);
  }, []);
  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setPyramidFrame(Math.min(7, Math.floor((window.scrollY / Math.max(1, max)) * 8)));
    };
    const onPointerMove = (event: PointerEvent) => { document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`); document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`); };
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    updateProgress();
    return () => { revealObserver.disconnect(); window.removeEventListener("scroll", updateProgress); window.removeEventListener("pointermove", onPointerMove); };
  }, []);
  const stats = useMemo(() => [{ value: "4+", label: "YEARS SHIPPING" }, { value: repoCount, label: "PUBLIC REPOS" }, { value: modelDownloads, label: "MODEL DOWNLOADS" }, { value: "∞", label: "CURIOSITY" }], [repoCount, modelDownloads]);
  const play = () => { const audio = new Audio(ASSETS.chime); audio.volume = 0.12; audio.play().catch(() => undefined); setPlaying(true); setTimeout(() => setPlaying(false), 900); };

  return <div className="site-shell"><div className="cursor-glow" aria-hidden="true" /><div className="page-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
    <nav className="nav container"><a href="#top" className="brand" aria-label="Yousef Khamis home"><img className="mascot-mark" src={ASSETS.mascot} alt="Tiny pharaonic pixel mascot" /><span>YOUSEF<span className="muted">.DEV</span></span></a><div className={`nav-links ${menuOpen ? "open" : ""}`}><a href="#work" onClick={() => setMenuOpen(false)}>WORK</a><a href="#stack" onClick={() => setMenuOpen(false)}>STACK</a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a><a href="/llm.txt" download>LLM.TXT</a></div><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={20} /></button><button className="chat-trigger" onClick={() => setChatOpen(true)}><MessageSquare size={15} /> ASK YK</button></nav>
    <main id="top">
      <section className="hero container" data-reveal><div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> ALEXANDRIA, EGYPT / AVAILABLE FOR SELECT BUILDS</div><h1>BUILDING<br /><span>USEFUL</span> WORLDS<span className="cursor">_</span></h1><p className="hero-lede">Junior software developer crafting full-stack products, applied AI, and interfaces with a distinctly Egyptian point of view.</p><div className="hero-actions"><a href="#work" className="button primary">EXPLORE THE WORK <ArrowUpRight size={16} /></a><button className="button ghost" onClick={play}><Play size={14} /> {playing ? "PLAYING..." : "PLAY SIGNAL"}</button></div><div className="hero-meta"><span><Terminal size={14} /> React / AI / SHIP</span><span>04°12′N / 31°14′E</span></div></div><div className="hero-art"><div className="art-frame"><img src={ASSETS.avatar} alt="Professional portrait of Yousef Khamis" /><span className="art-tag">[ PROFILE // YK ]</span></div><div className="hero-pyramid glass-card" aria-label={`Hero pyramid build stage ${pyramidFrame + 1} of 8`}><div className="pyramid-sprite" style={{ backgroundImage: `url(${ASSETS.pyramidSprites})`, backgroundPosition: `${(pyramidFrame % 4) * 33.3333}% ${Math.floor(pyramidFrame / 4) * 100}%` }} /><div className="pyramid-status"><span>AI AGENT LANDMARK</span><strong>STAGE {String(pyramidFrame + 1).padStart(2, "0")} / 08</strong></div></div><div className="scroll-note">SCROLL TO LOAD STORY <span>↓</span></div></div></section>
      <section className="ticker" aria-label="Skills ticker"><div className="ticker-track">EGYPTIAN ARABIC <i>✦</i> FULL-STACK <i>✦</i> APPLIED AI <i>✦</i> OPEN WEIGHTS <i>✦</i> SHIP / LEARN / REPEAT <i>✦</i> EGYPTIAN ARABIC <i>✦</i> FULL-STACK <i>✦</i> APPLIED AI <i>✦</i></div></section>
      <section className="stats container" data-reveal>{stats.map((s) => <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</section>
      <section id="work" className="section container" data-reveal><div className="section-heading"><div><span className="section-index">01 / SELECTED WORK</span><h2>THINGS I<br /><em>SHIPPED</em></h2></div><p>Real products, public deployments, and experiments that move between code, culture, and users.</p></div><div className="project-grid">{projects.map((p) => <article className="project-card" key={p.title}><div className="project-image"><img src={p.image} alt={`${p.title} project screenshot`} /><img className="project-frame-art" src={p.frame} alt="" aria-hidden="true" /><span className="project-number">{p.number}</span><span className="live-pill"><span className="status-dot" /> LIVE</span></div><div className="project-info"><span className="eyebrow">{p.kind}</span><div className="project-title-row"><h3>{p.title}</h3>{'logo' in p && <img className="project-logo" src={p.logo} alt={`${p.title} logo from live project favicon`} />}</div><p>{p.text}</p><div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div><AppLink href={p.link} className="text-link">{p.cta} <ArrowUpRight size={15} /></AppLink></div></article>)}</div></section>
      <section id="stack" className="section stack-section" data-reveal><div className="container"><div className="section-heading"><div><span className="section-index">02 / ARSENAL</span><h2>THE<br /><em>TOOLKIT</em></h2></div><p>Tools are only useful when they disappear into the experience. Here’s what I reach for when the idea is ready to become real.</p></div><div className="skill-cloud">{skills.map((s, i) => <span className={i % 4 === 0 ? "accent" : ""} key={s}>{s}</span>)}</div></div></section>
      <section id="about" className="section container about-section" data-reveal><div className="about-grid"><div><span className="section-index">03 / THE BUILDER</span><h2>CURIOUS<br /><em>BY DEFAULT</em></h2><div className="about-quote">“A working prototype beats a perfect plan. Real users are the best teachers.”</div></div><div className="about-copy"><p>I'm Yousef — a self-directed developer from Alexandria building at the intersection of software engineering, cloud systems, and applied AI.</p><p>My favorite work has a clear purpose: make a classroom more alive, make a local language more legible to machines, or make a small product feel like someone cared.</p><div className="about-links"><AppLink href="https://github.com/yk445kauod-coder"><Github size={17} /> GitHub</AppLink><AppLink href="https://huggingface.co/YousefKhamis"><span className="hf-icon">🤗</span> Hugging Face</AppLink><a href="mailto:yousefkhamismadbouly@googlemail.com"><Heart size={16} /> Say hello</a></div></div></div></section>
      <section className="milestone container glass-section" data-reveal><div className="milestone-art"><img src={ASSETS.hero} alt="Pixel art Alexandria coastline at dusk" /></div><div className="milestone-copy"><span className="section-index">04 / NEXT CHECKPOINT</span><h2>KEEP<br /><em>SHIPPING</em></h2><p>The next level is not a title. It’s another useful thing in the hands of a real person.</p><a href="mailto:yousefkhamismadbouly@googlemail.com" className="button primary">START A CONVERSATION <ArrowUpRight size={16} /></a></div></section>
    </main>
    <footer className="footer container"><span>YK / © 2026 / MADE IN ALEXANDRIA</span><span>BUILT WITH INTENTION <Sparkles size={13} /></span></footer>
    <button className="floating-chat" onClick={() => setChatOpen(true)} aria-label="Open AI companion"><Bot size={20} /><span>AI COMPANION</span></button>
    {chatOpen && <ChatModal onClose={() => setChatOpen(false)} />}
    <span className="sr-only">{context}</span>
  </div>;
}
