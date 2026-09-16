import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Cpu,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Radio,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
  MessageSquare,
  Bot,
} from "lucide-react";
import {
  playClickSound,
  playHoverSound,
  playSectionSwitchSound,
  setSoundEnabled,
} from "../lib/audio";
import { PixelMascot } from "../components/PixelMascot";
import { ChatDrawer } from "../components/ChatDrawer";

const products = [
  {
    number: "01",
    icon: "🦙",
    type: "AI · LLM · EGYPTIAN ARABIC",
    title: "Egytronic 16-bit",
    titleAr: "إيجترونيك 16-بت",
    tagline: "Fine-tuned Arabic Language Model on HuggingFace",
    description:
      "A language model trained on Egyptian dialect, legal datasets, and cultural context with open weights for research and deployment.",
    stack: ["LLaMA 3.1 8B", "Unsloth", "PyTorch", "Hugging Face", "GGUF"],
    href: "https://huggingface.co/YousefKhamis/Egytronic_1.0",
    accent: "blue",
    badge: "OPEN WEIGHTS",
  },
  {
    number: "02",
    icon: "📋",
    type: "EDTECH · AI TEACHER",
    title: "Smartboard AI",
    titleAr: "السبورة الذكية",
    tagline: "AI-Powered Classroom Workspace",
    description:
      "Interactive digital whiteboard transforming teacher inputs into structured lesson plans, mathematical LaTeX formulas, and interactive visual aids.",
    stack: ["React", "AI SDK", "LaTeX", "Web Speech", "Tailwind CSS"],
    href: "https://smartboard-eg.pages.dev",
    accent: "orange",
    badge: "LIVE APP",
  },
  {
    number: "03",
    icon: "🏪",
    type: "FULL-STACK · APP MARKETPLACE",
    title: "Azura Cafe & Webstore",
    titleAr: "أزورا كافيه والمتاجر",
    tagline: "Dynamic QR Reel Experience & App Hub",
    description:
      "Mobile menu platform with real-time Firebase syncing, Groq AI assistance, and interactive video browsing for Egyptian local businesses.",
    stack: ["React", "TypeScript", "Firebase", "Groq AI", "Cloudflare Pages"],
    href: "https://azura-app.pages.dev",
    accent: "blue",
    badge: "LIVE APP",
  },
];

const methodology = [
  {
    num: "01",
    icon: "🧠",
    title: "System Architecture",
    description: "Designing resilient system blueprints and data pipelines before implementation.",
  },
  {
    num: "02",
    icon: "🤖",
    title: "Automated Workflows",
    description: "Leveraging custom AI agent pipelines to accelerate development and testing.",
  },
  {
    num: "03",
    icon: "🔍",
    title: "Rigorous Code Review",
    description: "Conducting thorough code reviews to ensure security, performance, and compliance.",
  },
  {
    num: "04",
    icon: "🚀",
    title: "Continuous Iteration",
    description: "Shipping early, measuring real-world usage, and rapidly refining features.",
  },
];

const skills = [
  { name: "LLaMA / Fine-Tuning", tag: "AI Research" },
  { name: "PyTorch & Hugging Face", tag: "ML Engineering" },
  { name: "React / Vite / TypeScript", tag: "Frontend" },
  { name: "Unsloth & PEFT / LoRA", tag: "Model Optimization" },
  { name: "Tailwind CSS & Framer Motion", tag: "UI / UX" },
  { name: "Firebase & Cloudflare Pages", tag: "Infrastructure" },
  { name: "Web Audio & Speech API", tag: "Audio & Web" },
  { name: "Python / Express / Node.js", tag: "Backend" },
];

/* Pure 2D Cybernetic Animated Orbit Radar */
function OrbitScene() {
  return (
    <div
      className="orbit-scene flex items-center justify-center relative overflow-hidden select-none"
      aria-label="Interactive 2D Cybernetic Orbit Radar"
    >
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Outer Pulsing Radar Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#36A3FF]/30 animate-[spin_30s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-[#36A3FF]/20 animate-[spin_20s_linear_infinite_reverse]" />

        {/* Primary Elliptical Orbit Paths */}
        <div className="absolute w-full h-48 border-2 border-[#FF754D]/70 rounded-full rotate-[-25deg] animate-pulse shadow-[0_0_15px_rgba(255,117,77,0.3)]" />
        <div className="absolute w-[110%] h-40 border border-[#36A3FF]/80 rounded-full rotate-[35deg] animate-pulse shadow-[0_0_15px_rgba(54,163,255,0.3)]" />

        {/* Cyber Concentric Geometric Crosshair */}
        <svg
          className="absolute inset-0 w-full h-full text-[#36A3FF]/40 pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        >
          <circle cx="100" cy="100" r="85" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="55" />
          <circle cx="100" cy="100" r="25" strokeDasharray="2 2" />
          <line x1="100" y1="0" x2="100" y2="200" strokeDasharray="4 4" />
          <line x1="0" y1="100" x2="200" y2="100" strokeDasharray="4 4" />
          <polygon
            points="100,20 170,100 100,180 30,100"
            stroke="#36A3FF"
            strokeOpacity="0.25"
            fill="none"
          />
        </svg>

        {/* Orbiting Satellite Nodes */}
        <div className="absolute w-full h-full animate-[spin_12s_linear_infinite]">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FF754D] rounded-full shadow-[0_0_10px_#FF754D]" />
        </div>
        <div className="absolute w-full h-full animate-[spin_18s_linear_infinite_reverse]">
          <div className="absolute bottom-6 right-10 w-2.5 h-2.5 bg-[#36A3FF] rounded-full shadow-[0_0_10px_#36A3FF]" />
        </div>
      </div>
    </div>
  );
}

/* Founder Badge Photo Card */
function FounderCard() {
  return (
    <div className="relative group w-64 h-72 md:w-72 md:h-80 shrink-0 rounded-2xl overflow-hidden border-2 border-[#FF754D] shadow-[0_0_25px_rgba(255,117,77,0.3)] hover:shadow-[0_0_35px_rgba(54,163,255,0.45)] transition-all duration-300 cursor-pointer select-none">
      {/* Specular Glow Gradient Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-[#36A3FF]/30 via-transparent to-[#FF754D]/30" />

      {/* Portrait Image */}
      <img
        src="/yousef.jpg"
        alt="Yousef Khamis - Founder of Egytronic"
        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
      />

      {/* Dynamic Dark Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-transparent opacity-85 z-10" />

      {/* Founder Badge */}
      <div className="absolute bottom-3 left-3 right-3 z-30 px-3 py-2 bg-[#111315]/95 backdrop-blur-md border border-[#FF754D] rounded-xl text-xs font-en-pixel text-[#FF754D] flex flex-col gap-1 shadow-[0_0_15px_rgba(255,117,77,0.4)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF754D] animate-ping" />
            <span className="font-bold tracking-wider text-[#F5F3EE] text-sm">
              YOUSEF KHAMIS
            </span>
          </div>
          <span className="px-1.5 py-0.5 bg-[#FF754D] text-[#111315] font-bold rounded text-[10px]">
            FOUNDER
          </span>
        </div>
        <div className="text-[#36A3FF] text-[11px] font-ar-pixel">
          مؤسس إيجترونيك (Egytronic Founder)
        </div>
      </div>

      {/* Top Tag */}
      <div className="absolute top-3 right-3 z-30 px-2 py-0.5 bg-[#36A3FF] text-[#111315] font-en-pixel text-[10px] font-bold rounded shadow-md">
        EGYTRONIC
      </div>
    </div>
  );
}

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const onMouseEnter = () => {
    playHoverSound();
  };

  return (
    <div onMouseEnter={onMouseEnter} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}

function UiverseButton({
  children,
  href,
  outline = false,
}: {
  children: React.ReactNode;
  href: string;
  outline?: boolean;
}) {
  return (
    <a
      className={`uiverse-button ${outline ? "uiverse-button-outline" : ""}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={playHoverSound}
      onClick={playClickSound}
    >
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={2.4} />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  const scrollTo = (id: string) => {
    playSectionSwitchSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="portfolio-shell">
      {/* Interactive Pixel Art Mascot */}
      <PixelMascot onOpenChat={() => setChatOpen(true)} />

      {/* AI Personal Agent Chat Drawer */}
      <ChatDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="grain" />
      <header className="site-header">
        <button
          className="brand-mark font-ar-pixel"
          onClick={() => scrollTo("top")}
          onMouseEnter={playHoverSound}
          aria-label="Back to top"
        >
          يوسف خميس <span className="font-en-pixel">/ EGYTRONIC FOUNDER</span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
          <button
            onClick={() => scrollTo("products")}
            onMouseEnter={playHoverSound}
          >
            المنتجات / PRODUCTS
          </button>
          <button
            onClick={() => scrollTo("about")}
            onMouseEnter={playHoverSound}
          >
            عني / ABOUT
          </button>
          <button
            onClick={() => scrollTo("methodology")}
            onMouseEnter={playHoverSound}
          >
            المنهجية / METHODOLOGY
          </button>
          <button
            onClick={() => scrollTo("contact")}
            onMouseEnter={playHoverSound}
          >
            تواصل / CONTACT
          </button>
        </nav>
        <div className="header-actions">
          <button
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FF754D]/10 hover:bg-[#FF754D]/20 border border-[#FF754D]/50 text-[#FF754D] text-xs font-ar-pixel transition-all"
            onClick={() => {
              playClickSound();
              setChatOpen(true);
            }}
            onMouseEnter={playHoverSound}
          >
            <Bot className="w-4 h-4" />
            <span>اسأل المساعد الذكي</span>
          </button>

          <button
            className="sound-toggle"
            onClick={toggleSound}
            aria-label="Toggle sound effects"
            title="Toggle Web Audio SFX"
          >
            {soundOn ? (
              <Volume2 size={16} className="text-[#36A3FF]" />
            ) : (
              <VolumeX size={16} className="text-[#9198A1]" />
            )}
            <span className="font-en-pixel text-[0.6rem] hidden sm:inline">
              {soundOn ? "AUDIO: ON" : "AUDIO: OFF"}
            </span>
          </button>
          <span className="availability">
            <i /> 🇪🇬 Founder @ Egytronic
          </span>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="hero-section">
        <div className="hero-copy reveal-up">
          <div className="eyebrow flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FF754D]/20 border border-[#FF754D]/60 text-[#FF754D] font-en-pixel text-xs rounded">
              🇪🇬 EGYTRONIC FOUNDER
            </span>
            <span className="eyebrow-line" />
            <span className="font-ar-pixel text-[#36A3FF] text-sm">
              الإسكندرية · مصر
            </span>
          </div>
          <h1>
            Build · Ship ·
            <br />
            <em className="text-[#FF754D]">Innovate.</em>
          </h1>
          <p className="hero-intro">
            أنا <strong>يوسف خميس</strong> — مؤسس <strong>إيجترونيك (Egytronic)</strong>. أعمل على بناء منتجات وأنظمة ذكاء اصطناعي وتطبيقات ويب تجمع بين <strong>الأبحاث المتقدمة</strong> و <strong>الهندسة البرمجية المتقنة</strong>.
          </p>
          <div className="hero-actions">
            <UiverseButton href="https://huggingface.co/YousefKhamis/Egytronic_1.0">
              🤗 HuggingFace Model
            </UiverseButton>
            <a
              className="text-link"
              href="#products"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              استكشف المشاريع والمنتجات <ArrowDownRight size={16} />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6 text-xs font-en-pixel text-[#F5F3EE]/80">
            <span className="px-2 py-1 bg-[#111315] border border-[#36A3FF]/40 rounded flex items-center gap-1">
              🇪🇬 Made in Egypt
            </span>
            <span className="px-2 py-1 bg-[#111315] border border-[#36A3FF]/40 rounded flex items-center gap-1">
              🤗 Open Weights
            </span>
            <span className="px-2 py-1 bg-[#111315] border border-[#FF754D]/40 text-[#FF754D] rounded flex items-center gap-1">
              ⚡ 16-bit LLM Architecture
            </span>
          </div>
        </div>

        <div className="hero-visual reveal-fade">
          <OrbitScene />
          <div className="orb-label orb-label-top font-en-pixel">
            <span>EGYTRONIC // RADAR SYNC</span>
            <i />
          </div>
          <div className="orb-label orb-label-bottom font-en-pixel">
            <span>ALEXANDRIA, EG</span>
            <span>31.20° N / 29.91° E</span>
          </div>
          <div className="orb-center font-en-pixel text-[#FF754D]">𓂀</div>
        </div>

        {/* Marquee Ticker */}
        <div className="col-span-full mt-8 py-3 border-y border-[#36A3FF]/20 bg-[#111315]/80 overflow-hidden text-xs font-en-pixel text-[#36A3FF]">
          <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] flex gap-8">
            <span>Egytronic ⟡ 16-bit AI ⟡ Smartboard AI ⟡ Webstore ⟡ Made in Egypt ⟡ LLaMA Fine-tune ⟡ Alexandria ⟡ Yousef Khamis Founder</span>
            <span>Egytronic ⟡ 16-bit AI ⟡ Smartboard AI ⟡ Webstore ⟡ Made in Egypt ⟡ LLaMA Fine-tune ⟡ Alexandria ⟡ Yousef Khamis Founder</span>
          </div>
        </div>
      </section>

      {/* About Founder & Vision */}
      <section className="statement-section" id="about">
        <div className="section-kicker">
          <span className="font-en-pixel">02</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg">الخبرة والرؤية</span>
        </div>
        <div className="statement-grid">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start col-span-full">
            {/* Founder Card */}
            <FounderCard />

            <div>
              <div className="inline-block px-3 py-1 bg-[#FF754D]/15 border border-[#FF754D] text-[#FF754D] font-ar-pixel text-xs rounded-full mb-3">
                مؤسس إيجترونيك (Founder)
              </div>
              <p className="statement-lead">
                أعمل على تصميم وبناء أنظمة برمجية ونماذج لغوية تعالج تحديات تقنية حقيقية.
              </p>
              <div className="statement-body mt-4">
                <p>
                  بصفتي <strong>مؤسس إيجترونيك</strong>، أقود عملية بناء وتدريب النماذج اللغوية وهندسة البرمجيات بالكامل — من تدريب نموذج <strong>Egytronic 16-bit</strong> المخصص للغة العربية المصرية، وحتى تطوير منصات مثل <strong>Smartboard AI</strong> و <strong>Azura Cafe</strong>.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 items-center">
                  <a
                    className="arrow-link text-[#FF754D]"
                    href="https://huggingface.co/YousefKhamis"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    تصفح نماذجنا على HuggingFace <ArrowUpRight size={17} />
                  </a>
                  <button
                    onClick={() => {
                      playClickSound();
                      setChatOpen(true);
                    }}
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#36A3FF]/15 border border-[#36A3FF] text-[#36A3FF] hover:bg-[#36A3FF] hover:text-[#111315] text-xs font-ar-pixel transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>تحدث مع المساعد الذكي عن مشاريعي</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="metrics-row font-en-pixel">
          <div>
            <strong className="text-[#FF754D]">03</strong>
            <span>Flagship Projects Shipped</span>
          </div>
          <div>
            <strong className="text-[#36A3FF]">16B</strong>
            <span>LLM Parameter Capacity</span>
          </div>
          <div>
            <strong className="text-[#FF754D]">04+</strong>
            <span>Years Engineering & AI Experience</span>
          </div>
          <div>
            <strong className="text-[#36A3FF]">100%</strong>
            <span>Focus on Quality & Performance</span>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="work-section" id="products">
        <div className="section-heading">
          <div className="section-kicker">
            <span className="font-en-pixel">03</span>
            <span className="eyebrow-line" />
            <span className="font-ar-pixel text-lg">
              منتجات إيجترونيك والمشاريع
            </span>
          </div>
          <h2>
            Featured <em className="text-[#FF754D]">Products.</em>
          </h2>
          <p>
            ثلاثة مشاريع رئيسية أطلقتها في مجالات الذكاء الاصطناعي اللغوي، تكنولوجيا التعليم، وتطبيقات الويب.
          </p>
        </div>

        <div className="project-list">
          {products.map(product => (
            <SpotlightCard
              key={product.number}
              className={`project-card accent-${product.accent}`}
            >
              <div className="project-number font-en-pixel flex items-center gap-2">
                <span>{product.number}</span>
                <span className="text-xl">{product.icon}</span>
              </div>
              <div className="project-main">
                <div className="project-type font-en-pixel">{product.type}</div>
                <h3>
                  {product.title}{" "}
                  <small className="font-ar-pixel text-lg text-[#FF754D] font-normal">
                    ({product.titleAr})
                  </small>
                </h3>
                <p className="text-[#FF754D] text-xs font-semibold mb-1">
                  {product.tagline}
                </p>
                <p>{product.description}</p>
                <div className="project-stack font-en-pixel">
                  {product.stack.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <a
                className="project-arrow"
                href={product.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${product.title}`}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                <ArrowUpRight size={24} />
              </a>
              <div className="project-visual">
                {product.number === "01" && (
                  <>
                    <div className="terminal-top font-en-pixel">
                      <span>
                        <i />
                        <i />
                        <i />
                      </span>
                      <small>egytronic_16bit.py</small>
                    </div>
                    <div className="terminal-code font-en-pixel">
                      <span>01</span>
                      <b>model</b> = <em>"Egytronic_1.0"</em>
                      <br />
                      <span>02</span>
                      <b>founder</b> = <em>"Yousef Khamis"</em>
                      <br />
                      <span>03</span>
                      <b>dialect</b> = <em>"ar-eg / Masri"</em>
                      <br />
                      <span>04</span>
                      <b>weights</b> ={" "}
                      <strong className="text-[#FF754D]">"HuggingFace Open"</strong>
                    </div>
                  </>
                )}
                {product.number === "02" && (
                  <>
                    <div className="board-frame">
                      <div className="board-toolbar font-en-pixel">
                        <span>
                          <BrainCircuit size={15} /> SmartBoard AI
                        </span>
                        <i />
                      </div>
                      <div className="board-lines">
                        <span />
                        <span />
                        <span />
                        <div>
                          <Sparkles size={19} className="text-[#36A3FF]" />
                          <b className="font-en-pixel">
                            AI Classroom Active
                          </b>
                        </div>
                        <span />
                        <span />
                      </div>
                    </div>
                    <div className="ai-pill font-en-pixel">
                      <Sparkles size={13} /> EDTECH MODE
                    </div>
                  </>
                )}
                {product.number === "03" && (
                  <>
                    <div className="phone-frame">
                      <div className="phone-top font-en-pixel">
                        AZURA <span>REEL MENU</span>
                      </div>
                      <div className="phone-food" />
                      <div className="phone-caption">
                        Taste
                        <br />
                        <em>The Moment.</em>
                      </div>
                    </div>
                    <div className="scan-pill font-en-pixel">
                      <Radio size={13} /> LIVE DEPLOYED
                    </div>
                  </>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="statement-section" id="methodology">
        <div className="section-kicker">
          <span className="font-en-pixel">04</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg">المنهجية البرمجية</span>
        </div>
        <div className="statement-heading mb-8">
          <h2>
            Engineering <em className="text-[#FF754D]">Methodology.</em>
          </h2>
          <p className="text-sm text-[#F5F3EE]/70">
            خطوات وأسلوب التطوير المتبع لبناء وتطوير المنتجات البرمجية بكفاءة عالية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-full">
          {methodology.map(item => (
            <div
              key={item.num}
              className="p-5 bg-[#111315]/90 border border-[#36A3FF]/30 rounded-xl flex flex-col justify-between hover:border-[#FF754D] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-en-pixel">
                  <span className="text-[#FF754D] text-lg font-bold">{item.num}</span>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-[#F5F3EE] mb-2">{item.title}</h3>
                <p className="text-xs text-[#F5F3EE]/80 leading-relaxed">{item.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#36A3FF]/15 text-[10px] font-en-pixel text-[#36A3FF]">
                DEVELOPMENT STEP
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Arsenal */}
      <section className="toolkit-section">
        <div className="section-kicker">
          <span className="font-en-pixel">05</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg">ترسانة التقنيات</span>
        </div>
        <div className="toolkit-grid">
          <div>
            <h2>
              Tech &
              <br />
              <em className="text-[#FF754D]">Tools.</em>
            </h2>
            <p>
              التقنيات التي أستخدمها لبناء وتدريب النماذج والمنصات التفاعلية:
            </p>
          </div>
          <div className="skills-cloud font-en-pixel">
            {skills.map((skill, index) => (
              <span
                key={skill.name}
                style={{ "--delay": `${index * 0.04}s` } as React.CSSProperties}
                onMouseEnter={playHoverSound}
              >
                {skill.name}{" "}
                <small className="opacity-60 text-[0.6rem] ml-1">
                  [{skill.tag}]
                </small>
              </span>
            ))}
          </div>
        </div>
        <div className="stack-notes">
          <div>
            <Code2 size={18} className="text-[#36A3FF]" />
            <span>AI & ML Research</span>
            <b className="font-en-pixel">LLaMA + HuggingFace + PyTorch</b>
          </div>
          <div>
            <Cpu size={18} className="text-[#FF754D]" />
            <span>AI Systems & Tools</span>
            <b className="font-en-pixel">Unsloth + Transformers + GGUF</b>
          </div>
          <div>
            <Layers3 size={18} className="text-[#36A3FF]" />
            <span>Full-Stack Infrastructure</span>
            <b className="font-en-pixel">React + Firebase + Cloudflare</b>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="section-kicker">
          <span className="font-en-pixel">06</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg">تواصل معي</span>
        </div>
        <h2>
          Let's Build
          <br />
          <em className="text-[#FF754D]">Together.</em>
        </h2>
        <p>
          إذا كنت مهتماً بالتعاون التقني، الاستشارات في تطوير وتدريب النماذج اللغوية، أو الاستفسار عن إيجترونيك، يسعدني التواصل بك.
        </p>
        <UiverseButton href="mailto:Yousefkhamismadbouly@googlemail.com">
          إرسال بريد إلكتروني
        </UiverseButton>
        <div className="contact-details font-en-pixel">
          <a
            href="mailto:Yousefkhamismadbouly@googlemail.com"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            <Mail size={15} /> Yousefkhamismadbouly@googlemail.com
          </a>
          <span>
            <MapPin size={15} /> Alexandria, Egypt
          </span>
          <div className="socials">
            <a
              href="https://github.com/yk445kauod-coder"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <Github size={18} />
            </a>
            <a
              href="https://huggingface.co/YousefKhamis"
              target="_blank"
              rel="noreferrer"
              aria-label="Hugging Face Profile"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <Globe2 size={18} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer font-en-pixel">
        <span>EGYTRONIC © 2025 // YOUSEF KHAMIS (FOUNDER)</span>
        <span>
          CRAFTED WITH PRECISION & INTENT{" "}
          <Zap size={13} className="text-[#36A3FF]" />
        </span>
        <span>ALEXANDRIA, EG</span>
      </footer>
    </main>
  );
}
