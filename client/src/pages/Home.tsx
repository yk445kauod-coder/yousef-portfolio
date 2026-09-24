import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Bot, Github, Heart, Menu, MessageSquare, Play, Sparkles, Terminal } from "lucide-react";
import ChatModal from "@/components/ChatModal";
import ProjectRail from "@/components/ProjectRail";
import { ASSETS, context, skills } from "@/components/portfolioData";

function AppLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>;
}

function SectionHeading({ index, title, accent, description }: { index: string; title: string; accent: string; description: string }) {
  return <div className="section-heading"><div><span className="section-index">{index}</span><h2>{title}<br /><em>{accent}</em></h2></div><p>{description}</p></div>;
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
    fetch("https://api.github.com/users/yk445kauod-coder/repos?per_page=100").then((response) => response.json()).then((data) => Array.isArray(data) && setRepoCount(String(data.length))).catch(() => undefined);
    fetch("https://huggingface.co/api/models/YousefKhamis/Egytronic_1.0").then((response) => response.json()).then((data) => data?.downloads && setModelDownloads(String(data.downloads))).catch(() => undefined);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollProgress(progress * 100);
      setPyramidFrame(Math.min(7, Math.floor(progress * 8)));
    };
    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    updateScroll();
    return () => { revealObserver.disconnect(); window.removeEventListener("scroll", updateScroll); window.removeEventListener("pointermove", onPointerMove); };
  }, []);

  const stats = useMemo(() => [{ value: "4+", label: "YEARS SHIPPING" }, { value: repoCount, label: "PUBLIC REPOS" }, { value: modelDownloads, label: "MODEL DOWNLOADS" }, { value: "∞", label: "CURIOSITY" }], [repoCount, modelDownloads]);
  const playSignal = () => { const audio = new Audio(ASSETS.chime); audio.volume = 0.12; audio.play().catch(() => undefined); setPlaying(true); window.setTimeout(() => setPlaying(false), 900); };
  const frameStyle = { backgroundImage: `url(${ASSETS.pyramidSprites})`, backgroundPosition: `${(pyramidFrame % 4) * 33.3333}% ${Math.floor(pyramidFrame / 4) * 100}%` };

  return <div className="site-shell">
    <div className="cursor-glow" aria-hidden="true" /><div className="page-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
    <nav className="nav container">
      <a href="#top" className="brand" aria-label="Yousef Khamis home"><img className="mascot-mark" src={ASSETS.mascot} alt="Tiny pharaonic pixel mascot" /><span>YOUSEF<span className="muted">.DEV</span></span></a>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}><a href="#work" onClick={() => setMenuOpen(false)}>WORK</a><a href="#stack" onClick={() => setMenuOpen(false)}>STACK</a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a><a href="/llm.txt" download>LLM.TXT</a></div>
      <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation"><Menu size={20} /></button>
      <button className="chat-trigger" onClick={() => setChatOpen(true)}><MessageSquare size={15} /> ASK YK</button>
    </nav>

    <main id="top">
      <section className="hero container" data-reveal>
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> ALEXANDRIA, EGYPT / AVAILABLE FOR SELECT BUILDS</div><h1>BUILDING<br /><span>USEFUL</span> WORLDS<span className="cursor">_</span></h1><p className="hero-lede">Junior software developer crafting full-stack products, applied AI, and interfaces with a distinctly Egyptian point of view.</p><div className="hero-actions"><a href="#work" className="button primary">EXPLORE THE WORK <ArrowUpRight size={16} /></a><button className="button ghost" onClick={playSignal}><Play size={14} /> {playing ? "PLAYING..." : "PLAY SIGNAL"}</button></div><div className="hero-meta"><span><Terminal size={14} /> React / AI / SHIP</span><span>04°12′N / 31°14′E</span></div></div>
        <div className="hero-art"><div className="art-frame"><img src={ASSETS.avatar} alt="Professional portrait of Yousef Khamis" /><span className="art-tag">[ PROFILE // YK ]</span></div><div className="hero-pyramid glass-card" aria-label={`Hero pyramid build stage ${pyramidFrame + 1} of 8`}><div className="pyramid-sprite" style={frameStyle} /><div className="pyramid-status"><span>AI AGENT LANDMARK</span><strong>STAGE {String(pyramidFrame + 1).padStart(2, "0")} / 08</strong></div></div><div className="scroll-note">SCROLL TO LOAD STORY <span>↓</span></div></div>
      </section>

      <section className="ticker" aria-label="Skills ticker"><div className="ticker-track">EGYPTIAN ARABIC <i>✦</i> FULL-STACK <i>✦</i> APPLIED AI <i>✦</i> OPEN WEIGHTS <i>✦</i> SHIP / LEARN / REPEAT <i>✦</i> EGYPTIAN ARABIC <i>✦</i> FULL-STACK <i>✦</i> APPLIED AI <i>✦</i></div></section>
      <section className="stats container" data-reveal>{stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</section>

      <section id="work" className="section container" data-reveal><SectionHeading index="01 / SELECTED WORK" title="THINGS I" accent="SHIPPED" description="Real products, public deployments, and experiments that move between code, culture, and users." /><ProjectRail /></section>
      <section id="stack" className="section stack-section" data-reveal><div className="container"><SectionHeading index="02 / ARSENAL" title="THE" accent="TOOLKIT" description="Tools are only useful when they disappear into the experience. Here’s what I reach for when the idea is ready to become real." /><div className="skill-cloud">{skills.map((skill, index) => <span className={index % 4 === 0 ? "accent" : ""} key={skill}>{skill}</span>)}</div></div></section>
      <section id="about" className="section container about-section" data-reveal><div className="about-grid"><div><span className="section-index">03 / THE BUILDER</span><h2>CURIOUS<br /><em>BY DEFAULT</em></h2><div className="about-quote">“A working prototype beats a perfect plan. Real users are the best teachers.”</div></div><div className="about-copy"><p>I'm Yousef — a self-directed developer from Alexandria building at the intersection of software engineering, cloud systems, and applied AI.</p><p>My favorite work has a clear purpose: make a classroom more alive, make a local language more legible to machines, or make a small product feel like someone cared.</p><div className="about-links"><AppLink href="https://github.com/yk445kauod-coder"><Github size={17} /> GitHub</AppLink><AppLink href="https://huggingface.co/YousefKhamis"><span className="hf-icon">🤗</span> Hugging Face</AppLink><a href="mailto:yousefkhamismadbouly@googlemail.com"><Heart size={16} /> Say hello</a></div></div></div></section>
      <section className="milestone container glass-section" data-reveal><div className="milestone-art"><img src={ASSETS.hero} alt="Pixel art Alexandria coastline at dusk" loading="lazy" /></div><div className="milestone-copy"><span className="section-index">04 / NEXT CHECKPOINT</span><h2>KEEP<br /><em>SHIPPING</em></h2><p>The next level is not a title. It’s another useful thing in the hands of a real person.</p><a href="mailto:yousefkhamismadbouly@googlemail.com" className="button primary">START A CONVERSATION <ArrowUpRight size={16} /></a></div></section>
    </main>

    <footer className="footer container"><span>YK / © 2026 / MADE IN ALEXANDRIA</span><span>BUILT WITH INTENTION <Sparkles size={13} /></span></footer>
    <button className="floating-chat" onClick={() => setChatOpen(true)} aria-label="Open AI companion"><Bot size={20} /><span>AI COMPANION</span></button>
    {chatOpen && <ChatModal onClose={() => setChatOpen(false)} />}
    <span className="sr-only">{context}</span>
  </div>;
}
