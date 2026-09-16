import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playClickSound, playHoverSound, playSectionSwitchSound } from "@/lib/audio";
import { ScrollQuest } from "@/components/ScrollQuest";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Radio,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const ASSETS = {
  portrait: "/yousef.jpg",
  azura: "/manus-storage/azura-live_92476904.webp",
  smartboard: "/manus-storage/smartboard-live_c05a0e9b.webp",
  ambient: "/manus-storage/portfolio-ambient_cbd41c6e.mp3",
  pixelGrid: "/manus-storage/pixel-ai-grid_d35ec55e.webp",
  pixelOrbit: "/manus-storage/pixel-circuit-orbit_64514f43.webp",
};

const projects = [
  {
    number: "01",
    type: "AI / MODEL DEVELOPMENT",
    title: "Egytronic_1.0",
    description:
      "An 8B-parameter language model fine-tuned for Egyptian Arabic, local linguistic context, and practical inference workflows.",
    stack: ["Llama 3.1", "Unsloth", "PyTorch", "Hugging Face"],
    href: "https://huggingface.co/YousefKhamis/Egytronic_1.0",
    accent: "lime",
    image: ASSETS.pixelOrbit,
  },
  {
    number: "02",
    type: "PRODUCT / FULL-STACK",
    title: "Azura Cafe",
    description:
      "A reel-style menu that turns a QR scan into a fast, mobile-first restaurant experience with live admin workflows.",
    stack: ["React", "Firebase", "Groq", "Cloudflare"],
    href: "https://azura-app.pages.dev",
    accent: "orange",
    image: ASSETS.azura,
  },
  {
    number: "03",
    type: "EDTECH / AI PRODUCT",
    title: "SmartBoard AI",
    description:
      "An interactive classroom tool that transforms teacher prompts into structured lessons, visual assets, and active learning modes.",
    stack: ["AI SDKs", "LaTeX", "3D", "TTS"],
    href: "https://smartboard-eg.pages.dev",
    accent: "violet",
    image: ASSETS.smartboard,
  },
];

const skills = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind",
  "Framer Motion",
  "Firebase",
  "Cloudflare",
  "Python",
  "PyTorch",
  "Transformers",
  "LLM APIs",
  "MCP",
];

function OrbitScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 7.3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 2),
      new THREE.MeshBasicMaterial({ color: 0x36a3ff, wireframe: true, transparent: true, opacity: 0.42 }),
    );
    group.add(sphere);

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.18, 1),
      new THREE.MeshBasicMaterial({ color: 0xf1eee8, wireframe: true, transparent: true, opacity: 0.22 }),
    );
    group.add(inner);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.16, 0.012, 12, 120),
      new THREE.MeshBasicMaterial({ color: 0xff745d, transparent: true, opacity: 0.82 }),
    );
    ring.rotation.x = Math.PI / 2.7;
    ring.rotation.y = 0.45;
    group.add(ring);

    const ringTwo = new THREE.Mesh(
      new THREE.TorusGeometry(2.43, 0.008, 12, 120),
      new THREE.MeshBasicMaterial({ color: 0x36a3ff, transparent: true, opacity: 0.48 }),
    );
    ringTwo.rotation.x = -Math.PI / 3.5;
    ringTwo.rotation.z = 0.7;
    group.add(ringTwo);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 430;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.8 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0xece9e0, size: 0.022, transparent: true, opacity: 0.6 }),
    );
    scene.add(particles);

    let targetX = 0;
    let targetY = 0;
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
    };
    mount.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      group.rotation.y += 0.0029;
      group.rotation.x += 0.0007;
      group.rotation.x += (targetY - group.rotation.x) * 0.012;
      group.rotation.z += (targetX - group.rotation.z) * 0.012;
      particles.rotation.y -= 0.0007;
      particles.rotation.x += 0.00025;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      particlesGeometry.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="orbit-scene" aria-label="Interactive Three.js particle sphere" />;
}

function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); return; }
    try { await audio.play(); setPlaying(true); } catch { setPlaying(false); }
  };
  return <>
    <audio ref={audioRef} src={ASSETS.ambient} loop preload="none" />
    <button className={`audio-toggle ${playing ? "is-playing" : ""}`} onClick={toggle} aria-label={playing ? "Pause ambient sound" : "Play ambient sound"}>
      <span className="audio-bars"><i /><i /><i /><i /></span><span>{playing ? "SOUND ON" : "SOUND OFF"}</span>
    </button>
  </>;
}

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}

function UiverseButton({ children, href, outline = false }: { children: React.ReactNode; href: string; outline?: boolean }) {
  return (
    <a className={`uiverse-button ${outline ? "uiverse-button-outline" : ""}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onMouseEnter={playHoverSound} onClick={playClickSound}>
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={2.4} />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    playSectionSwitchSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="portfolio-shell">
      <div className="grain" />
      <ScrollQuest />
      <div className="terminal-ribbon" aria-label="System status"><span>YK_OS / v1.0</span><span>LOC: ALEXANDRIA_EG</span><span>STATUS: ONLINE</span></div>
      <header className="site-header">
        <button className="brand-mark" onClick={() => scrollTo("top")} aria-label="Back to top">
          YK<span>/01</span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
          <button onClick={() => scrollTo("work")}>Selected work</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
        <div className="header-actions"><AudioToggle />
          <span className="availability"><i /> Available for select work</span>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy reveal-up">
          <div className="eyebrow"><span>01</span><span className="eyebrow-line" /><span>SOFTWARE / AI / PRODUCT</span></div>
          <h1>Building<br /><em>useful</em><br />intelligence.</h1>
          <p className="hero-intro">I&apos;m Yousef Madbouly — a junior software developer from Alexandria creating digital products at the intersection of <strong>full-stack craft</strong>, <strong>applied AI</strong>, and <strong>education</strong>.</p>
          <div className="hero-actions">
            <UiverseButton href="#work">Explore the work</UiverseButton>
            <a className="text-link" href="mailto:Yousefkhamismadbouly@googlemail.com">Let&apos;s talk <ArrowDownRight size={16} /></a>
          </div>
        </div>
        <div className="hero-visual reveal-fade">
          <div className="portrait-wrap"><img src={ASSETS.portrait} alt="Portrait of Yousef Madbouly, software developer from Alexandria" width="1200" height="1200" decoding="async" fetchPriority="high" /><span>YOUSEF<br />MADBOULY</span></div>
          <OrbitScene />
          <div className="orb-label orb-label-top"><span>LIVE SYSTEM</span><i /></div>
          <div className="orb-label orb-label-bottom"><span>35.04° N</span><span>29.90° E</span></div>
          <div className="orb-center">YK</div>
        </div>
        <div className="hero-meta">
          <span>Based in Alexandria, Egypt</span>
          <span>Scroll to explore <ArrowDownRight size={15} /></span>
        </div>
      </section>

      <section className="statement-section" id="about">
        <div className="section-kicker"><span>02</span><span className="eyebrow-line" /><span>THE APPROACH</span></div>
        <div className="statement-grid">
          <p className="statement-lead">I build things that make complicated technology feel <em>natural.</em></p>
          <div className="statement-body">
            <p>Four years of self-directed development taught me to own the entire loop — from the first question to a product people can actually use.</p>
            <p>Whether it&apos;s a local language model, a teacher&apos;s smartboard, or a QR menu for a real café, the goal stays the same: make the invisible feel simple.</p>
            <a className="arrow-link" href="https://github.com/yk445kauod-coder" target="_blank" rel="noreferrer">More about my process <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <div className="metrics-row">
          <div><strong>04</strong><span>Years building independently</span></div>
          <div><strong>08B</strong><span>Parameters in Egytronic_1.0</span></div>
          <div><strong>03</strong><span>Public products shipped</span></div>
          <div><strong>∞</strong><span>Curiosity left to explore</span></div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div className="section-kicker"><span>03</span><span className="eyebrow-line" /><span>SELECTED WORK</span></div>
          <h2>Proof of <em>practice.</em></h2>
          <p>Small, opinionated products built in public — each one a different answer to a real problem.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <SpotlightCard key={project.number} className={`project-card accent-${project.accent}`}>
              <div className="project-number">{project.number}</div>
              <div className="project-main">
                <div className="project-type">{project.type}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              <a className="project-arrow" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`} onMouseEnter={playHoverSound} onClick={playClickSound}><ArrowUpRight size={22} /></a>
              <div className="project-visual"><img className="project-live-image" src={project.image} alt={`${project.title} live project interface`} width="960" height="540" loading="lazy" decoding="async" />
                {project.accent === "lime" && <><div className="terminal-top"><span><i /><i /><i /></span><small>egytronic.py</small></div><div className="terminal-code"><span>01</span><b>model</b> = <em>"egytronic"</em><br /><span>02</span><b>language</b> = <em>"ar-eg"</em><br /><span>03</span><b>status</b> = <strong>"fine-tuned"</strong><br /><span>04</span><b>parameters</b> = <em>"8B"</em></div></>}
                {project.accent === "orange" && <><div className="phone-frame"><div className="phone-top">AZURA <span>MENU</span></div><div className="phone-food" /><div className="phone-caption">Taste<br /><em>the moment.</em></div><div className="phone-dots"><i /><i /><i /><i /></div></div><div className="scan-pill"><Radio size={13} /> Live menu</div></>}
                {project.accent === "violet" && <><div className="board-frame"><div className="board-toolbar"><span><BrainCircuit size={15} /> SmartBoard AI</span><i /></div><div className="board-lines"><span /><span /><span /><div><Sparkles size={19} /><b>Lesson generated</b></div><span /><span /></div></div><div className="ai-pill"><Sparkles size={13} /> Teacher mode</div></>}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="toolkit-section" id="toolkit">
        <div className="section-kicker"><span>04</span><span className="eyebrow-line" /><span>THE TOOLKIT</span></div>
        <div className="toolkit-grid">
          <div><h2>Curious by<br /><em>default.</em></h2><p>Tools are only useful when they disappear behind the idea. Here&apos;s what I reach for when building from zero to something real.</p></div>
          <div className="skills-cloud">{skills.map((skill, index) => <span key={skill} style={{ "--delay": `${index * 0.04}s` } as React.CSSProperties}>{skill}</span>)}</div>
        </div>
        <div className="stack-notes">
          <div><Code2 size={18} /><span>Frontend architecture</span><b>React + TypeScript + Vite</b></div>
          <div><BrainCircuit size={18} /><span>Applied intelligence</span><b>LLMs + fine-tuning + inference</b></div>
          <div><Layers3 size={18} /><span>Production mindset</span><b>Firebase + Cloudflare + Git</b></div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="section-kicker"><span>05</span><span className="eyebrow-line" /><span>START A CONVERSATION</span></div>
        <h2>Have a good<br /><em>problem?</em></h2>
        <p>I&apos;m open to thoughtful collaborations, ambitious products, and conversations about what&apos;s next.</p>
        <UiverseButton href="mailto:Yousefkhamismadbouly@googlemail.com">Send an email</UiverseButton>
        <div className="contact-details">
          <a href="mailto:Yousefkhamismadbouly@googlemail.com"><Mail size={15} /> Yousefkhamismadbouly@googlemail.com</a>
          <span><MapPin size={15} /> Alexandria, Egypt</span>
          <div className="socials"><a href="https://github.com/yk445kauod-coder" target="_blank" rel="noreferrer"><Github size={17} /></a><a href="https://huggingface.co/YousefKhamis" target="_blank" rel="noreferrer"><Globe2 size={17} /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={17} /></a></div>
        </div>
      </section>

      <footer className="site-footer"><span>YK / 01 — 2026</span><span>Designed & built with intent <Zap size={13} /></span><span>Alexandria, EG</span></footer>
    </main>
  );
}
