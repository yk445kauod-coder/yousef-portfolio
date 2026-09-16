import { useEffect, useRef, useState } from "react";
import { playClickSound, playHoverSound, playSectionSwitchSound } from "@/lib/audio";
import { ScrollQuest } from "@/components/ScrollQuest";
import { PixelOrbit2D } from "@/components/PixelOrbit2D";
import { AiCompanionModal } from "@/components/AiCompanionModal";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Download,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Radio,
  Sparkles,
  Terminal,
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
      "An 8B-parameter decoder-only language model fine-tuned for Egyptian Arabic, local linguistic context, instruction following, and practical inference workflows.",
    stack: ["Llama 3.1 8B", "Unsloth", "PyTorch", "Hugging Face"],
    href: "https://huggingface.co/YousefKhamis/Egytronic_1.0",
    accent: "blue",
    image: ASSETS.pixelOrbit,
  },
  {
    number: "02",
    type: "PRODUCT / FULL-STACK",
    title: "Azura Cafe & Restaurant",
    description:
      "A mobile-first QR reel-style menu that turns restaurant browsing into a fast experience with live order synchronization and admin analytics.",
    stack: ["React", "Firebase DB", "Groq AI", "Cloudflare Pages"],
    href: "https://azura-app.pages.dev",
    accent: "orange",
    image: ASSETS.azura,
  },
  {
    number: "03",
    type: "EDTECH / AI APPLICATION",
    title: "SmartBoard AI",
    description:
      "An interactive classroom AI whiteboard that transforms teacher prompts into structured lesson plans, active learning, LaTeX formulas, and TTS.",
    stack: ["AI SDKs", "LaTeX", "Web Speech TTS", "Cloudflare"],
    href: "https://smartboard-eg.pages.dev",
    accent: "violet",
    image: ASSETS.smartboard,
  },
];

const skills = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Framer Motion",
  "Firebase",
  "Cloudflare Pages",
  "Python",
  "PyTorch",
  "Hugging Face",
  "Unsloth Llama",
  "LLM APIs & MCP",
];

function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };
  return (
    <>
      <audio ref={audioRef} src={ASSETS.ambient} loop preload="none" />
      <button
        className={`audio-toggle ${playing ? "is-playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Pause ambient sound" : "Play ambient sound"}
      >
        <span className="audio-bars">
          <i /><i /><i /><i />
        </span>
        <span>{playing ? "SOUND ON" : "SOUND OFF"}</span>
      </button>
    </>
  );
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

function UiverseButton({ children, href, outline = false, icon = true }: { children: React.ReactNode; href: string; outline?: boolean; icon?: boolean }) {
  const isDownload = href.endsWith(".txt");
  return (
    <a
      className={`uiverse-button ${outline ? "uiverse-button-outline" : ""}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      download={isDownload ? "llm.txt" : undefined}
      rel="noreferrer"
      onMouseEnter={playHoverSound}
      onClick={playClickSound}
    >
      <span>{children}</span>
      {icon && (isDownload ? <Download size={16} strokeWidth={2.4} /> : <ArrowUpRight size={16} strokeWidth={2.4} />)}
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
    <main className="portfolio-shell bg-[#07070f] text-[#ECEAE3]">
      <div className="grain" />
      <ScrollQuest />
      <AiCompanionModal />

      {/* Terminal Header Status Ribbon */}
      <div className="terminal-ribbon" aria-label="System status">
        <span>YK_OS / EGYTRONIC_V2.0</span>
        <span>LOC: ALEXANDRIA_EG</span>
        <span>HUGGINGFACE: @YousefKhamis</span>
        <span>STATUS: ONLINE</span>
      </div>

      <header className="site-header">
        <button className="brand-mark font-['Pixelify_Sans']" onClick={() => scrollTo("top")} aria-label="Back to top">
          YOUSEF_KHAMIS<span className="text-[#36A3FF]">/EGYTRONIC</span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
          <button onClick={() => scrollTo("work")}>Projects</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("toolkit")}>Toolkit</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
        <div className="header-actions">
          <AudioToggle />
          <span className="availability">
            <i /> Founder of Egytronic
          </span>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Single H1 Page Header Section */}
      <section id="top" className="hero-section">
        <div className="hero-copy reveal-up">
          <div className="eyebrow">
            <span>01</span>
            <span className="eyebrow-line" />
            <span>SOFTWARE DEVELOPER / EGYTRONIC FOUNDER</span>
          </div>

          <h1 className="font-['Handjet'] font-bold text-balance leading-none text-[#F5F3EE]">
            Yousef Khamis<br />
            <em className="text-[#36A3FF] font-normal">Founder of Egytronic</em><br />
            & Software Developer
          </h1>

          <p className="hero-intro font-['IBM_Plex_Sans_Arabic'] text-[#aab3bd]">
            Software developer (مطور برمجيات) from Alexandria, Egypt. Founder of <strong>Egytronic</strong> — building open AI models (<strong>Egytronic_1.0 8B</strong>), full-stack web products, and EdTech platforms.
          </p>

          <div className="hero-actions flex-wrap gap-3">
            <UiverseButton href="#work">Explore Work</UiverseButton>
            <UiverseButton href="/llm.txt" outline>Download llm.txt</UiverseButton>
            <a
              className="text-link font-['Pixelify_Sans']"
              href="https://huggingface.co/YousefKhamis"
              target="_blank"
              rel="noreferrer"
            >
              Hugging Face <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="hero-visual reveal-fade">
          <div className="portrait-wrap">
            <img
              src={ASSETS.portrait}
              alt="Yousef Khamis — Founder of Egytronic & Software Developer in Alexandria, Egypt"
              width="1200"
              height="1200"
              decoding="async"
              fetchPriority="high"
            />
            <span className="font-['Pixelify_Sans']">YOUSEF KHAMIS<br />FOUNDER @ EGYTRONIC</span>
          </div>

          <PixelOrbit2D />

          <div className="orb-label orb-label-top font-['Pixelify_Sans']">
            <span>EGYTRONIC_1.0 8B</span>
            <i />
          </div>
          <div className="orb-label orb-label-bottom font-['Pixelify_Sans']">
            <span>31.20° N</span>
            <span>29.91° E</span>
          </div>
          <div className="orb-center font-['Pixelify_Sans'] text-[#36A3FF]">YK</div>
        </div>

        <div className="hero-meta font-['Pixelify_Sans']">
          <span>Alexandria, Egypt // Founder of Egytronic</span>
          <span>Scroll to explore milestone quest <ArrowDownRight size={15} /></span>
        </div>
      </section>

      {/* About & Philosophy Section */}
      <section className="statement-section" id="about">
        <div className="section-kicker">
          <span>02</span>
          <span className="eyebrow-line" />
          <span>FOUNDER & SOFTWARE DEVELOPER</span>
        </div>
        <div className="statement-grid">
          <p className="statement-lead font-['Handjet']">
            Building <em>applied intelligence</em> and practical tools for Arabic speakers & global workflows.
          </p>
          <div className="statement-body">
            <p>
              As Founder of Egytronic and a software developer, I focus on the end-to-end craft: from preparing multilingual datasets and fine-tuning 8B parameter language models to delivering fast web experiences deployed on Cloudflare Pages.
            </p>
            <p>
              My work spans LLM development, full-stack product architecture, classroom EdTech tools, and open-source models on Hugging Face.
            </p>
            <a
              className="arrow-link font-['Pixelify_Sans'] text-[#36A3FF]"
              href="https://huggingface.co/YousefKhamis"
              target="_blank"
              rel="noreferrer"
            >
              Explore Hugging Face Profile <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="metrics-row font-['Pixelify_Sans']">
          <div>
            <strong className="text-[#36A3FF]">08B</strong>
            <span>Parameters in Egytronic_1.0 Model</span>
          </div>
          <div>
            <strong className="text-[#FFA500]">03</strong>
            <span>Shipped Public Production Workflows</span>
          </div>
          <div>
            <strong className="text-[#36A3FF]">100%</strong>
            <span>Focused on Practical AI & Full-Stack</span>
          </div>
          <div>
            <strong className="text-[#ECEAE3]">ALEX</strong>
            <span>Alexandria, Egypt Base</span>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="work-section" id="work">
        <div className="section-heading">
          <div className="section-kicker">
            <span>03</span>
            <span className="eyebrow-line" />
            <span>FEATURED PROJECTS</span>
          </div>
          <h2 className="font-['Handjet']">
            Proof of <em>Execution.</em>
          </h2>
          <p className="font-['IBM_Plex_Sans_Arabic'] text-[#aab3bd]">
            Real applications, fine-tuned models, and production platforms built with clean technical principles.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <SpotlightCard key={project.number} className={`project-card accent-${project.accent}`}>
              <div className="project-number font-['Pixelify_Sans']">{project.number}</div>
              <div className="project-main">
                <div className="project-type font-['Pixelify_Sans']">{project.type}</div>
                <h3 className="font-['Handjet'] text-[#F5F3EE]">{project.title}</h3>
                <p className="font-['IBM_Plex_Sans_Arabic']">{project.description}</p>
                <div className="project-stack font-['Pixelify_Sans']">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <a
                className="project-arrow"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title}`}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                <ArrowUpRight size={22} />
              </a>
              <div className="project-visual">
                <img
                  className="project-live-image"
                  src={project.image}
                  alt={`${project.title} live interface screenshot`}
                  width="960"
                  height="540"
                  loading="lazy"
                  decoding="async"
                />
                {project.accent === "blue" && (
                  <>
                    <div className="terminal-top">
                      <span>
                        <i /><i /><i />
                      </span>
                      <small className="font-['Pixelify_Sans']">egytronic_1.0.py</small>
                    </div>
                    <div className="terminal-code font-['Pixelify_Sans']">
                      <span>01</span><b>model</b> = <em>"Egytronic_1.0"</em><br />
                      <span>02</span><b>base</b> = <em>"Llama-3.1-8B-Instruct"</em><br />
                      <span>03</span><b>dialect</b> = <strong>"ar-EG"</strong><br />
                      <span>04</span><b>huggingface</b> = <em>"YousefKhamis"</em>
                    </div>
                  </>
                )}
                {project.accent === "orange" && (
                  <>
                    <div className="phone-frame">
                      <div className="phone-top font-['Pixelify_Sans']">AZURA <span>MENU</span></div>
                      <div className="phone-food" />
                      <div className="phone-caption font-['Handjet']">Taste<br /><em>the moment.</em></div>
                      <div className="phone-dots"><i /><i /><i /><i /></div>
                    </div>
                    <div className="scan-pill font-['Pixelify_Sans']">
                      <Radio size={13} /> QR Live Menu
                    </div>
                  </>
                )}
                {project.accent === "violet" && (
                  <>
                    <div className="board-frame">
                      <div className="board-toolbar font-['Pixelify_Sans']">
                        <span><BrainCircuit size={15} /> SmartBoard AI</span>
                        <i />
                      </div>
                      <div className="board-lines">
                        <span /><span /><span />
                        <div>
                          <Sparkles size={19} className="text-[#36A3FF]" />
                          <b className="font-['Pixelify_Sans']">Lesson & Formulas Generated</b>
                        </div>
                        <span /><span />
                      </div>
                    </div>
                    <div className="ai-pill font-['Pixelify_Sans']">
                      <Sparkles size={13} /> Classroom Mode
                    </div>
                  </>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Toolkit & Tech Stack Section */}
      <section className="toolkit-section" id="toolkit">
        <div className="section-kicker">
          <span>04</span>
          <span className="eyebrow-line" />
          <span>TECHNICAL TOOLKIT</span>
        </div>
        <div className="toolkit-grid">
          <div>
            <h2 className="font-['Handjet']">
              Full-Stack &<br />
              <em>AI Pipeline.</em>
            </h2>
            <p className="font-['IBM_Plex_Sans_Arabic'] text-[#aab3bd]">
              From web rendering with React and TypeScript to fine-tuning LLMs with Unsloth and PyTorch.
            </p>
          </div>
          <div className="skills-cloud font-['Pixelify_Sans']">
            {skills.map((skill, index) => (
              <span key={skill} style={{ "--delay": `${index * 0.04}s` } as React.CSSProperties}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="stack-notes font-['IBM_Plex_Sans_Arabic']">
          <div>
            <Code2 size={18} className="text-[#36A3FF]" />
            <span className="font-['Pixelify_Sans']">Frontend Architecture</span>
            <b>React 19 + TypeScript + Vite + Tailwind</b>
          </div>
          <div>
            <BrainCircuit size={18} className="text-[#FFA500]" />
            <span className="font-['Pixelify_Sans']">AI & Language Models</span>
            <b>PyTorch + Transformers + Unsloth Llama 3.1</b>
          </div>
          <div>
            <Layers3 size={18} className="text-[#36A3FF]" />
            <span className="font-['Pixelify_Sans']">Cloud & Deployment</span>
            <b>Cloudflare Pages + Firebase + Hugging Face</b>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="section-kicker">
          <span>05</span>
          <span className="eyebrow-line" />
          <span>LET'S CONNECT</span>
        </div>
        <h2 className="font-['Handjet']">
          Have an AI or<br />
          <em>Web Project?</em>
        </h2>
        <p className="font-['IBM_Plex_Sans_Arabic']">
          Open to engineering collaborations, AI model initiatives, full-stack product building, and conversations.
        </p>

        <div className="flex flex-wrap gap-4 items-center mt-6">
          <UiverseButton href="mailto:Yousefkhamismadbouly@googlemail.com">Send Email</UiverseButton>
          <UiverseButton href="/llm.txt" outline>Download llm.txt</UiverseButton>
        </div>

        <div className="contact-details font-['Pixelify_Sans']">
          <a href="mailto:Yousefkhamismadbouly@googlemail.com">
            <Mail size={15} /> Yousefkhamismadbouly@googlemail.com
          </a>
          <span>
            <MapPin size={15} /> Alexandria, Egypt
          </span>
          <div className="socials">
            <a href="https://github.com/yk445kauod-coder" target="_blank" rel="noreferrer" aria-label="GitHub Profile">
              <Github size={18} />
            </a>
            <a href="https://huggingface.co/YousefKhamis" target="_blank" rel="noreferrer" aria-label="Hugging Face Profile">
              <Globe2 size={18} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer font-['Pixelify_Sans']">
        <span>YOUSEF KHAMIS // FOUNDER OF EGYTRONIC</span>
        <span>Built with React + TypeScript + AI Context <Zap size={13} className="text-[#FFA500]" /></span>
        <span>Alexandria, EG</span>
      </footer>
    </main>
  );
}
